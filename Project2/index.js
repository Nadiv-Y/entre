const COINGECKO_LIST = "https://api.coingecko.com/api/v3/coins/list";
const COINGECKO_BY_ID = (id) => `https://api.coingecko.com/api/v3/coins/${id}`;
const CRYPTOCOMPARE_MULTI = (symbolsCsv) =>
  `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbolsCsv}&tsyms=USD`;

const MORE_INFO_TTL_MS = 2 * 60 * 1000;

const LS_SELECTED = "selectedCoins";
const LS_MOREINFO = "moreInfoCache";
const LS_COINS = "coinsListCache";

const $app = $("#app");
const $progress = $("#progressWrap");

let currentRoute = "home";
let liveInterval = null;
let reportsCleanup = null;

const ajaxJSON = (url) =>
  new Promise((resolve, reject) => {
    $.ajax({
      method: "GET",
      url,
      dataType: "json",
      success: resolve,
      error: (xhr) => reject(new Error(xhr?.statusText || "AJAX error")),
    });
  });

const withProgress = async (fn) => {
  $progress.removeClass("d-none");
  try {
    return await fn();
  } finally {
    $progress.addClass("d-none");
  }
};

const loadJSON = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const saveJSON = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const getSelected = () => loadJSON(LS_SELECTED, []);
const setSelected = (arr) => saveJSON(LS_SELECTED, arr.slice(0, 5));
const getMoreInfoCache = () => loadJSON(LS_MOREINFO, {});
const setMoreInfoCache = (obj) => saveJSON(LS_MOREINFO, obj);

async function loadCoins() {
  let cached = loadJSON(LS_COINS, null);
  if (!cached) {
    const data = await ajaxJSON(COINGECKO_LIST);
    cached = data;
    saveJSON(LS_COINS, cached);
  }
  return cached;
}

async function loadMoreInfo(id) {
  const cache = getMoreInfoCache();
  const now = Date.now();
  const hit = cache[id];
  if (hit && now - hit.ts < MORE_INFO_TTL_MS) return hit.data;

  const data = await ajaxJSON(COINGECKO_BY_ID(id));
  cache[id] = { data, ts: now };
  setMoreInfoCache(cache);
  return data;
}

async function loadLivePrices(symbols) {
  if (!symbols.length) return {};
  const csv = symbols.join(",");
  return await ajaxJSON(CRYPTOCOMPARE_MULTI(csv));
}

function renderHome(coins, querySymbol = "") {
  const filter = querySymbol.trim().toUpperCase();
  const filtered = filter
    ? coins.filter((c) => (c.symbol || "").toUpperCase() === filter)
    : coins;

  const LIMITED = filtered.slice(0, 100);
  const selected = new Set(getSelected());

  const cards = LIMITED.map((c) => {
    const shortSym = (c.symbol || "").toUpperCase();
    const isChecked = selected.has(shortSym) ? "checked" : "";
    return `
      <div class="col">
        <div class="card coin-card h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
              <!-- Text column: grows & can shrink -->
              <div class="fx-grow-1">
                <h5 class="mb-1 text-capitalize text-ellipsis-1 wrap-anywhere">${c.name}</h5>
                <div class="small coin-symbol wrap-anywhere">${shortSym}</div>
              </div>
              <!-- Toggle column: fixed -->
              <div class="form-check form-switch ms-2 fx-no-shrink">
                <input class="form-check-input sel-toggle" type="checkbox"
                       data-symbol="${shortSym}" data-id="${c.id}" ${isChecked}>
              </div>
            </div>

            <button class="btn btn-sm btn-primary mt-3 more-btn" data-id="${c.id}">
              More Info
            </button>

            <div class="collapse mt-3" id="more-${c.id}">
              <div class="more-info-box small">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  $app.html(`
    <section>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
        ${cards}
      </div>
    </section>
  `);

  $(".more-btn").on("click", function () {
    const id = $(this).data("id");
    const $panel = $(`#more-${id}`);
    $panel.collapse("toggle");

    $panel.off("shown.bs.collapse").on("shown.bs.collapse", async () => {
      const $box = $panel.find(".more-info-box");
      $box.text("Loading…");
      try {
        const info = await withProgress(() => loadMoreInfo(id));
        const img = info.image?.small ?? info.image?.thumb ?? "";
        const usd = info.market_data?.current_price?.usd ?? "N/A";
        const eur = info.market_data?.current_price?.eur ?? "N/A";
        const ils = info.market_data?.current_price?.ils ?? "N/A";

        $box.html(`
          <div class="d-flex align-items-center gap-2 mb-2 wrap-anywhere">
            ${
              img
                ? `<img src="${img}" alt="${info.name}" width="24" height="24">`
                : ""
            }
            <strong class="me-2 text-ellipsis-1">${info.name}</strong>
            <span class="badge bg-secondary">${(
              info.symbol || ""
            ).toUpperCase()}</span>
          </div>
          <ul class="list-unstyled mb-0">
            <li>USD: $${usd}</li>
            <li>EUR: €${eur}</li>
            <li>ILS: ₪${ils}</li>
          </ul>
        `);
      } catch {
        $box.html(
          '<div class="text-danger">Failed to load details. Try again.</div>'
        );
      }
    });
  });

  $(".sel-toggle").on("change", function () {
    const symbol = $(this).data("symbol");
    let sel = getSelected();

    if (this.checked) {
      if (sel.length < 5) {
        sel.push(symbol);
        setSelected(sel);
      } else {
        this.checked = false;
        openLimitModal(sel, symbol);
      }
    } else {
      sel = sel.filter((s) => s !== symbol);
      setSelected(sel);
    }
  });
}

