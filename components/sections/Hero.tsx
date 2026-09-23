'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { CloudBand, Hills } from '@/components/Scenery'
import { CTA, RATIOS } from '@/lib/content'

/* Elenco do hero. `h` = altura relativa (adulto ~1, criança ~0.75, bicho ~0.45)
   e `z`/`dx` montam a profundidade do grupo. */
const CAST = [
  { slug: 'bigode',    nome: 'Bigode',    h: 0.40, z: 3, dx: '0px',   d: 0.50, float: 5.4, hide: 'hidden lg:block' },
  { slug: 'dona-filo', nome: 'Dona Filó', h: 0.88, z: 1, dx: '-6px',  d: 0.30, float: 6.8, hide: 'hidden md:block' },
  { slug: 'analuz',    nome: 'Analuz',    h: 0.70, z: 4, dx: '-14px', d: 0.10, float: 4.6, hide: '' },
  { slug: 'dona-nina', nome: 'Dona Nina', h: 0.93, z: 2, dx: '-18px', d: 0.22, float: 7.2, hide: 'hidden sm:block' },
  { slug: 'jorge',     nome: 'Jorge',     h: 0.76, z: 5, dx: '-8px',  d: 0.04, float: 5.0, hide: '' },
  { slug: 'seu-fuba',  nome: 'Seu Fubá',  h: 1.00, z: 2, dx: '-16px', d: 0.26, float: 7.8, hide: 'hidden sm:block' },
  { slug: 'mel',       nome: 'Mel',       h: 0.73, z: 5, dx: '-12px', d: 0.08, float: 4.9, hide: '' },
  { slug: 'matteo',    nome: 'Matteo',    h: 0.75, z: 4, dx: '-4px',  d: 0.16, float: 5.6, hide: 'hidden md:block' },
  { slug: 'pitoco',    nome: 'Pitoco',    h: 0.44, z: 6, dx: '-10px', d: 0.40, float: 4.2, hide: 'hidden lg:block' },
]

