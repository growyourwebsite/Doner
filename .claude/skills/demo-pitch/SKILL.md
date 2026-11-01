---
name: demo-pitch
description: Maak van een bedrijfssite een verkoopbare klikbare demo - demobalk, beheerpagina waarmee de klant zelf aanbod en teksten aanpast, en een automatisch opgenomen video-rondleiding (Playwright). Gebruik bij "maak een demo/concept om aan een klant te laten zien", pitches en rondleidingen.
---

# Demo en pitch

Doel: een bestaand bedrijf een werkend prototype laten zien met **hun eigen inhoud**, zodat de nieuwe site voelbaar is vóór er een opdracht ligt.

## 1. Demobalk
Bij `demo: true` in `site-data.js` toont het template bovenaan een balk, bijv.:
> Klikbaar ontwerp: voorbeelddata en prijzen van de huidige site. Bestellen en betalen zijn nog niet echt. Bekijk de rondleiding · Bekijk het beheer · Sluiten

- Altijd eerlijk benoemen wat voorbeelddata is en wat (nog) niet werkt.
- Zet demo's op `noindex` (`<meta name="robots" content="noindex">`) en op een demo-subdomein.

## 2. Beheer (`beheer.html`)
Laat zien dat de klant zelf kan beheren:
- Tabel met aanbod (naam, status, prijs) bewerken, toevoegen, verwijderen
- Teksten van hero en FAQ bewerken
- Opslaan in `localStorage` → de site leest die versie direct (alleen in die browser, puur demo)
- "Exporteer site-data.js" downloadt het bestand om echt te publiceren
- Duidelijk melden: "Demo-beheer, wijzigingen alleen zichtbaar in deze browser"

Voor productie: vervang door een echt CMS of een kleine backend met inlog.

## 3. Video-rondleiding
`node .claude/skills/bedrijfssite-bouwen/scripts/rondleiding.js <map-of-url> [uitvoer-map]`
- Neemt met Playwright een video (1280×720) op: hero → aanbod → calculator bedienen → keuzehulp → formulier → FAQ.
- Pas de stappen in het script aan per site. Houd het < 90 seconden.
- Zet de video op `rondleiding.html` met een korte toelichting per onderdeel.
- Maak daarnaast screenshots op 390px (mobiel) en 1280px.

## 4. Pitchmail (opzet)
1. Eén zin wat je zag op de huidige site (concreet, niet afkraken).
2. Link naar de demo + rondleiding.
3. Drie verbeteringen in klantwaarde (meer aanvragen, minder telefoontjes, beter vindbaar).
4. Voorstel voor een kort gesprek.

## Grenzen
- Gebruik de echte naam en inhoud van het bedrijf alleen in een privé gedeelde demo voor dat bedrijf zelf; publiceer niets dat zich voordoet als de officiële site.
- Geen verzonnen reviews of keurmerken als echt.
