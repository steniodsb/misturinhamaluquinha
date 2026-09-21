'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { Reveal, Tilt } from '@/components/motion'
import { LIVROS } from '@/lib/content'
import { Confete } from '@/components/Scenery'

/* faixa de páginas do miolo, que desliza no scroll */
function Miolo() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-22%'])

  const paginas = LIVROS.flatMap((l) => [1, 2, 3, 4].map((n) => ({ src: `${l.slug}-pg${n}`, livro: l.titulo })))

  return (
    <div ref={ref} className="relative mt-10 overflow-hidden py-2">
      <motion.div className="flex w-max gap-5 px-5" style={{ x: reduce ? undefined : x }}>
        {paginas.map((p, i) => (
          <div
            key={p.src}
            className="w-[42vw] max-w-[260px] shrink-0 overflow-hidden rounded-2xl border-[3px] border-[#2C2951] bg-white shadow-[0_6px_0_0_#2C2951]"
            style={{ rotate: (i % 3 - 1) * 1.6 + 'deg' }}
          >
            <img
              src={'/assets/books/' + p.src + '.webp'}
              srcSet={`/assets/books/${p.src}@sm.webp 520w, /assets/books/${p.src}.webp 1000w`}
              sizes="260px"
              alt={'Página interna de ' + p.livro}
              loading="lazy"
              className="aspect-[2/3] h-auto w-full object-cover"
            />
          </div>
        ))}
      </motion.div>
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

                {/* trecho real do miolo */}
                <blockquote
                  className="mt-5 rounded-2xl border-l-[5px] bg-white/10 p-4 text-left backdrop-blur-sm"
                  style={{ borderColor: l.cor }}
                >
                  {l.verso.map((v) => (
                    <p key={v} className="font-display text-[15px] font-bold leading-snug text-white">{v}</p>
                  ))}
                  <cite className="mt-2 block text-xs not-italic text-[#9FD3EE]">{l.versoNota}</cite>
                </blockquote>

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
