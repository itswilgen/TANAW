// Bakes the rendered page into dist/index.html so content paints before any JS runs.
// Runs after `vite build` and `vite build --ssr` (see the "build" script in package.json).
import { readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ssrDir = join(root, 'dist-ssr')
const htmlPath = join(root, 'dist/index.html')

const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
const template = await readFile(htmlPath, 'utf8')
const placeholder = '<div id="root"></div>'
if (!template.includes(placeholder)) throw new Error(`${placeholder} not found in dist/index.html`)

let html = template.replace(placeholder, `<div id="root">${render()}</div>`)

// Inline the stylesheet (~8 kB gzipped): saves a render-blocking round trip on first visit.
const cssLink = /<link rel="stylesheet" crossorigin href="[^"]*?(assets\/[^"]+\.css)">/
const match = cssLink.exec(html)
if (match) {
  const css = await readFile(join(root, 'dist', match[1]), 'utf8')
  html = html.replace(match[0], () => `<style>${css}</style>`)
}

// The page is already rendered, so the app bundle only hydrates: let the hero image
// and display font win the bandwidth race on first load.
html = html.replace('<script type="module" crossorigin', '<script type="module" fetchpriority="low" crossorigin')

await writeFile(htmlPath, html)
await rm(ssrDir, { recursive: true, force: true })
console.log('✓ Prerendered dist/index.html')
