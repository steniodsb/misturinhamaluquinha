import type { Metadata, Viewport } from 'next'
import { Baloo_2, Nunito } from 'next/font/google'
import './globals.css'

const baloo = Baloo_2({
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700', '800'],
  variable: '--font-baloo',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
})

const DESC =
  'Coleção literária paradidática, multimídia e multissensorial para crianças de 4 a 8 anos. ' +
  '3 livros, 6 eixos temáticos, conteúdo cantado e recitado por QR Code e tradução em LIBRAS.'

export const metadata: Metadata = {
  title: 'Misturinha Maluquinha — coleção literária infantil com LIBRAS, música e poesia',
  description: DESC,
  keywords: [
    'livro infantil', 'paradidático', 'LIBRAS', 'educação infantil',
    'literatura infantil', 'material para escolas', 'alfabetização', 'inclusão',
  ],
  authors: [{ name: 'Luan Gonçalves' }],
  openGraph: {
    title: 'Misturinha Maluquinha',
    description: DESC,
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Misturinha Maluquinha',
  },
  twitter: { card: 'summary_large_image', title: 'Misturinha Maluquinha', description: DESC },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#52CBF9',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={baloo.variable + ' ' + nunito.variable}>
      <body>{children}</body>
    </html>
  )
}
