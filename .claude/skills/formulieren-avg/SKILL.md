---
name: formulieren-avg
description: Ontwerp en bouw aanvraag-, offerte-, proefrit- en contactformulieren die converteren en AVG-proof zijn - stappen vooraf uitgelegd, minimale velden, NL-validatie (postcode, KvK, telefoon), toestemming en privacy. Gebruik bij elk formulier op een bedrijfssite.
---

# Formulieren en AVG

## Conversie
1. **Leg het proces uit vóór het formulier**: 3 stappen ("Nu: uw aanvraag · Wij nemen contact op · Onze check").
2. **Vraag alleen wat nu nodig is.** Documenten later via een beveiligde link ("u hoeft nu nog niets te uploaden").
3. **Groepeer**: wensen (product, looptijd, km) → bedrijf → persoon → opmerking.
4. **Neem context mee**: gekozen product en calculatorwaarden vooringevuld.
5. Kort tweestapsformulier bij zoekopdrachten: eerst wens + budget, daarna contactgegevens.
6. Verplichte velden met `*` en de zin "Velden met * zijn verplicht."
7. Knoptekst = resultaat: "Aanvraag versturen", niet "Submit".
8. Bevestiging na verzenden: wat er nu gebeurt en binnen welke termijn ("binnen 24 uur").

## Validatie (NL)
| Veld | Regel |
|---|---|
| Postcode | `^[1-9][0-9]{3}\s?[A-Za-z]{2}$` |
| KvK-nummer | 8 cijfers `^[0-9]{8}$` |
| Telefoon | `^(\+31|0031|0)[1-9][0-9 \-]{7,11}$` |
| Btw-nummer | `^NL[0-9]{9}B[0-9]{2}$` (optioneel) |
| E-mail | `type="email"` |

Gebruik native `required`, `pattern`, `inputmode="numeric"` en `autocomplete` (`given-name`, `family-name`, `email`, `tel`, `postal-code`, `organization`, `bday`). Foutmelding direct onder het veld, in gewone taal.

## AVG / privacy
- **Doelbinding**: zin onder het formulier "Uw gegevens gebruiken wij alleen hiervoor." + link naar privacyverklaring.
- **Expliciete toestemming** (niet vooraf aangevinkt) wanneer je meer doet dan de aanvraag afhandelen, bijv. een kredietcheck/integriteitsonderzoek: benoem dat letterlijk.
- **Dataminimalisatie**: geboortedatum/ID alleen als het echt nodig is voor de beoordeling; leg uit waarom (FAQ "Waarom vragen jullie een adresverificatie?").
- Verzend via HTTPS; sla niet op in `localStorage`; geen formuliergegevens in URL's of analytics.
- Geen tracking-/marketingcookies zonder cookietoestemming.
- Bewaartermijn en verwerkers (formulierdienst, e-mail) in de privacyverklaring.

## Afhandeling (backend-opties)
- Statische site: Formspree / Netlify Forms / Cloudflare Worker die mailt.
- In het template: `data-demo` op het formulier toont alleen een bevestiging en verstuurt niets.
- Altijd spambescherming: honeypot-veld (`name="website"`, verborgen) en eventueel Cloudflare Turnstile.
