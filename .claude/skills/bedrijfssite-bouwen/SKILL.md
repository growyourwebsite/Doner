---
name: bedrijfssite-bouwen
description: Bouw een conversiegerichte website (of klikbare demo) voor een lokaal Nederlands bedrijf — dealer, verhuur, lease, winkel, werkplaats — volgens het vaste recept hero → bewijs → aanbod → interactieve tool → werkwijze → formulier → FAQ → footer. Gebruik bij "maak een site voor <bedrijf>", "redesign", "demo/concept voor een klant", "landingspagina voor een lokaal bedrijf".
---

# Bedrijfssite bouwen

Dit is de hoofdskill. Hij levert een data-gedreven one-page site met subpagina's, een beheerpagina en een demobalk. Combineer hem met de andere skills:

| Onderdeel | Skill |
|---|---|
| Teksten, koppen, CTA's | `conversie-copywriting` |
| Calculator, keuzehulp, filters, openingstijden | `interactieve-tools` |
| Landingspagina's, schema.org, meta | `lokale-seo` |
| Aanvraag-/contactformulieren, privacy | `formulieren-avg` |
| Demobalk, beheer, video-rondleiding | `demo-pitch` |
| Animaties (scroll-reveal, tellers, hero-intro) | `gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-performance` |
| Smooth scroll (optioneel, alleen bij beleving-sites) | `lenis` |

**Animaties met GSAP:** spaarzaam en functioneel: hero-intro, secties die bij scrollen inkomen, kerncijfers die optellen. Laad GSAP via CDN met een vaste versie (bijv. `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js` + `ScrollTrigger.min.js`). Respecteer altijd `prefers-reduced-motion` via `gsap.matchMedia()`. De inhoud moet zonder JS/animatie zichtbaar blijven, dus nooit content standaard verbergen in CSS.

## Werkwijze

1. **Onderzoek** (5 min): verzamel van de huidige site / Google-profiel: bedrijfsnaam, KvK, adres, openingstijden, keurmerken (BOVAG e.d.), reviewscore, aanbod met prijzen, USP's, doelgroep. Ontbreekt iets: gebruik duidelijk gemarkeerde voorbeelddata en zet `demo: true`.
2. **Positionering**: schrijf in één zin *voor wie* en *waarom hier* (bijv. "occasion lease voor zzp'ers zonder BKR-toets"). Elke sectie moet deze zin ondersteunen.
3. **Kopieer het template**: `cp -r .claude/skills/bedrijfssite-bouwen/template/* <doelmap>/`
4. **Vul `site-data.js`** — alle inhoud staat daar; `index.html` bevat alleen de skeletstructuur. Pas de kleurtokens in `styles.css` (`--merk`, `--accent`) aan op de huisstijl.
5. **Kies de interactieve tool** die past bij de branche (zie `interactieve-tools`): lease/financiering → calculator; groot assortiment → keuzehulp + filters; dienstverlening → offerte-/afspraakflow.
6. **SEO-pagina's**: maak per zoekintentie een landingspagina (zie `lokale-seo`).
7. **Controleer** met de checklist hieronder en maak screenshots op 390px en 1280px breed (Playwright, zie `demo-pitch/rondleiding.js`).

## Vaste sectievolgorde (homepage)

1. Demobalk (alleen bij `demo: true`)
2. Trustbalk optioneel (reviewscore · keurmerk · 2 USP's)
3. Header: logo, ankermenu (max 6 items), primaire CTA-knop, live openingsstatus
4. **Hero**: belofte-kop (voordeel, niet bedrijfsnaam) + 2–3 zinnen + primaire en secundaire CTA + uitgelicht product
5. **Kerncijfers**: 3–4 korte feiten (getal + label)
6. **Over ons in cijfers**: sinds, medewerkers, vestigingen, eigen werkplaats
7. **Aanbod**: tabs/filters + kaarten (foto, status-badge, specs, prijs, CTA) + "Staat het er niet bij? Wij zoeken het."
8. **Interactieve tool**: calculator of keuzehulp, resultaat direct zichtbaar, CTA onder het resultaat
9. **Uitleg/waarom**: voordelen als lijst met vetgedrukte openingswoorden
10. **Keurmerken**: logo + één zin per keurmerk, KvK-nummer
11. **Zo werkt het**: 3–5 genummerde stappen
12. **Formulier**: stappen vooraf uitgelegd, alleen noodzakelijke velden, toestemmingsvinkje
13. **Bezoek/locatie**: foto, adres, openingstijden, route- en belknop
14. **FAQ**: 6–18 vragen als `<details>`, bezwaren eerst
15. **Slot-CTA**
16. **Footer**: contact, openingstijden, SEO-links, juridisch, "Beheer"

## Checklist vóór oplevering

- [ ] Elke sectie heeft een CTA binnen één scroll afstand
- [ ] Prijzen tonen excl./incl. btw consistent en de rekensom klopt
- [ ] Geen verzonnen reviews, keurmerken of KvK-nummers als echt gepresenteerd — voorbeelddata is gemarkeerd
- [ ] Mobiel: geen horizontale scroll, knoppen ≥ 44px, menu bruikbaar
- [ ] Toegankelijk: alt-teksten, labels bij velden, focus zichtbaar, contrast AA
- [ ] Schema.org (LocalBusiness + FAQPage) en unieke `<title>`/meta description per pagina
- [ ] Formulier werkt zonder JS-fouten; privacyverklaring gelinkt
