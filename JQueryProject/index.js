const cards = document.querySelector(".main");

async function getData() {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const data = await response.json();
  const first100Coins = data.slice(0, 100);
  display100Coins(first100Coins);
  return first100Coins;
}

getData()
  .then((data) => console.log({ data }))
  .catch((err) => console.log("error" + err.message));

const searchInput = document.querySelector("#search");

function display100Coins(first100Coins) {
  if (searchInput.value === "") {
    for (let i = 0; i < first100Coins.length; i++) {
      const coinContainer = `<div id="${first100Coins[i].id}" class="card mb-3" style="width: 18rem">
                <div class="card-body">
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider"></span>
                  </label>
                  <h5 class="card-title">${first100Coins[i].name}</h5>
                  <p class="card-text">${first100Coins[i].symbol}</p>
                  <a href="#" id="${first100Coins[i].id}" class="btn btn-primary">More Info</a>
                </div>
              </div>`;
      cards.innerHTML += coinContainer;
    }
  }
}

document.querySelector("#about").addEventListener("click", modal);

function modal() {
  const modal = new bootstrap.Modal(document.getElementById("aboutModal"));
  modal.show();
}