const BADGES = [
  { t: '3 livros + 6 eixos', c: '#0271B8' },
  { t: 'Acessível em LIBRAS', c: '#894188' },
  { t: '4 a 8 anos', c: '#65AA2D' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // conteúdo sobe e some um pouco mais rápido que o cenário
  const yTexto = useTransform(scrollYProgress, [0, 1], ['0%', '-42%'])
  const opTexto = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const yCast = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const off = !reduce

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
      style={{ background: 'linear-gradient(175deg,#7FD6FA 0%,#A7E4FC 42%,#DDF3FD 78%,#F2FBFF 100%)' }}
    >
      <CloudBand />

      {/* sol girando devagar */}
      <motion.div
        className="pointer-events-none absolute right-[4%] top-[5%] w-[22vw] max-w-[190px] min-w-[96px] md:right-[7%]"
        initial={off ? { scale: 0, rotate: -90, opacity: 0 } : false}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        aria-hidden
      >
        <img
          src="/assets/chars/sol.webp"
          alt=""
          className={'w-full h-auto ' +
            (off ? 'animate-[spin_46s_linear_infinite]' : '')}
        />
      </motion.div>

      {/* ── conteúdo ── */}
      <motion.div
        style={{ y: off ? yTexto : undefined, opacity: off ? opTexto : undefined }}
        /* pb reserva a faixa onde o elenco fica, para nada colidir com o texto */
        className="relative z-20 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-5 pb-[28vh] pt-[max(3.5rem,7vh)] text-center md:pb-[40vh] md:pt-[max(4.5rem,9vh)]"
      >
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2"
          initial={off ? { opacity: 0, y: -14 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {BADGES.map((b) => (
            <span
              key={b.t}
              className="rounded-full border-[2.5px] border-[#2C2951] bg-white/95 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide shadow-[0_3px_0_0_#2C2951] sm:text-xs"
              style={{ color: b.c }}
            >
              {b.t}
            </span>
          ))}
        </motion.div>

        {/* logo original da marca */}
        <motion.img
          src="/assets/chars/logo.webp"
          srcSet="/assets/chars/logo@sm.webp 620w, /assets/chars/logo.webp 1200w"
          sizes="(max-width: 768px) 88vw, 760px"
          alt="Misturinha Maluquinha"
          className="mt-5 aspect-[1563/681] w-[86vw] max-w-[min(700px,52vh)]"
          initial={off ? { opacity: 0, scale: 0.72, y: 40, rotate: -3 } : false}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.25 }}
        />

        <h1 className="sr-only">
          Misturinha Maluquinha — coleção literária infantil paradidática, multimídia e multissensorial
        </h1>

        <motion.p
          className="mt-5 max-w-2xl text-balance font-display text-xl leading-tight font-bold text-[#2C2951] sm:text-2xl md:text-[1.75rem]"
          initial={off ? { opacity: 0, y: 18 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Um livro que é lido, escutado, cantado{' '}
          <span className="relative whitespace-nowrap">
            e recitado
            <svg viewBox="0 0 200 12" className="absolute -bottom-1 left-0 w-full" aria-hidden>
              <path d="M2,8 C50,2 150,12 198,5" stroke="#EEB80E" strokeWidth="6"
                fill="none" strokeLinecap="round" />
            </svg>
          </span>
          .
        </motion.p>

        <motion.p
          className="mt-3 max-w-xl text-pretty text-base text-[#55507F] sm:text-lg"
          initial={off ? { opacity: 0, y: 18 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62 }}
        >
          Três livros paradidáticos com poesia, música, atividades e tradução em LIBRAS —
          para crianças de 4 a 8 anos, típicas e atípicas.
        </motion.p>

        <motion.div
          className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          initial={off ? { opacity: 0, y: 22 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.74 }}
        >
          <a
            href={CTA.familia}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d w-full rounded-full bg-[#E71626] px-7 py-3.5 font-display text-lg font-extrabold text-white sm:w-auto"
          >
            Quero a coleção
          </a>
          <a
            href="#escolas"
            className="btn-3d w-full rounded-full bg-white px-7 py-3.5 font-display text-lg font-extrabold text-[#0271B8] sm:w-auto"
          >
            Sou escola ou distribuidora
          </a>
        </motion.div>
      </motion.div>

      {/* ── colinas ── */}
      <Hills className="z-10 h-[34vh] min-h-[180px]" />

      {/* ── elenco ── */}
      <motion.div
        style={{ y: off ? yCast : undefined }}
        className="pointer-events-none absolute inset-x-0 bottom-[2vh] z-[15] flex h-[25vh] min-h-[150px] items-end justify-center gap-1 px-2 sm:gap-3 md:h-[38vh] md:gap-5 lg:gap-7"
      >
        {CAST.map((c, i) => (
          <motion.div
            key={c.slug}
            className={'relative shrink-0 ' + c.hide}
            style={{ height: c.h * 100 + '%', marginLeft: c.dx, zIndex: c.z }}
            initial={off ? { y: 130, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15, delay: 0.55 + c.d }}
          >
            <div
              className="char-shadow relative h-full"
              style={{ animation: off ? `bob ${c.float}s ease-in-out ${i * 0.4}s infinite` : undefined }}
            >
              <img
                src={'/assets/chars/' + c.slug + '.webp'}
                srcSet={`/assets/chars/${c.slug}@sm.webp 620w, /assets/chars/${c.slug}.webp 1200w`}
                sizes="(max-width: 768px) 26vw, 17vw"
                alt={c.nome + ', personagem da Misturinha Maluquinha'}
                className="h-full w-auto select-none"
                style={{ aspectRatio: RATIOS[c.slug] }}
                draggable={false}
                loading="eager"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* faixa de chão que fecha a composição */}
      <div className="absolute inset-x-0 bottom-0 z-[16] h-[3vh] min-h-[16px] bg-[#4A8320]" aria-hidden />

      {/* seta de scroll — canto inferior direito, fora do elenco */}
      <motion.a
        href="#video"
        aria-label="Ver a apresentação"
        className="absolute bottom-[5vh] right-5 z-30 hidden rounded-full border-[2.5px] border-[#2C2951] bg-white/95 p-2 shadow-[0_3px_0_0_#2C2951] md:block lg:right-10"
        initial={off ? { opacity: 0 } : false}
        animate={{ opacity: 1, y: off ? [0, 7, 0] : 0 }}
        transition={{ opacity: { delay: 1.5 }, y: { duration: 1.9, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2C2951"
          strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.a>
    </section>
  )
}
