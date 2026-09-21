/* Caminha pela página tela a tela (como um usuário) e monta pranchas de revisão.
   uso: node walk.mjs [largura=1440] [altura=900] */
import { chromium } from 'playwright'
import { mkdirSync, rmSync } from 'node:fs'
import { execSync } from 'node:child_process'

const W = Number(process.argv[2]) || 1440
const H = Number(process.argv[3]) || 900
const OUT = 'C:/Users/steni/AppData/Local/Temp/claude/C--Users-steni-Documents-PROJETOS-WEB-DESIGN-COM-VIBE-LP-MISTURINHA-MALUQUINHA/2c4a7345-b5d5-4575-af1d-d8a6f3f67b81/scratchpad/walk'
rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: W, height: H } })
const erros = []
page.on('console', (m) => { if (m.type() === 'error') erros.push(m.text().slice(0, 240)) })
page.on('pageerror', (e) => erros.push('PAGEERROR ' + e.message.slice(0, 240)))

await page.goto('http://localhost:4321', { waitUntil: 'networkidle' })
await page.waitForTimeout(2200)

// a altura muda durante a caminhada (imagens lazy, reveals) — recalcula a cada passo
let total = await page.evaluate(() => document.body.scrollHeight)
const passo = Math.round(H * 0.92)
let i = 0
for (let y = 0; y < total && i < 60; y += passo) {
  await page.evaluate((v) => window.scrollTo(0, v), y)
  await page.waitForTimeout(950)
  await page.screenshot({ path: `${OUT}/${String(i).padStart(2, '0')}.png` })
  i++
  total = await page.evaluate(() => document.body.scrollHeight)
}
console.log('telas:', i, '| altura:', total, '| viewport:', W + 'x' + H)
if (erros.length) console.log('ERROS:\n - ' + [...new Set(erros)].join('\n - '))
else console.log('console limpo')
await browser.close()

// pranchas 2x2 a 50%
execSync(`python -c "
from PIL import Image
import glob
fs=sorted(glob.glob(r'${OUT}/*.png')); s=0.5; W=${W}; H=${H}
for k in range(0,len(fs),4):
    sh=Image.new('RGB',(int(W*s)*2,int(H*s)*2),(30,30,30))
    for j,f in enumerate(fs[k:k+4]):
        im=Image.open(f).convert('RGB').resize((int(W*s),int(H*s)),Image.LANCZOS)
        sh.paste(im,((j%2)*int(W*s),(j//2)*int(H*s)))
    sh.save(r'${OUT}/sheet%d.png'%(k//4+1))
print('pranchas:',(len(fs)+3)//4)
"`, { stdio: 'inherit' })
