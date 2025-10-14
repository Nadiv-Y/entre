let chart;
let liveReportInterval;

const selectedCoins = [];
let topCoins = []; 

$("#home").on("click", () => {
  $("#home-page").removeClass("d-none");
  $("#live-reports-page").addClass("d-none");
  $("#about-page").addClass("d-none");
  clearInterval(liveReportInterval); 
  getCoinData();
});

$("#live-reports").on("click", () => {
  $("#home-page").addClass("d-none");
  $("#about-page").addClass("d-none");
  $("#live-reports-page").removeClass("d-none");
  renderLiveChart();
});

$("#about").on("click", () => {
  $("#home-page").addClass("d-none");
  $("#live-reports-page").addClass("d-none");
  $("#about-page").removeClass("d-none");
  clearInterval(liveReportInterval);
});

$("#search-btn").on("click", function (event) {
  event.preventDefault();
  const coinInput = $("#search-input").val().toUpperCase();

  if (!coinInput) {
    getCoinData();
    return;
  }

  const filtered = topCoins.filter(
    (coin) => coin.symbol.toUpperCase() === coinInput
  );

  const container = document.getElementById("main-content");
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `<p class="text-danger">No coin found with symbol "${coinInput}"</p>`;
    return;
  }

  for (const coin of filtered) {
    const card = document.createElement("div");
    card.className = "col";

    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title text-custom text-uppercase">${coin.symbol}</h5>
          <p class="card-text">${coin.name}</p>
          <div class="form-check form-switch">
            <input class="form-check-input coin-toggle" type="checkbox" data-coin-id="${coin.id}" data-coin-symbol="${coin.symbol}" id="toggle-${coin.id}">
          </div>
          <button class="btn custom-btn more-info-btn" type="button" data-coin-id="${coin.id}" data-bs-toggle="collapse" data-bs-target="#collapseInfo-${coin.id}" aria-expanded="false" aria-controls="collapseInfo-${coin.id}">
            More Info
          </button>
          <div class="collapse" id="collapseInfo-${coin.id}">
            <div class="info-body" id="info-${coin.id}">
              Loading...
            </div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);

    const selected = selectedCoins.find((c) => c.id === coin.id);
    if (selected) {
      $(`#toggle-${coin.id}`).prop("checked", true);
    }
  }
});

