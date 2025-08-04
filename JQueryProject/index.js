let cards = document.querySelector(".main");
//1. create XMLHttpRequest object
let req = new XMLHttpRequest();

//2. create the request
req.open("GET", "https://api.coingecko.com/api/v3/coins/list");

//3.send request
req.send();

req.addEventListener("load", function () {
  //convert the JSON string to JS object
  let coinsData = JSON.parse(req.responseText);
  console.log(coinsData.slice(0, 100));
  let newCoinsData = coinsData.slice(0, 100);
  for (let i = 0; i < newCoinsData.length; i++) {
    const coinContainer = `<div id="${newCoinsData[i].id}" class="card mb-3" style="width: 18rem">
                <div class="card-body">
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider"></span>
                  </label>
                  <h5 class="card-title">${newCoinsData[i].name}</h5>
                  <p class="card-text">${newCoinsData[i].symbol}</p>
                  <a href="#" id="${newCoinsData[i].id}" class="btn btn-primary">More Info</a>
                </div>
              </div>`;
    cards.innerHTML += coinContainer;
  }
});


