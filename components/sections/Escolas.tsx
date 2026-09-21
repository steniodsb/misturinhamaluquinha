'use client'

import { Reveal, Stagger, CharImg } from '@/components/motion'
import { CTA, LIVROS } from '@/lib/content'
import { IconWhats } from '@/components/Icons'

const ARGUMENTOS = [
  { t: 'Dois eixos por título', d: 'Vogais + Sentimentos, Números + Cores, Formas + Animais: conteúdos que a escola já trabalha, num único paradidático.' },
  { t: 'Avaliação embutida', d: 'Atividades de fixação ao final de cada obra ajudam o professor a medir o que ficou.' },
  { t: 'Acessibilidade documentada', d: 'Interpretação em LIBRAS e legenda em todo o audiovisual — apoio direto às políticas de inclusão da escola.' },
  { t: 'Material projetável', d: 'Os vídeos recitados e cantados podem ser abertos antes e exibidos para a turma inteira.' },
  { t: 'ISBN nos três títulos', d: 'Catalogação na fonte, pronto para acervo, licitação e biblioteca escolar.' },
  { t: 'Condições para volume', d: 'Proposta própria para escolas, redes, secretarias de educação e distribuidoras.' },
]

export default function Escolas() {
  return (
    <section
      id="escolas"
      className="relative overflow-hidden py-20 md:py-24"
      style={{ background: 'linear-gradient(180deg,#2C2951 0%,#1B1A38 100%)' }}
    >

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-block rounded-full bg-[#52CBF9] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-[#2C2951]">
                Escolas, redes e distribuidoras
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.06] text-white sm:text-4xl md:text-5xl">
                Um paradidático que entra na sala de aula pronto para ser usado.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-[#B9B6D9]">
                Se você compra para uma escola, para uma rede ou distribui livros para o ensino
                infantil e fundamental I, a Misturinha resolve três demandas de uma vez: conteúdo,
                avaliação e inclusão.
              </p>
            </Reveal>
          </div>

          <Reveal dir="left" className="hidden lg:block">
            <div className="w-[190px]">
              <CharImg slug="dona-nina" alt="" float="slow" />
            </div>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {ARGUMENTOS.map((a, i) => (
            <div key={a.t} className="h-full rounded-2xl border-2 border-white/15 bg-white/[.06] p-5 backdrop-blur-sm">
              <span className="font-display text-sm font-extrabold text-[#52CBF9]">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-1 font-display text-lg font-extrabold text-white">{a.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#B9B6D9]">{a.d}</p>
            </div>
          ))}
        </Stagger>

        {/* ficha técnica */}
        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-[1.75rem] border-[3px] border-[#52CBF9]/40 bg-white/[.04]">
            <div className="grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
              {LIVROS.map((l) => (
                <div key={l.slug} className="flex items-center gap-4 p-5">
                  <img
                    src={'/assets/books/' + l.slug + '-capa@sm.webp'}
                    alt=""
                    loading="lazy"
                    className="aspect-[2/3] w-16 shrink-0 rounded-md border-2 border-white/30 object-cover"
                  />
                  <div>
                    <p className="font-display text-base font-extrabold leading-tight text-white">{l.titulo}</p>
                    <p className="mt-1 text-xs text-[#B9B6D9]">ISBN {l.isbn}</p>
                    <p className="text-xs text-[#B9B6D9]">20 × 27 cm · ilustrado · colorido</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center gap-4 rounded-[1.75rem] bg-[#52CBF9] p-7 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <p className="font-display text-2xl font-extrabold text-[#2C2951]">Quer uma proposta para a sua escola ou rede?</p>
              <p className="mt-1 text-[#2C2951]/80">Conte quantas crianças e quais turmas. A gente monta a condição.</p>
            </div>
            <a
              href={CTA.escola}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d flex shrink-0 items-center gap-2.5 rounded-full bg-[#2C2951] px-7 py-4 font-display text-lg font-extrabold text-white"
            >
              <IconWhats className="h-6 w-6" />
              Pedir proposta em volume
            </a>
          </div>
        </Reveal>
      </div>

    </section>
  )
}
