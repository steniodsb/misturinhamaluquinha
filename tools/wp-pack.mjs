/* Empacota o export estático (out/) para rodar DENTRO de um WordPress,
   sem perder nada: o WP passa a servir o index.html na URL escolhida e os
   assets ficam em wp-content/uploads/misturinha/.

   uso:  npm run build && node tools/wp-pack.mjs [--base=/wp-content/uploads/misturinha]
   saída: wp-pack/
     ├── misturinha/            → copiar para  wp-content/uploads/misturinha/
     │   ├── index.html         (referências já reescritas para a base)
     │   ├── _next/…
     │   └── assets/…
     └── misturinha-page.php    → copiar para  wp-content/mu-plugins/
*/
import { cpSync, rmSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const base = (process.argv.find((a) => a.startsWith('--base='))?.slice(7) ?? '/wp-content/uploads/misturinha').replace(/\/$/, '')
const OUT = 'out', PACK = 'wp-pack', APP = join(PACK, 'misturinha')

if (!statSync(OUT, { throwIfNoEntry: false })) { console.error('rode `npm run build` antes'); process.exit(1) }
rmSync(PACK, { recursive: true, force: true })
mkdirSync(APP, { recursive: true })
cpSync(join(OUT, '_next'), join(APP, '_next'), { recursive: true })
cpSync(join(OUT, 'assets'), join(APP, 'assets'), { recursive: true })
cpSync(join(OUT, 'index.html'), join(APP, 'index.html'))

// ícones e manifest que o Next coloca na raiz (favicon.ico, icon.png, apple-icon.png…)
const raiz = readdirSync(OUT).filter((f) => /\.(ico|png|svg|webmanifest)$/.test(f))
for (const f of raiz) cpSync(join(OUT, f), join(APP, f))

// reescreve caminhos absolutos da raiz para a base dentro do WP
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)])
let n = 0
for (const f of walk(APP)) {
  if (!/\.(html|js|css|txt|json)$/.test(f)) continue
  const s = readFileSync(f, 'utf8')
  // precedido por aspas, parêntese, '=', vírgula, espaço ou início de linha
  // (cobre src, href, url(), srcSet "…620w, /assets/…" e strings no JS)
  let r = s.replace(/(^|[\s"'(=,])\/(_next|assets)\//gm, `$1${base}/$2/`)
  for (const f of raiz) r = r.split(`"/${f}`).join(`"${base}/${f}`)
  if (r !== s) { writeFileSync(f, r); n++ }
}

writeFileSync(join(PACK, 'misturinha-page.php'), `<?php
/**
 * Plugin Name: Misturinha Maluquinha — landing page
 * Description: Serve a landing page estática (Next.js export) em uma URL do site, com 100% do comportamento original.
 * Version: 1.0
 *
 * Instalação: este arquivo em wp-content/mu-plugins/ e a pasta "misturinha"
 * (index.html, _next/, assets/) em wp-content/uploads/misturinha/.
 * Troque MISTURINHA_SLUG para escolher a URL ('' = página inicial do site).
 */
if (!defined('ABSPATH')) exit;

define('MISTURINHA_SLUG', 'misturinha');          // https://seudominio.com/misturinha/   ('' para a home)
define('MISTURINHA_FILE', WP_CONTENT_DIR . '/uploads/misturinha/index.html');

add_action('template_redirect', function () {
    $path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
    if ($path !== MISTURINHA_SLUG) return;
    if (!is_readable(MISTURINHA_FILE)) return;

    status_header(200);
    nocache_headers();
    header('Content-Type: text/html; charset=utf-8');
    readfile(MISTURINHA_FILE);
    exit;
}, 0);

// evita que o WP responda 404 para o slug quando não existe página com esse nome
add_filter('pre_handle_404', function ($preempt) {
    $path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
    return $path === MISTURINHA_SLUG ? true : $preempt;
});
`)

console.log(`ok: ${n} arquivos reescritos para a base "${base}"`)
console.log(`→ ${APP}/  (copiar para wp-content/uploads/misturinha/)`)
console.log(`→ ${PACK}/misturinha-page.php  (copiar para wp-content/mu-plugins/)`)
