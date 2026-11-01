---
name: lenis
description: Smooth scroll met Lenis (darkroom.engineering) - installatie via CDN of npm, aanbevolen CSS, koppeling met GSAP ScrollTrigger, ankerlinks, modals en geneste scrollgebieden, reduced motion, React (ReactLenis/useLenis) en Vue. Gebruik bij "smooth scroll", "vloeiend scrollen", "Lenis", scroll-gesynchroniseerde animaties of parallax.
license: MIT (Lenis zelf); deze skill is samengesteld uit de officiële README van darkroomengineering/lenis v1.3.27
---

# Lenis: smooth scroll

Lenis is een lichte (≈3 kB) smooth-scroll-bibliotheek. Hij vervangt de native scroll niet maar animeert ernaartoe, dus `position: sticky`, `window.scrollY` en ScrollTrigger blijven werken.
Bron: https://github.com/darkroomengineering/lenis (README, versie 1.3.27).

## Wanneer wel, wanneer niet
- **Wel:** sites met scroll-animaties (GSAP ScrollTrigger, parallax), "premium" merkbeleving, showcase/portfolio, productpagina's met veel beeld.
- **Niet nodig / terughoudend:** formulierzware pagina's, beheeromgevingen, lange tekst- of FAQ-pagina's, sites voor een oudere doelgroep. Een conversiegerichte bedrijfssite heeft het niet nodig. Voeg het alleen toe als het de beleving duidelijk verbetert.
- Nooit `respectReducedMotion: false` zetten.

## 1. Installatie

### Zonder build-stap (past bij het template van `bedrijfssite-bouwen`)
```html
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.27/dist/lenis.css">
<script src="https://unpkg.com/lenis@1.3.27/dist/lenis.min.js"></script>
<script>
  const lenis = new Lenis({
    autoRaf: true,           // eigen requestAnimationFrame-loop
    anchors: { offset: -80 },// ankerlinks (#aanbod) vloeiend, rekening houdend met sticky header
    autoToggle: true,        // stopt vanzelf als overflow:hidden op <html> staat (modals)
    allowNestedScroll: true, // scrollbare elementen in de pagina scrollen native
    stopInertiaOnNavigate: true
  });
</script>
```
Altijd een **vaste versie** in de URL zetten, nooit `lenis@latest`.

### Met npm
```bash
npm i lenis
```
```js
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
const lenis = new Lenis({ autoRaf: true, anchors: true })
```

### Belangrijk bij bestaande CSS
Verwijder `html { scroll-behavior: smooth; }` (het template heeft dit). Dat botst met Lenis en geeft dubbel/haperend scrollen. Gebruik in plaats daarvan `anchors` met een `offset` voor de sticky header.

## 2. Met GSAP ScrollTrigger
Gebruik **niet** `autoRaf: true`; laat GSAP's ticker Lenis aansturen, zodat beide in hetzelfde frame lopen:
```js
gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ anchors: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000)); // GSAP geeft seconden, Lenis wil ms
gsap.ticker.lagSmoothing(0);
```
Zie ook de skills `gsap-scrolltrigger` en `gsap-performance`.

## 3. Eigen animatieloop (zonder GSAP)
```js
const lenis = new Lenis();
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
```

## 4. Belangrijkste opties
| Optie | Standaard | Gebruik |
|---|---|---|
| `lerp` | `0.1` | Zachtheid (0–1). Lager = zachter/trager. 0.08–0.12 is prettig. |
| `duration` / `easing` | `1.2` | Alleen als `lerp` niet gezet is. |
| `anchors` | `false` | `true` of `{ offset, onComplete }` voor ankerlinks. |
| `autoRaf` | `false` | Zelf een loop draaien; uit bij GSAP-koppeling. |
| `autoToggle` | `false` | Start/stop op basis van overflow van de wrapper (vereist lenis.css). |
| `allowNestedScroll` | `false` | Geneste scrollgebieden native; kost wat performance. |
| `prevent` | – | `(node) => node.classList.contains('modal')` om smooth scroll te negeren. |
| `smoothWheel` | `true` | Muiswiel gladmaken. |
| `syncTouch` | `false` | Touch ook gladmaken; kan instabiel zijn op iOS < 16. Meestal uit laten. |
| `wheelMultiplier` / `touchMultiplier` | `1` | Snelheid. |
| `orientation` | `vertical` | `horizontal` voor horizontale pagina's. |
| `respectReducedMotion` | `true` | Laten staan. |

## 5. Methodes en eigenschappen
- `lenis.scrollTo(doel, opties)`. Doel: getal (px), selector (`'#aanvragen'`), element of `'top'`/`'bottom'`. Opties: `offset`, `duration`, `immediate`, `lock`, `force`, `onComplete`.
- `lenis.stop()` / `lenis.start()`: pauzeer scroll (bijv. bij een open menu of modal).
- `lenis.on('scroll', ({ scroll, velocity, direction, progress }) => …)`.
- `lenis.resize()`: alleen nodig met `autoResize: false`.
- `lenis.destroy()`: opruimen (SPA's, page transitions).
- `lenis.prefersReducedMotion`: gebruik dit om je eigen animaties ook uit te zetten.

## 6. Modals, menu's en geneste scroll
```html
<div class="modal" data-lenis-prevent>…scrollbare inhoud…</div>
```
Attributen: `data-lenis-prevent`, `-wheel`, `-touch`, `-vertical`, `-horizontal`.
Bij een mobiel menu: `lenis.stop()` bij openen, `lenis.start()` bij sluiten (of `autoToggle: true` en `overflow: hidden` op `<html>`).

## 7. React / Next.js
```jsx
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

export default function App({ children }) {
  useLenis(({ scroll }) => { /* bij elke scroll */ })
  return (<><ReactLenis root options={{ lerp: 0.1, anchors: true }} />{children}</>)
}
```
Met GSAP in React: `<ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />` en in een effect `gsap.ticker.add(t => lenisRef.current?.lenis?.raf(t * 1000))`, met cleanup via `gsap.ticker.remove`. Zie `gsap-react`.

## 8. Vue / Nuxt
Pakket `lenis/vue` (component `VueLenis` en `useLenis`), met Nuxt-module in `lenis/nuxt`. Zie https://github.com/darkroomengineering/lenis/tree/main/packages/vue.

## 9. Snap
CSS scroll-snap werkt niet met Lenis. Gebruik `lenis/snap` (https://github.com/darkroomengineering/lenis/tree/main/packages/snap).

## Beperkingen
- Safari: max 60 fps (30 fps in energiebesparingsmodus).
- Boven iframes (YouTube, Google Maps) stopt smooth scroll: lenis.css zet `pointer-events: none` op iframes tijdens scrollen.
- `position: fixed` kan haperen op oudere Intel-Macs met Safari.

## Checklist
- [ ] Vaste versie in CDN-URL of package.json
- [ ] `lenis.css` geladen
- [ ] `scroll-behavior: smooth` verwijderd uit eigen CSS
- [ ] Ankerlinks werken met juiste offset onder de sticky header
- [ ] Modal/menu/kaart (iframe) scrollt goed; `data-lenis-prevent` waar nodig
- [ ] Met "Verminder beweging" aan in het OS: geen smoothing
- [ ] Getest met muiswiel, trackpad, toetsenbord (spatie, pijltjes, Page Down) en touch
