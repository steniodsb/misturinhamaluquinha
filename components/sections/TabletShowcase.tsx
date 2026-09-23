'use client'

/* Montagem: o personagem segura um tablet e o vídeo toca dentro da tela.
   As coordenadas da tela (MOUNTS[..].screen) foram medidas no próprio
   arquivo PNG, então o vídeo encaixa no pixel certo em qualquer tamanho. */

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'motion/react'
import { MOUNTS } from '@/lib/content'
import { Confete } from '@/components/Scenery'
import { Reveal } from '@/components/motion'

const VIDEOS = [
  { id: 'numeros', rotulo: 'Números e Cores',        src: '/assets/video/apresentacao-numeros.mp4', poster: '/assets/video/poster-numeros.jpg' },
  { id: 'vogais',  rotulo: 'Vogais e Sentimentos',   src: '/assets/video/apresentacao-vogais.mp4',  poster: '/assets/video/poster-vogais.jpg' },
]

const SELOS = [
  { t: 'Intérprete de LIBRAS', d: 'em todo o audiovisual' },
  { t: 'Legenda colorida',     d: 'acompanha a leitura' },
  { t: 'Cantado por criança',  d: 'uma intérprete de 8 anos' },
]

/* ── a montagem com a tela viva ──────────────────────────────── */
function Montagem({
  mount, alt, children, overlay, className = '',
}: {
  mount: typeof MOUNTS.donaNina; alt: string
  children: React.ReactNode; overlay?: React.ReactNode; className?: string
}) {
  const s = mount.screen
  return (
    <div className={'relative ' + className} style={{ aspectRatio: mount.ratio }}>
      {/* a imagem já traz a tela opaca; o vídeo entra por cima,
          recortado exatamente na área medida da tela. */}
      <img
        src={'/assets/mounts/' + mount.slug + '.webp'}
        srcSet={`/assets/mounts/${mount.slug}@sm.webp 560w, /assets/mounts/${mount.slug}.webp 1100w`}
        sizes="(max-width: 768px) 78vw, 460px"
        alt={alt}
        className="absolute inset-0 h-full w-full select-none object-contain"
        draggable={false}
      />
      <div
        className="absolute overflow-hidden rounded-[6px] shadow-[inset_0_0_14px_rgba(0,0,0,.45)]"
        style={{
          left: s.left + '%', top: s.top + '%',
          width: s.width + '%', height: s.height + '%',
        }}
      >
        {children}
      </div>

      {/* camada ancorada no centro da tela — usada pelo botão de play */}
      {overlay && (
        <div
          className="pointer-events-none absolute grid place-items-center"
          style={{
            left: s.left + '%', top: s.top + '%',
            width: s.width + '%', height: s.height + '%',
          }}
        >
          {overlay}
        </div>
      )}
    </div>
  )
}

