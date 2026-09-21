import { SmoothScroll } from '@/components/motion'
import { Nav, WhatsFab } from '@/components/Chrome'
import { Divider } from '@/components/Scenery'
import Hero from '@/components/sections/Hero'
import TabletShowcase from '@/components/sections/TabletShowcase'
import OQueE from '@/components/sections/OQueE'
import PorQue from '@/components/sections/PorQue'
import Diferenciais from '@/components/sections/Diferenciais'
import Livros from '@/components/sections/Livros'
import Sextilha from '@/components/sections/Sextilha'
import Inclusao from '@/components/sections/Inclusao'
import ParaQuem from '@/components/sections/ParaQuem'
import Bonus from '@/components/sections/Bonus'
import Oferta from '@/components/sections/Oferta'
import Escolas from '@/components/sections/Escolas'
import Autor from '@/components/sections/Autor'
import Faq from '@/components/sections/Faq'
import Footer from '@/components/sections/Footer'

/* Cores de borda de cada seção (topo/base), para os divisores encaixarem.
   Os gradientes das seções são verticais (180deg), então a borda é uniforme. */
const C = {
  papel: '#FFF8E9',
  heroChao: '#4A8320',
  tabletTop: '#0271B8', tabletBot: '#023F6B',
  porqueTop: '#FDEFD6', porqueBot: '#F6E3C0',
  livrosTop: '#023F6B', livrosBot: '#0271B8',
  caderno: '#FFFDF6',
  inclusaoTop: '#894188', inclusaoBot: '#6B2F6A',
  bonusTop: '#A7E4FC', bonusBot: '#DDF3FD',
  escolasTop: '#2C2951', escolasBot: '#1B1A38',
  faqTop: '#FDEFD6', faqBot: '#FFF8E9',
  footerTop: '#F2FBFF',
}

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Divider from={C.heroChao} to={C.tabletTop} variant="hills" />
        <TabletShowcase />
        <Divider from={C.tabletBot} to={C.papel} variant="wave" />
        <OQueE />
        <Divider from={C.papel} to={C.porqueTop} variant="scallop" />
        <PorQue />
        <Divider from={C.porqueBot} to={C.papel} variant="wave" flip />
        <Diferenciais />
        <Divider from={C.papel} to={C.livrosTop} variant="hills" />
        <Livros />
        <Divider from={C.livrosBot} to={C.caderno} variant="wave" />
        <Sextilha />
        <Divider from={C.caderno} to={C.inclusaoTop} variant="scallop" />
        <Inclusao />
        <Divider from={C.inclusaoBot} to={C.papel} variant="wave" flip />
        <ParaQuem />
        <Divider from={C.papel} to={C.bonusTop} variant="hills" />
        <Bonus />
        <Divider from={C.bonusBot} to={C.papel} variant="wave" />
        <Oferta />
        <Divider from={C.papel} to={C.escolasTop} variant="scallop" />
        <Escolas />
        <Divider from={C.escolasBot} to={C.papel} variant="wave" flip />
        <Autor />
        <Divider from={C.papel} to={C.faqTop} variant="wave" />
        <Faq />
        <Divider from={C.faqBot} to={C.footerTop} variant="hills" />
      </main>
      <Footer />
      <WhatsFab />
    </>
  )
}
