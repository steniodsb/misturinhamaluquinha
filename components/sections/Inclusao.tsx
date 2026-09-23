'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Reveal, CharImg } from '@/components/motion'
import { MOUNTS } from '@/lib/content'

const MODOS = ['Texto', 'Imagem', 'Áudio', 'Canto', 'LIBRAS', 'Legenda', 'Atividade']

const ESTIMULOS = [
  { t: 'Intelectual e cognitivo', d: 'conteúdo em dois eixos, apresentado por caminhos diferentes' },
  { t: 'Fonoaudiológico',          d: 'recitar, cantar e acompanhar a leitura guiada em voz alta' },
  { t: 'Tátil e motor',             d: 'oficinas de biscuit e pintura sorteadas por meta de venda' },
  { t: 'Visual e linguístico',      d: 'ilustração, legenda colorida e interpretação em LIBRAS' },
]

export default function Inclusao() {
  const reduce = useReducedMotion()
  const m = MOUNTS.seuFuba
  const s = m.screen

  return (
    <section
      id="inclusao"
      className="relative overflow-hidden py-20 md:py-24"
      style={{ background: 'linear-gradient(180deg,#894188 0%,#6B2F6A 100%)' }}
    >

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[auto_1fr] lg:gap-16">
        {/* Seu Fubá com o tablet mostrando a intérprete */}
        <motion.div
          className="mx-auto w-[70vw] max-w-[380px] lg:w-[34vw]"
          initial={reduce ? false : { opacity: 0, y: 60, rotate: 4 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 90, damping: 16 }}
        >
          <div className="relative" style={{ aspectRatio: m.ratio }}>
            <img
              src={'/assets/mounts/' + m.slug + '.webp'}
              srcSet={`/assets/mounts/${m.slug}@sm.webp 560w, /assets/mounts/${m.slug}.webp 1100w`}
              sizes="(max-width: 768px) 70vw, 380px"
              alt="Seu Fubá segurando um tablet com o vídeo em LIBRAS"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain"
            />
            <div
              className="absolute overflow-hidden rounded-[5px] shadow-[inset_0_0_12px_rgba(0,0,0,.45)]"
              style={{ left: s.left + '%', top: s.top + '%', width: s.width + '%', height: s.height + '%' }}
            >
              <video
                src="/assets/video/libras-loop.mp4"
                poster="/assets/video/poster-libras.jpg"
                autoPlay muted loop playsInline
                className="h-full w-full object-cover"
                aria-hidden
              />
            </div>
            <div className="absolute -left-3 top-[24%] -rotate-6 rounded-2xl border-[3px] border-[#2C2951] bg-[#EEB80E] px-3 py-1.5 shadow-[0_4px_0_0_#2C2951] md:-left-8">
              <p className="font-display text-sm font-extrabold text-[#2C2951]">Acessível em LIBRAS</p>
            </div>
          </div>
        </motion.div>

        <div>
          <Reveal dir="left">
            <span className="inline-block rounded-full bg-[#EEB80E] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-[#2C2951]">
              Inclusão de verdade
            </span>
          </Reveal>
          <Reveal dir="left" delay={0.08}>
            <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.06] text-white sm:text-4xl md:text-5xl">
              Para crianças típicas e atípicas. Surdas e não surdas.
            </h2>
          </Reveal>
          <Reveal dir="left" delay={0.16}>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-[#EBD7EA]">
              A coleção usa <strong className="text-white">comunicação multimodal</strong>: o mesmo
              conteúdo chega por texto, imagem, áudio, canto e LIBRAS. Isso estimula áreas distintas do
              sistema nervoso central e faz a obra funcionar para crianças neurodivergentes ou não.
            </p>
          </Reveal>

          <div className="mt-6 flex flex-wrap gap-2">
            {MODOS.map((x, i) => (
              <motion.span
                key={x}
                className="rounded-full border-2 border-white/40 bg-white/10 px-3.5 py-1.5 text-sm font-bold text-white backdrop-blur-sm"
                initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.25 + i * 0.05 }}
              >
                {x}
              </motion.span>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {ESTIMULOS.map((e, i) => (
              <Reveal key={e.t} delay={0.3 + i * 0.08}>
                <div className="h-full rounded-2xl border-[3px] border-[#2C2951] bg-white p-4 shadow-[0_5px_0_0_#2C2951]">
                  <p className="font-display text-base font-extrabold text-[#894188]">{e.t}</p>
                  <p className="mt-1 text-sm leading-snug text-[#55507F]">{e.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Mel espia no canto */}
      <div className="pointer-events-none absolute -bottom-2 right-[3%] hidden w-[9vw] max-w-[130px] lg:block">
        <CharImg slug="mel" alt="" float="bob" />
      </div>

    </section>
  )
}
