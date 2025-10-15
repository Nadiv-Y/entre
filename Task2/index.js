"use strict";

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const fmt = (n) => (Number.isFinite(n) ? n.toLocaleString("en-US") : "—");
const escapeHtml = (str = "") =>
  String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const getName = (c) => c?.name?.common || c?.name?.official || "Unknown";
const getPop = (c) => (Number.isFinite(c?.population) ? c.population : 0);
const getRegion = (c) => c?.region || "Unknown";

const setHidden = (el, hidden) => {
  el.classList.toggle("hidden", !!hidden);
  if (hidden) el.setAttribute("aria-hidden", "true");
  else el.removeAttribute("aria-hidden");
};

const setNotice = (msg, cls = "muted") => {
  const el = $("#notice");
  el.className = cls;
  el.textContent = msg ?? "";
};

const withLoading = async (fn) => {
  const btns = [$("#btnSearch"), $("#btnAll")];
  btns.forEach((b) => b?.setAttribute("disabled", "true"));
  setHidden($("#spinner"), false);
  try {
    return await fn();
  } finally {
    btns.forEach((b) => b?.removeAttribute("disabled"));
    setHidden($("#spinner"), true);
  }
};

// ===== Networking (fetch + timeout + fallback) =====
const API_BASE_V3 = "https://restcountries.com/v3.1";
const API_BASE_V2 = "https://restcountries.com/v2";
const FIELDS = "name,region,population,currencies";

class HttpError extends Error {
  constructor(message, status, url) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
  }
}

const fetchJson = async (url, { timeoutMs = 20000 } = {}) => {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      mode: "cors",
      cache: "no-store",
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new HttpError(
        `HTTP ${res.status} ${res.statusText} — ${text.slice(0, 240)}`,
        res.status,
        url
      );
    }
    return await res.json();
  } catch (err) {
    if (err.name === "AbortError") {
      throw new HttpError("Request timed out", 0, url);
    }
    if (err instanceof HttpError) throw err;
    throw new HttpError(err.message || "Network error", 0, url);
  } finally {
    clearTimeout(t);
  }
};

const mapV2Country = (c = {}) => ({
  name: { common: c.name, official: c.name },
  region: c.region,
  population: c.population,
  currencies: c.currencies
    ? Object.fromEntries(
        Object.entries(c.currencies).map(([code, cur]) => [
          code,
          { name: cur?.name || code, symbol: cur?.symbol || "" },
        ])
      )
    : undefined,
});

const tryV3ThenV2 = async (makeV3Url, makeV2Url) => {
  try {
    return await fetchJson(makeV3Url());
  } catch (e) {
    if (e.status === 400 || e.status === 404) {
      const dataV2 = await fetchJson(makeV2Url());
      return Array.isArray(dataV2) ? dataV2.map(mapV2Country) : [];
    }
    throw e;
  }
};

const API = {
  all: () =>
    tryV3ThenV2(
      () => `${API_BASE_V3}/all?fields=${FIELDS}`,
      () => `${API_BASE_V2}/all?fields=${FIELDS}`
    ),
  byName: (name) =>
    tryV3ThenV2(
      () => `${API_BASE_V3}/name/${encodeURIComponent(name)}?fields=${FIELDS}`,
      () => `${API_BASE_V2}/name/${encodeURIComponent(name)}?fields=${FIELDS}`
    ),
};

// ===== Rendering =====
const el = (tag, attrs = {}, html = "") => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (html) node.innerHTML = html;
  return node;
};

