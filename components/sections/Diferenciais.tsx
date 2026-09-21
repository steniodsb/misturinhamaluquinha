'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Reveal, CharImg } from '@/components/motion'
import { DIFERENCIAIS } from '@/lib/content'
import { ICONES } from '@/components/Icons'

const CORES = ['#0271B8', '#E71626', '#65AA2D', '#894188', '#FA4110', '#0271B8', '#EEB80E']

export default function Diferenciais() {
  const reduce = useReducedMotion()

  return (
    <section id="diferenciais" className="paper relative overflow-hidden py-20 md:py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-[#0271B8] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-white">
              Diferenciais
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.06] text-[#2C2951] sm:text-4xl md:text-5xl">
              O que a Misturinha faz que os outros paradidáticos não fazem
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DIFERENCIAIS.map((d, i) => {
            const Icone = ICONES[d.icone]
            const cor = CORES[i % CORES.length]
            return (
              <motion.article
                key={d.titulo}
                className="group relative rounded-[1.75rem] border-[3px] border-[#2C2951] bg-white p-6 shadow-[0_6px_0_0_#2C2951]"
                initial={reduce ? false : { opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? undefined : { y: -6, boxShadow: '0 12px 0 0 #2C2951' }}
              >
                <span
                  className="grid h-14 w-14 place-items-center rounded-2xl border-[3px] border-[#2C2951] p-3 text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                  style={{ background: cor }}
                >
                  <Icone />
                </span>
                <h3 className="mt-4 font-display text-xl font-extrabold leading-tight text-[#2C2951]">
                  {d.titulo}
                </h3>
                <p className="mt-2 text-pretty leading-relaxed text-[#55507F]">{d.texto}</p>

                {/* numeração discreta, como selo */}
                <span
                  className="absolute right-5 top-5 font-display text-3xl font-extrabold opacity-15"
                  style={{ color: cor }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.article>
            )
          })}

          {/* card final: a turma, fechando o grid de 7 + 1 */}
          <Reveal dir="up" delay={0.2} className="sm:col-span-2 lg:col-span-1">
            <div
              className="relative flex h-full min-h-[220px] flex-col justify-end overflow-hidden rounded-[1.75rem] border-[3px] border-[#2C2951] p-6 shadow-[0_6px_0_0_#2C2951]"
              style={{ background: 'linear-gradient(150deg,#52CBF9,#A7E4FC)' }}
            >
              <div className="pointer-events-none absolute -bottom-2 -right-3 flex w-[62%] items-end">
                <div className="w-1/2"><CharImg slug="bigode" alt="" float="bob" /></div>
                <div className="-ml-4 w-1/2"><CharImg slug="pitoco" alt="" float="slow" /></div>
              </div>
              <p className="relative max-w-[62%] font-display text-2xl font-extrabold leading-tight text-[#2C2951]">
                Tudo isso numa coleção só.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
