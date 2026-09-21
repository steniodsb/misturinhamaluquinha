'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Reveal, CharImg } from '@/components/motion'
import { FAQ } from '@/lib/content'

export default function Faq() {
  const [aberto, setAberto] = useState<number | null>(0)
  const reduce = useReducedMotion()

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-20 md:py-24"
      style={{ background: 'linear-gradient(180deg,#FDEFD6 0%,#FFF8E9 100%)' }}
    >
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.4fr)]">
        <div>
          <Reveal>
            <span className="inline-block rounded-full bg-[#0271B8] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-white">
              Dúvidas frequentes
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.06] text-[#2C2951] sm:text-4xl md:text-5xl">
              O que costumam perguntar antes de comprar
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-[#55507F]">
              Não achou a sua? Manda no WhatsApp — quem responde é gente, não robô.
            </p>
          </Reveal>
          <div className="mt-8 hidden w-[200px] lg:block">
            <CharImg slug="analuz" alt="" float="bob" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {FAQ.map((f, i) => {
            const on = aberto === i
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className={'rounded-2xl border-[3px] border-[#2C2951] bg-white transition-shadow ' + (on ? 'shadow-[0_6px_0_0_#2C2951]' : 'shadow-[0_4px_0_0_#2C2951]')}>
                  <button
                    onClick={() => setAberto(on ? null : i)}
                    aria-expanded={on}
                    aria-controls={'faq-' + i}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-display text-lg font-extrabold leading-snug text-[#2C2951]">{f.q}</span>
                    <motion.span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#EEB80E] text-[#2C2951]"
                      animate={{ rotate: on ? 45 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.25 }}
                      aria-hidden
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={'faq-' + i}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 leading-relaxed text-[#55507F]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
