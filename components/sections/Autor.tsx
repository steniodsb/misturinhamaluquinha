'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Reveal, WordsIn } from '@/components/motion'
import { AUTOR } from '@/lib/content'

/* proporção do recorte da foto (largura/altura) — reserva o espaço antes de carregar */
const FOTO_RATIO = 755 / 1264

const MARCOS = [
  { k: '7 anos', v: 'como docente na rede estadual', c: '#0271B8' },
  { k: '5 anos', v: 'de clínica hospitalar', c: '#65AA2D' },
  { k: '2019', v: 'lança “Poeta sem Repente”', c: '#E71626' },
  { k: '2026', v: 'tira a Misturinha da gaveta', c: '#894188' },
]

export default function Autor() {
  const reduce = useReducedMotion()

  return (
    <section id="autor" className="paper relative overflow-hidden py-20 md:py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-[#EEB80E] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-[#2C2951]">
              Quem escreve
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.06] text-[#2C2951] sm:text-4xl md:text-5xl">
              Quem está por trás da Misturinha
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.3fr)] lg:gap-16">
          {/* ── foto ── */}
          <div className="relative mx-auto w-full max-w-[420px] pt-14 lg:sticky lg:top-28">
            <motion.div
              className="relative z-10 rounded-[2.5rem] border-[3px] border-[#2C2951] shadow-[0_8px_0_0_#2C2951]"
              style={{
                aspectRatio: '4 / 5',
                background:
                  'radial-gradient(120% 80% at 50% 110%, #F6B300 0%, #EEB80E 45%, #FFD25A 100%)',
              }}
              initial={reduce ? false : { opacity: 0, y: 40, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 110, damping: 16 }}
            >
              {/* confete de massinha atrás */}
              {[
                ['12%', '18%', '#E71626'], ['80%', '12%', '#0271B8'], ['88%', '46%', '#65AA2D'],
                ['8%', '58%', '#894188'], ['70%', '30%', '#FA4110'],
              ].map(([l, t, c], i) => (
                <span
                  key={i}
                  aria-hidden
                  className="absolute h-3.5 w-3.5 rounded-full opacity-70"
                  style={{ left: l, top: t, background: c, animation: reduce ? undefined : `float ${5 + i}s ease-in-out ${-i}s infinite` }}
                />
              ))}

              {/* a foto pode vazar por CIMA (cabeça inteira); só a base reta da
                  cintura é recortada, acompanhando os cantos da moldura */}
              <div
                className="absolute inset-0"
                style={{ clipPath: 'inset(-40% 0 0 0 round 0 0 2.3rem 2.3rem)' }}
              >
                <img
                  src="/assets/autor/luan.webp"
                  srcSet="/assets/autor/luan@sm.webp 600w, /assets/autor/luan.webp 1100w"
                  sizes="(max-width: 768px) 86vw, 420px"
                  alt={AUTOR.nome + ', autor da Misturinha Maluquinha'}
                  loading="lazy"
                  style={{ aspectRatio: FOTO_RATIO }}
                  className="absolute bottom-0 left-1/2 h-[112%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
                />
              </div>
            </motion.div>

            {/* etiqueta com o nome, mordendo a moldura */}
            <Reveal delay={0.2} className="relative z-20 -mt-7 flex justify-center">
              <div className="rounded-2xl border-[3px] border-[#2C2951] bg-white px-5 py-3 text-center shadow-[0_5px_0_0_#2C2951]">
                <p className="font-display text-2xl font-extrabold leading-none text-[#2C2951]">{AUTOR.nome}</p>
                <p className="mt-1 text-sm font-semibold text-[#55507F]">
                  Nordestino, {AUTOR.idade} anos, autor, poeta e compositor. Ex-nutricionista e professor.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── texto ── */}
          <div>
            <Reveal>
              <blockquote className="border-l-[5px] border-[#EEB80E] pl-5 font-display text-2xl font-bold leading-snug text-[#2C2951] md:text-[1.7rem]">
                <WordsIn text={'“É ' + AUTOR.frase.replace(/[“”]/g, '') + '.”'} stagger={0.03} />
              </blockquote>
              <p className="mt-2 pl-5 text-sm font-semibold text-[#55507F]">— como o próprio Luan se apresenta</p>
            </Reveal>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {MARCOS.map((m, i) => (
                <Reveal key={m.k} delay={0.1 + i * 0.07} scale={0.92}>
                  <div className="h-full rounded-2xl border-[3px] border-[#2C2951] bg-white p-3.5 shadow-[0_4px_0_0_#2C2951]">
                    <p className="font-display text-2xl font-extrabold leading-none" style={{ color: m.c }}>{m.k}</p>
                    <p className="mt-1 text-xs leading-snug text-[#55507F]">{m.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {AUTOR.paragrafos.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.06}>
                <p className={'text-pretty text-lg leading-relaxed text-[#55507F] ' + (i ? 'mt-4' : 'mt-8')}>{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.4}>
              <div className="mt-8 rounded-[1.5rem] border-[3px] border-[#2C2951] bg-[#2C2951] p-6 text-white shadow-[0_6px_0_0_#EEB80E]">
                <p className="font-display text-xl font-bold leading-snug">“{AUTOR.fecho}”</p>
                <p className="mt-3 text-sm font-semibold text-[#B9B6D9]">— {AUTOR.nome}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
