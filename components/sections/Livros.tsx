'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal, Tilt } from '@/components/motion'
import { LIVROS } from '@/lib/content'
import { Confete } from '@/components/Scenery'

/* ── quadro com 3 sextilhas do livro, trocadas por abas 1·2·3 ── */
function Sextilhas({ sextilhas, cor, livro }: {
  sextilhas: readonly (readonly string[])[]; cor: string; livro: string
}) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  const atual = sextilhas[i]

  return (
    <div
      className="mt-5 rounded-2xl border-l-[5px] bg-white/10 p-4 text-left backdrop-blur-sm"
      style={{ borderColor: cor }}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#9FD3EE]">Versos do livro</span>
        <div className="flex gap-1.5" role="tablist" aria-label={'Sextilhas de ' + livro}>
          {sextilhas.map((_, k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-label={'Sextilha ' + (k + 1)}
              onClick={() => setI(k)}
              className={
                'grid h-7 w-7 place-items-center rounded-full border-2 font-display text-xs font-extrabold transition ' +
                (k === i ? 'border-white bg-white text-[#2C2951]' : 'border-white/40 text-white hover:border-white')
              }
            >
              {k + 1}
            </button>
          ))}
        </div>
      </div>

      {/* altura fixa pelo maior bloco: trocar de aba não faz a página pular */}
      <div className="relative grid">
        {sextilhas.map((s, k) => (
          <blockquote
            key={k}
            aria-hidden={k !== i}
            className="col-start-1 row-start-1 transition-all duration-300"
            style={{
              opacity: k === i ? 1 : 0,
              transform: k === i || reduce ? 'none' : 'translateY(6px)',
              pointerEvents: k === i ? 'auto' : 'none',
            }}
          >
            {/* sextilha = dois tercetos; respiro entre o 3º e o 4º verso */}
            {s.map((v, vi) => (
              <p key={v} className={'font-display text-[15px] font-bold leading-snug text-white ' + (vi === 3 ? 'mt-2.5' : '')}>{v}</p>
            ))}
          </blockquote>
        ))}
      </div>
      <p className="mt-2 text-xs text-[#9FD3EE]">sextilha {i + 1} de {sextilhas.length} · {atual.length} versos</p>
    </div>
  )
}

