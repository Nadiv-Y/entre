let selectedCoins = [];
let allCoins = [];
let chart;
let liveReportInterval;

function showLoader() {
  $("#global-loader").removeClass("d-none");
}
function hideLoader() {
  $("#global-loader").addClass("d-none");
}

$(document).ready(() => {
  getCoins();
});

$("#home").click(() => showPage("#home-page"));
$("#live-reports").click(() => showPage("#live-reports-page", renderChart));
$("#about").click(() => showPage("#about-page"));

function showPage(selector, callback) {
  $("main > section").addClass("d-none");
  $(selector).removeClass("d-none");
  if (callback) callback();
  if (selector !== "#live-reports-page") clearInterval(liveReportInterval);
}

async function getCoins() {
  showLoader();
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    const data = await res.json();
    allCoins = data.slice(0, 100);
    renderCoins(allCoins);
  } catch (err) {
    $("#main-content").html(`<p class='text-danger'>שגיאה בטעינת המטבעות.</p>`);
  } finally {
    hideLoader();
  }
}

function renderCoins(coins) {
  const container = $("#main-content");
  container.empty();
  coins.forEach((coin) => {
    const checked = selectedCoins.some((c) => c.id === coin.id) ? "checked" : "";
    container.append(`
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 text-center p-3">
          <h5 class="text-info">${coin.symbol.toUpperCase()}</h5>
          <p>${coin.name}</p>
          <div class="form-check form-switch d-flex justify-content-center">
            <input class="form-check-input coin-toggle" type="checkbox" data-id="${coin.id}" data-symbol="${
      coin.symbol
    }" ${checked}>
          </div>
          <button class="btn btn-outline-info mt-2 more-info" data-id="${coin.id}">More Info</button>
          <div class="collapse mt-2" id="info-${coin.id}">
            <div class="info-body"></div>
          </div>
        </div>
      </div>
    `);
  });
}

function doSearch() {
  const q = $("#search-input").val().trim().toUpperCase();

  if (!q) {
    renderCoins(allCoins);
    return;
  }

  const filtered = allCoins.filter((c) => c.symbol.toUpperCase() === q);
  renderCoins(filtered.length ? filtered : []);
}

function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

$("#search-input").on("input", debounce(doSearch, 200));

$("#search-btn").on("click", (e) => {
  e.preventDefault();
  doSearch();
});

$("#search-input").on("keydown", (e) => {
  if (e.key === "Escape") {
    $("#search-input").val("");
    renderCoins(allCoins);
  }
});

$(document).on("change", ".coin-toggle", function () {
  const id = $(this).data("id");
  const symbol = $(this).data("symbol").toUpperCase();
  //מגבלת 5

  if ($(this).is(":checked")) {
    if (selectedCoins.length < 5) {
      selectedCoins.push({ id, symbol });
    } else {
      $(this).prop("checked", false);
      showLimitModal(id, symbol);
    }
  } else {
    selectedCoins = selectedCoins.filter((c) => c.id !== id);
  }
});

function showLimitModal(id, symbol) {
  const list = $("#selectedCoinsList");
  list.empty();
  selectedCoins.forEach((coin) => {
    list.append(`<li class="list-group-item d-flex justify-content-between">
      ${coin.symbol}
      <button class="btn btn-sm btn-danger remove-coin" data-remove="${coin.id}" data-new="${id}" data-symbol="${symbol}">הסר</button>
    </li>`);
  });
  new bootstrap.Modal($("#limitModal")).show();
}

$(document).on("click", ".remove-coin", function () {
  const removeId = $(this).data("remove");
  const newId = $(this).data("new");
  const newSymbol = $(this).data("symbol");
  selectedCoins = selectedCoins.filter((c) => c.id !== removeId);
  selectedCoins.push({ id: newId, symbol: newSymbol });
  $("#limitModal").modal("hide");
  renderCoins(allCoins);
});

$(document).on("click", ".more-info", async function () {
  const id = $(this).data("id");
  const infoDiv = $(`#info-${id} .info-body`);
  const collapse = $(`#info-${id}`);
  collapse.collapse("toggle");

  if (collapse.hasClass("show")) return;

  showLoader();
  const cached = JSON.parse(localStorage.getItem(`coin_${id}`) || "{}");
  const now = Date.now();
  if (cached.timestamp && now - cached.timestamp < 2 * 60 * 1000) {
    infoDiv.html(cached.html);
    hideLoader();
    return;
  }

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    const data = await res.json();
    const html = `
      <img src="${data.image.small}" alt="${data.name}">
      <ul class="list-group mt-2">
        <li class="list-group-item">USD: $${data.market_data.current_price.usd}</li>
        <li class="list-group-item">EUR: €${data.market_data.current_price.eur}</li>
        <li class="list-group-item">ILS: ₪${data.market_data.current_price.ils}</li>
      </ul>`;
    infoDiv.html(html);
    localStorage.setItem(`coin_${id}`, JSON.stringify({ html, timestamp: now }));
  } catch {
    infoDiv.html("<p class='text-danger'>שגיאה בטעינת מידע נוסף.</p>");
  } finally {
    hideLoader();
  }
});

function renderChart() {
  if (selectedCoins.length === 0) {
    $("#chartContainer").html("<p class='text-danger'>בחר לפחות מטבע אחד.</p>");
    return;
  }

  chart = new CanvasJS.Chart("chartContainer", {
    title: { text: "Live Prices (USD)", fontColor: "#00bcd4" },
    axisX: { title: "Time" },
    axisY: { title: "Price (USD)" },
    data: selectedCoins.map((coin, i) => ({
      type: "line",
      name: coin.symbol,
      showInLegend: true,
      lineColor: getColor(i),
      dataPoints: [],
    })),
  });
  chart.render();

  if (liveReportInterval) clearInterval(liveReportInterval);
  liveReportInterval = setInterval(updateChart, 2000);
}

async function updateChart() {
  const symbols = selectedCoins.map((c) => c.symbol).join(",");
  const res = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbols}&tsyms=USD`);
  const data = await res.json();
  const now = new Date();
  chart.options.data.forEach((series, i) => {
    const price = data[selectedCoins[i].symbol]?.USD;
    if (price) {
      series.dataPoints.push({ x: now, y: price });
      if (series.dataPoints.length > 25) series.dataPoints.shift();
    }
  });
  chart.render();
}

function getColor(i) {
  const colors = ["#00e0ff", "#ff4081", "#ff9800", "#4caf50", "#673ab7"];
  return colors[i % colors.length];
}
