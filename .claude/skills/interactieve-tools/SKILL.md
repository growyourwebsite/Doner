---
name: interactieve-tools
description: Bouw interactieve conversietools in vanilla JavaScript - leasecalculator met kilometertoeslag en btw, keuzehulp (3 vragen → passende producten), filtertabs, vergelijken, live openingsstatus en uitklap-FAQ. Gebruik bij calculators, productkiezers, filters of "open/gesloten"-indicatoren op een bedrijfssite.
---

# Interactieve tools

Referentie-implementatie: `.claude/skills/bedrijfssite-bouwen/template/app.js` (geen framework, geen build-stap). Alle tools lezen hun instellingen uit `window.SITE` in `site-data.js`.

## 1. Leasecalculator
Invoer: product, looptijd (12/24/36/48), km per jaar (slider).

```
basis      = product.prijsMaand × looptijdFactor[looptijd]   // prijsMaand geldt bij de langste looptijd
extraKm    = max(0, kmPerJaar − inclusiefKmPerJaar)
toeslag    = extraKm × prijsPerExtraKm / 12
totaalExcl = round(basis + toeslag)
totaalIncl = round(totaalExcl × (1 + btw))                   // btw = 0.21
```
Regels:
- Toon direct bij elke wijziging (event `input`), geen "bereken"-knop.
- Toon de opbouw: looptijd, basistarief, toeslag ("geen" bij 0), totaal excl. en incl. btw.
- Vermeld onder het resultaat: "Indicatie, geen offerte" + borg + prijs per extra km.
- CTA onder het resultaat neemt de gekozen waarden mee naar het formulier (query-string of vooringevulde velden).
- Bij demo: rekenformule en tarieven markeren als voorbeeld.

## 2. Keuzehulp
3 vragen (gebruik, afstand, budget), elke optie zet een filter. Producten hebben `tags` en `prijs`.
- Resultaat verschijnt direct onder de vragen; lege staat legt uit wat te doen ("Kies hierboven…").
- Score = aantal matchende tags; sorteer op score, dan prijs. Toon max 4.
- Geen resultaten → toon dichtstbijzijnde alternatieven + link "Laat ons zoeken".

## 3. Filtertabs en kaarten
- Tabs als `<button role="tab" aria-selected>` met aantal tussen haakjes ("Direct leverbaar 3").
- Kaart: foto (lazy), status-badge (Direct leverbaar / Gereserveerd / Op bestelling / Outlet), titel, uitvoering, 3–4 specs, prijs + "vanaf p/m", CTA.
- Vergelijken: checkbox per kaart, max 3, sticky balk met "Vergelijk (2)".

## 4. Live openingsstatus
- Openingstijden per weekdag in data (`[["09:00","17:30"], …]`, `null` = gesloten), tijdzone Europe/Amsterdam.
- Teksten: "Nu open tot 17:30" · "Gesloten, vandaag open vanaf 10:00" · "Gesloten, morgen open vanaf 09:00" · "Gesloten, maandag open vanaf 09:00".
- Ververs elke minuut.

## 5. FAQ
Gebruik native `<details><summary>` (toegankelijk, geen JS nodig). Genereer daarnaast `FAQPage` JSON-LD uit dezelfde data (zie `lokale-seo`).

## Kwaliteitseisen
- Werkt met toetsenbord; labels gekoppeld aan inputs; `aria-live="polite"` op resultaatvakken.
- Bedragen via `Intl.NumberFormat('nl-NL', {style:'currency', currency:'EUR', maximumFractionDigits:0})`.
- Test randgevallen: minimum/maximum km, kortste looptijd, product zonder foto, lege filterresultaten.