function getCoinData() {
  fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((coinsListRes) => {
      const container = document.getElementById("main-content");
      container.innerHTML = "";

      topCoins = coinsListRes.slice(0, 100); 

      for (const coin of topCoins) {
        const card = document.createElement("div");
        card.className = "col";

        card.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title text-custom text-uppercase">${coin.symbol}</h5>
              <p class="card-text">${coin.name}</p>
              <div class="form-check form-switch">
                <input class="form-check-input coin-toggle" type="checkbox" data-coin-id="${coin.id}" data-coin-symbol="${coin.symbol}" id="toggle-${coin.id}">
              </div>
              <button class="btn custom-btn more-info-btn" type="button" data-coin-id="${coin.id}" data-bs-toggle="collapse" data-bs-target="#collapseInfo-${coin.id}" aria-expanded="false" aria-controls="collapseInfo-${coin.id}">
                More Info
              </button>
              <div class="collapse" id="collapseInfo-${coin.id}">
                <div class="info-body" id="info-${coin.id}">
                  Loading...
                </div>
              </div>
            </div>
          </div>
        `;

        container.appendChild(card);
      }

      for (const coin of selectedCoins) { 
        const toggle = document.getElementById(`toggle-${coin.id}`);
        if (toggle) toggle.checked = true;
      }

      document.addEventListener("click", function (event) { 
        if (event.target && event.target.classList.contains("more-info-btn")) {
          const coinId = event.target.getAttribute("data-coin-id");
          const infoContainer = document.getElementById(`info-${coinId}`);

          infoContainer.innerHTML = `
            <div class="d-flex justify-content-center py-2">
              <div class="spinner-border text-custom" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          `;
          const storedInfo = localStorage.getItem(`coinInfo_${coinId}`);
          const now = Date.now();
          const TWO_MINUTES = 2 * 60 * 1000;

          if (storedInfo) {
            const stored = JSON.parse(storedInfo);
            if (now - stored.timestamp < TWO_MINUTES) {
              displayCoinInfo(stored.data, infoContainer);
              return;
            }
          }

          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
            .then((res) => res.json())
            .then((coinInfo) => {
              localStorage.setItem(
                `coinInfo_${coinId}`,
                JSON.stringify({
                  data: coinInfo,
                  timestamp: Date.now(),
                })
              );
              displayCoinInfo(coinInfo, infoContainer);
            })
            .catch((err) => {
              infoContainer.innerHTML = `<p class="text-danger">Failed to load coin data. Please try again in a moment</p>`;
              console.error("Failed to fetch coin info:", err);
            });
        }
      });

      function displayCoinInfo(coinInfo, container) {
        const coinLogo = coinInfo.image ? coinInfo.image.small : "";
        const coinPrices = coinInfo.market_data ? coinInfo.market_data.current_price : {};

        container.innerHTML = `
          <div class="text-center mb-2">
            <img src="${coinLogo}" alt="${coinInfo.name}" />
          </div>
          <ul class="list-group">
            <li class="list-group-item">USD: $${coinPrices.usd}</li>
            <li class="list-group-item">EUR: €${coinPrices.eur}</li>
            <li class="list-group-item">ILS: ₪${coinPrices.ils}</li>
          </ul>
        `;
      }
    })
    .catch((err) => console.error("Failed to fetch coin data:", err));
}

$(document).on("change", ".coin-toggle", function () {
  const coinId = $(this).data("coin-id");
  const coinSymbol = $(this).data("coin-symbol").toUpperCase();
  const coinSelected = $(this).is(":checked");

  if (coinSelected) {
    if (selectedCoins.length < 5) {
      selectedCoins.push({ id: coinId, symbol: coinSymbol.toUpperCase() });
    } else {
      $(this).prop("checked", false);
      displaySelectionChoice({ id: coinId, symbol: coinSymbol });
    }
  } else {
    const i = selectedCoins.findIndex((coin) => coin.id === coinId);
    if (i !== -1) {
      selectedCoins.splice(i, 1);
    }
  }
  console.log("Currently selected coins:", selectedCoins);
});

function displaySelectionChoice(newCoin) {
  const list = document.getElementById("selectedCoinsList");
  list.innerHTML = "";

  selectedCoins.forEach((coin) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.setAttribute("data-coin-id", coin.id);

    li.innerHTML = `
         ${coin.symbol}
      <div class="form-check form-switch">
        <input 
          class="form-check-input modal-toggle"
          type="checkbox"
          id="modal-toggle-${coin.id}"
          data-coin-id="${coin.id}"
          data-new-coin-id="${newCoin.id}"
          data-new-coin-symbol="${newCoin.symbol}"
          checked
        />
      </div>
      `;

    list.appendChild(li);
  });

  const modal = new bootstrap.Modal(document.getElementById("limitModal"));
  modal.show();
}

$(document).on("change", ".modal-toggle", function () {
  const coinToRemove = $(this).data("coin-id");
  const newCoinId = $(this).data("new-coin-id");
  const newCoinSymbol = $(this).data("new-coin-symbol");

  if (!$(this).is(":checked")) {
    const i = selectedCoins.findIndex((coin) => coin.id === coinToRemove);
    if (i !== -1) selectedCoins.splice(i, 1);

    $(`#toggle-${coinToRemove}`).prop("checked", false);

    if (!selectedCoins.some((coin) => coin.id === newCoinId)) {
      selectedCoins.push({ id: newCoinId, symbol: newCoinSymbol.toUpperCase() });
    }

    $(`#toggle-${newCoinId}`).prop("checked", true);

    localStorage.setItem("selectedCoins", JSON.stringify(selectedCoins));

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("limitModal")
    );
    modal.hide();
  }
});


function renderLiveChart() {

  console.log("Rendering chart with selectedCoins:", selectedCoins);

  if (!selectedCoins || selectedCoins.length === 0) {
    $("#chartContainer").html("<p class='text-danger'>No coins selected!</p>");
    return;
  }

  $("#chartContainer").html(""); 

  chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: { 
      text: selectedCoins.map(c => c.symbol.toUpperCase()).join(", ") + " to USD", 
      fontColor: "#2fb7c8",
      fontFamily: "sans-serif", 
      fontSize: 20,
     }, 
    axisX: { title: "Time", valueFormatString: "HH:mm:ss" },
    axisY: { title: "Price (USD)" },
    toolTip: { shared: true },
    legend: {
      cursor: "pointer",
      itemclick: function (event) {
        event.dataSeries.visible = !event.dataSeries.visible;
        event.chart.render();
      },
    },
    data: selectedCoins.map((coin, i) => {
      const color = getColor(i);
      return {
      type: "line",
      showInLegend: true,
      name: coin.symbol.toUpperCase(),
      lineColor: color,
      markerColor: color,
      dataPoints: [],
      };
    }),
  });

  chart.render();

  if (liveReportInterval) clearInterval(liveReportInterval);

  liveReportInterval = setInterval(() => {
    const symbols = selectedCoins.map((coin) => coin.symbol).join(",");
    fetch(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbols}&tsyms=USD` 
    )
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();
        chart.options.data.forEach((series, i) => {
          const coin = selectedCoins[i].symbol;
          const price = data[coin]?.USD;
          if (price) {
            series.dataPoints.push({ x: now, y: price });
            if (series.dataPoints.length > 30) { 
              series.dataPoints.shift();
            }
          }
        });
        chart.render();
      });
  }, 2000);
}

$(window).on("resize", function () {
  if (chart) {
    chart.render();
  }
});

function getColor(index) {
  const colors = [
    "#00ffc8",
    "#ff2b75",
    "#22a6b3", 
    "#9b59b6",
    "#ffe600" 
  ];
  return colors[index % colors.length];
}


