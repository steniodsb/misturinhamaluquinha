'use client'

import { Reveal, CharImg, WordsIn } from '@/components/motion'
import { AUTOR } from '@/lib/content'

const MARCOS = [
  { k: '7 anos', v: 'como docente na rede estadual' },
  { k: '5 anos', v: 'de clínica hospitalar' },
  { k: '2019', v: 'lança “Poeta sem Repente”' },
  { k: '2026', v: 'tira a Misturinha da gaveta' },
]

export default function Autor() {
  return (
    <section id="autor" className="paper relative overflow-hidden py-20 md:py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          {/* cartão do autor */}
          <Reveal dir="right">
            <div className="relative mt-16">
              {/* Matteo espia por trás do cartão */}
              <div className="pointer-events-none absolute -top-[84px] right-6 z-0 w-[90px] md:-top-[96px] md:w-[105px]">
                <CharImg slug="matteo" alt="" float="bob" />
              </div>
            <div className="relative z-10 rounded-[2rem] border-[3px] border-[#2C2951] bg-[#2C2951] p-8 text-white shadow-[0_8px_0_0_#EEB80E]">
              <span className="inline-block rounded-full bg-[#EEB80E] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-[#2C2951]">
                Quem escreve
              </span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-none md:text-5xl">{AUTOR.nome}</h2>
              <p className="mt-1 text-[#B9B6D9]">{AUTOR.idade} anos · Jequié, Bahia</p>

              <blockquote className="mt-6 border-l-4 border-[#EEB80E] pl-4 font-display text-xl font-bold leading-snug text-white/95">
                <WordsIn text={'É ' + AUTOR.frase + '.'} stagger={0.03} />
              </blockquote>

              <dl className="mt-8 grid grid-cols-2 gap-4">
                {MARCOS.map((m) => (
                  <div key={m.k}>
                    <dt className="font-display text-2xl font-extrabold text-[#52CBF9]">{m.k}</dt>
                    <dd className="text-sm leading-snug text-[#B9B6D9]">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            </div>
          </Reveal>

          <div>
            {AUTOR.paragrafos.map((p, i) => (
              <Reveal key={i} delay={0.08 + i * 0.08}>
                <p className={'text-pretty text-lg leading-relaxed text-[#55507F] ' + (i ? 'mt-5' : '')}>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.45}>
              <p className="mt-8 rounded-[1.5rem] border-[3px] border-[#2C2951] bg-white p-6 font-display text-xl font-bold leading-snug text-[#2C2951] shadow-[0_6px_0_0_#2C2951]">
                “{AUTOR.fecho}”
                <span className="mt-3 block font-sans text-sm font-semibold text-[#55507F]">— {AUTOR.nome}</span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
