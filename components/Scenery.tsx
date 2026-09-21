'use client'

/* Cenário: nuvens, colinas, confete de massinha e as transições
   entre seções. Tudo decorativo — aria-hidden em tudo. */

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

/* ── nuvem de massinha ────────────────────────────────────────── */
export function Cloud({ className, style, opacity = 1 }: {
  className?: string; style?: CSSProperties; opacity?: number
}) {
  return (
    <svg viewBox="0 0 220 96" className={className} style={{ ...style, opacity }} aria-hidden>
      <g>
        <ellipse cx="62"  cy="62" rx="52" ry="31" fill="#fff" />
        <ellipse cx="110" cy="46" rx="44" ry="38" fill="#fff" />
        <ellipse cx="158" cy="62" rx="48" ry="30" fill="#fff" />
        <rect x="26" y="58" width="168" height="34" rx="17" fill="#fff" />
        {/* sombra interna baixa dá volume de massinha */}
        <rect x="34" y="76" width="152" height="15" rx="8" fill="#DCEEF8" opacity=".75" />
      </g>
    </svg>
  )
}

/* ── faixa de nuvens que atravessam a tela ───────────────────── */
export function CloudBand({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const clouds = [
    { top: '6%',  w: 170, dur: 78, delay: 0,   op: 0.95 },
    { top: '20%', w: 110, dur: 104, delay: -30, op: 0.7 },
    { top: '38%', w: 210, dur: 92, delay: -62, op: 0.85 },
    { top: '12%', w: 130, dur: 120, delay: -95, op: 0.6 },
  ]
  return (
    <div className={'pointer-events-none absolute inset-0 overflow-hidden ' + className} aria-hidden>
      {clouds.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: c.top, left: 0, width: c.w,
            animation: reduce ? undefined : `drift ${c.dur}s linear ${c.delay}s infinite`,
            transform: reduce ? `translateX(${12 + i * 24}vw)` : undefined,
          }}
        >
          <Cloud className="w-full h-auto" opacity={c.op} />
        </div>
      ))}
    </div>
  )
}

