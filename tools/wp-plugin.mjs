/* Empacota o export estático (out/) como um PLUGIN WordPress instalável por
   "Plugins → Adicionar plugin → Enviar plugin". O WP extrai o zip sozinho —
   não precisa de FTP, cPanel nem gerenciador de arquivos.

   uso:
     npm run build
     node tools/wp-plugin.mjs [--slug=] [--external=arquivo.mp4=URL ...] [--drop=arquivo]
       --slug=        URL onde a LP aparece ('' = página inicial, padrão)
       --external=    arquivo de assets/ servido de outro lugar (ex.: vídeo grande
                      enviado pela Biblioteca de Mídia) — sai do zip e a referência
                      é reescrita para a URL dada
       --drop=        arquivo de assets/ que não entra no zip (ex.: não usado)
   saída: wp-pack/misturinha-lp.zip
*/
import { cpSync, rmSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, basename } from 'node:path'
import { execSync } from 'node:child_process'

const arg = (k) => process.argv.filter((a) => a.startsWith(`--${k}=`)).map((a) => a.slice(k.length + 3))
const slug = arg('slug')[0] ?? ''
const external = Object.fromEntries(arg('external').map((e) => { const i = e.indexOf('='); return [e.slice(0, i), e.slice(i + 1)] }))
const drop = new Set(arg('drop'))

const NAME = 'misturinha-lp'
const base = `/wp-content/plugins/${NAME}`
const OUT = 'out', PACK = 'wp-pack', DIR = join(PACK, NAME)

if (!statSync(OUT, { throwIfNoEntry: false })) { console.error('rode `npm run build` antes'); process.exit(1) }
rmSync(DIR, { recursive: true, force: true })
mkdirSync(DIR, { recursive: true })
cpSync(join(OUT, '_next'), join(DIR, '_next'), { recursive: true })
cpSync(join(OUT, 'assets'), join(DIR, 'assets'), {
  recursive: true,
  filter: (src) => !external[basename(src)] && !drop.has(basename(src)),
})
cpSync(join(OUT, 'index.html'), join(DIR, 'index.html'))
const raiz = readdirSync(OUT).filter((f) => /\.(ico|png|svg|webmanifest)$/.test(f))
for (const f of raiz) cpSync(join(OUT, f), join(DIR, f))

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)])
for (const f of walk(DIR)) {
  if (!/\.(html|js|css|txt|json)$/.test(f)) continue
  const s = readFileSync(f, 'utf8')
  let r = s
  // externos primeiro (caminho completo), depois a base geral
  for (const [file, url] of Object.entries(external)) r = r.split(`/assets/video/${file}`).join(url)
  r = r.replace(/(^|[\s"'(=,])\/(_next|assets)\//gm, `$1${base}/$2/`)
  for (const f2 of raiz) r = r.split(`"/${f2}`).join(`"${base}/${f2}`)
  if (r !== s) writeFileSync(f, r)
}

writeFileSync(join(DIR, `${NAME}.php`), `<?php
/**
 * Plugin Name: Misturinha Maluquinha — Landing Page
 * Description: Serve a landing page da coleção (export estático do Next.js) ${slug ? 'em /' + slug + '/' : 'como página inicial'}, com 100% das animações. Desative o plugin para voltar ao site normal do WordPress.
 * Version: 1.1.1
 * Author: Stenio Galvão WebDesign
 * Requires PHP: 7.4
 */
if (!defined('ABSPATH')) exit;

define('MISTURINHA_LP_SLUG', '${slug}');
define('MISTURINHA_LP_FILE', __DIR__ . '/index.html');
define('MISTURINHA_LP_TEMPLATE', 'misturinha-lp');

/* Modelo de página: em Páginas → editar → Atributos da página → Modelo.
   Qualquer página com este modelo passa a exibir a landing page. */
add_filter('theme_page_templates', function ($templates) {
    $templates[MISTURINHA_LP_TEMPLATE] = 'Landing Misturinha (plugin)';
    return $templates;
});

function misturinha_lp_pular_requisicao() {
    if (is_admin() || wp_doing_ajax() || (defined('REST_REQUEST') && REST_REQUEST)) return true;
    // não intercepta previews, buscas, customizer e o editor do Elementor
    foreach (array_keys($_GET) as $k) {
        if (in_array($k, ['preview', 's', 'customize_changeset_uuid'], true) || strpos($k, 'elementor') === 0) return true;
    }
    return !is_readable(MISTURINHA_LP_FILE);
}

function misturinha_lp_deve_servir() {
    if (misturinha_lp_pular_requisicao()) return false;
    $path = trim((string) parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH), '/');
    // 1) página que usa o modelo "Landing Misturinha (plugin)"
    if (is_page() && get_page_template_slug(get_queried_object_id()) === MISTURINHA_LP_TEMPLATE) {
        // se ela é a página inicial e foi acessada pelo slug (/home/), deixa o WP
        // redirecionar (301) para a raiz — evita conteúdo duplicado no Google
        if ((int) get_option('page_on_front') === (int) get_queried_object_id() && $path !== '') return false;
        return true;
    }
    // 2) rede de segurança: se a página inicial não for uma página estática, a home continua sendo a LP
    if (get_option('show_on_front') !== 'page' && $path === MISTURINHA_LP_SLUG) return true;
    return false;
}

add_action('template_redirect', function () {
    if (!misturinha_lp_deve_servir()) return;
    status_header(200);
    header('Content-Type: text/html; charset=utf-8');
    header('Cache-Control: public, max-age=300');
    readfile(MISTURINHA_LP_FILE);
    exit;
}, 0);

/* aviso dentro do editor, para ninguém tentar editar a LP por ali */
add_action('admin_notices', function () {
    $s = function_exists('get_current_screen') ? get_current_screen() : null;
    if (!$s || $s->base !== 'post' || $s->post_type !== 'page') return;
    $id = isset($_GET['post']) ? (int) $_GET['post'] : 0;
    if (!$id || get_page_template_slug($id) !== MISTURINHA_LP_TEMPLATE) return;
    echo '<div class="notice notice-info"><p><strong>Esta página exibe a landing page da Misturinha Maluquinha</strong>, servida pelo plugin. '
       . 'O conteúdo aqui não aparece no site — as alterações da LP são feitas no código e publicadas substituindo o plugin.</p></div>';
});

add_filter('display_post_states', function ($states, $post) {
    if ($post->post_type === 'page' && get_page_template_slug($post->ID) === MISTURINHA_LP_TEMPLATE) {
        $states['misturinha-lp'] = 'Landing Misturinha (plugin)';
    }
    return $states;
}, 10, 2);
`)

const zip = join(PACK, `${NAME}.zip`)
rmSync(zip, { force: true })
execSync(`python -c "import shutil; shutil.make_archive(r'${join(PACK, NAME)}', 'zip', r'${PACK}', '${NAME}')"`)
const mb = (statSync(zip).size / 1048576).toFixed(2)
console.log(`ok: ${zip} (${mb} MB) — base ${base}, rota ${slug ? '/' + slug + '/' : 'home'}`)
for (const [f, u] of Object.entries(external)) console.log(`   externo: ${f} → ${u}`)
if (Number(mb) > 9.8) console.log('ATENÇÃO: acima de ~10 MB — use --external para mais arquivos grandes')
