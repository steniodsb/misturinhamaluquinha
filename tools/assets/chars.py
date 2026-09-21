# -*- coding: utf-8 -*-
import os, glob
from PIL import Image

SRC = r'Misturinha Maluquinha-20260921T171547Z-1-002/Misturinha Maluquinha'
DST = r'site/public/assets/chars'
os.makedirs(DST, exist_ok=True)

NAME = {
 'Analuz':'analuz','Bigode':'bigode','Dona Filó':'dona-filo','Dona Nina':'dona-nina',
 'Jorge':'jorge','Matteo':'matteo','Mel':'mel','Pitoco':'pitoco','Sol':'sol',
 'seu fiba':'seu-fuba','Logo misturinha maluquinha':'logo',
}

def clean_alpha(im, thr=12):
    """Remove halo semi-transparente das bordas (evita contorno branco)."""
    r,g,b,a = im.split()
    a = a.point(lambda v: 0 if v < thr else v)
    return Image.merge('RGBA',(r,g,b,a))

manifest = []
for f in sorted(glob.glob(os.path.join(SRC,'*.png'))):
    base = os.path.splitext(os.path.basename(f))[0]
    slug = NAME.get(base)
    if not slug:
        print('SKIP', base); continue
    im = Image.open(f).convert('RGBA')
    im = clean_alpha(im)
    bbox = im.getchannel('A').getbbox()
    im = im.crop(bbox)                     # recorte justo no personagem
    w,h = im.size
    # normaliza pela maior dimensão
    for tag, cap in (('', 1200), ('@sm', 620)):
        s = min(cap/max(w,h), 1.0)
        o = im.resize((max(1,round(w*s)), max(1,round(h*s))), Image.LANCZOS)
        o.save(os.path.join(DST, f'{slug}{tag}.webp'), 'WEBP', quality=90, method=6)
    manifest.append((slug, w, h, round(w/h,4)))
    print(f'{slug:12s} crop={w}x{h} ratio={w/h:.3f}')

with open(os.path.join(DST,'manifest.txt'),'w',encoding='utf-8') as fh:
    for m in manifest: fh.write('%s %d %d %s\n'%m)
