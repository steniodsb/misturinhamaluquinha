'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Reveal, CharImg } from '@/components/motion'
import { CTA, RATIOS } from '@/lib/content'

const PUBLICOS = [
  {
    slug: 'dona-filo', cor: '#E71626', titulo: 'Famílias',
    texto: 'Pais e mães que já leem com os filhos e usam música e ilustração como ferramenta de desenvolvimento — mesmo antes dos 4 anos.',
    href: CTA.familia, cta: 'Levar para casa',
  },
  {
    slug: 'dona-nina', cor: '#0271B8', titulo: 'Professores e escolas',
    texto: 'Uma forma complementar de ensinar conteúdos da sala de aula, com dois eixos por livro, atividades de fixação e material audiovisual projetável.',
    href: '#escolas', cta: 'Ver condições para escolas',
  },
  {
    slug: 'jorge', cor: '#65AA2D', titulo: 'Crianças de 4 a 8 anos',
    texto: 'Público prioritário. Típicas e atípicas, neurodivergentes ou não, surdas e não surdas — a coleção foi pensada para todas elas.',
    href: '#inclusao', cta: 'Como a coleção inclui',
  },
]

export default function ParaQuem() {
  const reduce = useReducedMotion()
  return (
    <section id="para-quem" className="paper relative overflow-hidden py-20 md:py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-[#FA4110] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-white">
              Para quem é
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.06] text-[#2C2951] sm:text-4xl md:text-5xl">
              Feita para a criança. Comprada por quem cuida dela.
            </h2>
          </Reveal>
        </div>

        <div className="mt-28 grid gap-24 md:grid-cols-3 md:gap-6">
          {PUBLICOS.map((p, i) => (
            <motion.article
              key={p.titulo}
              className="relative flex flex-col rounded-[1.75rem] border-[3px] border-[#2C2951] bg-white px-6 pb-6 pt-20 shadow-[0_6px_0_0_#2C2951]"
              initial={reduce ? false : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { y: -6 }}
            >
              {/* personagem sai de cima do card — dimensionado pela ALTURA,
                  para adultos estreitos e crianças ficarem no mesmo patamar */}
              <div className="char-shadow pointer-events-none absolute -top-[88px] left-1/2 h-[150px] -translate-x-1/2 md:-top-[100px] md:h-[165px]">
                <img
                  src={'/assets/chars/' + p.slug + '@sm.webp'}
                  alt=""
                  loading="lazy"
                  className="h-full w-auto"
                  style={{ aspectRatio: RATIOS[p.slug], animation: `bob ${4.6 + i * 0.6}s ease-in-out ${i * 0.4}s infinite` }}
                />
              </div>
              <span className="absolute left-0 right-0 top-0 h-16 rounded-t-[1.5rem]" style={{ background: p.cor + '22' }} aria-hidden />

              <h3 className="font-display text-2xl font-extrabold text-[#2C2951]">{p.titulo}</h3>
              <p className="mt-2 flex-1 text-pretty leading-relaxed text-[#55507F]">{p.texto}</p>
              <a
                href={p.href}
                target={p.href.startsWith('http') ? '_blank' : undefined}
                rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="mt-5 inline-flex items-center gap-2 font-display text-base font-extrabold"
                style={{ color: p.cor }}
              >
                {p.cta}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </motion.article>
          ))}
        </div>

        {/* régua de idade */}
        <Reveal delay={0.2} className="mx-auto mt-16 max-w-3xl">
          <div className="rounded-[1.75rem] border-[3px] border-[#2C2951] bg-white p-6 shadow-[0_6px_0_0_#2C2951]">
            <p className="text-center font-display text-lg font-extrabold text-[#2C2951]">Faixa etária</p>
            <div className="relative mt-5 h-4 rounded-full bg-[#F6E3C0]">
              <motion.div
                className="absolute inset-y-0 rounded-full"
                style={{ left: '30%', background: 'linear-gradient(90deg,#65AA2D,#0271B8)' }}
                initial={reduce ? { width: '46%' } : { width: 0 }}
                whileInView={{ width: '46%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="mt-2 flex justify-between font-display text-sm font-bold text-[#55507F]">
              {[0, 2, 4, 6, 8, 10].map((a) => (
                <span key={a} className={a === 4 || a === 8 ? 'text-[#0271B8]' : ''}>{a} anos</span>
              ))}
            </div>
            <p className="mt-3 text-center text-sm text-[#55507F]">
              Prioritário de <strong>4 a 8 anos</strong>. Antes disso, funciona muito bem em leitura mediada pelos pais.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
