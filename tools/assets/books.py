# -*- coding: utf-8 -*-
import os, io, fitz
from PIL import Image

P = r'Misturinha Maluquinha-20260921T171547Z-1-002/Misturinha Maluquinha/PDFs'
DST = r'site/public/assets/books'
os.makedirs(DST, exist_ok=True)

BOOKS = {
 'vogais':  ('Misturinha Maluquinha Vogais e Sentimentos capa e contracapa.pdf',
             'Misturinha Maluquinha Vogais e Sentimentos Miolo.pdf'),
 'numeros': ('Misturinha Maluquinha Numeros e Cores capa e contracapa.pdf',
             'Misturinha Maluquinha Numeros e Cores miolo.pdf'),
 'formas':  ('Formas Geometricas e animais capa e contracapa.pdf',
             'Formas Geometricas e animais Miolo.pdf'),
}

def render(doc, page, dpi):
    return Image.open(io.BytesIO(doc[page].get_pixmap(dpi=dpi).tobytes('png'))).convert('RGB')

for slug,(capa, miolo) in BOOKS.items():
    d = fitz.open(os.path.join(P,capa))
    # p0 = capa frente, p3 (ou último) = contracapa
    front = render(d,0,200); back = render(d,d.page_count-1,200)
    for im,tag in ((front,'capa'),(back,'contracapa')):
        for suf,cap in (('',1100),('@sm',560)):
            o=im.copy(); o.thumbnail((cap,cap), Image.LANCZOS)
            o.save(f'{DST}/{slug}-{tag}{suf}.webp','WEBP',quality=88,method=6)
    print(slug,'capa',front.size)
    d.close()

    m = fitz.open(os.path.join(P,miolo))
    # páginas ilustradas do miolo (pula rosto/ficha catalográfica)
    picks = [p for p in range(2, m.page_count) if p % 2 == 0][:4]
    for i,p in enumerate(picks):
        im = render(m,p,190)
        for suf,cap in (('',1000),('@sm',520)):
            o=im.copy(); o.thumbnail((cap,cap), Image.LANCZOS)
            o.save(f'{DST}/{slug}-pg{i+1}{suf}.webp','WEBP',quality=86,method=6)
    print(' ', slug,'spreads', picks)
    m.close()