/* ── lightbox do vídeo completo ──────────────────────────────── */
function Lightbox({
  aberto, onFechar, inicial,
}: { aberto: boolean; onFechar: () => void; inicial: string }) {
  const [ativo, setAtivo] = useState(inicial)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if (aberto) setAtivo(inicial) }, [aberto, inicial])

  useEffect(() => {
    if (!aberto) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onFechar() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    boxRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [aberto, onFechar])

  const v = VIDEOS.find((x) => x.id === ativo) ?? VIDEOS[0]

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#2C2951]/85 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onFechar}
          role="dialog" aria-modal="true" aria-label="Apresentação em vídeo"
        >
          <motion.div
            ref={boxRef} tabIndex={-1}
            className="w-full max-w-4xl outline-none"
            initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 12 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                {VIDEOS.map((x) => (
                  <button
                    key={x.id}
                    onClick={() => setAtivo(x.id)}
                    className={
                      'rounded-full border-[2.5px] border-white px-4 py-1.5 font-display text-sm font-extrabold transition ' +
                      (x.id === ativo ? 'bg-white text-[#2C2951]' : 'text-white hover:bg-white/15')
                    }
                  >
                    {x.rotulo}
                  </button>
                ))}
              </div>
              <button
                onClick={onFechar}
                aria-label="Fechar vídeo"
                className="rounded-full border-[2.5px] border-white p-1.5 text-white transition hover:bg-white/15"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <video
              key={v.id}
              src={v.src}
              poster={v.poster}
              controls autoPlay playsInline
              className="w-full rounded-xl border-4 border-white bg-black shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── seção ───────────────────────────────────────────────────── */
export default function TabletShowcase() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [aberto, setAberto] = useState(false)
  const [qual, setQual] = useState('numeros')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const escala = useTransform(scrollYProgress, [0, 1], [0.86, 1])
  const giro = useTransform(scrollYProgress, [0, 1], [-7, 0])
  const off = !reduce

  const abrir = useCallback((id: string) => { setQual(id); setAberto(true) }, [])

  return (
    <section
      ref={ref}
      id="video"
      className="relative overflow-hidden bg-[#0271B8] py-20 md:py-24"
      style={{ background: 'linear-gradient(180deg,#0271B8 0%,#015A94 60%,#023F6B 100%)' }}
    >
      <Confete count={14} className="opacity-45" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1fr_auto] lg:gap-8">
        {/* texto */}
        <div className="text-center lg:text-left">
          <Reveal dir="right">
            <span className="inline-block rounded-full bg-[#EEB80E] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-[#2C2951]">
              Veja funcionando
            </span>
          </Reveal>

          <Reveal dir="right" delay={0.08}>
            <h2 className="mt-4 text-balance font-display text-4xl font-extrabold text-white sm:text-5xl md:text-[3.4rem]">
              O livro sai da página{' '}
              <span className="text-[#EEB80E]">e começa a cantar</span>
            </h2>
          </Reveal>

          <Reveal dir="right" delay={0.16}>
            <p className="mx-auto mt-5 max-w-lg text-pretty text-lg leading-relaxed text-[#D6EEFB] lg:mx-0">
              Dentro de cada livro há QR Codes. A criança escaneia e o mesmo conteúdo
              volta recitado em leitura guiada e cantado por uma criança de 8 anos —
              tudo com intérprete de LIBRAS e legenda.
            </p>
          </Reveal>

          <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:max-w-lg">
            {SELOS.map((s, i) => (
              <Reveal key={s.t} dir="up" delay={0.24 + i * 0.07}>
                <div className="rounded-2xl border-2 border-white/25 bg-white/10 px-4 py-3 text-center backdrop-blur-sm lg:text-left">
                  <p className="font-display text-sm font-extrabold text-white">{s.t}</p>
                  <p className="mt-0.5 text-xs text-[#B8DFF5]">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal dir="up" delay={0.45}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              {VIDEOS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => abrir(v.id)}
                  className="btn-3d flex w-full items-center justify-center gap-2 rounded-full bg-[#EEB80E] px-6 py-3 font-display text-base font-extrabold text-[#2C2951] sm:w-auto"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {v.rotulo}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* montagem: Dona Nina segurando o tablet */}
        <motion.div
          style={{ scale: off ? escala : undefined, rotate: off ? giro : undefined }}
          className="mx-auto w-[74vw] max-w-[420px] lg:w-[38vw]"
        >
          <button
            onClick={() => abrir('numeros')}
            aria-label="Assistir a apresentação completa"
            className="group block w-full cursor-pointer"
          >
            <Montagem
              mount={MOUNTS.donaNina}
              alt="Dona Nina, a professora, segurando um tablet com a apresentação da coleção"
              overlay={
                <>
                  <span className="relative grid h-12 w-12 place-items-center rounded-full border-[3px] border-[#2C2951] bg-[#E71626] text-white shadow-[0_4px_0_0_#2C2951] transition group-hover:scale-110 md:h-14 md:w-14">
                    <span className="absolute inset-0 rounded-full bg-[#E71626] animate-[pulseRing_2.6s_ease-out_infinite]" aria-hidden />
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="relative ml-0.5" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>

                  {/* CTA explícito, colado embaixo da tela: no celular ninguém
                      adivinha que o tablet é clicável */}
                  <motion.span
                    className="absolute left-1/2 top-[118%] flex w-max -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border-[3px] border-[#2C2951] bg-[#EEB80E] px-3.5 py-1.5 font-display text-[13px] font-extrabold text-[#2C2951] shadow-[0_4px_0_0_#2C2951] transition group-hover:-translate-y-0.5 md:px-4 md:py-2 md:text-sm"
                    animate={off ? { y: [0, -4, 0] } : undefined}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                    <span className="md:hidden">Toque para assistir</span>
                    <span className="hidden md:inline">Clique para assistir</span>
                  </motion.span>
                </>
              }
            >
              <video
                src="/assets/video/tablet-loop.mp4"
                poster="/assets/video/poster-numeros.jpg"
                autoPlay muted loop playsInline
                className="h-full w-full object-cover"
                aria-hidden
              />
              {/* brilho de vidro */}
              <span
                className="pointer-events-none absolute inset-0"
                style={{ background: 'linear-gradient(118deg,rgba(255,255,255,.28) 0%,transparent 42%)' }}
                aria-hidden
              />
            </Montagem>
          </button>
        </motion.div>
      </div>

      <Lightbox aberto={aberto} onFechar={() => setAberto(false)} inicial={qual} />
    </section>
  )
}
