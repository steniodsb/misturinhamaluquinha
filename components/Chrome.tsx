'use client'

/* Nav fixa (aparece depois do hero) + botão flutuante de WhatsApp. */

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { CTA, CONTATO } from '@/lib/content'
import { IconWhats } from '@/components/Icons'

const LINKS = [
  { h: '#video',        t: 'Vídeo' },
  { h: '#livros',       t: 'Coleção' },
  { h: '#diferenciais', t: 'Diferenciais' },
  { h: '#inclusao',     t: 'Inclusão' },
  { h: '#preco',        t: 'Preço' },
  { h: '#escolas',      t: 'Escolas' },
  { h: '#faq',          t: 'FAQ' },
]

export function Nav() {
  const [visivel, setVisivel] = useState(false)
  const [menu, setMenu] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { if (!menu) return; const f = () => setMenu(false); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f) }, [menu])

  return (
    <AnimatePresence>
      {visivel && (
        <motion.header
          className="fixed inset-x-0 top-0 z-[70] px-3 pt-3"
          initial={reduce ? false : { y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        >
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border-[3px] border-[#2C2951] bg-[#FFF8E9]/95 py-2 pl-4 pr-2 shadow-[0_5px_0_0_#2C2951] backdrop-blur-md">
            <a href="#" aria-label="Voltar ao topo" className="shrink-0">
              <img src="/assets/chars/logo@sm.webp" alt="" className="aspect-[1563/681] h-9 w-auto md:h-10" />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {LINKS.map((l) => (
                <li key={l.h}>
                  <a href={l.h} className="rounded-full px-3 py-1.5 font-display text-sm font-extrabold text-[#2C2951] transition hover:bg-[#EEB80E]/40">
                    {l.t}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={CTA.familia}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d hidden items-center gap-2 rounded-full bg-[#E71626] px-4 py-2 font-display text-sm font-extrabold text-white sm:flex"
              >
                <IconWhats className="h-4 w-4" />
                Quero a coleção
              </a>
              <button
                onClick={() => setMenu((v) => !v)}
                aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={menu}
                className="grid h-10 w-10 place-items-center rounded-full border-[2.5px] border-[#2C2951] bg-white lg:hidden"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2C2951" strokeWidth="3" strokeLinecap="round" aria-hidden>
                  {menu ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                </svg>
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {menu && (
              <motion.ul
                className="mx-auto mt-2 max-w-6xl rounded-[1.5rem] border-[3px] border-[#2C2951] bg-[#FFF8E9] p-3 shadow-[0_5px_0_0_#2C2951] lg:hidden"
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              >
                {LINKS.map((l) => (
                  <li key={l.h}>
                    <a href={l.h} onClick={() => setMenu(false)} className="block rounded-xl px-4 py-2.5 font-display text-base font-extrabold text-[#2C2951] hover:bg-[#EEB80E]/40">
                      {l.t}
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  )
}

export function WhatsFab() {
  const [visivel, setVisivel] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visivel && (
        <motion.a
          href={CTA.familia}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={'Falar no WhatsApp: ' + CONTATO.whatsappLabel}
          className="fixed bottom-5 right-5 z-[80] grid h-14 w-14 place-items-center rounded-full border-[3px] border-[#2C2951] bg-[#65AA2D] text-white shadow-[0_5px_0_0_#2C2951] md:h-16 md:w-16"
          initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}
          whileHover={{ scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        >
          <span className="absolute inset-0 rounded-full bg-[#65AA2D] animate-[pulseRing_2.6s_ease-out_infinite]" aria-hidden />
          <IconWhats className="relative h-7 w-7 md:h-8 md:w-8" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
