# USTAM Döner: website

Deze repo is de website van USTAM Döner (Groene Hilledijk 300B, Rotterdam). De site staat in de hoofdmap; `index.html` werkt zonder build-stap.

- Inhoud (menu, prijzen, openingstijden, reviews): `site-data.js`. Pas teksten en prijzen daar aan, niet in `index.html`.
- Opmaak: `styles.css` · Gedrag (menukaart, lijstje, openingsstatus, animaties): `app.js`.
- Volg bij wijzigingen de skill `bedrijfssite-bouwen` (checklist) en voor teksten `conversie-copywriting`. Toon: je-vorm, net als de menukaart in de zaak.
- Animaties: GSAP 3.15.0 + ScrollTrigger en Lenis 1.3.27, lokaal in `vendor/`. Zie skills `gsap-*` en `lenis`. Altijd `prefers-reduced-motion` respecteren.
- Testen: `node .claude/skills/bedrijfssite-bouwen/scripts/rondleiding.js . rondleiding-test` (screenshots, JS-fouten). De video-stappen in dat script horen bij het template; pas ze aan voor deze site.
- Nooit verzonnen reviews, keurmerken of claims (halal, vegetarisch, bezorgen) toevoegen. Open punten staan in `README.md`.
