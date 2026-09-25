/* Conteúdo da página — centralizado para facilitar edição pelo cliente. */

export const CONTATO = {
  whatsappNumero: '5573991867754',
  whatsappLabel: '(73) 99186-7754',
  instagram: 'misturinhamaluquinha',
  instagramUrl: 'https://instagram.com/misturinhamaluquinha',
  email: 'contato@misturinhamaluquinha.com.br',
  cidade: 'Jequié, Bahia',
}

export const PRECO = { valor: 127, formas: 'cartão de débito, crédito, Pix ou dinheiro' }

export const msgWhats = (t: string) =>
  'https://wa.me/' + CONTATO.whatsappNumero + '?text=' + encodeURIComponent(t)

export const CTA = {
  familia: msgWhats('Olá! Quero levar a coleção Misturinha Maluquinha para minha criança. Pode me ajudar?'),
  escola: msgWhats('Olá! Sou de uma escola/editora e quero receber uma proposta da coleção Misturinha Maluquinha em volume.'),
}

/* ── personagens (assets já recortados, fundo transparente) ── */
export type Char = { slug: string; nome: string; papel: string; ratio: number }

export const CHARS = {
  analuz:   { slug: 'analuz',    nome: 'Analuz',    papel: 'a que chega chegando',   ratio: 0.619 },
  jorge:    { slug: 'jorge',     nome: 'Jorge',     papel: 'o curioso da turma',     ratio: 0.374 },
  mel:      { slug: 'mel',       nome: 'Mel',       papel: 'a que sente tudo',       ratio: 0.412 },
  matteo:   { slug: 'matteo',    nome: 'Matteo',    papel: 'o inventor de bagunça',  ratio: 0.352 },
  donaNina: { slug: 'dona-nina', nome: 'Dona Nina', papel: 'a professora',           ratio: 0.463 },
  seuFuba:  { slug: 'seu-fuba',  nome: 'Seu Fubá',  papel: 'o contador de história', ratio: 0.491 },
  donaFilo: { slug: 'dona-filo', nome: 'Dona Filó', papel: 'a avó de todo mundo',    ratio: 0.385 },
  pitoco:   { slug: 'pitoco',    nome: 'Pitoco',    papel: 'o cachorro',             ratio: 0.724 },
  bigode:   { slug: 'bigode',    nome: 'Bigode',    papel: 'o gato',                 ratio: 0.752 },
  sol:      { slug: 'sol',       nome: 'Sol',       papel: 'quem acorda a turma',    ratio: 1.023 },
} satisfies Record<string, Char>

export type CharKey = keyof typeof CHARS

/* slug → proporção largura/altura. Reservar o espaço da imagem antes de
   carregar evita que a página "pule" (CLS) quando os PNGs lazy chegam. */
export const RATIOS: Record<string, number> = {
  ...Object.fromEntries(Object.values(CHARS).map((c) => [c.slug, c.ratio])),
  logo: 1563 / 681,
}
export const CAPA_RATIO = 741 / 1112

export const TURMA: CharKey[] = [
  'analuz', 'jorge', 'mel', 'matteo', 'donaNina', 'seuFuba', 'donaFilo', 'pitoco', 'bigode',
]

/* ── montagens geradas: personagem segurando tablet.
      `screen` = posição da tela em % da imagem, medida no próprio arquivo. ── */
export const MOUNTS = {
  donaNina: {
    slug: 'dona-nina-tablet', ratio: 634 / 1477,
    screen: { left: 25.552, top: 39.201, width: 50.0, height: 14.557 },
  },
  seuFuba: {
    slug: 'seu-fuba-tablet', ratio: 615 / 1474,
    screen: { left: 23.415, top: 33.175, width: 44.228, height: 12.754 },
  },
}