/* ── colinas em camadas, com parallax ────────────────────────── */
export function Hills({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yFar = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const yMid = useTransform(scrollYProgress, [0, 1], ['0%', '-26%'])
  const yNear = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const off = reduce ? undefined : true

  return (
    <div ref={ref} className={'pointer-events-none absolute inset-x-0 bottom-0 ' + className} aria-hidden>
      <motion.svg viewBox="0 0 1440 260" preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 w-full h-[62%]"
        style={{ y: off ? yFar : undefined }}>
        <path d="M0,150 C210,88 370,176 610,132 C840,90 1010,168 1440,112 L1440,260 L0,260 Z" fill="#9BD870" />
      </motion.svg>
      <motion.svg viewBox="0 0 1440 220" preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 w-full h-[46%]"
        style={{ y: off ? yMid : undefined }}>
        <path d="M0,130 C260,66 430,150 720,110 C980,74 1180,146 1440,96 L1440,220 L0,220 Z" fill="#7BC64A" />
      </motion.svg>
      <motion.svg viewBox="0 0 1440 170" preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 w-full h-[32%]"
        style={{ y: off ? yNear : undefined }}>
        <path d="M0,96 C300,44 520,112 800,78 C1060,46 1230,104 1440,68 L1440,170 L0,170 Z" fill="#65AA2D" />
      </motion.svg>
    </div>
  )
}

/* ── confete de massinha: pontinhos coloridos flutuando ──────── */
const CONFETE = ['#E71626', '#0271B8', '#EEB80E', '#65AA2D', '#894188', '#FA4110', '#E0568F']

export function Confete({ count = 16, className = '' }: { count?: number; className?: string }) {
  const reduce = useReducedMotion()
  // decorativo e sem valor semântico: só monta depois da hidratação,
  // assim o HTML do servidor nunca diverge do cliente.
  const [montado, setMontado] = useState(false)
  useEffect(() => setMontado(true), [])

  const bits = Array.from({ length: count }, (_, i) => {
    const r = (n: number) => {
      const v = ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1
      return Math.round(v * 1000) / 1000
    }
    return {
      left: r(1) * 100, top: r(2) * 100,
      size: Math.round(7 + r(3) * 13), color: CONFETE[i % CONFETE.length],
      dur: 5 + r(4) * 6, delay: -r(5) * 8,
      round: r(6) > 0.45,
    }
  })

  if (!montado) return null

  return (
    <div className={'pointer-events-none absolute inset-0 overflow-hidden ' + className} aria-hidden>
      {bits.map((b, i) => (
        <span
          key={i}
          className="absolute block"
          style={{
            left: b.left + '%', top: b.top + '%',
            width: b.size, height: b.size,
            background: b.color,
            borderRadius: b.round ? '50%' : '28%',
            opacity: 0.5,
            animation: reduce ? undefined : `float ${b.dur}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/* ── transição entre seções ───────────────────────────────────
   Fica ENTRE duas seções no page.tsx. `from` é a cor que termina em cima,
   `to` a que começa embaixo — a forma de `to` sobe dentro de `from`.
   Como as cores vêm por parâmetro, o encaixe nunca falha.            */
type DividerVariant = 'wave' | 'hills' | 'scallop'

const scallop = (r: number, y: number) => {
  let d = `M0,120 L0,${y}`
  for (let x = 0; x < 1440; x += r * 2) d += ` A${r},${r} 0 0 1 ${x + r * 2},${y}`
  return d + ' L1440,120 Z'
}

const PATHS: Record<DividerVariant, { main: string; shadow: string }> = {
  wave: {
    main:   'M0,66 C190,20 330,112 540,74 C740,38 900,122 1110,72 C1260,36 1360,62 1440,46 L1440,120 L0,120 Z',
    shadow: 'M0,52 C190,6 330,98 540,60 C740,24 900,108 1110,58 C1260,22 1360,48 1440,32 L1440,120 L0,120 Z',
  },
  hills: {
    main:   'M0,120 L0,96 C230,26 470,26 720,90 C970,26 1210,26 1440,96 L1440,120 Z',
    shadow: 'M0,120 L0,84 C230,12 470,12 720,76 C970,12 1210,12 1440,84 L1440,120 Z',
  },
  scallop: { main: scallop(60, 84), shadow: scallop(60, 70) },
}

export function Divider({
  from, to, variant = 'wave', flip = false, className = '',
}: { from: string; to: string; variant?: DividerVariant; flip?: boolean; className?: string }) {
  const p = PATHS[variant]
  return (
    <div
      aria-hidden
      className={'relative w-full overflow-hidden leading-[0] ' + className}
      style={{ background: from }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[58px] w-full sm:h-[80px] md:h-[112px]"
        style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      >
        <path d={p.shadow} fill={to} opacity=".38" />
        <path d={p.main} fill={to} />
      </svg>
    </div>
  )
}

/* ── ondas de transição (legado — preferir <Divider>) ─────────── */
export function WaveTop({ fill = '#FFF8E9', className = '' }: { fill?: string; className?: string }) {
  return (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden
      className={'absolute top-0 inset-x-0 w-full h-[46px] md:h-[78px] -translate-y-px ' + className}>
      <path d="M0,54 C240,6 420,84 720,50 C1010,17 1200,80 1440,38 L1440,0 L0,0 Z" fill={fill} />
    </svg>
  )
}

export function WaveBottom({ fill = '#FFF8E9', className = '' }: { fill?: string; className?: string }) {
  return (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden
      className={'absolute bottom-0 inset-x-0 w-full h-[46px] md:h-[78px] translate-y-px ' + className}>
      <path d="M0,36 C240,84 420,6 720,40 C1010,73 1200,10 1440,52 L1440,90 L0,90 Z" fill={fill} />
    </svg>
  )
}

/* ── arco-íris (aparece no bônus) ────────────────────────────── */
export function Arco({ className = '' }: { className?: string }) {
  const cores = ['#E71626', '#FA4110', '#EEB80E', '#65AA2D', '#0271B8', '#894188']
  return (
    <svg viewBox="0 0 400 200" className={className} aria-hidden>
      {cores.map((c, i) => (
        <path key={i}
          d={`M${20 + i * 15},200 A${180 - i * 15},${180 - i * 15} 0 0 1 ${380 - i * 15},200`}
          fill="none" stroke={c} strokeWidth="15" strokeLinecap="round" />
      ))}
    </svg>
  )
}
