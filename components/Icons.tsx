/* Ícones desenhados com traço grosso, para combinar com o contorno
   de massinha do material. Todos herdam currentColor. */

type P = { className?: string }
const base = 'w-full h-full'

const wrap = (children: React.ReactNode, className?: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1"
    strokeLinecap="round" strokeLinejoin="round" className={className ?? base} aria-hidden>
    {children}
  </svg>
)

export const IconLivro = ({ className }: P) => wrap(
  <>
    <path d="M3 4.5A1.5 1.5 0 0 1 4.5 3H9a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H3z" />
    <path d="M21 4.5A1.5 1.5 0 0 0 19.5 3H15a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H21z" />
  </>, className)

export const IconCerebro = ({ className }: P) => wrap(
  <>
    <path d="M12 5a2.5 2.5 0 0 0-5 .1A2.6 2.6 0 0 0 5 7.5a2.6 2.6 0 0 0 .6 1.7A2.7 2.7 0 0 0 5 11a2.7 2.7 0 0 0 1.2 2.2A2.6 2.6 0 0 0 6 15a2.7 2.7 0 0 0 2.8 2.7A2.5 2.5 0 0 0 12 19z" />
    <path d="M12 5a2.5 2.5 0 0 1 5 .1 2.6 2.6 0 0 1 2 2.4 2.6 2.6 0 0 1-.6 1.7A2.7 2.7 0 0 1 19 11a2.7 2.7 0 0 1-1.2 2.2A2.6 2.6 0 0 1 18 15a2.7 2.7 0 0 1-2.8 2.7A2.5 2.5 0 0 1 12 19z" />
    <path d="M12 5v14" />
  </>, className)

export const IconCruz = ({ className }: P) => wrap(
  <>
    <path d="M12 3v18M3 12h18" />
    <circle cx="12" cy="12" r="3.2" />
  </>, className)

export const IconOuvido = ({ className }: P) => wrap(
  <>
    <path d="M6 9a6 6 0 1 1 12 0c0 2.4-1.6 3.4-2.6 4.4-1 1-1.4 1.9-1.4 3.1a2.6 2.6 0 0 1-5.2 0" />
    <path d="M9.6 9a2.4 2.4 0 0 1 4.8 0" />
  </>, className)

export const IconQr = ({ className }: P) => wrap(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1.4" />
    <rect x="14" y="3" width="7" height="7" rx="1.4" />
    <rect x="3" y="14" width="7" height="7" rx="1.4" />
    <path d="M14 14h3v3h-3zM20 14v1M14 20h3M20 19v2" />
  </>, className)

export const IconLibras = ({ className }: P) => wrap(
  <>
    <path d="M8.5 11V4.6a1.6 1.6 0 0 1 3.2 0V10" />
    <path d="M11.7 10V3.8a1.6 1.6 0 0 1 3.2 0V10" />
    <path d="M14.9 10.4V6.2a1.6 1.6 0 0 1 3.1 0V14a7 7 0 0 1-7 7h-.6a6 6 0 0 1-5-2.7L3.9 15a1.7 1.7 0 0 1 2.7-2l1.9 2.2" />
  </>, className)

export const IconCheck = ({ className }: P) => wrap(
  <>
    <path d="M9 11.5l2.4 2.4L15.8 9" />
    <path d="M8 3h8a2 2 0 0 1 2 2v14.4a.9.9 0 0 1-1.4.7L12 17.6l-4.6 2.5A.9.9 0 0 1 6 19.4V5a2 2 0 0 1 2-2z" />
  </>, className)

export const IconWhats = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? base} aria-hidden>
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2.1 22l5.36-1.4a9.8 9.8 0 0 0 4.58 1.16h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2m0 17.94h-.01a8.2 8.2 0 0 1-4.15-1.13l-.3-.18-3.08.8.83-3-.2-.31a8.13 8.13 0 0 1-1.25-4.34c0-4.5 3.67-8.16 8.17-8.16a8.13 8.13 0 0 1 8.15 8.17c0 4.5-3.66 8.16-8.16 8.16m4.48-6.11c-.25-.13-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.13s-.63.79-.77.95c-.14.17-.28.19-.52.06a6.7 6.7 0 0 1-3.35-2.93c-.25-.43.25-.4.72-1.33.08-.17.04-.31-.02-.44s-.55-1.33-.76-1.82c-.2-.47-.4-.4-.55-.41l-.47-.01a.9.9 0 0 0-.65.3c-.22.25-.85.84-.85 2.03s.88 2.35 1 2.51c.12.17 1.71 2.62 4.15 3.67 1.54.67 2.15.72 2.92.61.47-.07 1.45-.59 1.65-1.17s.2-1.07.14-1.17c-.06-.11-.22-.18-.47-.3" />
  </svg>
)

export const IconInsta = ({ className }: P) => wrap(
  <>
    <rect x="3" y="3" width="18" height="18" rx="5.2" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r=".9" fill="currentColor" />
  </>, className)

export const ICONES = {
  livro: IconLivro, cerebro: IconCerebro, cruz: IconCruz, ouvido: IconOuvido,
  qr: IconQr, libras: IconLibras, check: IconCheck,
} as const