/* ── os três livros ── */
export const LIVROS = [
  {
    slug: 'vogais',
    titulo: 'Vogais e Sentimentos',
    eixos: ['Vogais', 'Sentimentos'],
    cor: '#E71626',
    isbn: '978-65-02-34021-9',
    resumo:
      'As cinco vogais entram junto com os sentimentos que as crianças já vivem, mas ainda não sabem nomear, interpretar e lidar: alegria, esperança, empatia, ingratidão, inspiração, otimismo, ódio e urgência.',
    sextilhas: [
      ['Hoje vamos aprender', 'Com misturinhas maluquinhas,', 'Divertidas e legais,', 'Sobre os vários momentos', 'Que demonstramos sentimentos', 'E sobre todas as vogais'],
      ['Pra começar pelo início', 'Vem a primeira do alfabeto', 'Conhecida como letra “A”.', 'Você sabia que a Alegria', 'Enche a gente de euforia', 'Fazendo-nos sorrir e cantar?!'],
      ['Depois da letra “A”', 'Preste bem atenção', 'Que vem a letra “E”.', 'Esperança é acreditar', 'Que você vai realizar', 'O sonho que quiser.'],
    ],
    video: 'vogais',
  },
  {
    slug: 'numeros',
    titulo: 'Números e Cores',
    eixos: ['Números', 'Cores'],
    cor: '#0271B8',
    isbn: '978-65-02-34020-2',
    resumo:
      'Contar e enxergar cor no mesmo fôlego. Os numerais aparecem dentro de cenas coloridas, e a cor deixa de ser enfeite para virar conteúdo.',
    sextilhas: [
      ['Hoje vamos aprender', 'Com misturinhas maluquinhas,', 'Divertidas e legais,', 'O nome das diversas cores', 'Como o colorido destas flores', 'E sobre os vários numerais'],
      ['Antes do número um', 'Preciso lembrar que vem o ZERO.', 'Por favor, se esqueça dele não!', 'O verde está na mata', 'Colore o capim que a vaca', 'Mastiga e engole de montão.'],
      ['Assim que passa o zero,', 'O número UM aparece', 'Pra começar a contagem', 'O marrom está no barro', 'E o vermelho ali no carro', 'Estacionado na garagem'],
    ],
    video: 'numeros',
  },
  {
    slug: 'formas',
    titulo: 'Formas Geométricas e Animais',
    eixos: ['Formas geométricas', 'Animais'],
    cor: '#65AA2D',
    isbn: '978-65-02-34022-6',
    resumo:
      'As formas em duas dimensões — comprimento e largura — apresentadas ao lado dos animais. A geometria entra pelo olhar antes de entrar pela régua.',
    sextilhas: [
      ['Hoje vamos aprender', 'Com misturinhas maluquinhas,', 'Divertidas e legais,', 'Sobre a nossa geometria', 'Seus desenhos, suas linhas,', 'Misturada aos animais.'],
      ['Você sabia que a geometria', 'Estuda as formas no espaço', 'Seu tamanho e a sua posição?!', 'E que a minhoca é um animal', 'Que deixa o solo bem legal', 'Mesmo sem pernas e sem mão?'],
      ['O triângulo tem três vértices,', 'Possui suas três arestas', 'Também chamadas de lados.', 'Na savana, o leão é o mais feroz,', 'O guepardo é o mais veloz,', 'Pulam mais alto os veados.'],
    ],
    video: 'numeros',
  },
] as const

/* ── diferenciais (do script do cliente) ── */
export const DIFERENCIAIS = [
  { icone: 'livro',   titulo: 'Não é “apenas” livro',
    texto: 'Conta história e constrói conhecimento — mas não para por aí.' },
  { icone: 'cerebro', titulo: 'Estímulo em áreas diferentes',
    texto: 'Integra conteúdos, sentidos e estímulos em regiões distintas do cérebro da criança.' },
  { icone: 'cruz',    titulo: 'Dois eixos por livro',
    texto: 'Interdisciplinaridade real, entregue em poesias de seis versos — as sextilhas.' },
  { icone: 'ouvido',  titulo: 'Lido, escutado, cantado e recitado',
    texto: 'O mesmo conteúdo chega à criança por quatro caminhos diferentes.' },
  { icone: 'qr',      titulo: 'QR Codes no miolo',
    texto: 'Levam à versão recitada (leitura guiada) e à versão cantada por uma criança de 8 anos.' },
  { icone: 'libras',  titulo: 'Intérprete de LIBRAS',
    texto: 'Todo o audiovisual tem interpretação, para que crianças surdas também consumam a obra.' },
  { icone: 'check',   titulo: 'Avaliação da aprendizagem',
    texto: 'Atividades de fixação ao final de cada livro ajudam a medir o que ficou.' },
] as const

