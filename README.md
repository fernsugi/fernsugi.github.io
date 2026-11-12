# fernsugi.github.io

Portfolio of Sugianto Wong, full-stack engineer in Tokyo: <https://fernsugi.github.io/>

English at `/`, Japanese at `/ja/`. Static files only, served by GitHub Pages straight from this branch. No framework, no dependencies, no tracking.

## Editing

All copy, in both languages, lives in one file: [`src/content.mjs`](src/content.mjs). Edit it, then regenerate the pages:

```bash
node build.mjs
```

That rewrites `index.html`, `ja/index.html`, `404.html`, `favicon.svg`, `sitemap.xml` and `robots.txt`. The generated files are committed, so pushing is deploying. Don't edit them by hand; the next build would overwrite the change.

Needs Node 18 or newer. There is nothing to install.

## Preview

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Layout

| Path | What it is |
| --- | --- |
| `src/content.mjs` | Every word on the site, English and Japanese side by side |
| `build.mjs` | Templates and the generator |
| `assets/site.css` | All styles, light and dark themes, print |
| `assets/site.js` | Theme toggle, navigation, and the FM synth in the hero |
| `assets/fonts/` | Subset web fonts and their licence |
| `src/og.html` | Source for the social preview card, `assets/og.png` |

## The waveform

The line under the name is a two-operator FM voice, `y = sin(θ + index · sin(ratio · θ))`, drawn on a canvas. Moving the pointer across it changes the ratio and the index. The sound button plays the same voice through the Web Audio API as a small generative pattern. It is silent until asked, pauses when it scrolls out of view, and holds still for visitors who prefer reduced motion.

## Fonts

[Bricolage Grotesque](https://github.com/ateliertriay/bricolage) and [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono), both under the SIL Open Font License (see `assets/fonts/LICENSE.txt`). They are self-hosted and subset to Latin with [fontTools](https://github.com/fonttools/fonttools), with the variable axes pinned or trimmed to what the site uses. Japanese text uses the reader's system fonts.

## Regenerating images

Only needed if the mark or the social card changes.

```bash
npx playwright screenshot --viewport-size=1200,630 src/og.html assets/og.png
```

`favicon.ico` and `apple-touch-icon.png` are renders of `favicon.svg` at 32 px and 180 px.