/* ── folheador do miolo: setas para avançar/voltar as páginas, arrastar no celular ── */
function Seta({ dir, onClick, disabled }: { dir: 'prev' | 'next'; onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Página anterior' : 'Próxima página'}
      className={
        'btn-3d absolute top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-[#EEB80E] text-[#2C2951] ' +
        'transition-opacity disabled:pointer-events-none disabled:opacity-0 md:h-14 md:w-14 ' +
        (dir === 'prev' ? 'left-3 md:left-6' : 'right-3 md:right-6')
      }
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {dir === 'prev' ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  )
}

function Miolo() {
  const trilho = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [atual, setAtual] = useState(0)
  const [noFim, setNoFim] = useState(false)

  const paginas = LIVROS.flatMap((l) => [1, 2, 3, 4].map((n) => ({ src: `${l.slug}-pg${n}`, livro: l.titulo, cor: l.cor })))

  // qual página está no começo da faixa, e se já chegou ao fim
  const medir = useCallback(() => {
    const el = trilho.current
    if (!el) return
    const cards = [...el.children] as HTMLElement[]
    const base = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft)
    let i = 0, menor = Infinity
    cards.forEach((c, k) => { const d = Math.abs(c.getBoundingClientRect().left - base); if (d < menor) { menor = d; i = k } })
    const fim = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
    // no fim da faixa várias páginas ficam visíveis — marca a última como atual
    setAtual(fim ? cards.length - 1 : i)
    setNoFim(fim)
  }, [])

  useEffect(() => {
    const el = trilho.current
    if (!el) return
    medir()
    el.addEventListener('scroll', medir, { passive: true })
    window.addEventListener('resize', medir)
    return () => { el.removeEventListener('scroll', medir); window.removeEventListener('resize', medir) }
  }, [medir])

  // avança/volta uma página (a largura de um card + o espaço entre eles)
  const folhear = (sentido: 1 | -1) => {
    const el = trilho.current
    const card = el?.children[0] as HTMLElement | undefined
    if (!el || !card) return
    const passo = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '20')
    el.scrollBy({ left: sentido * passo, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div className="relative mt-10">
      <Seta dir="prev" onClick={() => folhear(-1)} disabled={atual === 0} />
      <Seta dir="next" onClick={() => folhear(1)} disabled={noFim} />

      <div
        ref={trilho}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 py-4 md:px-24"
        style={{ scrollPaddingInline: 'var(--pad, 1.25rem)' }}
        tabIndex={0}
        aria-label="Páginas internas dos livros"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); folhear(1) }
          if (e.key === 'ArrowLeft') { e.preventDefault(); folhear(-1) }
        }}
      >
        {paginas.map((p, i) => (
          <div
            key={p.src}
            className="w-[62vw] max-w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl border-[3px] border-[#2C2951] bg-white shadow-[0_6px_0_0_#2C2951] sm:w-[42vw]"
            style={{ rotate: (i % 3 - 1) * 1.6 + 'deg' }}
          >
            <img
              src={'/assets/books/' + p.src + '.webp'}
              srcSet={`/assets/books/${p.src}@sm.webp 520w, /assets/books/${p.src}.webp 1000w`}
              sizes="260px"
              alt={'Página interna de ' + p.livro}
              loading="lazy"
              draggable={false}
              className="aspect-[2/3] h-auto w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* indicador: página atual e livro */}
      <div className="mt-4 flex flex-col items-center gap-2 px-5">
        <p className="font-display text-sm font-extrabold text-white" aria-live="polite">
          <span style={{ color: '#EEB80E' }}>{paginas[atual]?.livro}</span>
          <span className="text-white/70"> · página {atual + 1} de {paginas.length}</span>
        </p>
        <div className="flex gap-1.5" aria-hidden>
          {paginas.map((p, i) => (
            <span
              key={p.src}
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: i === atual ? 22 : 8, background: i === atual ? '#EEB80E' : 'rgba(255,255,255,.35)' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Livros() {
  const reduce = useReducedMotion()

  return (
    <section
      id="livros"
      className="relative overflow-hidden py-20 md:py-24"
      style={{ background: 'linear-gradient(180deg,#023F6B 0%,#015A94 55%,#0271B8 100%)' }}
    >
      <Confete count={12} className="opacity-35" />

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-[#EEB80E] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-[#2C2951]">
              A coleção
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.06] text-white sm:text-4xl md:text-5xl">
              Três livros. Seis eixos temáticos. Dois em cada obra.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[#C9E7F8]">
              Cada livro cruza dois assuntos que normalmente seriam ensinados separados — e entrega
              os dois em poesias de seis versos, as sextilhas.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          {LIVROS.map((l, i) => (
            <motion.article
              key={l.slug}
              className="group flex flex-col"
              initial={reduce ? false : { opacity: 0, y: 56 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
            >
              <Tilt className="mx-auto w-[70vw] max-w-[300px] md:w-full" max={13} scale={1.05}>
                <div className="relative">
                  <img
                    src={'/assets/books/' + l.slug + '-capa.webp'}
                    srcSet={`/assets/books/${l.slug}-capa@sm.webp 560w, /assets/books/${l.slug}-capa.webp 1100w`}
                    sizes="(max-width: 768px) 70vw, 300px"
                    alt={'Capa do livro ' + l.titulo}
                    loading="lazy"
                    className="aspect-[2/3] w-full rounded-lg border-[3px] border-[#2C2951] object-cover shadow-[0_14px_28px_rgba(0,0,0,.4)]"
                  />
                  {/* lombada, para o livro ter corpo */}
                  <span
                    className="pointer-events-none absolute inset-y-[2px] left-[2px] w-[9px] rounded-l-lg"
                    style={{ background: 'linear-gradient(90deg,rgba(0,0,0,.34),transparent)' }}
                    aria-hidden
                  />
                </div>
              </Tilt>

              <div className="mt-6 flex flex-1 flex-col text-center md:text-left">
                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                  {l.eixos.map((e) => (
                    <span
                      key={e}
                      className="rounded-full border-2 border-white/40 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white"
                    >
                      {e}
                    </span>
                  ))}
                </div>

                <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-white">
                  {l.titulo}
                </h3>
                <p className="mt-2 flex-1 text-pretty leading-relaxed text-[#C9E7F8]">{l.resumo}</p>

                {/* três sextilhas reais do miolo, alternáveis */}
                <Sextilhas sextilhas={l.sextilhas} cor={l.cor} livro={l.titulo} />

                <p className="mt-3 text-xs text-[#8FC4E4]">ISBN {l.isbn}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-20 md:mt-24">
        <Reveal className="mx-auto max-w-6xl px-5">
          <h3 className="text-center font-display text-2xl font-extrabold text-white md:text-3xl">
            Por dentro dos livros
          </h3>
        </Reveal>
        <Miolo />
      </div>

    </section>
  )
}
