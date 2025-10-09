(function () {
  var STORAGE_KEY = "vacations_basic_list_v1";
  var state = [];

  var saveBtn = document.getElementById("save");
  var cards = document.getElementById("cards");

  var nameInput = document.getElementById("name");
  var urlInput = document.getElementById("url");
  var priceInput = document.getElementById("price");
  var ratingSelect = document.getElementById("rating");

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      if (Array.isArray(arr)) {
        state = arr;
      } else {
        state = [];
      }
    } catch (e) {
      state = [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function starsByRating(val) {
    // bad=1, regular=2, good=3, excellent=4
    if (val === "excellent") return "★★★★";
    if (val === "good") return "★★★";
    if (val === "regular") return "★★";
    return "★";
  }

  function removeById(id) {
    var i;
    for (i = 0; i < state.length; i++) {
      if (state[i].id === id) {
        state.splice(i, 1);
        break;
      }
    }
    save();
    render();
  }

  function render() {
    cards.innerHTML = "";

    var i;
    for (i = 0; i < state.length; i++) {
      var item = state[i];

      var col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-lg-4";

      var card = document.createElement("div");
      card.className = "card h-100";

      var img = document.createElement("img");
      img.className = "card-img-top";
      img.src = item.url;
      img.alt = "Image";

      var body = document.createElement("div");
      body.className = "card-body";

      var h5 = document.createElement("h5");
      h5.className = "card-title";
      h5.textContent = item.name;

      var pPrice = document.createElement("p");
      pPrice.className = "card-text mb-1";
      pPrice.textContent = "Price: " + item.price;

      var pStars = document.createElement("div");
      pStars.className = "stars";
      pStars.textContent = starsByRating(item.rating);

      var del = document.createElement("button");
      del.type = "button";
      del.className = "btn btn-sm btn-danger btn-delete";
      del.textContent = "Delete";
      del.addEventListener(
        "click",
        (function (id) {
          //self-invoking function (IIFE)
          return function () {
            removeById(id);
          };
        })(item.id)
      );

      body.appendChild(h5);
      body.appendChild(pPrice);
      body.appendChild(pStars);

      card.appendChild(img);
      card.appendChild(body);
      card.appendChild(del);

      col.appendChild(card);
      cards.appendChild(col);
    }
  }

  function addCard() {
    var name = nameInput.value.trim();
    var url = urlInput.value.trim();
    var price = priceInput.value.trim();
    var rating = ratingSelect.value;

    if (!name) {
      alert("Please enter a title");
      return;
    }
    if (!url || (url.indexOf("http://") !== 0 && url.indexOf("https://") !== 0)) {
      alert("Invalid image URL");
      return;
    }
    if (!price || Number(price) <= 0) {
      alert("Please enter a price greater than 0");
      return;
    }
    if (!rating) {
      alert("Please choose a rating");
      return;
    }

    var item = {
      id: Date.now(),
      name: name,
      url: url,
      price: Number(price),
      rating: rating,
    };

    state.push(item);
    save();
    render();

    // reset the form
    nameInput.value = "";
    urlInput.value = "";
    priceInput.value = "";
    ratingSelect.value = "";
    nameInput.focus();
  }

  // init
  load();
  render();
  saveBtn.addEventListener("click", addCard);
})();
