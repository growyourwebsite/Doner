/* Alle inhoud van de site. Pas dit bestand aan per klant; index.html blijft gelijk.
   Alles hieronder is VOORBEELDDATA. */
window.SITE = {
  demo: true,
  demoTekst: "Conceptversie: aanbod, tarieven en de rekenformule zijn voorbeelddata.",

  bedrijf: {
    naam: "Voorbeeld",
    sub: "Autolease",
    schemaType: "AutoDealer",
    kvk: "00000000",
    telefoon: "020 000 00 00",
    email: "info@voorbeeld.nl",
    adres: { straat: "Voorbeeldstraat 1", postcode: "1000 AA", plaats: "Amsterdam" },
    url: "https://www.voorbeeld.nl/",
    // Alleen echte, verifieerbare cijfers invullen. null = niet tonen.
    reviews: null // { score: 4.7, aantal: 53, url: "https://g.page/..." }
  },

  // Index 0 = zondag ... 6 = zaterdag. null = gesloten.
  openingstijden: [null, ["09:00","17:30"], ["09:00","17:30"], ["09:00","17:30"], ["09:00","17:30"], ["09:00","17:30"], ["10:00","17:00"]],

  menu: [["Aanbod","#aanbod"],["Bereken","#bereken"],["Zo werkt het","#werkwijze"],["Aanvragen","#aanvragen"],["Vragen","#vragen"]],

  hero: {
    eyebrow: "OCCASION LEASE · ZZP EN MKB · HEEL NEDERLAND",
    kop: "Zakelijk leasen zonder gedoe",
    tekst: "U bent ondernemer en wilt gewoon een goede auto rijden. U leaset een jonge occasion voor één vast bedrag per maand. Verzekering, wegenbelasting en onderhoud zitten erin.",
    cta: ["Bekijk het aanbod", "#aanbod"],
    cta2: ["Bereken uw maandbedrag", "#bereken"],
    drempel: "Vrijblijvend, u zit nergens aan vast."
  },

  kerncijfers: [["All-in","verzekering, belasting, onderhoud"],["2.000 km","per maand inbegrepen"],["1 week","van akkoord tot sleutel"],["12–48","maanden looptijd"]],

  overOns: [["Sinds 1950","familiebedrijf"],["40","medewerkers"],["2 vestigingen","in de regio"],["Eigen werkplaats","onderhoud in eigen huis"]],

  aanbodTitel: "Ons aanbod",
  aanbodIntro: "Direct leverbaar staat klaar in onze hal. Op aanvraag kopen wij voor u in.",
  filters: ["Alles", "Direct leverbaar", "Binnenkort"],
  producten: [
    { id: "golf", naam: "Volkswagen Golf", uitvoering: "1.5 eTSI Life Business", status: "Direct leverbaar",
      specs: ["2023","33.800 km","Benzine","Automaat"], prijsMaand: 712, tags: ["stad","zakelijk","benzine"], foto: "" },
    { id: "octavia", naam: "Skoda Octavia Combi", uitvoering: "1.5 TSI Business Edition", status: "Direct leverbaar",
      specs: ["2022","36.900 km","Benzine","Automaat"], prijsMaand: 729, tags: ["ruimte","zakelijk","benzine"], foto: "" },
    { id: "330e", naam: "BMW 3 Serie Touring", uitvoering: "330e Business Edition Plus", status: "Direct leverbaar",
      specs: ["2023","31.200 km","Plug-in hybride","Automaat"], prijsMaand: 978, tags: ["ruimte","veel-km","hybride"], foto: "" },
    { id: "yaris", naam: "Toyota Yaris Hybrid", uitvoering: "1.5 Hybrid", status: "Binnenkort",
      specs: ["2022–2024","Hybride","Automaat"], prijsMaand: 483, tags: ["stad","zuinig","hybride"], foto: "" },
    { id: "niro-ev", naam: "Kia Niro EV", uitvoering: "64,8 kWh", status: "Binnenkort",
      specs: ["2022–2023","Elektrisch","Automaat"], prijsMaand: 716, tags: ["veel-km","elektrisch","zuinig"], foto: "" }
  ],

  calculator: {
    titel: "Wat kost het per maand?",
    looptijden: [12, 24, 36, 48],
    looptijdFactor: { 12: 1.18, 24: 1.09, 36: 1.03, 48: 1 }, // prijsMaand geldt bij 48 maanden
    kmMin: 10000, kmMax: 50000, kmStap: 1000,
    inclusiefKmPerJaar: 24000,
    prijsPerExtraKm: 0.19,
    btw: 0.21,
    inbegrepen: ["Verzekering", "Wegenbelasting", "Onderhoud", "Eén vast bedrag per maand"],
    kleineLetters: "Indicatie, geen offerte. Het definitieve bedrag hangt af van de auto en uw aanvraag. Borg: één leasetermijn."
  },

  keuzehulp: {
    titel: "Twijfelt u? Beantwoord drie vragen",
    vragen: [
      { vraag: "Waarvoor gebruikt u de auto?", opties: [["Vooral in de stad","stad"],["Spullen of gereedschap mee","ruimte"],["Lange ritten","veel-km"]] },
      { vraag: "Welke aandrijving heeft uw voorkeur?", opties: [["Zo zuinig mogelijk","zuinig"],["Hybride","hybride"],["Elektrisch","elektrisch"],["Maakt niet uit",""]] },
      { vraag: "Wat is uw budget per maand?", opties: [["Tot € 600","max:600"],["€ 600 tot € 800","max:800"],["Meer dan € 800","max:99999"]] }
    ]
  },

  voordelen: [
    ["Geen jaarcijfers nodig.", "Wij kijken naar u en uw bedrijf, niet alleen naar papier."],
    ["2.000 kilometer per maand inbegrepen.", "Rijdt u meer, dan ziet u de toeslag vooraf in de calculator."],
    ["Snel geregeld.", "Na goedkeuring rijdt u een auto uit voorraad binnen een week."],
    ["Eén aanspreekpunt, eigen werkplaats.", "Vaste mensen en onderhoud door onze eigen monteurs."]
  ],

  keurmerken: [["BOVAG-lid (voorbeeld)", "Aangesloten bij de brancheorganisatie voor mobiliteitsbedrijven."], ["KvK", "Ingeschreven bij de Kamer van Koophandel."]],

  stappen: [
    ["Kies en bereken", "Kies een auto of noem de auto die u zoekt. Bereken uw maandbedrag."],
    ["Dien uw aanvraag in", "Auto, bedrijf en contactgegevens. Dat kost twee minuten."],
    ["Wij bellen u", "Wij bespreken uw aanvraag en doen onze check."],
    ["Akkoord en contract", "U krijgt ons voorstel met het exacte maandbedrag, de borg en het eigen risico."],
    ["Tekenen en rijden", "Akkoord? Dan tekent u en rijdt u weg. Verzekerd en alles geregeld."]
  ],

  faq: [
    ["Voor wie is dit bedoeld?", "Voor zzp'ers en mkb-bedrijven in heel Nederland die een jonge occasion willen leasen voor een vast bedrag per maand."],
    ["Hoeveel kilometer mag ik rijden?", "24.000 km per jaar zit in het maandbedrag. Daarboven betaalt u € 0,19 per extra kilometer, excl. btw."],
    ["Wat zit er in het maandbedrag?", "Verzekering, wegenbelasting, onderhoud en pechhulp."],
    ["Betaal ik een borg?", "Ja, de borg is één leasetermijn."],
    ["Hoe snel kan ik rijden?", "Na goedkeuring rijdt u een auto uit voorraad meestal binnen een week."],
    ["Wat is de kortste looptijd?", "12 maanden. Korter kan via onze verhuur."]
  ],

  slot: ["Klaar om te rijden?", "Aanvraag indienen", "#aanvragen"],

  seoLinks: [["Zakelijk leasen zonder jaarcijfers", "landingspagina.html"], ["Occasion lease voor zzp'ers", "landingspagina.html"]]
};
