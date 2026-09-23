/* Captura de tela para revisão visual.
   uso: node shot.mjs [largura] [--full | --sec=<id> | --y=<px>] */
import { chromium, webkit } from 'playwright'
import { mkdirSync } from 'node:fs'

const W = Number(process.argv[2]) || 1440
const args = process.argv.slice(3)
const full = args.includes('--full')
const useWebkit = args.includes('--webkit')            // motor do Safari
const url = args.find((a) => a.startsWith('--url='))?.slice(6) ?? 'http://localhost:4321'
const sec = args.find((a) => a.startsWith('--sec='))?.slice(6)
const y = Number(args.find((a) => a.startsWith('--y='))?.slice(4) ?? NaN)
const OUT = 'C:/Users/steni/AppData/Local/Temp/claude/C--Users-steni-Documents-PROJETOS-WEB-DESIGN-COM-VIBE-LP-MISTURINHA-MALUQUINHA/2c4a7345-b5d5-4575-af1d-d8a6f3f67b81/scratchpad/shots'
mkdirSync(OUT, { recursive: true })

const browser = await (useWebkit ? webkit : chromium).launch()
const page = await browser.newPage({ viewport: { width: W, height: W < 600 ? 844 : 900 }, deviceScaleFactor: W < 600 ? 2 : 1 })

const erros = []
page.on('console', (m) => { if (m.type() === 'error') erros.push(m.text().slice(0, 300)) })
page.on('pageerror', (e) => erros.push('PAGEERROR ' + e.message.slice(0, 300)))

await page.goto(url, { waitUntil: 'networkidle' })

// dispara todas as animações de entrada: percorre a página inteira e volta
await page.evaluate(async () => {
  const h = document.body.scrollHeight
  for (let p = 0; p < h; p += 500) { window.scrollTo(0, p); await new Promise((r) => setTimeout(r, 55)) }
  window.scrollTo(0, 0)
  await new Promise((r) => setTimeout(r, 400))
})
await page.waitForTimeout(1200)

// desliga o scroll suave: saltos programáticos grandes ficam exatos
await page.evaluate(() => { const l = window.__lenis; if (l && typeof l.destroy === 'function') l.destroy() })

let name = `w${W}` + (useWebkit ? '-webkit' : '')
if (sec === 'bottom') {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(1400)
  name += '-bottom'
} else if (sec) {
  // salta duas vezes: a segunda corrige qualquer deslocamento de layout
  for (let k = 0; k < 2; k++) {
    await page.evaluate((s) => {
      const el = document.querySelector(s)
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 70)
    }, sec)
    await page.waitForTimeout(900)
  }
  name += '-' + sec.replace(/\W/g, '')
} else if (!Number.isNaN(y)) {
  await page.evaluate((v) => window.scrollTo(0, v), y)
  await page.waitForTimeout(700)
  name += '-y' + y
}

const file = `${OUT}/${name}${full ? '-full' : ''}.png`
await page.screenshot({ path: file, fullPage: full })

const alturaPagina = await page.evaluate(() => document.body.scrollHeight)
console.log('shot:', file)
console.log('altura da página:', alturaPagina)
if (erros.length) console.log('ERROS DO CONSOLE:\n - ' + [...new Set(erros)].join('\n - '))
else console.log('console limpo')

await browser.close()
