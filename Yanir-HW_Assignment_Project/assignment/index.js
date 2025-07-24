
const form = document.getElementById("vacationForm");
const container = document.getElementById("cardsContainer");

const savedCards = JSON.parse(localStorage.getItem("cards")) || {};
console.log('savedCards', savedCards);

for (const key in savedCards) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = savedCards[key];
  const card = wrapper.firstElementChild;

  attachDeleteListener(card, key);
  attachLikeListener(card, key);
  container.appendChild(card);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value();
  const image = document.getElementById("image").value();
  const price = document.getElementById("price").value();
  const rating = parseInt(document.getElementById("rating").value);

  if (!name || !image || !price || !rating) return;

  const card = document.createElement("div");
  card.className = "card";

  const counter = parseInt(localStorage.getItem("counter") || "0") + 1;
  localStorage.setItem("counter", counter);
  card.setAttribute("data-id", counter);

 const stars = `<i class="bi bi-star-fill"></i>`.repeat(rating) +  `<i class="bi bi-star"></i>`.repeat(4 - rating);

  
 card.innerHTML = `
        <button class="delete-btn bi bi-x"></button>
        <img src="${image}" alt="${name}">
        <div class="price">$${price}</div>
        <div>
          <h4>${name}</h4>
          <div class="stars">${stars}</div>
          <button class="like-btn" data-count="0"><i class="bi bi-hand-thumbs-up"></i> <span class="like-count">0</span> </button>
        </div>
      `;
  
  attachDeleteListener(card, counter);
  attachLikeListener(card, counter);
  container.appendChild(card);

  const updatedCards = JSON.parse(localStorage.getItem("cards")) || {};
  updatedCards[counter] = card.outerHTML;
  localStorage.setItem("cards", JSON.stringify(updatedCards));

  form.reset();
});

function attachDeleteListener(card, id) {
  card.querySelector(".delete-btn").addEventListener("click", () => {
    card.remove();
    const updatedCards = JSON.parse(localStorage.getItem("cards")) || {};
    delete updatedCards[id];
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  });
}

function attachLikeListener(card, id) {

  const likeBtn = card.querySelector(".like-btn");
  const countSpan = likeBtn.querySelector(".like-count");

  const likeCounts = JSON.parse(localStorage.getItem("likes")) || {};
  const count = likeCounts[id] || 0;
  countSpan.textContent = count;
  likeBtn.setAttribute("data-count", count);

  likeBtn.addEventListener("click", () => {
    let newCount = parseInt(likeBtn.getAttribute("data-count")) + 1;
    likeBtn.setAttribute("data-count", newCount);
    countSpan.textContent = newCount;

    const updatedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    updatedLikes[id] = newCount;
    localStorage.setItem("likes", JSON.stringify(updatedLikes));
  });
}