const renderDashboard = (countries = []) => {
  const container = $("#output");
  container.innerHTML = "";

  if (!countries.length) {
    container.append(
      el(
        "div",
        { class: "card error" },
        "No countries matched your request. Try a different term or Load All."
      )
    );
    return;
  }

  const count = countries.length;
  const totalPopulation = countries.reduce((sum, c) => sum + getPop(c), 0);
  const avgPopulation = count ? Math.round(totalPopulation / count) : 0;

  const regionMap = new Map();
  for (const c of countries) {
    const r = getRegion(c);
    regionMap.set(r, (regionMap.get(r) || 0) + 1);
  }

  const currencyMap = new Map();
  for (const c of countries) {
    const currencies = c?.currencies || {};
    for (const code of Object.keys(currencies)) {
      currencyMap.set(code, (currencyMap.get(code) || 0) + 1);
    }
  }

  const stats = el("div", { class: "stats" });
  stats.append(
    el(
      "div",
      { class: "stat" },
      `<div class="label">Total countries (results)</div><div class="value">${fmt(
        count
      )}</div>`
    ),
    el(
      "div",
      { class: "stat" },
      `<div class="label">Total population (sum)</div><div class="value">${fmt(
        totalPopulation
      )}</div>`
    ),
    el(
      "div",
      { class: "stat" },
      `<div class="label">Average population</div><div class="value">${fmt(
        avgPopulation
      )}</div>`
    )
  );

  const countriesSorted = [...countries].sort((a, b) =>
    getName(a).localeCompare(getName(b))
  );
  const rowsCountry = countriesSorted
    .map(
      (c) =>
        `<tr><td>${escapeHtml(getName(c))}</td><td class="num">${fmt(
          getPop(c)
        )}</td></tr>`
    )
    .join("");

  const tblCountry = el("div", { class: "card" });
  tblCountry.append(
    el(
      "h3",
      { class: "muted", style: "margin-top:0" },
      "Countries & population"
    ),
    el(
      "div",
      { class: "table-wrap" },
      `<table role="table" aria-label="Countries and population">
        <thead><tr><th>Country</th><th class="num">Population</th></tr></thead>
        <tbody>${rowsCountry}</tbody>
      </table>`
    )
  );

  const rowsRegion = [...regionMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(
      ([region, n]) =>
        `<tr><td>${escapeHtml(region)}</td><td class="num">${fmt(n)}</td></tr>`
    )
    .join("");

  const tblRegion = el("div", { class: "card" });
  tblRegion.append(
    el(
      "h3",
      { class: "muted", style: "margin-top:0" },
      "Regions & number of countries"
    ),
    el(
      "div",
      { class: "table-wrap" },
      `<table role="table" aria-label="Regions and country counts">
        <thead><tr><th>Region</th><th class="num">Countries</th></tr></thead>
        <tbody>${rowsRegion}</tbody>
      </table>`
    )
  );

  const rowsCurrency = [...currencyMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(
      ([code, n]) =>
        `<tr><td>${escapeHtml(code)}</td><td class="num">${fmt(n)}</td></tr>`
    )
    .join("");

  const tblCurrency = el("div", { class: "card" });
  tblCurrency.append(
    el(
      "h3",
      { class: "muted", style: "margin-top:0" },
      "Currencies — number of countries using each"
    ),
    el(
      "div",
      { class: "table-wrap" },
      `<table role="table" aria-label="Currencies and country counts">
        <thead><tr><th>Currency code</th><th class="num">Countries</th></tr></thead>
        <tbody>${rowsCurrency}</tbody>
      </table>`
    )
  );

  const twoCol = el("div", { class: "grid" });
  twoCol.append(tblCountry, tblRegion);

  container.append(stats, twoCol, tblCurrency);
};

const init = () => {
  $("#searchForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const q = ($("#query").value || "").trim();
    if (!q) {
      setNotice("Type a part of a country name, e.g., “united”.", "muted");
      return;
    }
    await withLoading(async () => {
      setNotice(`Searching for: "${q}" …`, "muted");
      try {
        const data = await API.byName(q);
        renderDashboard(Array.isArray(data) ? data : []);
        setNotice(
          `Results for "${q}": ${fmt(data?.length || 0)} countries.`,
          "ok"
        );
      } catch (err) {
        showError(err);
      }
    });
  });

  $("#btnAll").addEventListener("click", async () => {
    await withLoading(async () => {
      setNotice("Loading all countries …", "muted");
      try {
        const data = await API.all();
        renderDashboard(Array.isArray(data) ? data : []);
        setNotice(`Loaded ${fmt(data?.length || 0)} countries.`, "ok");
      } catch (err) {
        showError(err);
      }
    });
  });
};

const showError = (err) => {
  console.error(err);
  const msg =
    err instanceof HttpError ? `${err.message}` : err?.message || String(err);
  $("#output").innerHTML = "";
  $("#output").append(el("div", { class: "card error" }, escapeHtml(msg)));
  setNotice("", "muted");
};

window.addEventListener("DOMContentLoaded", init);
