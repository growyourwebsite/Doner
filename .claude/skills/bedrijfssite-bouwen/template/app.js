/* Rendert de site uit window.SITE. Geen framework, geen build-stap. */
(function () {
  "use strict";

  // Demo-beheer: een in deze browser opgeslagen versie heeft voorrang.
  try {
    const opgeslagen = localStorage.getItem("site-data");
    if (opgeslagen) window.SITE = JSON.parse(opgeslagen);
  } catch (e) { /* geen opslag beschikbaar */ }

  const S = window.SITE;
  const $ = (sel) => document.querySelector(sel);
  const euro = (n) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  const getal = (n) => new Intl.NumberFormat("nl-NL").format(n);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (obj, pad) => pad.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
  const slug = (s) => String(s).toLowerCase().replace(/\s+/g, "-");

  /* ---------- Teksten en vaste blokken ---------- */
  document.querySelectorAll("[data-veld]").forEach((el) => { el.textContent = pad(S, el.dataset.veld) ?? ""; });

  if (S.demo) {
    const balk = $("#demobalk");
    balk.hidden = false;
    balk.innerHTML = `${esc(S.demoTekst)} <a href="rondleiding.html">Bekijk de rondleiding</a> · <a href="beheer.html">Bekijk het beheer</a> · <button type="button">Sluiten</button>`;
    balk.querySelector("button").onclick = () => (balk.hidden = true);
  }

  $("#logo").innerHTML = `${esc(S.bedrijf.naam)}<small>${esc(S.bedrijf.sub)}</small>`;
  $("#nav").innerHTML = S.menu.map(([t, h]) => `<a href="${esc(h)}">${esc(t)}</a>`).join("");
  const menuknop = $("#menuknop");
  menuknop.onclick = () => { const open = $("#nav").classList.toggle("open"); menuknop.setAttribute("aria-expanded", open); };
  $("#nav").addEventListener("click", (e) => { if (e.target.tagName === "A") { $("#nav").classList.remove("open"); menuknop.setAttribute("aria-expanded", "false"); } });

  $("#hero-knoppen").innerHTML =
    `<a class="knop" href="${esc(S.hero.cta[1])}">${esc(S.hero.cta[0])}</a>` +
    (S.hero.cta2 ? `<a class="knop knop--licht" href="${esc(S.hero.cta2[1])}">${esc(S.hero.cta2[0])}</a>` : "");

  const cijfer = ([a, b]) => `<div class="cijfer"><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`;
  $("#kerncijfers").innerHTML = S.kerncijfers.map(cijfer).join("");
  $("#over-ons").innerHTML = S.overOns.map(cijfer).join("");
  $("#voordelen").innerHTML = S.voordelen.map(([k, t]) => `<li><strong>${esc(k)}</strong> ${esc(t)}</li>`).join("");
  $("#keurmerken").innerHTML = S.keurmerken.map(([k, t]) => `<li><strong>${esc(k)}</strong> · ${esc(t)}</li>`).join("") +
    `<li><strong>KvK-nummer</strong> ${esc(S.bedrijf.kvk)}</li>`;
  $("#stappen").innerHTML = S.stappen.map(([k, t]) => `<li><strong>${esc(k)}</strong>${esc(t)}</li>`).join("");
  $("#faq").innerHTML = S.faq.map(([v, a]) => `<details><summary>${esc(v)}</summary><p>${esc(a)}</p></details>`).join("");
  $("#slot-kop").textContent = S.slot[0];
  Object.assign($("#slot-cta"), { textContent: S.slot[1], href: S.slot[2] });

  /* ---------- Productkaarten ---------- */
  function kaart(p) {
    const foto = p.foto ? `<img src="${esc(p.foto)}" alt="${esc(p.naam)}" loading="lazy" width="640" height="400">` : esc(p.naam);
    return `<article class="kaart">
      <div class="foto"><span class="badge badge--${slug(p.status)}">${esc(p.status)}</span>${foto}</div>
      <div class="inhoud">
        <h3>${esc(p.naam)}</h3><div class="klein">${esc(p.uitvoering)}</div>
        <ul class="specs">${p.specs.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        <div class="prijs"><div><small>vanaf p/m, excl. btw</small><strong>${euro(p.prijsMaand)}</strong></div>
          <a class="knop knop--klein" href="#bereken" data-kies="${esc(p.id)}">${p.status === "Binnenkort" ? "Reserveer" : "Bereken"}</a></div>
      </div></article>`;
  }

  const uitgelicht = S.producten.find((p) => p.status === "Binnenkort") || S.producten[0];
  if (uitgelicht) $("#uitgelicht").innerHTML = kaart(uitgelicht).replace(/^<article class="kaart">|<\/article>$/g, "");

  function toonAanbod(filter) {
    const lijst = filter === "Alles" ? S.producten : S.producten.filter((p) => p.status === filter);
    $("#kaarten").innerHTML = lijst.length ? lijst.map(kaart).join("") : `<p class="leeg">Geen auto's in deze categorie. Laat ons voor u zoeken.</p>`;
    document.querySelectorAll("#filters button").forEach((b) => b.setAttribute("aria-selected", b.dataset.f === filter));
  }
  $("#filters").innerHTML = S.filters.map((f) => {
    const n = f === "Alles" ? S.producten.length : S.producten.filter((p) => p.status === f).length;
    return `<button role="tab" data-f="${esc(f)}">${esc(f)} (${n})</button>`;
  }).join("");
  $("#filters").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) toonAanbod(b.dataset.f); });
  toonAanbod("Alles");

  /* ---------- Leasecalculator ---------- */
  const C = S.calculator;
  const st = { product: S.producten[0]?.id, looptijd: C.looptijden[C.looptijden.length - 1], km: C.inclusiefKmPerJaar };
  const prodSel = $("#calc-product"), kmIn = $("#calc-km");
  prodSel.innerHTML = S.producten.map((p) => `<option value="${esc(p.id)}">${esc(p.naam)}</option>`).join("");
  $("#calc-looptijd").innerHTML = C.looptijden.map((l) => `<button type="button" data-l="${l}">${l}</button>`).join("");
  Object.assign(kmIn, { min: C.kmMin, max: C.kmMax, step: C.kmStap, value: st.km });
  $("#calc-km-uitleg").textContent = `Tot en met ${getal(C.inclusiefKmPerJaar)} km per jaar geldt het basistarief. Daarboven rekenen wij € ${C.prijsPerExtraKm.toFixed(2).replace(".", ",")} per extra kilometer, omgerekend per maand.`;
  $("#calc-inbegrepen").innerHTML = C.inbegrepen.map((i) => `<li>${esc(i)}</li>`).join("");

  function bereken() {
    const p = S.producten.find((x) => x.id === st.product);
    if (!p) return;
    const basis = p.prijsMaand * (C.looptijdFactor[st.looptijd] || 1);
    const extraKm = Math.max(0, st.km - C.inclusiefKmPerJaar);
    const toeslag = (extraKm * C.prijsPerExtraKm) / 12;
    const totaal = Math.round(basis + toeslag);
    $("#calc-naam").textContent = p.naam;
    $("#calc-km-label").textContent = `${getal(st.km)} km`;
    $("#calc-totaal").textContent = euro(totaal);
    $("#calc-incl").textContent = `${euro(Math.round(totaal * (1 + C.btw)))} incl. btw`;
    $("#calc-opbouw").innerHTML =
      `<dt>Looptijd</dt><dd>${st.looptijd} maanden</dd>` +
      `<dt>Basistarief</dt><dd>${euro(Math.round(basis))}</dd>` +
      `<dt>Toeslag extra kilometers</dt><dd>${toeslag ? euro(Math.round(toeslag)) : "geen"}</dd>` +
      `<dt>Per maand, excl. btw</dt><dd>${euro(totaal)}</dd>`;
    document.querySelectorAll("#calc-looptijd button").forEach((b) => b.setAttribute("aria-pressed", +b.dataset.l === st.looptijd));
    $("#calc-cta").href = `#aanvragen`;
    $("#calc-cta").dataset.kies = p.id;
  }
  prodSel.onchange = () => { st.product = prodSel.value; bereken(); };
  kmIn.oninput = () => { st.km = +kmIn.value; bereken(); };
  $("#calc-looptijd").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { st.looptijd = +b.dataset.l; bereken(); } });
  bereken();

  // Keuze uit een kaart of de calculator meenemen naar calculator/formulier
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-kies]");
    if (!a) return;
    st.product = a.dataset.kies; prodSel.value = st.product; bereken();
    if (a.id === "calc-cta") vulFormulier();
  });

  /* ---------- Keuzehulp ---------- */
  const K = S.keuzehulp, keuzes = [];
  $("#kh-vragen").innerHTML = K.vragen.map((v, i) =>
    `<fieldset><legend>${i + 1}. ${esc(v.vraag)}</legend><div class="opties">` +
    v.opties.map(([t, w]) => `<button type="button" data-v="${i}" data-w="${esc(w)}" aria-pressed="false">${esc(t)}</button>`).join("") +
    `</div></fieldset>`).join("");
  $("#kh-vragen").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    keuzes[b.dataset.v] = b.dataset.w;
    b.parentElement.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    toonKeuzehulp();
  });
  function toonKeuzehulp() {
    const gekozen = keuzes.filter((k) => k !== undefined);
    if (!gekozen.length) { $("#kh-resultaat").innerHTML = `<p class="leeg">Kies hierboven wat bij u past. De passende auto's verschijnen hier direct.</p>`; return; }
    const max = Math.min(...gekozen.filter((k) => k.startsWith("max:")).map((k) => +k.slice(4)), Infinity);
    const tags = gekozen.filter((k) => k && !k.startsWith("max:"));
    let lijst = S.producten
      .map((p) => ({ p, score: tags.filter((t) => p.tags.includes(t)).length }))
      .filter((x) => x.p.prijsMaand <= max)
      .sort((a, b) => b.score - a.score || a.p.prijsMaand - b.p.prijsMaand);
    if (tags.length) lijst = lijst.filter((x) => x.score > 0);
    $("#kh-resultaat").innerHTML = lijst.length
      ? lijst.slice(0, 4).map((x) => kaart(x.p)).join("")
      : `<p class="leeg">Geen exacte match in ons aanbod. <a href="#aanvragen">Laat ons voor u zoeken</a>, wij kopen in op aanvraag.</p>`;
  }
  toonKeuzehulp();

  /* ---------- Openingsstatus ---------- */
  function openStatus() {
    const nu = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" }));
    const dag = nu.getDay(), hhmm = nu.toTimeString().slice(0, 5), T = S.openingstijden;
    const dagen = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
    const el = $("#open-status");
    const vandaag = T[dag];
    if (vandaag && hhmm >= vandaag[0] && hhmm < vandaag[1]) { el.textContent = `Nu open tot ${vandaag[1]}`; el.classList.add("open"); return; }
    el.classList.remove("open");
    if (vandaag && hhmm < vandaag[0]) { el.textContent = `Gesloten, vandaag open vanaf ${vandaag[0]}`; return; }
    for (let i = 1; i <= 7; i++) {
      const d = (dag + i) % 7;
      if (T[d]) { el.textContent = `Gesloten, ${i === 1 ? "morgen" : dagen[d]} open vanaf ${T[d][0]}`; return; }
    }
    el.textContent = "Gesloten";
  }
  openStatus(); setInterval(openStatus, 60000);

  /* ---------- Formulier ---------- */
  const form = $("#aanvraag");
  $("#f-auto").innerHTML = `<option value="">Weet ik nog niet / zoek voor mij</option>` +
    S.producten.map((p) => `<option value="${esc(p.id)}">${esc(p.naam)}</option>`).join("");
  $("#f-looptijd").innerHTML = C.looptijden.map((l) => `<option>${l} maanden</option>`).join("");
  function vulFormulier() {
    $("#f-auto").value = st.product;
    $("#f-looptijd").value = `${st.looptijd} maanden`;
    $("#f-km").value = st.km;
  }
  vulFormulier();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.querySelectorAll(".fout").forEach((f) => f.remove());
    let eerste = null;
    form.querySelectorAll("input, select, textarea").forEach((veld) => {
      if (!veld.checkValidity()) {
        const msg = veld.validity.valueMissing ? "Dit veld is verplicht." : "Controleer dit veld" + (veld.title ? ` (${veld.title}).` : ".");
        veld.closest("label").insertAdjacentHTML("beforeend", `<span class="fout">${msg}</span>`);
        eerste = eerste || veld;
      }
    });
    if (eerste) { eerste.focus(); return; }
    if (form.website.value) return; // honeypot
    const melding = $("#f-melding");
    melding.hidden = false;
    melding.textContent = form.hasAttribute("data-demo")
      ? "Demo: uw aanvraag is niet echt verstuurd. In de live versie bellen wij u binnen één werkdag."
      : "Bedankt! Wij nemen binnen één werkdag contact met u op.";
    // Live: verstuur hier met fetch() naar uw formulierdienst (zie skill formulieren-avg).
  });

  /* ---------- Footer ---------- */
  const B = S.bedrijf, dagenKort = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
  const tijden = [1, 2, 3, 4, 5, 6, 0].map((d) => `<li>${dagenKort[d]}: ${S.openingstijden[d] ? S.openingstijden[d].join(" – ") : "gesloten"}</li>`).join("");
  $("#footer").innerHTML =
    `<div><h4>${esc(B.naam)} ${esc(B.sub)}</h4><p>${esc(B.adres.straat)}<br>${esc(B.adres.postcode)} ${esc(B.adres.plaats)}</p></div>` +
    `<div><h4>Contact</h4><ul><li><a href="tel:${esc(B.telefoon.replace(/\s/g, ""))}">${esc(B.telefoon)}</a></li><li><a href="mailto:${esc(B.email)}">${esc(B.email)}</a></li></ul></div>` +
    `<div><h4>Openingstijden</h4><ul>${tijden}</ul></div>` +
    `<div><h4>Populair</h4><ul>${S.seoLinks.map(([t, h]) => `<li><a href="${esc(h)}">${esc(t)}</a></li>`).join("")}</ul></div>`;
  $("#footer-onder").innerHTML = `<span>© ${new Date().getFullYear()} ${esc(B.naam)} · KvK ${esc(B.kvk)}</span>` +
    `<span><a href="#privacy" id="privacy">Privacyverklaring</a> · <a href="beheer.html">Beheer</a></span>`;

  /* ---------- Structured data ---------- */
  (function injectSchema() {
    const dagNamen = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const zaak = {
      "@context": "https://schema.org", "@type": B.schemaType || "LocalBusiness", name: `${B.naam} ${B.sub}`, url: B.url,
      telephone: B.telefoon, email: B.email,
      address: { "@type": "PostalAddress", streetAddress: B.adres.straat, postalCode: B.adres.postcode, addressLocality: B.adres.plaats, addressCountry: "NL" },
      openingHoursSpecification: S.openingstijden.map((t, d) => t && { "@type": "OpeningHoursSpecification", dayOfWeek: dagNamen[d], opens: t[0], closes: t[1] }).filter(Boolean)
    };
    if (B.reviews) zaak.aggregateRating = { "@type": "AggregateRating", ratingValue: B.reviews.score, reviewCount: B.reviews.aantal };
    const faq = { "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: S.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
    [zaak, faq].forEach((obj) => {
      const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(obj); document.head.appendChild(s);
    });
  })();
})();
