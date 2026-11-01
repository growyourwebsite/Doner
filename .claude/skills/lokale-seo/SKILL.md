---
name: lokale-seo
description: Lokale SEO voor Nederlandse bedrijfssites - landingspagina's per zoekintentie en plaats, schema.org (LocalBusiness, Product/Offer, FAQPage), titles en meta descriptions, interne links via de footer. Gebruik bij SEO-pagina's, structured data of vindbaarheid van een lokaal bedrijf.
---

# Lokale SEO

## 1. Zoekintenties → landingspagina's
Maak per combinatie van **drempel/doelgroep** of **product + plaats** één pagina. Voorbeelden:
- Drempel: "Zakelijk leasen met een BKR-registratie", "Zakelijk leasen zonder jaarcijfers", "Auto leasen als startende ondernemer"
- Doelgroep: "Occasion lease voor zzp'ers"
- Plaats: "Occasion lease in Amsterdam en omgeving", "E-bike kopen in Almere", "Leasefiets-dealer Almere"
- Product/prijs: "E-bikes tot € 2.000", "E-bike met middenmotor", "Elektrische bakfiets"
- Uitleg: "Wat is occasion lease?", koopgids

Template per landingspagina (`template/landingspagina.html`):
1. H1 = de zoekterm in natuurlijke taal
2. Direct antwoord in 2–3 zinnen (ja/nee + voorwaarde)
3. Hoe het werkt bij dit bedrijf (3–5 punten)
4. Relevant aanbod (3 kaarten, gefilterd)
5. 3–5 FAQ's specifiek voor deze intentie
6. CTA naar calculator/formulier
7. Links naar 2–3 verwante landingspagina's

Minimaal 300 woorden unieke tekst. Geen doorway-pagina's met alleen een andere plaatsnaam.

## 2. Meta
- `<title>`: Zoekterm | Bedrijf (max ~60 tekens)
- Meta description: voordeel + bewijs + CTA (max ~155 tekens)
- `<link rel="canonical">`, `lang="nl"`, Open Graph (`og:title`, `og:description`, `og:image`)

## 3. Structured data (JSON-LD)
Op elke pagina een `LocalBusiness`-subtype (`AutoDealer`, `AutoRental`, `BikeStore`, `AutoRepair`…):
```json
{"@context":"https://schema.org","@type":"AutoDealer","name":"…","url":"…","telephone":"…",
 "address":{"@type":"PostalAddress","streetAddress":"…","postalCode":"…","addressLocality":"…","addressCountry":"NL"},
 "openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday"],"opens":"09:00","closes":"17:30"}],
 "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.7","reviewCount":"53"}}
```
- `aggregateRating` **alleen** met echte, verifieerbare reviewcijfers.
- FAQ-secties → `FAQPage`; productkaarten → `Product` + `Offer` (`price`, `priceCurrency: EUR`).
- Het template genereert deze JSON-LD uit `site-data.js` (`app.js` → `injectSchema`). Voor productie bij voorkeur statisch in de HTML zetten.

## 4. Interne links
De footer bevat een kolom "Populair" met alle landingspagina's; elke landingspagina linkt terug naar homepage-ankers (#aanbod, #bereken).

## 5. Technisch
- Snel: afbeeldingen WebP/AVIF, `loading="lazy"`, vaste `width`/`height`.
- `sitemap.xml` + `robots.txt` (demo's: `noindex`!).
- Google Bedrijfsprofiel: NAP (naam, adres, telefoon) exact gelijk aan de site.
