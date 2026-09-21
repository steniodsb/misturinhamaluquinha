# Misturinha Maluquinha — página de vendas

Landing page de página única da coleção literária infantil **Misturinha Maluquinha** (Luan Gonçalves, Jequié-BA).
Next.js 16 (App Router, Turbopack) + React 19 + Tailwind CSS 4 + `motion` (Framer Motion 12) + Lenis (scroll suave).
Node fixado em 22.x (`engines`) para a Vercel. A Vercel recusa builds com Next < 16.3.1 (CVE-2025-66478) — não faça downgrade.
Sai como **HTML estático** (`output: 'export'`) — roda em qualquer hospedagem, inclusive cPanel, sem Node no servidor.

## Rodar

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # gera a pasta out/ (site estático pronto para subir)
```

## Publicar

- **cPanel / WaveHost / Apache / Nginx:** suba o conteúdo de `out/` para a raiz do domínio (`public_html`). Não precisa de nada além dos arquivos.
- **Vercel / Netlify:** conecte a pasta `site/`, build command `npm run build`, output `out/`.

## Onde editar

| O quê | Onde |
|---|---|
| Todo o texto, preço, WhatsApp, Instagram, FAQ, livros, bônus | `lib/content.ts` |
| Ordem das seções e **transições** (`<Divider from to variant>` entre cada par; `from`/`to` são as cores de borda das seções vizinhas) | `app/page.tsx` |
| Cada seção (layout e movimento) | `components/sections/*.tsx` |
| Cores, fontes, animações CSS | `app/globals.css` (`@theme`) |
| Blocos de movimento reutilizáveis (Reveal, Parallax, Tilt, Counter, CharImg) | `components/motion/index.tsx` |
| Cenário (nuvens, colinas, confete, ondas) | `components/Scenery.tsx` |
| Nav fixa e botão de WhatsApp | `components/Chrome.tsx` |
| SEO / metadados | `app/layout.tsx` |

Os links de WhatsApp já vêm com mensagem pronta (`CTA.familia` para famílias, `CTA.escola` para volume). Troque o número em `CONTATO.whatsappNumero`.

## Assets (`public/assets/`)

- `chars/` — personagens recortados (fundo transparente), WebP em 2 tamanhos (`nome.webp` até 1200px, `nome@sm.webp` até 620px).
- `books/` — capas, contracapas e páginas do miolo dos três livros, extraídas dos PDFs.
- `mounts/` — montagens geradas por IA (gpt-image-1) do personagem **segurando um tablet**. `mounts.json` guarda a posição da tela em % da imagem; o `<video>` é encaixado exatamente ali (`MOUNTS` em `lib/content.ts`).
- `video/` — compilados comprimidos para web (H.264, faststart): `apresentacao-*.mp4` (completos, com áudio), `tablet-loop.mp4` e `libras-loop.mp4` (loops mudos para as telas dos tablets), posters.

### Regerar assets

Os scripts do pipeline estão em `tools/assets/` e devem rodar **a partir da pasta raiz do projeto do cliente** (a que contém `Misturinha Maluquinha-…-002/`):

```bash
python site/tools/assets/chars.py      # personagens → WebP recortado
python site/tools/assets/books.py      # PDFs → capas e páginas WebP
python site/tools/assets/tablet.py     # gera montagem com tablet via OpenAI (lê a chave de credentials.env.example)
python site/tools/assets/mount.py      # mede a tela do tablet e exporta para public/assets/mounts
```

Vídeos (ffmpeg), a partir da raiz do projeto do cliente:

```bash
ffmpeg -i "COMPILADO PARA O SITE - NÚMEROS E CORES .mp4" -vf scale=1152:-2 -c:v libx264 -crf 32 -preset slow -pix_fmt yuv420p -c:a aac -b:a 80k -movflags +faststart site/public/assets/video/apresentacao-numeros.mp4
ffmpeg -ss 8 -t 14 -i "COMPILADO PARA O SITE - NÚMEROS E CORES .mp4" -an -vf "scale=960:-2,fps=24" -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart site/public/assets/video/tablet-loop.mp4
```

## Revisão visual (Playwright)

```bash
node tools/shot.mjs 1440                 # hero em 1440px
node tools/shot.mjs 390 --sec=#preco     # uma seção em largura de celular
node tools/shot.mjs 1440 --sec=bottom    # rodapé
node tools/walk.mjs 1440 900             # caminha a página inteira e monta pranchas
```

Os arquivos saem na pasta de rascunho da sessão (`scratchpad/shots` e `scratchpad/walk`).

## Acessibilidade e performance

- Tudo que se move respeita `prefers-reduced-motion` (renderiza parado no estado final).
- Todas as imagens têm `aspect-ratio` reservado → sem salto de layout (CLS) ao carregar.
- Vídeos completos só carregam quando o usuário clica; os loops dos tablets são leves (<1 MB) e mudos.
- Contraste: texto tinta `#2C2951` sobre papel `#FFF8E9`; botões com borda e sombra sólida (estilo massinha).
