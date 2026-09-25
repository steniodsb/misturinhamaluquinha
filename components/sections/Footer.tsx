'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from '@/components/motion'
import { CONTATO, CTA, TURMA, CHARS } from '@/lib/content'
import { IconWhats, IconInsta, IconMail } from '@/components/Icons'
import { Hills, CloudBand } from '@/components/Scenery'

export default function Footer() {
  const reduce = useReducedMotion()
  return (
    <footer
      id="contato"
      className="relative overflow-hidden pt-16 md:pt-20"
      style={{ background: 'linear-gradient(180deg,#F2FBFF 0%,#A7E4FC 55%,#7FD6FA 100%)' }}
    >
      <CloudBand className="opacity-80" />

      <div className="relative z-20 mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <img
            src="/assets/chars/logo@sm.webp"
            alt="Misturinha Maluquinha"
            className="mx-auto aspect-[1563/681] w-[62vw] max-w-[380px]"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 text-balance font-display text-3xl font-extrabold leading-[1.06] text-[#2C2951] sm:text-4xl md:text-5xl">
            Vamos levar essa Misturinha para a biblioteca pessoal de seu filho?!
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-[#55507F]">
            Fale direto com nossa equipe por meio dos canais de comunicação abaixo:
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
            <a
              href={CTA.familia}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d flex w-full items-center justify-center gap-2.5 rounded-full bg-[#65AA2D] px-7 py-4 font-display text-lg font-extrabold text-white sm:w-auto"
            >
              <IconWhats className="h-6 w-6" />
              {CONTATO.whatsappLabel}
            </a>
            <a
              href={CONTATO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 py-4 font-display text-lg font-extrabold text-[#894188] sm:w-auto"
            >
              <IconInsta className="h-6 w-6" />
              @{CONTATO.instagram}
            </a>
            <a
              href={'mailto:' + CONTATO.email}
              className="btn-3d flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-4 font-display text-[15px] font-extrabold text-[#0271B8] sm:w-auto sm:gap-2.5 sm:px-7 sm:text-lg"
            >
              <IconMail className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
              <span className="whitespace-nowrap">{CONTATO.email}</span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-6 text-sm text-[#55507F]">{CONTATO.cidade} · atendemos todo o Brasil</p>
        </Reveal>
      </div>

      {/* a turma inteira se despede */}
      <div className="relative mt-16 h-[26vh] min-h-[170px] md:h-[34vh]">
        <Hills className="z-0 h-full" />
        {/* altura explícita: sem ela, `h-full` dos filhos vira auto e as imagens saem no tamanho natural */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[12%] z-10 flex h-[78%] items-end justify-center gap-1 px-2 sm:gap-3 md:gap-5">
          {TURMA.map((k, i) => {
            const c = CHARS[k]
            const alt = k === 'pitoco' || k === 'bigode' ? 0.42 : k === 'donaNina' || k === 'seuFuba' || k === 'donaFilo' ? 0.9 : 0.72
            return (
              <motion.div
                key={k}
                className={'char-shadow relative shrink-0 ' + (i === 0 || i === TURMA.length - 1 ? 'hidden md:block' : '')}
                style={{ height: alt * 100 + '%', maxHeight: 260 }}
                initial={reduce ? false : { y: 90, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 120, damping: 15, delay: i * 0.06 }}
              >
                <img
                  src={'/assets/chars/' + c.slug + '@sm.webp'}
                  alt={c.nome}
                  loading="lazy"
                  className="h-full w-auto"
                  style={{ aspectRatio: c.ratio, animation: reduce ? undefined : `bob ${4.4 + i * 0.4}s ease-in-out ${i * 0.3}s infinite` }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="relative z-20 bg-[#4A8320] px-5 py-5 text-center text-sm text-white/85">
        <p>
          © {new Date().getFullYear()} Misturinha Maluquinha · Luan Gonçalves · Todos os direitos reservados.
        </p>
        <p className="mt-1 text-xs text-white/65">
          Personagens, textos e ilustrações são obra registrada. ISBN 978-65-02-34020-2 · 34021-9 · 34022-6
        </p>
      </div>
    </footer>
  )
}
