'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Reveal, CharImg } from '@/components/motion'

/* A "mistura": ingredientes que entram na mesma panela. */
const INGREDIENTES = [
  { t: 'Poesia',        c: '#E71626', r: -8 },
  { t: 'Música',        c: '#0271B8', r: 5 },
  { t: 'Ilustração',    c: '#EEB80E', r: -3 },
  { t: 'LIBRAS',        c: '#894188', r: 7 },
  { t: 'Atividades',    c: '#65AA2D', r: -6 },
  { t: 'Leitura guiada',c: '#FA4110', r: 4 },
  { t: 'Canto',         c: '#E0568F', r: -5 },
  { t: 'Interdisciplina', c: '#015A94', r: 6 },
  { t: 'Artesanato',    c: '#894188', r: -4 },
]

export default function PorQue() {
  const reduce = useReducedMotion()
  return (
    <section
      className="relative overflow-hidden py-20 md:py-24"
      style={{ background: 'linear-gradient(180deg,#FDEFD6 0%,#F6E3C0 100%)' }}
    >

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <Reveal>
          <span className="inline-block rounded-full bg-[#E71626] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-white">
            Por que esse nome?
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance font-display text-3xl font-extrabold leading-[1.06] text-[#2C2951] sm:text-4xl md:text-5xl">
            Uma mistura que, apesar do sobrenome{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#E71626]">maluquinha</span>
              <span className="absolute inset-x-0 bottom-1 z-0 h-3 -rotate-1 bg-[#EEB80E]/70" aria-hidden />
            </span>
            , sabe muito bem o que quer entregar.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-[#55507F]">
            É carinhosamente assim chamada porque, dentro de uma mesma coleção, são abordados temas
            diferentes, usadas múltiplas linguagens e formas de comunicação — além das inúmeras
            possibilidades de aplicação dentro e fora da sala de aula.
          </p>
        </Reveal>

        {/* os ingredientes da mistura */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {INGREDIENTES.map((ing, i) => (
            <motion.span
              key={ing.t}
              className="cursor-default rounded-2xl border-[3px] border-[#2C2951] bg-white px-4 py-2.5 font-display text-base font-extrabold shadow-[0_5px_0_0_#2C2951] md:px-5 md:py-3 md:text-lg"
              style={{ color: ing.c, rotate: ing.r + 'deg' }}
              initial={reduce ? false : { opacity: 0, scale: 0.4, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: 'spring', stiffness: 200, damping: 13, delay: i * 0.07 }}
              whileHover={reduce ? undefined : { rotate: 0, scale: 1.09, y: -4 }}
            >
              {ing.t}
            </motion.span>
          ))}
        </div>

        {/* a turma que resulta da mistura */}
        <Reveal delay={0.2} className="mt-14">
          <div className="flex items-end justify-center">
            {['matteo', 'analuz', 'pitoco', 'jorge', 'mel'].map((s, i) => (
              <div
                key={s}
                className="relative -mx-2 w-[17vw] max-w-[128px] md:-mx-3"
                style={{
                  zIndex: i === 2 ? 1 : 3,
                  animation: reduce ? undefined : `bob ${4.4 + i * 0.5}s ease-in-out ${i * 0.35}s infinite`,
                }}
              >
                <CharImg slug={s} alt="" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>

    </section>
  )
}
