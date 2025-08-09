const cards = document.querySelector(".main");
const searchInput = document.querySelector("#search");
let first100Coins = [];

async function getData() {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const data = await response.json();
  first100Coins = data.slice(0, 100);
  display100Coins(first100Coins);
  return first100Coins;
}

getData()
  .then((data) => console.log({ data }))
  .catch((err) => console.log("error" + err.message));

function display100Coins(first100Coins) {
  const searchTerm = searchInput.value.toLowerCase();

  cards.innerHTML = "";

  for (let i = 0; i < first100Coins.length; i++) {
    const coinName = first100Coins[i].name.toLowerCase();
    const coinSymbol = first100Coins[i].symbol.toLowerCase();

    if (
      searchTerm === "" ||
      coinName.includes(searchTerm) ||
      coinSymbol.includes(searchTerm)
    ) {
      const coinContainer = `<div id="${first100Coins[i].id}" class="card mb-3" style="width: 18rem">
                  <div class="card-body">
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider"></span>
                    </label>
                    <h5 class="card-title">${first100Coins[i].name}</h5>
                    <p class="card-text">${first100Coins[i].symbol}</p>
                    <a href="#" id="moreInfo" class="btn btn-primary">More Info</a>
                  </div>
                </div>`;
      cards.innerHTML += coinContainer;
    }
  }
}

searchInput.addEventListener("input", () => {
  display100Coins(first100Coins);
});

document.querySelector("#about").addEventListener("click", modal);

function modal() {
  const modal = new bootstrap.Modal(document.getElementById("aboutModal"));
  modal.show();
}


// continue from here - the more info feature
document.querySelector("#moreInfo").addEventListener("click", moreInfo);

async function moreInfo() {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/{id}");
  const data = await response.json();

  const image = data.image.small;
  const usd = data.market_data.current_price.usd;
  const ils = data.market_data.current_price.ils;
  const eur = data.market_data.current_price.eur;
  const modalTitle = document.querySelector("#aboutModalLabel");
  const modalBody = document.querySelector(".modal-body");

  modalTitle.innerText = data.name;
  modalBody.innerHTML = `
   <img src="${image}" alt="${data.name}" style="width: 100px;" class="mb-3" />
      <p><strong>Symbol:</strong> ${data.symbol.toUpperCase()}</p>
      <p><strong>USD:</strong> $${usd}</p>
      <p><strong>EUR:</strong> €${eur}</p>
      <p><strong>ILS:</strong> ₪${ils}</p>`;

  const modal = new bootstrap.Modal(document.getElementById("aboutModal"));
  modal.show();
}
