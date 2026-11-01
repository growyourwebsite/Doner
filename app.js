/* USTAM Döner: rendert de site uit window.SITE (site-data.js). Vanilla JS. */
(function () {
  "use strict";

  // Demo-beheer: een in deze browser opgeslagen versie heeft voorrang.
  try { const o = localStorage.getItem("ustam-site-data"); if (o) window.SITE = JSON.parse(o); } catch (e) {}

  const S = window.SITE, B = S.bedrijf;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const euro = (n) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);
  const euroKort = (n) => euro(n).replace(",00", ",-");
  const favorieten = S.favorieten || [];
  const dagen = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

  /* ---------- Vaste links en teksten ---------- */
  $$("[data-tel]").forEach((a) => { a.href = `tel:${B.telefoonLink}`; if (!a.textContent.trim()) a.textContent = B.telefoon; });
  $$("[data-route]").forEach((a) => (a.href = B.route));

  if (S.demo) {
    const balk = $("#demobalk");
    balk.hidden = false;
    balk.innerHTML = `${esc(S.demoTekst)} <a href="rondleiding.html">Rondleiding</a> · <a href="beheer.html">Beheer</a> · <button type="button">Sluiten</button>`;
    $("button", balk).onclick = () => (balk.hidden = true);
  }

  const menuknop = $("#menuknop"), nav = $("#nav");
  menuknop.onclick = () => { const open = nav.classList.toggle("open"); menuknop.setAttribute("aria-expanded", open); };
  nav.addEventListener("click", (e) => { if (e.target.tagName === "A") { nav.classList.remove("open"); menuknop.setAttribute("aria-expanded", "false"); } });

  const scoreNl = String(B.reviews.score).replace(".", ",");
  Object.assign($("#hero-score"), { href: B.reviews.url });
  $("#hero-score").innerHTML = `<span class="sterren" aria-hidden="true">★★★★★</span><strong>${scoreNl}</strong> uit ${B.reviews.aantal} Google-reviews`;
  $("#reviews-link").href = B.reviews.url;
  $("#verhaal-tekst").innerHTML = S.verhaal.map((p) => `<p>${esc(p)}</p>`).join("");

  /* ---------- Menukaart ---------- */
  const foto = (pad, alt) => pad
    ? `<picture><source srcset="${esc(pad)}.webp" type="image/webp"><img src="${esc(pad)}.jpg" alt="${esc(alt)}" loading="lazy" width="434" height="271"></picture>` : "";
  const badge = (id) => (favorieten.includes(id) ? ` <span class="badge">Favoriet bij gasten</span>` : "");
  const prijsknop = (sleutel, naam, prijs, label) =>
    `<button type="button" class="prijsknop" data-sleutel="${esc(sleutel)}" data-naam="${esc(naam)}" data-prijs="${prijs}"
       aria-label="${esc(naam)} voor ${euro(prijs)} toevoegen aan je lijstje">${label ? `<span>${esc(label)}</span>` : ""}<strong>${euro(prijs)}</strong></button>`;

  const panelen = [{ id: "doner", titel: "Döner" }].concat(S.menu.map((c) => ({ id: c.id, titel: c.titel })));
  $("#tabs").innerHTML = panelen.map((p, i) =>
    `<button role="tab" id="tab-${p.id}" aria-controls="paneel-${p.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(p.titel)}</button>`).join("");

  const donerHtml = `<div class="gerechten">` + [...S.doner].sort((a, b) => !!b.foto - !!a.foto).map((g) => `
    <article class="gerecht${g.foto ? " gerecht--foto" : ""}">
      ${foto(g.foto, g.naam)}
      <div class="gerecht__in">
        <h3>${esc(g.naam)}${badge(g.id)}</h3>
        <p>${esc(g.tekst || "")}</p>
        <div class="keuze">
          ${prijsknop(g.id + ":vlees", g.naam + " (vlees)", g.vlees, "Vlees")}
          ${prijsknop(g.id + ":kip", g.naam + " (kip)", g.kip, "Kip")}
        </div>
      </div>
    </article>`).join("") + `</div>`;

  const lijstHtml = (cat) => `<ul class="lijst-items">` + cat.items.map((it) => `
    <li><span class="naam">${esc(it.naam)}${badge(it.id)}${it.tekst ? `<small>${esc(it.tekst)}</small>` : ""}</span>
      ${prijsknop(it.id, it.naam, it.prijs)}</li>`).join("") + `</ul>`;

  $("#menu-panelen").innerHTML =
    `<div class="paneel" role="tabpanel" id="paneel-doner" aria-labelledby="tab-doner">${donerHtml}</div>` +
    S.menu.map((c) => `<div class="paneel" role="tabpanel" id="paneel-${c.id}" aria-labelledby="tab-${c.id}" hidden>${lijstHtml(c)}</div>`).join("") +
    `<p class="klein menukaart-noot">Alle prijzen zijn inclusief btw en komen van de menukaart in de zaak.</p>`;

  function kiesTab(knop, focus) {
    $$("#tabs button").forEach((b) => { const ja = b === knop; b.setAttribute("aria-selected", ja); b.tabIndex = ja ? 0 : -1; $("#" + b.getAttribute("aria-controls")).hidden = !ja; });
    if (focus) knop.focus();
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
  $("#tabs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) kiesTab(b); });
  $("#tabs").addEventListener("keydown", (e) => {
    const knoppen = $$("#tabs button"), i = knoppen.indexOf(document.activeElement);
    if (e.key === "ArrowRight") kiesTab(knoppen[(i + 1) % knoppen.length], true);
    if (e.key === "ArrowLeft") kiesTab(knoppen[(i - 1 + knoppen.length) % knoppen.length], true);
  });

  /* ---------- Mijn lijstje ---------- */
  let lijst = {};
  try { lijst = JSON.parse(sessionStorage.getItem("ustam-lijst")) || {}; } catch (e) {}
  const lijstEl = $("#lijst"), balk = $("#lijstbalk");

  function bewaar() { try { sessionStorage.setItem("ustam-lijst", JSON.stringify(lijst)); } catch (e) {} }
  function totaal() { return Object.values(lijst).reduce((t, r) => t + r.prijs * r.aantal, 0); }
  function aantal() { return Object.values(lijst).reduce((t, r) => t + r.aantal, 0); }

  function tekenLijst() {
    const regels = Object.entries(lijst);
    $("#lijst-regels").innerHTML = regels.length
      ? regels.map(([k, r]) => `<li><span>${esc(r.naam)}</span><strong>${euro(r.prijs * r.aantal)}</strong>
          <span class="aantal"><button type="button" data-min="${esc(k)}" aria-label="Eén ${esc(r.naam)} minder">−</button>
          <span aria-label="aantal">${r.aantal}</span>
          <button type="button" data-plus="${esc(k)}" aria-label="Eén ${esc(r.naam)} meer">+</button></span></li>`).join("")
      : `<li class="leeg">Nog leeg. Tik op een prijs in de menukaart om iets toe te voegen.</li>`;
    $("#lijst-totaal").textContent = euro(totaal());
    const n = aantal();
    balk.hidden = n === 0;
    balk.innerHTML = `<span>Mijn lijstje (${n})</span><span>${euro(totaal())}</span>`;
    $$(".prijsknop").forEach((b) => b.classList.toggle("toegevoegd", !!lijst[b.dataset.sleutel]));
  }

  document.addEventListener("click", (e) => {
    const p = e.target.closest(".prijsknop");
    if (p) {
      const k = p.dataset.sleutel;
      lijst[k] = lijst[k] || { naam: p.dataset.naam, prijs: +p.dataset.prijs, aantal: 0 };
      lijst[k].aantal++;
      bewaar(); tekenLijst();
      toast(`${p.dataset.naam} toegevoegd`);
      if (window.gsap && !matchMedia("(prefers-reduced-motion: reduce)").matches) gsap.fromTo(balk.hidden ? lijstEl : balk, { scale: 1.04 }, { scale: 1, duration: .35, ease: "back.out(3)" });
      return;
    }
    const plus = e.target.closest("[data-plus]"), min = e.target.closest("[data-min]");
    if (plus) { lijst[plus.dataset.plus].aantal++; }
    if (min) { const k = min.dataset.min; if (--lijst[k].aantal <= 0) delete lijst[k]; }
    if (plus || min) { bewaar(); tekenLijst(); }
  });

  function lijstOpen(open) {
    lijstEl.classList.toggle("open", open);
    balk.setAttribute("aria-expanded", open);
    if (open) $("#lijst-sluit").focus();
    if (window.lenis) open ? lenis.stop() : lenis.start();
  }
  balk.onclick = () => lijstOpen(true);
  $("#lijst-sluit").onclick = () => { lijstOpen(false); balk.focus(); };
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && lijstEl.classList.contains("open")) lijstOpen(false); });

  $("#lijst-kopieer").onclick = async () => {
    if (!aantal()) { toast("Je lijstje is nog leeg"); return; }
    const tekst = `Bestelling USTAM Döner\n` +
      Object.values(lijst).map((r) => `${r.aantal}× ${r.naam}  ${euro(r.prijs * r.aantal)}`).join("\n") +
      `\nTotaal: ${euro(totaal())}`;
    try { await navigator.clipboard.writeText(tekst); toast("Lijstje gekopieerd"); }
    catch (e) { window.prompt("Kopieer je lijstje:", tekst); }
  };

  let toastTimer;
  function toast(t) {
    const el = $("#toast"); el.textContent = t; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => (el.hidden = true), 1800);
  }
  tekenLijst();

  /* ---------- Reviews ---------- */
  $("#review-tags").innerHTML = S.reviewTags.map(([t, n]) => `<span>${esc(t)}<b>${n}</b></span>`).join("");
  $("#reviews-lijst").innerHTML = S.reviews.map(([q, n]) =>
    `<figure class="review reveal"><div class="sterren" aria-label="5 sterren">★★★★★</div><blockquote>“${esc(q)}”</blockquote><figcaption>${esc(n)} via Google</figcaption></figure>`).join("");

  /* ---------- Bezoek, openingstijden ---------- */
  $("#adres").innerHTML = `${esc(B.adres.straat)}<br>${esc(B.adres.postcode)} ${esc(B.adres.plaats)}<br>
    <a href="tel:${esc(B.telefoonLink)}">${esc(B.telefoon)}</a> · <a href="mailto:${esc(B.email)}">${esc(B.email)}</a>`;
  const T = S.openingstijden, volgorde = [2, 3, 4, 5, 6, 0, 1];
  function amsterdamNu() { return new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })); }
  function tekenTijden() {
    const vandaag = amsterdamNu().getDay();
    $("#tijden").innerHTML = volgorde.map((d) =>
      `<tr class="${d === vandaag ? "vandaag" : ""}"><td>${dagen[d][0].toUpperCase() + dagen[d].slice(1)}${d === vandaag ? " (vandaag)" : ""}</td><td>${T[d] ? T[d].join(" – ") : "Gesloten"}</td></tr>`).join("");
  }
  function openStatus() {
    const nu = amsterdamNu(), dag = nu.getDay(), hhmm = nu.toTimeString().slice(0, 5), el = $("#open-status"), v = T[dag];
    el.classList.remove("open");
    if (v && hhmm >= v[0] && hhmm < v[1]) { el.textContent = `Nu open tot ${v[1]}`; el.classList.add("open"); return; }
    if (v && hhmm < v[0]) { el.textContent = `Vandaag open vanaf ${v[0]}`; return; }
    for (let i = 1; i <= 7; i++) { const d = (dag + i) % 7; if (T[d]) { el.textContent = `Gesloten · ${i === 1 ? "morgen" : dagen[d]} vanaf ${T[d][0]}`; return; } }
  }
  tekenTijden(); openStatus(); setInterval(() => { openStatus(); tekenTijden(); }, 60000);

  /* ---------- FAQ ---------- */
  $("#faq").innerHTML = S.faq.map(([v, a]) => `<details><summary>${esc(v)}</summary><p>${esc(a)}</p></details>`).join("");

  /* ---------- Footer ---------- */
  const kort = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
  $("#footer").innerHTML = `
    <div><a href="#top" class="logo"><span class="logo__mark" aria-hidden="true">U</span><span>USTAM<small>Döner</small></span></a>
      <p>Huisgemaakte döner, meze en Turkse desserts in Rotterdam-Zuid.</p></div>
    <div><h4>Adres</h4><p>${esc(B.adres.straat)}<br>${esc(B.adres.postcode)} ${esc(B.adres.plaats)}</p><a href="${esc(B.route)}" target="_blank" rel="noopener">Route plannen</a></div>
    <div><h4>Contact</h4><ul><li><a href="tel:${esc(B.telefoonLink)}">${esc(B.telefoon)}</a></li><li><a href="mailto:${esc(B.email)}">${esc(B.email)}</a></li></ul></div>
    <div><h4>Open</h4><ul>${volgorde.map((d) => `<li>${kort[d]} ${T[d] ? T[d].join("–") : "gesloten"}</li>`).join("")}</ul></div>`;
  $("#footer-onder").innerHTML = `<span>© ${new Date().getFullYear()} USTAM Döner, Rotterdam</span><span><a href="#vragen">Vragen</a> · <a href="beheer.html">Beheer</a></span>`;

  /* ---------- Structured data ---------- */
  (function () {
    const dagEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const zaak = {
      "@context": "https://schema.org", "@type": "Restaurant", name: "USTAM Döner", url: B.url, telephone: B.telefoonLink, email: B.email,
      image: new URL("img/gevel.jpg", location.href).href, servesCuisine: ["Turks", "Döner"], priceRange: "€10–20",
      address: { "@type": "PostalAddress", streetAddress: B.adres.straat, postalCode: B.adres.postcode, addressLocality: B.adres.plaats, addressCountry: "NL" },
      openingHoursSpecification: T.map((t, d) => t && { "@type": "OpeningHoursSpecification", dayOfWeek: dagEn[d], opens: t[0], closes: t[1] }).filter(Boolean),
      hasMenu: { "@type": "Menu", hasMenuSection: [
        { "@type": "MenuSection", name: "Döner", hasMenuItem: S.doner.flatMap((g) => [["vlees", g.vlees], ["kip", g.kip]].map(([v, p]) =>
          ({ "@type": "MenuItem", name: `${g.naam} (${v})`, offers: { "@type": "Offer", price: p.toFixed(2), priceCurrency: "EUR" } }))) }
      ].concat(S.menu.map((c) => ({ "@type": "MenuSection", name: c.titel, hasMenuItem: c.items.map((it) =>
          ({ "@type": "MenuItem", name: it.naam, offers: { "@type": "Offer", price: it.prijs.toFixed(2), priceCurrency: "EUR" } })) }))) }
    };
    const faq = { "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: S.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
    [zaak, faq].forEach((o) => { const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(o); document.head.appendChild(s); });
  })();

  /* ---------- Smooth scroll (Lenis) + animaties (GSAP) ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    if (window.Lenis) {
      window.lenis = new Lenis({ anchors: { offset: -84 }, allowNestedScroll: true, stopInertiaOnNavigate: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Hero-intro
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-in", { y: 28, autoAlpha: 0, duration: .8, stagger: .1 })
        .from(".hero__beeld img", { scale: 1.08, duration: 1.4, ease: "power2.out" }, 0);

      // Secties die bij scrollen binnenkomen
      ScrollTrigger.batch(".reveal", {
        start: "top 88%", once: true,
        onEnter: (els) => gsap.from(els, { y: 32, autoAlpha: 0, duration: .8, stagger: .08, ease: "power2.out", overwrite: true })
      });

      // Kerncijfers tellen op
      $$("[data-tel-op]").forEach((el) => {
        const doel = +el.dataset.telOp, dec = +(el.dataset.decimalen || 0), o = { v: 0 };
        gsap.to(o, { v: doel, duration: 1.6, ease: "power1.out", scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => (el.textContent = o.v.toFixed(dec).replace(".", ",")) });
      });

      // Subtiele parallax op de foto bij ons verhaal
      gsap.to(".foto-stapel__klein", { yPercent: -12, ease: "none", scrollTrigger: { trigger: "#verhaal", start: "top bottom", end: "bottom top", scrub: true } });
    });
  }
})();
