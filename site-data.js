/* Inhoud van de site USTAM Döner.
   Bron: Google Maps-profiel en de menukaart in de zaak (november 2026).
   Gemarkeerd met TODO: nog bevestigen met de eigenaar. */
window.SITE = {
  demo: true,
  demoTekst: "Concept voor USTAM Döner: menu en prijzen komen van de menukaart in de zaak. Online bestellen werkt nog niet.",

  bedrijf: {
    naam: "USTAM",
    sub: "Döner",
    telefoon: "06 34774744",
    telefoonLink: "+31634774744",
    email: "info@ustamdoner.nl",
    adres: { straat: "Groene Hilledijk 300B", postcode: "3074 AG", plaats: "Rotterdam" },
    url: "https://www.ustamdoner.nl/",
    route: "https://www.google.com/maps/search/?api=1&query=USTAM+Doner+Groene+Hilledijk+300B+3074+AG+Rotterdam",
    // Echte cijfers van het Google-profiel (1 nov 2026). Bijwerken wanneer ze veranderen.
    reviews: { score: 4.9, aantal: 457, url: "https://www.google.com/maps/search/?api=1&query=USTAM+Doner+Rotterdam" },
    prijsklasse: "€ 10–20 p.p."
  },

  // 0 = zondag ... 6 = zaterdag. null = gesloten.
  openingstijden: [["13:00","22:00"], null, ["13:00","22:00"], ["13:00","22:00"], ["13:00","22:00"], ["13:00","22:00"], ["13:00","22:00"]],

  verhaal: [
    "Bij USTAM Döner is onze döner geen kant-en-klaar product.",
    "Ons vlees wordt elke dag zorgvuldig geselecteerd en bereid met speciale kruiden door onze eigen chef. We bereiden onze döner zelf, op de traditionele manier en zonder toevoegingen.",
    "Zo proef je de frisse, natuurlijke en echte dönersmaak in elke hap. Met trots voor iedereen die waarde hecht aan kwaliteit en vakmanschap."
  ],

  // Vaak genoemd in Google-reviews ("broodje" 15×, "arroz con leche"/rijstpudding 12×)
  favorieten: ["broodje", "sutlac"],

  // Döner: twee prijzen (vlees / kip)
  doner: [
    { id: "portie", naam: "Portie Döner", tekst: "Op een bord met warm brood, salade, tomaat en rode ui.", vlees: 15, kip: 13, foto: "img/portie" },
    { id: "rijst", naam: "Döner met Rijst", tekst: "Döner met rijst en verse salade.", vlees: 18, kip: 16 },
    { id: "wrap", naam: "Wrap Döner Ustam Saus", tekst: "Opgerold in een wrap, met onze eigen Ustam-saus.", vlees: 14, kip: 12 },
    { id: "broodje", naam: "Broodje Döner", tekst: "In vers brood met salade, tomaat en ui.", vlees: 14, kip: 12, foto: "img/broodje" },
    { id: "gobit", naam: "Göbit (Pita) Döner", tekst: "In Turks pitabrood.", vlees: 14, kip: 12 }
  ],

  menu: [
    { id: "meze", titel: "Tapas, salade en soep", items: [
      { id: "tapas", naam: "Pittige Tapas", prijs: 4.5 },
      { id: "hummus", naam: "Hummus", prijs: 4.5 },
      { id: "muammara", naam: "Muammara", tekst: "Dip van paprika en walnoot.", prijs: 4.5 },
      { id: "yoghurt", naam: "Yoghurt met Aubergines", prijs: 4.5 },
      { id: "salade", naam: "Salade", prijs: 6 },
      { id: "linzensoep", naam: "Linzensoep", prijs: 6 }
    ]},
    { id: "dessert", titel: "Desserts", items: [
      { id: "sutlac", naam: "Turkse Rijstpudding", tekst: "Sütlaç uit de oven.", prijs: 7 },
      { id: "broodpudding", naam: "Gekarameliseerde Broodpudding", prijs: 10 }
    ]},
    { id: "dranken", titel: "Dranken", items: [
      { id: "cola", naam: "Coca-Cola", prijs: 3 }, { id: "cola0", naam: "Coca-Cola Zero", prijs: 3 },
      { id: "fanta", naam: "Fanta", prijs: 3 }, { id: "redbull", naam: "Red Bull", prijs: 3.25 },
      { id: "icetea", naam: "Ice Tea Peach", prijs: 3 }, { id: "appelsap", naam: "Appelsap", prijs: 3 },
      { id: "chocomelk", naam: "Chocomelk", prijs: 3 }, { id: "spa", naam: "Spa Blauw", prijs: 2.75 },
      { id: "ayran", naam: "Ayran", prijs: 2.5 }, { id: "yayik", naam: "Yayık Ayran", prijs: 3.5 },
      { id: "gazoz", naam: "Niğde Gazoz", prijs: 2.5 }, { id: "soda", naam: "Beypazarı Soda", prijs: 2.5 },
      { id: "cay", naam: "Çay", prijs: 2 }, { id: "nane", naam: "Nane Çay / Muntthee", prijs: 2.75 },
      { id: "koffie", naam: "Koffie", prijs: 3 }, { id: "cappu", naam: "Cappuccino", prijs: 3.25 },
      { id: "espresso", naam: "Espresso", prijs: 2.5 }, { id: "latte", naam: "Latte Macchiato", prijs: 3.5 }
    ]}
  ],

  // Letterlijke (ingekorte) Google-reviews, publiek zichtbaar op het profiel.
  reviews: [
    ["Heerlijke originele döner. Geen bakkerijdöner maar echte kwalitatieve yaprak! Zeer fijne en snelle, respectvolle bediening.", "A. G."],
    ["Service was top en eten was lekker vers en goed op smaak.", "M."],
    ["Wauw… wat was het heerlijk! We hebben enorm genoten van zowel het eten als de gastvrijheid.", "Safiyya E."],
    ["Geen standaard broodje-dönerzaak.", "Google-reviewer"]
  ],
  reviewTags: [["gastvrij", 22], ["broodje", 15], ["rijstpudding", 12], ["turks", 11], ["meze", 9], ["toetjes", 8]],

  faq: [
    ["Wanneer zijn jullie open?", "Dinsdag tot en met zondag van 13:00 tot 22:00. Op maandag zijn we gesloten."],
    ["Maken jullie de döner zelf?", "Ja. Onze chef selecteert het vlees elke dag en bereidt de döner zelf, met eigen kruiden en zonder toevoegingen. Het is geen kant-en-klaar product."],
    ["Wat is het verschil tussen vlees- en kipdöner?", "Je kunt elk gerecht met vlees of kip bestellen. Kip is € 2 goedkoper, bijvoorbeeld een portie döner voor € 13 in plaats van € 15."],
    ["Wat kost een maaltijd?", "Gemiddeld betaal je € 10 tot € 20 per persoon. Een broodje of wrap döner kost € 12 tot € 14, een portie met rijst € 16 tot € 18."],
    ["Wat is er naast döner?", "Kleine gerechten om te delen: hummus, muammara, yoghurt met aubergines, pittige tapas, salade en linzensoep. En als toetje onze Turkse rijstpudding, volgens onze gasten een aanrader."],
    ["Kan ik bellen voor een vraag of grote groep?", "Natuurlijk. Bel ons op 06 34774744 of mail naar info@ustamdoner.nl."]
  ]
};
