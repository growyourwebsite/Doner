# USTAM Döner, demo-website

Klikbare demo voor USTAM Döner, Groene Hilledijk 300B, Rotterdam.
Openen: `index.html` (werkt zonder server). Beheer: `beheer.html`. Rondleiding: `rondleiding.html`.

## Bronnen
- Google Maps-profiel (1 nov 2026): 4,9 sterren, 457 reviews, openingstijden, adres, telefoon, prijsklasse € 10–20.
- Menukaart en drankenkaart in de zaak: alle gerechten en prijzen, verhaaltekst, e-mailadres.
- Foto's: uitsneden uit de aangeleverde collage (`img/`).

## Gebruikt
- Recept `bedrijfssite-bouwen`, aangepast voor horeca: menukaart met tabs en een "mijn lijstje" dat direct optelt in plaats van een calculator.
- GSAP 3.15.0 + ScrollTrigger (hero-intro, binnenkomende secties, optellende cijfers) en Lenis 1.3.27 (smooth scroll). Lokaal in `vendor/`, MIT-licentie. Alles respecteert "verminder beweging".
- Schema.org `Restaurant` met volledige menukaart en prijzen + `FAQPage`.

## Nog bevestigen met de eigenaar
- [ ] Afhalen en/of bezorgen? Zo ja: online bestellen koppelen (nu: "Bel om te bestellen").
- [ ] Reserveren mogelijk? Groepen?
- [ ] Halal, vegetarische opties en allergenen (niet vermeld tot bevestigd).
- [ ] Betaalmethoden (pin, contant).
- [ ] Logo als vectorbestand en foto's in hogere resolutie (de huidige zijn ±450 px).
- [ ] Is het adres 300B of 300B-L (menukaart noemt 300B-L)?
- [ ] Toestemming om de vier Google-reviews met naam/initialen te tonen.

## Livegang
1. `<meta name="robots" content="noindex">` verwijderen en `demo: false` zetten in `site-data.js`.
2. Beheer vervangen door echte opslag of `beheer.html` verwijderen.
3. Op ustamdoner.nl zetten (HTTPS) en Google Bedrijfsprofiel naar de site laten linken.
