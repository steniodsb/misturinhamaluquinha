'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Reveal, Parallax, CharImg } from '@/components/motion'

/* Poema real do livro "Vogais e Sentimentos" — a letra A. */
const ESTROFES = [
  ['Pra começar pelo início', 'Vem a primeira do alfabeto', 'Conhecida como letra “A”.'],
  ['Você sabia que a Alegria', 'Enche a gente de euforia', 'Fazendo-nos sorrir e cantar?!'],
]

const CAMINHOS = [
  { t: 'Lido',     d: 'no livro impresso',                 c: '#0271B8' },
  { t: 'Escutado', d: 'leitura guiada pelo QR Code',       c: '#65AA2D' },
  { t: 'Cantado',  d: 'na voz de uma criança de 8 anos',   c: '#E71626' },
  { t: 'Recitado', d: 'com ritmo e métrica de cordel',     c: '#894188' },
]

export default function Sextilha() {
  const reduce = useReducedMotion()
  let n = 0

  return (
    <section
      id="poesia"
      className="relative overflow-hidden py-20 md:py-24"
      style={{
        /* folha de caderno */
        backgroundColor: '#FFFDF6',
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent 0 31px, rgba(2,113,184,.13) 31px 32px)',
      }}
    >
      {/* margem vermelha de caderno */}
      <div className="pointer-events-none absolute inset-y-0 left-[9%] hidden w-[3px] bg-[#E71626]/35 md:block" aria-hidden />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.2fr_minmax(0,1fr)] md:gap-16">
        <div>
          <Reveal>
            <span className="inline-block rounded-full bg-[#65AA2D] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-white">
              A poesia por dentro
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.06] text-[#2C2951] sm:text-4xl md:text-5xl">
              Seis versos, dois assuntos, uma sextilha.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-[#55507F]">
              Cada página traz uma sextilha: dois tercetos que se completam. O primeiro apresenta
              o conteúdo de um eixo; o segundo, o do outro. Métrica e rima fazem a leitura em voz
              alta virar quase música — e é por isso que o mesmo texto vira canção no QR Code.
            </p>
          </Reveal>

          {/* o poema, linha a linha */}
          <div className="mt-8 rounded-[1.75rem] border-[3px] border-[#2C2951] bg-white p-6 shadow-[0_6px_0_0_#2C2951] md:p-8">
            {ESTROFES.map((estrofe, ei) => (
              <div key={ei} className={ei ? 'mt-5 border-t-2 border-dashed border-[#F6E3C0] pt-5' : ''}>
                {estrofe.map((linha) => {
                  const i = n++
                  return (
                    <motion.p
                      key={linha}
                      className="font-display text-xl font-bold leading-relaxed text-[#2C2951] md:text-2xl"
                      initial={reduce ? false : { opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.5, delay: i * 0.16, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="mr-3 inline-block w-5 text-right font-sans text-xs font-bold text-[#0271B8]/60">
                        {i + 1}
                      </span>
                      {linha}
                    </motion.p>
                  )
                })}
              </div>
            ))}
            <p className="mt-5 text-sm text-[#55507F]">
              Do livro <strong>Vogais e Sentimentos</strong> — eixo Vogais (letra A) + eixo Sentimentos (Alegria).
            </p>
          </div>
        </div>

        {/* Seu Fubá recita; os quatro caminhos do texto */}
        <div className="relative">
          <Parallax speed={0.18} className="mx-auto w-[50vw] max-w-[250px] md:max-w-[300px]">
            <Reveal dir="left">
              <CharImg slug="seu-fuba" alt="Seu Fubá, o contador de histórias da turma" float="slow" />
            </Reveal>
          </Parallax>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {CAMINHOS.map((c, i) => (
              <Reveal key={c.t} delay={0.1 + i * 0.08} scale={0.9}>
                <div className="rounded-2xl border-[3px] border-[#2C2951] bg-white p-4 shadow-[0_5px_0_0_#2C2951]">
                  <p className="font-display text-lg font-extrabold" style={{ color: c.c }}>{c.t}</p>
                  <p className="mt-0.5 text-sm leading-snug text-[#55507F]">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
