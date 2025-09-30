$("#home").on("click", getCoinData);

function getCoinData() {
  fetch("https://api.coingecko.com/api/v3/coins/list", { method: "GET" })
    .then((res) => res.json())
    .then((coinsListRes) => {
      const container = document.getElementById("main-content");
      //   const i = 0;
      container.innerHTML = "";

      const topCoins = coinsListRes.slice(0, 100);

      for (const coin of topCoins) {
        const card = document.createElement("div");
        card.className = "col";

        // fetch('https://api.coingecko.com/api/v3/coins/' + coin.id, { method: "GET" })
        // .then((res) => res.json())
        // .then((coinInfo) => {

        // })

        // const cardContainer = document.createElement("div");
        // cardContainer.className = "card h-100 shadow-sm";

        // const cardBody = document.createElement("div")
        // cardBody.className = "card-body"

        // const coinTitle = document.createElement("h2");
        // coinTitle.className = "coin-title";
        // coinTitle.innerText = coin.symbol;

        // const coinName = document.createElement("div");
        // coinName.className = "coin-name";
        // coinName.innerText = coin.name;

        // const moreInfoBtn = document.createElement("button");
        // moreInfoBtn.className = "btn btn-primary";
        // moreInfoBtn.type = "button";
        // moreInfoBtn.data-bs-toggle = "collapse";

        // <button
        //   class="btn btn-primary"
        //   type="button"
        //   data-bs-toggle="collapse"
        //   data-bs-target="#collapseExample"
        //   aria-expanded="false"
        //   aria-controls="collapseExample"
        // >
        //   Button with data-bs-target
        // </button>;

        //       cardBody.append(coinTitle, coinName);

        //       cardContainer.append(cardBody);

        //       card.append(cardContainer);

        card.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title text-primary text-uppercase">${coin.symbol}</h5>
              <p class="card-text">${coin.name}</p>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="toggle-${coin.id}">
              </div>
              <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInfo-${coin.id}" aria-expanded="false" aria-controls="collapseInfo-${coin.id}">
              More Info
              </button>
              <div class="collapse" id="collapseInfo-${coin.id}">
                <div class="info-body">
                </div>
              </div>
            </div>
          </div>
        `;

        container.appendChild(card);
      }

      // Delegate event listener for "More Info" buttons
      // In-memory cache for coin info
      const coinInfoCache = {}; // Format: { coinId: { data: {...}, timestamp: Date.now() } }

      document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("more-info-btn")) {
          const coinId = e.target.getAttribute("data-coin-id");
          const infoContainer = document.getElementById(`info-${coinId}`);

          // Show a loading spinner while waiting
          infoContainer.innerHTML = `
      <div class="d-flex justify-content-center py-2">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;

          // Check cache
          const cached = coinInfoCache[coinId];
          const now = Date.now();
          const TWO_MINUTES = 2 * 60 * 1000;

          if (cached && now - cached.timestamp < TWO_MINUTES) {
            // Use cached data
            renderCoinInfo(cached.data, infoContainer);
          } else {
            // Fetch new data
            fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
              .then((res) => res.json())
              .then((coinInfo) => {
                // Cache the response
                coinInfoCache[coinId] = {
                  data: coinInfo,
                  timestamp: Date.now(),
                };

                renderCoinInfo(coinInfo, infoContainer);
              })
              .catch((err) => {
                infoContainer.innerHTML = `<p class="text-danger">Failed to load coin info.</p>`;
                console.error("Failed to fetch coin info:", err);
              });
          }
        }
      });
      function renderCoinInfo(coinInfo, container) {
        const image = coinInfo.image?.small || "";
        const prices = coinInfo.market_data?.current_price || {};

        container.innerHTML = `
    <div class="text-center mb-2">
      <img src="${image}" alt="${coinInfo.name}" />
    </div>
    <ul class="list-group">
      <li class="list-group-item">USD: $${prices.usd}</li>
      <li class="list-group-item">EUR: €${prices.eur}</li>
      <li class="list-group-item">ILS: ₪${prices.ils}</li>
    </ul>
  `;
      }
    })
    .catch((err) => console.error("Failed to fetch coin data:", err));
}

// <label class="form-check-label" for="toggle-${coin.id}">Track</label>
