const cards = document.querySelector(".main");
const searchInput = document.querySelector("#search");
const loadingSpinner = document.querySelector("#loading");

function showLoading() {
  loadingSpinner.style.display = "block";
  const text = document.querySelector("#loadingText");
  text.innerText = "Loadind";
}
function hideLoading() {
  loadingSpinner.style.display = "none";
}

let first100Coins = [];

async function getData() {
  showLoading();
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
    if (!response.ok) throw new Error("Failed to fetch coins list");
    const data = await response.json();
    first100Coins = data.slice(0, 100);
    display100Coins(first100Coins);
    console.log(first100Coins);
  } catch (err) {
    console.log("error" + err.message);
  } finally {
    hideLoading();
  }
}

getData();

function display100Coins(first100Coins) {
  const searchTerm = searchInput.value.toLowerCase();

  cards.innerHTML = "";

  for (let i = 0; i < first100Coins.length; i++) {
    const coin = first100Coins[i];
    const coinName = first100Coins[i].name.toLowerCase();
    const coinSymbol = first100Coins[i].symbol.toLowerCase();

    if (
      searchTerm === "" ||
      coinName.includes(searchTerm) ||
      coinSymbol.includes(searchTerm)
    ) {
      const coinContainer = `
      <div id="${coin.id}" class="card mb-3" style="width: 18rem">
        <div class="card-body">
          <label class="switch">
            <input type="checkbox" data-id="${coin.id}"/>
            <span class="slider"></span>
          </label>
          <h5 class="card-title">${coin.name}</h5>
          <p class="card-text">${coin.symbol}</p>
          <a href="#" class="btn btn-primary more-info" data-id="${coin.id}">More Info</a>`;
      cards.innerHTML += coinContainer;
    }
  }
}

searchInput.addEventListener("input", () => {
  display100Coins(first100Coins);
});

document.querySelector("#about").addEventListener("click", modal);

function modal(e) {
  const modal = new bootstrap.Modal(document.getElementById("aboutModal"));
  modal.show();
  console.log("the user clicked on about");
  e.preventDefault();
}

let coinID = "";
cards.addEventListener("click", async (e) => {
  try {
    if (e.target.classList.contains("more-info")) {
      console.log("user clicked on more info button");
      e.preventDefault();
      const coinID = e.target.getAttribute("data-id");
      console.log("the coin name is: " + coinID);
      await moreInfo(coinID);
    }
  } catch (err) {
    console.log("error" + err.message);
  }
});

async function moreInfo(coinID) {
  showLoading();
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinID}`
    );
    if (!response.ok) throw new Error("Failed to fetch coin details");

    const data = await response.json();

    localStorage.setItem(`coin${coinID}`, JSON.stringify(data));

    const image = data.image.small;
    const usd = data.market_data.current_price.usd;
    const ils = data.market_data.current_price.ils;
    const eur = data.market_data.current_price.eur;

    const modalTitle = document.querySelector("#coinInfoModalLabel");
    const modalBody = document.querySelector("#coinInfoModal .modal-body");

    modalTitle.innerText = "";
    modalBody.innerHTML = "";

    modalTitle.innerText = data.name;
    modalBody.innerHTML = `
   <img src="${image}" alt="${data.name}" style="width: 100px;" class="mb-3" />
      <p><strong>Symbol:</strong> ${data.symbol.toUpperCase()}</p>
      <p><strong>USD:</strong> $${usd}</p>
      <p><strong>EUR:</strong> €${eur}</p>
      <p><strong>ILS:</strong> ₪${ils}</p>`;

    const modal = new bootstrap.Modal(document.getElementById("coinInfoModal"));
    modal.show();
  } catch (err) {
    console.log("error" + err.message);
  } finally {
    hideLoading();
  }
}

let selectedCoins = [];
let pendingCoinId = null;

cards.addEventListener("change", (e) => {
  showLoading();
  try {
    const toggleId = e.target.getAttribute("data-id");
    const isOn = e.target.checked;

    if (isOn) {
      if (selectedCoins.length < 5) {
        selectedCoins.push(toggleId);
        console.log(selectedCoins);
      } else {
        limitModal(selectedCoins)
      }
    } else {
      selectedCoins = selectedCoins.filter((id) => id !== toggleId);
    }
  } catch (err) {
    console.log("error" + err.message);
  } finally {
    hideLoading();
  }
});

function limitModal(selectedCoins) {
const modalTitle = document.querySelector("#limitSelectedCoins")
const coins = JSON.stringify(selectedCoins)
modalTitle.innerHTML = coins
  const modal = new bootstrap.Modal(
    document.getElementById("limitSelectedCoins")
  );
  modal.show();
  console.log("the user reached to the limit");

}
