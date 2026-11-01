#!/usr/bin/env node
/* Neemt een video-rondleiding + screenshots op van een site gebouwd met het template.
   Gebruik: node rondleiding.js <map-met-index.html | URL> [uitvoermap]
   Pas de stappen hieronder aan per site. */
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

(async () => {
  const bron = process.argv[2] || ".";
  const uit = path.resolve(process.argv[3] || "rondleiding-uitvoer");
  fs.mkdirSync(uit, { recursive: true });
  const url = /^https?:/.test(bron) ? bron : "file://" + path.resolve(bron, "index.html");

  const browser = await chromium.launch();

  // Screenshots mobiel en desktop
  for (const [naam, width, height] of [["mobiel", 390, 844], ["desktop", 1280, 800]]) {
    const p = await browser.newPage({ viewport: { width, height } });
    const fouten = [];
    p.on("pageerror", (e) => fouten.push(e.message));
    await p.goto(url);
    await p.screenshot({ path: path.join(uit, `${naam}.png`), fullPage: true });
    const scroll = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log(`${naam}: ${fouten.length ? "JS-fouten: " + fouten.join("; ") : "geen JS-fouten"}${scroll ? " · LET OP: horizontale scroll" : ""}`);
    await p.close();
  }

  // Video
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, recordVideo: { dir: uit, size: { width: 1280, height: 720 } } });
  const page = await ctx.newPage();
  const wacht = (ms) => page.waitForTimeout(ms);
  const naar = async (sel) => { await page.locator(sel).scrollIntoViewIfNeeded(); await wacht(1500); };

  await page.goto(url); await wacht(2000);
  await naar("#aanbod");
  const tabs = page.locator("#filters button");
  if (await tabs.count() > 1) { await tabs.nth(1).click(); await wacht(1200); await tabs.nth(0).click(); await wacht(800); }
  await naar("#bereken");
  await page.locator("#calc-looptijd button").first().click(); await wacht(1000);
  await page.locator("#calc-km").fill("36000"); await page.locator("#calc-km").dispatchEvent("input"); await wacht(1500);
  await naar("#keuzehulp");
  for (const i of [0, 1, 2]) {
    const b = page.locator(`#kh-vragen button[data-v="${i}"]`).first();
    if (await b.count()) { await b.click(); await wacht(900); }
  }
  await naar("#kh-resultaat");
  await naar("#aanvragen");
  await naar("#vragen");
  const eerste = page.locator("#faq summary").first();
  if (await eerste.count()) { await eerste.click(); await wacht(1500); }

  const video = page.video();
  await ctx.close();
  await browser.close();
  const doel = path.join(uit, "rondleiding.webm");
  fs.renameSync(await video.path(), doel);
  console.log("Video:", doel);
})();
