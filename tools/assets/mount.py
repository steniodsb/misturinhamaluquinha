# -*- coding: utf-8 -*-
import os, json
import numpy as np
from PIL import Image, ImageDraw

T = r'tools/assets/_tablet_raw'
DST = r'site/public/assets/mounts'
os.makedirs(DST, exist_ok=True)

JOBS = [('test-dona-nina.png', (490,700), 'dona-nina-tablet'),
        ('test-seu-fuba.png',  (470,600), 'seu-fuba-tablet')]

out = {}
for fn, seed, slug in JOBS:
    im = Image.open(os.path.join(T,fn)).convert('RGBA')

    # 1. localiza a tela ANTES de qualquer corte
    rgb = im.convert('RGB').copy()
    ImageDraw.floodfill(rgb, seed, (255,0,255), thresh=34)
    a = np.array(rgb)
    m = (a[...,0]==255)&(a[...,1]==0)&(a[...,2]==255)
    ys,xs = np.nonzero(m)
    sx0,sx1,sy0,sy1 = int(xs.min()), int(xs.max()), int(ys.min()), int(ys.max())

    # 2. limpa halo: zera RGB onde é transparente, corta alpha residual
    arr = np.array(im)
    alpha = arr[...,3]
    arr[...,3] = np.where(alpha < 14, 0, alpha)
    arr[arr[...,3]==0] = (0,0,0,0)
    im = Image.fromarray(arr, 'RGBA')

    # 3. recorta na bbox do personagem
    bx0,by0,bx1,by1 = im.getchannel('A').getbbox()
    im = im.crop((bx0,by0,bx1,by1))
    W,H = im.size

    # 4. tela em % do recorte final
    screen = {
        'left':  round(100*(sx0-bx0)/W, 3),
        'top':   round(100*(sy0-by0)/H, 3),
        'width': round(100*(sx1-sx0)/W, 3),
        'height':round(100*(sy1-sy0)/H, 3),
    }
    out[slug] = {'w':W, 'h':H, 'ratio':round(W/H,4), 'screen':screen}

    for suf,cap in (('',1100),('@sm',560)):
        o = im.copy(); o.thumbnail((cap,cap), Image.LANCZOS)
        o.save(f'{DST}/{slug}{suf}.webp','WEBP',quality=92,method=6)
    print(slug, W,'x',H, screen)

open(os.path.join(DST,'mounts.json'),'w').write(json.dumps(out, indent=2))