function renderReports() {
  $app.html(`
    <section>
      <div class="chart-wrapper">
        <div id="chartContainer"></div>
      </div>
    </section>
  `);

  if (typeof CanvasJS === "undefined") {
    $("#chartContainer").html(
      '<div class="text-danger">CanvasJS not loaded.</div>'
    );
    return;
  }

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    axisX: { title: "Time", valueFormatString: "HH:mm:ss" },
    axisY: { title: "Price (USD)", includeZero: false },
    legend: { cursor: "pointer" },
    data: [],
  });
  chart.render();

  const selected = getSelected();
  const seriesMap = new Map();
  selected.forEach((sym) => {
    const series = {
      type: "spline",
      name: sym,
      showInLegend: true,
      xValueType: "dateTime",
      dataPoints: [],
    };
    chart.options.data.push(series);
    seriesMap.set(sym, series);
  });
  chart.render();

  const tick = async () => {
    const now = Date.now();
    const symbols = Array.from(seriesMap.keys());
    if (!symbols.length) return;

    try {
      const prices = await loadLivePrices(symbols);
      symbols.forEach((sym) => {
        const usd = prices?.[sym]?.USD;
        if (typeof usd === "number") {
          const series = seriesMap.get(sym);
          series.dataPoints.push({ x: now, y: usd });
          if (series.dataPoints.length > 60) series.dataPoints.shift();
        }
      });
      chart.render();
    } catch {}
  };

  if (liveInterval) clearInterval(liveInterval);
  liveInterval = setInterval(tick, 2000);
  tick();

  const onResize = () => chart.render();
  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", onResize);
  reportsCleanup = () => {
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onResize);
  };
}

function renderAbout() {
  $app.html(`
    <section class="row g-3">
      <div class="col-md-8">
        <h2>About</h2>
        <p>This single-page app demonstrates jQuery AJAX with ES6, CoinGecko data, CryptoCompare live pricing, and CanvasJS charts.</p>
        <ul>
          <li>Coin list</li>
          <li>“More Info” with 2-minute LocalStorage cache</li>
          <li>Up to 5 coins in Live Reports (stored in LocalStorage)</li>
        </ul>
      </div>
      <div class="col-md-4 text-center">
        <img class="img-fluid rounded shadow" alt="Your photo" src="https://upload.wikimedia.org/wikipedia/en/5/52/Ned_Stark-Sean_Bean.jpg">
        <p class="text-muted mt-2 small">Ned Stark</p>
      </div>
    </section>
  `);
}

function openLimitModal(currentSelected, symbolToAdd) {
  const $list = $("#modalList").empty();
  currentSelected.forEach((sym) => {
    const id = `m-${sym}`;
    $list.append(`
      <label class="list-group-item d-flex align-items-center justify-content-between">
        <span>${sym}</span>
        <input id="${id}" class="form-check-input me-1" type="checkbox" data-sym="${sym}">
      </label>
    `);
  });

  $("#modalSave")
    .off("click")
    .on("click", () => {
      const toRemove = [];
      $("#modalList input[type=checkbox]:checked").each(function () {
        toRemove.push($(this).data("sym"));
      });

      let sel = getSelected();
      if (toRemove.length) {
        sel = sel.filter((s) => s !== toRemove[0]);
        sel.push(symbolToAdd);
        setSelected(sel);
        navigate("home");
      }
    });

  const modal = new bootstrap.Modal(document.getElementById("limitModal"));
  modal.show();
}

async function navigate(route, { querySymbol = "" } = {}) {
  if (route !== "reports" && liveInterval) {
    clearInterval(liveInterval);
    liveInterval = null;
  }
  if (route !== "reports" && typeof reportsCleanup === "function") {
    reportsCleanup();
    reportsCleanup = null;
  }

  currentRoute = route;

  if (route === "home") {
    const coins = await withProgress(() => loadCoins());
    renderHome(coins, querySymbol);
  } else if (route === "reports") {
    renderReports();
  } else if (route === "about") {
    renderAbout();
  }
}

$(document).on("click", "a[data-route]", function (e) {
  e.preventDefault();
  const route = $(this).data("route");
  navigate(route);
  $("a[data-route]").removeClass("active");
  $(this).addClass("active");
});

$("#searchForm").on("submit", function (e) {
  e.preventDefault();
  const q = $("#searchInput").val().trim();
  navigate("home", { querySymbol: q });
});

navigate("home");
