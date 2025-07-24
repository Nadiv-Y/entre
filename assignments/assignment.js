displayItemsFromLocalStorage();

document.getElementById("save-vacation").addEventListener("click", addCard);
const cardSection = document.getElementById("vacation-cards");

function addCard() {
  const card = document.createElement("div");
  card.className = "vacation-card d-flex flex-column";

  const name = document.querySelector("#vacation-name").value;
  const pic = document.querySelector("#vacation-img").value;
  const price = document.querySelector("#vacation-price").value;
  const rating = document.querySelector("#vacation-rating").value;

  if (!name || !pic || !price || !rating) {
    alert("Please fill all fields...");
    return;
  }

  const cardTitle = document.createElement("h2");
  cardTitle.className = "card-title";
  cardTitle.innerText = name;

  const cardImage = document.createElement("img");
  cardImage.src = pic;
  cardImage.className = "card-img";
  cardImage.alt = `Vacation image: ${name}`;

  const cardPrice = document.createElement("div");
  cardPrice.className = "card-price";
  cardPrice.innerText = `Price: $${price}`;

  const cardRating = document.createElement("div");
  cardRating.className = "card-rating";

  const starCount = {
    Excellent: 4,
    Good: 3,
    Regular: 2,
    Bad: 1,
  };

  for (let i = 0; i < starCount[rating]; i++) {
    const star = document.createElement("i");
    star.className = "bi bi-star-fill text-warning";
    cardRating.appendChild(star);
  }

  const likeWrapper = document.createElement("div");
  likeWrapper.className =
    "d-flex align-items-center justify-content-center gap-2 mt-2";

  const likeBtn = document.createElement("i");
  likeBtn.className = "bi bi-hand-thumbs-up like-btn";
  likeBtn.style.cursor = "pointer";

  const likeCount = document.createElement("span");
  likeCount.className = "like-count";
  likeCount.innerText = "0";

  likeBtn.addEventListener("click", function () {
    addLike(likeCount, card.getAttribute("counter"));
  });

  likeWrapper.appendChild(likeBtn);
  likeWrapper.appendChild(likeCount);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm mt-2";
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", removeCard);

  card.appendChild(cardTitle);
  card.appendChild(cardImage);
  card.appendChild(likeWrapper);
  card.appendChild(cardPrice);
  card.appendChild(cardRating);
  card.appendChild(deleteBtn);

  const oldCounter = parseInt(localStorage.getItem("counter"));
  const counter = oldCounter ? oldCounter + 1 : 1;
  card.setAttribute("counter", counter);

  cardSection.appendChild(card);

  addItemToLocalStorage(card, counter);

  document.getElementById("vacation-form").reset();
}

function addLike(element, counter) {
  let count = parseInt(element.innerText);
  count++;
  element.innerText = count;

  let likes = JSON.parse(localStorage.getItem("likes")) || {};
  likes[counter] = count;
  localStorage.setItem("likes", JSON.stringify(likes));
}

function addItemToLocalStorage(element, counter) {
  localStorage.setItem("counter", counter);

  let storedSection = JSON.parse(localStorage.getItem("cards-section"));
  storedSection = storedSection ? storedSection : {};
  storedSection[counter] = element.outerHTML;
  localStorage.setItem("cards-section", JSON.stringify(storedSection));
}

function removeCard(event) {
  const card = event.target.parentElement;
  const cardSection = card.parentElement;

  cardSection.removeChild(card);

  removeItemFromLocalStorage(card);
}

function removeItemFromLocalStorage(element) {
  let storedSection = JSON.parse(localStorage.getItem("cards-section"));

  if (!storedSection) {
    return;
  }

  const counter = element.getAttribute("counter");
  delete storedSection[counter];
  localStorage.setItem("cards-section", JSON.stringify(storedSection));
}

function displayItemsFromLocalStorage() {
  let storedSection = JSON.parse(localStorage.getItem("cards-section"));
  let likes = JSON.parse(localStorage.getItem("likes")) || {};

  if (!storedSection) {
    return;
  }

  const placeholder = document.createElement("div");
  for (const key in storedSection) {
    placeholder.innerHTML = storedSection[key];

    const card = placeholder.firstElementChild;

    const likeBtn = card.querySelector(".like-btn");
    const likeCount = card.querySelector(".like-count");

    if (likes[key]) {
      likeCount.innerText = likes[key];
    }

    likeBtn.addEventListener("click", function () {
      addLike(likeCount, key);
    });

    const deleteBtn = card.querySelector(".btn-danger");
    deleteBtn.addEventListener("click", removeCard);

    document.querySelector("#vacation-cards").append(card);
  }
}