/* ── bônus por meta de venda ── */
export const BONUS = [
  { meta: 200, unidade: 'vendas', titulo: 'Oficina com ateliê artístico', selo: 'LIBERADA',
    texto: [
      'A cada 200 coleções vendidas, levaremos o ateliê artístico à casa do ganhador.',
      'Oficina de biscuit e pintura para reprodução dos nossos personagens (máximo de 15 crianças por oficina).',
    ],
    modalidades: [],
    nota: 'Se o ganhador não for de ' + CONTATO.cidade + ', contratamos um ateliê da região vencedora.',
    cor: '#894188' },
  { meta: 300, unidade: 'coleções vendidas', titulo: '3 meses de atividade paga', selo: '',
    texto: [
      '3 crianças serão presenteadas com um sorteio mais que especial.',
      'Cada criança sorteada poderá escolher uma das modalidades abaixo para ganhar 3 meses de mensalidades pagas pela Misturinha Maluquinha.',
    ],
    modalidades: ['Jiu-jitsu', 'Musicoterapia', 'Futebol', 'Artes plásticas'],
    nota: 'Fora de ' + CONTATO.cidade + ', contratamos o serviço na cidade da criança sorteada.',
    cor: '#F69805' },
] as const

/* ── o que vem na coleção ── */
export const INCLUI = [
  { n: '3', t: 'livros paradidáticos' },
  { n: '6', t: 'eixos temáticos' },
  { n: '3', t: 'mídias do conteúdo musicado', s: 'cantado por uma criança de 8 anos' },
  { n: '3', t: 'mídias do conteúdo recitado', s: 'leitura guiada' },
  { n: '+', t: 'tradução em LIBRAS de todo o audiovisual' },
  { n: '+', t: 'atividade de fixação ao final de cada obra' },
  { n: '+', t: 'sorteios por meta de venda batida' },
] as const

/* ── FAQ ── */
export const FAQ = [
  { q: 'Para qual faixa etária é a coleção?',
    a: 'O público prioritário são crianças de 4 a 8 anos. Mas pais e mães que já leem com os filhos e usam música e ilustração como ferramenta de desenvolvimento podem levar a coleção para casa mesmo antes dessa idade.' },
  { q: 'Serve para crianças atípicas e neurodivergentes?',
    a: 'Sim. A coleção foi construída em comunicação multimodal — texto, imagem, áudio, canto e LIBRAS. Como estimula áreas distintas do sistema nervoso central, atende crianças típicas e atípicas, neurodivergentes ou não, surdas e não surdas.' },
  { q: 'Como funcionam os QR Codes?',
    a: 'Cada livro traz QR Codes impressos no miolo. Ao escanear, a criança acessa o conteúdo recitado (leitura guiada) e o conteúdo cantado. Os vídeos têm intérprete de LIBRAS e legenda.' },
  { q: 'Preciso de internet para usar em sala de aula?',
    a: 'Para o livro impresso, não. Os QR Codes levam ao conteúdo audiovisual, e esse acesso pede conexão — mas o vídeo pode ser aberto antes e projetado para a turma inteira.' },
  { q: 'Como compro em volume, para uma escola ou rede de ensino?',
    a: 'Fale com a gente pelo WhatsApp ou e-mail (' + 'contato@misturinhamaluquinha.com.br' + '). Atendemos escolas, secretarias de educação e editoras com condições especiais para grandes volumes.' },
  { q: 'Quais as formas de pagamento?',
    a: 'A coleção completa sai por R$ ' + PRECO.valor + ',00, em ' + PRECO.formas + '.' },
] as const

export const AUTOR = {
  nome: 'Luan Gonçalves',
  idade: 33,
  frase: 'apenas “um latino americano sem dinheiro no banco, sem parentes importante e nascido no interior”',
  paragrafos: [
    'Graduado em Nutrição pela Universidade Federal de Alagoas (UFAL), é um eterno apaixonado pela arte, escrita, leitura, música e poesia.',
    'Entusiasta da educação como principal ferramenta libertadora daqueles que sofrem com injustiças e discriminações sociais, foi docente na educação de adolescentes, jovens e adultos da rede estadual de ensino de sua cidade durante 7 anos.',
    'Autor de “Poeta sem Repente — A Realidade Brasileira em Verso e Prosa”, lançado em 2019, exerceu também a clínica hospitalar no Hospital Geral Prado Valadares por cinco anos, se afastando no início de 2026 para tirar da gaveta e se dedicar a este projeto: a Misturinha Maluquinha.',
    'Aventura-se ainda em composições musicais — algumas delas presentes em clipes e faixas nas plataformas de música e vídeo, como “Traidora”, de Rafa Villa e Kayllan Alves, e “Mata Minha Sede”, de Rafael Villa.',
  ],
  fecho:
    'Ouso dizer que, muito provavelmente, tu voltarás aqui outras vezes para adquirir mais coleções e obras de um acervo literário infantil que está apenas começando. Muito prazer, e muito obrigado pela visita!',
}
