'use client'

/* ═══════════════════════════════════════════════════════════════
   Motor de movimento da página.
   Tudo aqui respeita `prefers-reduced-motion`: quando o usuário pede
   menos animação, os componentes renderizam no estado final, parados.
   ═══════════════════════════════════════════════════════════════ */

import {
  motion, useScroll, useTransform, useSpring, useReducedMotion,
  useMotionValue, useInView, type MotionValue,
} from 'motion/react'
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'
import { RATIOS } from '@/lib/content'

/* ── scroll suave (Lenis) ─────────────────────────────────────── */
export function SmoothScroll() {
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    let raf = 0
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null
    let dead = false

    import('lenis').then(({ default: Lenis }) => {
      if (dead) return
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.6 })
      const loop = (t: number) => { lenis?.raf(t); raf = requestAnimationFrame(loop) }
      raf = requestAnimationFrame(loop)
      // exposto para ferramentas de teste poderem desligar o scroll suave
      ;(window as unknown as { __lenis?: unknown }).__lenis = lenis
    })

    return () => {
      dead = true; cancelAnimationFrame(raf); lenis?.destroy()
      delete (window as unknown as { __lenis?: unknown }).__lenis
    }
  }, [reduce])
  return null
}

/* ── revelar ao entrar na viewport ───────────────────────────── */
type Dir = 'up' | 'down' | 'left' | 'right' | 'none'
const OFFSET: Record<Dir, { x: number; y: number }> = {
  up: { x: 0, y: 44 }, down: { x: 0, y: -44 },
  left: { x: 52, y: 0 }, right: { x: -52, y: 0 }, none: { x: 0, y: 0 },
}

export function Reveal({
  children, dir = 'up', delay = 0, duration = 0.7, scale = 1, className, once = true,
}: {
  children: ReactNode; dir?: Dir; delay?: number; duration?: number
  scale?: number; className?: string; once?: boolean
}) {
  const reduce = useReducedMotion()
  const o = OFFSET[dir]
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: o.x, y: o.y, scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, amount: 0.25, margin: '0px 0px -8% 0px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* Revela filhos em cascata. */
export function Stagger({
  children, className, gap = 0.09, dir = 'up',
}: { children: ReactNode[]; className?: string; gap?: number; dir?: Dir }) {
  return (
    <div className={className}>
      {children.map((c, i) => (
        <Reveal key={i} dir={dir} delay={i * gap}>{c}</Reveal>
      ))}
    </div>
  )
}

/* ── parallax ligado ao scroll ───────────────────────────────── */
export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref, offset: ['start end', 'end start'],
  })
  const raw = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100])
  const y = useSpring(raw, { stiffness: 110, damping: 26, mass: 0.4 })
  return { ref, y: (reduce ? undefined : y) as MotionValue<number> | undefined }
}

export function Parallax({
  children, speed = 0.3, className, style,
}: { children: ReactNode; speed?: number; className?: string; style?: CSSProperties }) {
  const { ref, y } = useParallax(speed)
  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}

/* Parallax medido contra a janela inteira — para camadas de cenário
   que precisam se mover mesmo quando o elemento já está na tela. */
export function useWindowParallax(speed = 40) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const raw = useTransform(scrollY, (v) => (reduce ? 0 : v * speed * 0.001 * 10))
  return useSpring(raw, { stiffness: 90, damping: 24, mass: 0.5 })
}

/* ── inclinação 3D com o mouse ───────────────────────────────── */
export function Tilt({
  children, className, max = 11, scale = 1.03, glare = false,
}: { children: ReactNode; className?: string; max?: number; scale?: number; glare?: boolean }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 210, damping: 18 })
  const sy = useSpring(my, { stiffness: 210, damping: 18 })
  const rotX = useTransform(sy, [-0.5, 0.5], [max, -max])
  const rotY = useTransform(sx, [-0.5, 0.5], [-max, max])
  const glareBg = useTransform(
    [sx, sy] as [MotionValue<number>, MotionValue<number>],
    ([x, y]: number[]) =>
      'radial-gradient(circle at ' + (x * 60 + 50) + '% ' + (y * 60 + 50) + '%,' +
      ' rgba(255,255,255,.42), transparent 58%)',
  )

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ perspective: 1100 }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => { mx.set(0); my.set(0) }}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative"
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

/* ── número que conta ao aparecer ────────────────────────────── */
export function Counter({
  to, duration = 1.5, className, prefix = '', suffix = '',
}: { to: number; duration?: number; className?: string; prefix?: string; suffix?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.6 })
  const [n, setN] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!seen || reduce) return
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - t0) / (duration * 1000), 1)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3)))) // easeOutCubic
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to, duration, reduce])

  return <span ref={ref} className={className}>{prefix}{n}{suffix}</span>
}

/* ── personagem recortado, com sombra de contato e flutuação ─── */
export function CharImg({
  slug, alt, className, style, priority = false, float = 'none', width,
}: {
  slug: string; alt: string; className?: string; style?: CSSProperties
  priority?: boolean; float?: 'none' | 'bob' | 'float' | 'slow' | 'wiggle'; width?: number
}) {
  const anim = {
    none: '', bob: 'animate-[bob_4.5s_ease-in-out_infinite]',
    float: 'animate-[float_6s_ease-in-out_infinite]',
    slow: 'animate-[float_9s_ease-in-out_infinite]',
    wiggle: 'animate-[wiggle_3.2s_ease-in-out_infinite]',
  }[float]

  return (
    <div className={'relative char-shadow ' + (className ?? '')} style={style}>
      <img
        src={'/assets/chars/' + slug + '.webp'}
        srcSet={'/assets/chars/' + slug + '@sm.webp 620w, /assets/chars/' + slug + '.webp 1200w'}
        sizes={width ? width + 'px' : '(max-width: 768px) 45vw, 30vw'}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        draggable={false}
        style={{ aspectRatio: RATIOS[slug] }}
        className={'w-full h-auto select-none drop-shadow-[0_10px_18px_rgba(44,41,81,0.18)] ' + anim}
      />
    </div>
  )
}

/* ── texto que aparece palavra a palavra ─────────────────────── */
export function WordsIn({
  text, className, delay = 0, stagger = 0.045,
}: { text: string; className?: string; delay?: number; stagger?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <span className={className}>{text}</span>
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: '0.5em', rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </span>
  )
}

export { motion, useScroll, useTransform, useSpring, useReducedMotion, useInView }
