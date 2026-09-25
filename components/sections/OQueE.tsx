'use client'

import { Reveal, Parallax, CharImg, WordsIn } from '@/components/motion'
import { Confete } from '@/components/Scenery'

const PILARES = [
  { t: 'Pedagógico', c: '#0271B8' },
  { t: 'Cultural e artístico', c: '#E71626' },
  { t: 'Interativo', c: '#EEB80E' },
  { t: 'Inclusivo', c: '#65AA2D' },
]

export default function OQueE() {
  return (
    <section id="o-que-e" className="paper relative overflow-hidden py-20 md:py-24">
      <Confete count={10} className="opacity-25" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-14">
        {/* Dona Nina aponta para o texto */}
        <Parallax speed={0.22} className="mx-auto w-[52vw] max-w-[270px] md:w-full md:max-w-[330px]">
          <Reveal dir="right">
            <div className="relative">
              <CharImg slug="dona-nina" alt="Dona Nina, a professora da turma" float="slow" />
              <div className="absolute -right-2 top-4 rotate-3 rounded-2xl border-[3px] border-[#2C2951] bg-white px-3 py-2 shadow-[0_4px_0_0_#2C2951] md:-right-8">
                <p className="font-display text-sm font-extrabold leading-tight text-[#2C2951]">
                  Presta atenção<br />nessa mistura!
                </p>
              </div>
            </div>
          </Reveal>
        </Parallax>

        <div>
          <Reveal dir="left">
            <span className="inline-block rounded-full bg-[#894188] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-white">
              O que é
            </span>
          </Reveal>

          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.06] text-[#2C2951] sm:text-4xl md:text-5xl">
            <WordsIn text="Não se trata “apenas” de três livros infantis." />
          </h2>

          <Reveal dir="up" delay={0.15}>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-[#55507F]">
              A Misturinha Maluquinha é um <strong className="text-[#2C2951]">produto literário
              paradidático, multimídia e multissensorial</strong> e será uma ferramenta valiosíssima
              para o processo de educação formal, desenvolvimento e lazer de seus filhos (as).
            </p>
          </Reveal>

          <Reveal dir="up" delay={0.22}>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-[#55507F]">
              É um produto como poucos no mercado paradidático, porque agrega quatro camadas numa
              coleção só — com acesso a mídias audiovisuais por QR Codes no interior do livro e
              interpretação em LIBRAS, para que crianças surdas também consumam a obra.
            </p>
          </Reveal>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {PILARES.map((p, i) => (
              <Reveal key={p.t} dir="up" delay={0.3 + i * 0.07}>
                <span
                  className="inline-block rounded-full border-[3px] border-[#2C2951] bg-white px-4 py-2 font-display text-sm font-extrabold shadow-[0_4px_0_0_#2C2951]"
                  style={{ color: p.c }}
                >
                  {p.t}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal dir="up" delay={0.55}>
            <p className="mt-7 border-l-[5px] border-[#EEB80E] pl-5 text-pretty text-lg italic leading-relaxed text-[#55507F]">
              Não apresentamos só uma forma diferente de ensinar o que já se vê em sala de aula.
              Inserimos a poesia, a música e outras formas de arte no dia a dia das crianças —
              especialmente as de 4 a 8 anos, nosso público prioritário.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
