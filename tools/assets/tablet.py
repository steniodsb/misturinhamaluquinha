# -*- coding: utf-8 -*-
"""Gera montagens dos personagens segurando um tablet, preservando o estilo biscuit."""
import os, sys, base64, json, mimetypes, uuid, io
import urllib.request
from PIL import Image

KEY = open('credentials.env.example',encoding='utf-8').read()
KEY = [l.split('=',1)[1].strip() for l in KEY.splitlines() if l.startswith('OPEN_AI_API_KEY')][0]

SRC = r'Misturinha Maluquinha-20260921T171547Z-1-002/Misturinha Maluquinha'
OUT = r'tools/assets/_tablet_raw'  # saída bruta da IA (gerar a partir da RAIZ do projeto do cliente)
os.makedirs(OUT, exist_ok=True)

STYLE = ("Keep EXACTLY the same character: identical face, skin tone, hairstyle, clothing colors and "
         "handmade polymer-clay / biscuit figurine 3D style, matte sculpted texture, soft studio lighting. "
         "Do not restyle, do not change proportions, do not add any text or logo. "
         "Fully transparent background, clean cut-out edges, no shadow on the ground.")

def multipart(fields, files):
    b = '----mm' + uuid.uuid4().hex
    body = io.BytesIO()
    for k,v in fields.items():
        body.write(f'--{b}\r\nContent-Disposition: form-data; name="{k}"\r\n\r\n{v}\r\n'.encode())
    for k,path in files:
        fn = os.path.basename(path)
        ct = mimetypes.guess_type(fn)[0] or 'image/png'
        body.write(f'--{b}\r\nContent-Disposition: form-data; name="{k}"; filename="{fn}"\r\nContent-Type: {ct}\r\n\r\n'.encode())
        body.write(open(path,'rb').read()); body.write(b'\r\n')
    body.write(f'--{b}--\r\n'.encode())
    return 'multipart/form-data; boundary='+b, body.getvalue()

def edit(src_path, prompt, size, out_name):
    # reduz o arquivo de entrada (limite de upload) mantendo alpha
    tmp = os.path.join(OUT,'_in.png')
    im = Image.open(src_path).convert('RGBA'); im.thumbnail((1024,1024), Image.LANCZOS); im.save(tmp)
    ct, body = multipart(
        {'model':'gpt-image-1','prompt':prompt,'size':size,'background':'transparent',
         'quality':'high','n':'1','input_fidelity':'high'},
        [('image[]', tmp)])
    req = urllib.request.Request('https://api.openai.com/v1/images/edits', data=body,
        headers={'Authorization':'Bearer '+KEY,'Content-Type':ct})
    with urllib.request.urlopen(req, timeout=420) as r:
        data = json.load(r)
    raw = base64.b64decode(data['data'][0]['b64_json'])
    p = os.path.join(OUT, out_name)
    open(p,'wb').write(raw)
    print('OK', out_name, len(raw)//1024, 'KB')
    return p

if __name__ == '__main__':
    P = (f"{STYLE} Change ONLY the pose: the character now stands facing the viewer holding a modern "
         f"tablet computer with both hands at chest height, tilted slightly toward the viewer. "
         f"The tablet is a plain dark slate tablet sculpted in the same clay style, thick rounded bezel, "
         f"and its SCREEN IS COMPLETELY BLANK, flat, uniform light grey, no image and no text on the screen. "
         f"Full body visible from head to shoes.")
    edit(os.path.join(SRC,'Dona Nina.png'), P, '1024x1536', 'test-dona-nina.png')
