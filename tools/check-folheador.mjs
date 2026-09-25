/* testa as setas do folheador do miolo: estado inicial, avança 2, volta 1, vai ao fim */
import { chromium } from 'playwright'
const W = Number(process.argv[2]) || 1440
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: W, height: 900 } })
const erros = []; p.on('pageerror', (e) => erros.push(e.message))
await p.goto('http://localhost:4321', { waitUntil: 'networkidle' })
await p.evaluate(() => window.__lenis?.destroy?.())
await p.evaluate(() => document.querySelector('[aria-label="Páginas internas dos livros"]').scrollIntoView({ block: 'center' }))
await p.waitForTimeout(800)
const estado = () => p.evaluate(() => ({
  txt: document.querySelector('[aria-live="polite"]')?.textContent,
  prevOculta: getComputedStyle(document.querySelector('[aria-label="Página anterior"]')).opacity,
  nextOculta: getComputedStyle(document.querySelector('[aria-label="Próxima página"]')).opacity,
}))
console.log('inicio  ', JSON.stringify(await estado()))
for (let i = 0; i < 2; i++) { await p.click('[aria-label="Próxima página"]'); await p.waitForTimeout(700) }
console.log('+2      ', JSON.stringify(await estado()))
await p.click('[aria-label="Página anterior"]'); await p.waitForTimeout(700)
console.log('-1      ', JSON.stringify(await estado()))
for (let i = 0; i < 14; i++) { const d = await p.$('[aria-label="Próxima página"]:not([disabled])'); if (!d) break; await d.click(); await p.waitForTimeout(450) }
console.log('fim     ', JSON.stringify(await estado()))
await p.screenshot({ path: 'C:/Users/steni/AppData/Local/Temp/claude/C--Users-steni-Documents-PROJETOS-WEB-DESIGN-COM-VIBE-LP-MISTURINHA-MALUQUINHA/2c4a7345-b5d5-4575-af1d-d8a6f3f67b81/scratchpad/shots/folheador-' + W + '.png' })
console.log(erros.length ? 'ERROS: ' + erros.join(' | ') : 'sem erros')
await b.close()
