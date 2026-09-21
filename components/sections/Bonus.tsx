'use client'

import { Reveal, Counter, CharImg, Parallax } from '@/components/motion'
import { BONUS } from '@/lib/content'
import { Arco, Confete } from '@/components/Scenery'

export default function Bonus() {
  return (
    <section
      id="bonus"
      className="relative overflow-hidden py-20 md:py-24"
      style={{ background: 'linear-gradient(180deg,#A7E4FC 0%,#DDF3FD 100%)' }}
    >
      <Confete count={12} className="opacity-40" />

      {/* arco-íris de fundo */}
      <Parallax speed={0.1} className="pointer-events-none absolute left-1/2 -top-10 w-[110vw] max-w-[820px] -translate-x-1/2 opacity-30 md:-top-16">
        <Arco className="w-full" />
      </Parallax>

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-[#894188] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-white">
              Bônus por meta batida
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.06] text-[#2C2951] sm:text-4xl md:text-5xl">
              Quando a coleção vende, as crianças ganham junto.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[#55507F]">
              Cada meta de venda libera um sorteio — e o prêmio vai para a criança, não para o adulto.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {BONUS.map((b, i) => (
            <Reveal key={b.meta} dir={i ? 'left' : 'right'} delay={i * 0.12}>
              <article className="relative h-full overflow-hidden rounded-[1.75rem] border-[3px] border-[#2C2951] bg-white p-7 shadow-[0_6px_0_0_#2C2951] md:p-9">
                <span className="absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-15" style={{ background: b.cor }} aria-hidden />
                <p className="font-display text-sm font-extrabold uppercase tracking-wider" style={{ color: b.cor }}>
                  a cada
                </p>
                <p className="font-display text-6xl font-extrabold leading-none text-[#2C2951] md:text-7xl">
                  <Counter to={b.meta} />
                  <span className="ml-2 text-2xl text-[#55507F]">{i ? 'obras' : 'coleções'}</span>
                </p>
                <h3 className="mt-4 font-display text-2xl font-extrabold text-[#2C2951]">{b.titulo}</h3>
                <p className="mt-2 text-pretty leading-relaxed text-[#55507F]">{b.texto}</p>
                <p className="mt-4 rounded-xl bg-[#FDEFD6] px-4 py-3 text-sm leading-snug text-[#55507F]">{b.nota}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* bichos comemorando */}
      <div className="pointer-events-none absolute bottom-4 left-[2%] hidden w-[11vw] max-w-[150px] md:block">
        <CharImg slug="pitoco" alt="" float="bob" />
      </div>
      <div className="pointer-events-none absolute bottom-4 right-[2%] hidden w-[10vw] max-w-[140px] md:block">
        <CharImg slug="bigode" alt="" float="slow" />
      </div>

    </section>
  )
}
