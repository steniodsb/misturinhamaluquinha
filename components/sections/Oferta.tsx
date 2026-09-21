'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Reveal, Counter, CharImg } from '@/components/motion'
import { INCLUI, PRECO, CTA } from '@/lib/content'
import { IconWhats } from '@/components/Icons'

const PAGAMENTOS = ['Pix', 'Cartão de crédito', 'Cartão de débito', 'Dinheiro']

export default function Oferta() {
  const reduce = useReducedMotion()
  return (
    <section id="preco" className="paper relative overflow-hidden py-20 md:py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-[#E71626] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-white">
              Investimento
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.06] text-[#2C2951] sm:text-4xl md:text-5xl">
              Quanto custa levar a Misturinha para a sua criança?
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-12">
          {/* o que vem */}
          <div>
            <Reveal>
              <h3 className="font-display text-2xl font-extrabold text-[#2C2951]">A coleção completa inclui</h3>
            </Reveal>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {INCLUI.map((it, i) => (
                <motion.li
                  key={it.t}
                  className="flex items-start gap-3 rounded-2xl border-[3px] border-[#2C2951] bg-white p-4 shadow-[0_4px_0_0_#2C2951]"
                  initial={reduce ? false : { opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0271B8] font-display text-xl font-extrabold text-white">
                    {it.n}
                  </span>
                  <div>
                    <p className="font-display text-base font-extrabold leading-tight text-[#2C2951]">{it.t}</p>
                    {'s' in it && it.s && <p className="mt-0.5 text-sm text-[#55507F]">{it.s}</p>}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* o card do preço */}
          <Reveal dir="left" scale={0.94}>
            <div className="relative mt-20 lg:mt-24">
              {/* Seu Fubá aparece atrás do card, com o polegar pra cima */}
              <div className="pointer-events-none absolute -top-[92px] right-5 z-0 w-[120px] md:-top-[112px] md:w-[145px]">
                <CharImg slug="seu-fuba" alt="" float="slow" />
              </div>

              <div
                className="relative z-10 overflow-hidden rounded-[2rem] border-[3px] border-[#2C2951] p-8 text-center text-white shadow-[0_8px_0_0_#2C2951]"
                style={{ background: 'linear-gradient(160deg,#E71626,#FA4110)' }}
              >
                <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" aria-hidden />
                <p className="font-display text-sm font-extrabold uppercase tracking-widest text-white/85">
                  Tudo isso por apenas
                </p>
                <p className="mt-2 font-display font-extrabold leading-none">
                  <span className="align-top text-2xl">R$</span>
                  <span className="text-7xl md:text-8xl"><Counter to={PRECO.valor} duration={1.4} /></span>
                  <span className="text-3xl">,00</span>
                </p>
                <p className="mt-3 text-white/90">a coleção completa — os três livros e todas as mídias</p>

                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {PAGAMENTOS.map((p) => (
                    <span key={p} className="rounded-full border-2 border-white/50 px-3 py-1 text-xs font-bold">
                      {p}
                    </span>
                  ))}
                </div>

                <a
                  href={CTA.familia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#EEB80E] px-6 py-4 font-display text-lg font-extrabold text-[#2C2951]"
                >
                  <IconWhats className="h-6 w-6" />
                  Quero a minha coleção
                </a>
                <p className="mt-3 text-xs text-white/80">Atendimento direto pelo WhatsApp, sem formulário.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
