document
  .querySelector("#holidaySubmit")
  .addEventListener("click", holidaySubmit);

window.addEventListener("DOMContentLoaded", () => {
  const holidays = JSON.parse(localStorage.getItem("holidays")) || [];
  holidays.forEach((holiday) => {
    renderHolidayItem(holiday);
  });
});

function holidaySubmit() {
  const holidayNameText = document.querySelector("#holidayName").value;
  const holidayImage = document.querySelector("#holidayImage").value;
  const holidayCostText = document.querySelector("#holidayCost").value + " Nis";
  const holidayRatingText = document.querySelector("#holidayRating").value;

  if (!holidayNameText || !holidayImage || !holidayCostText) return;

  let holidayRating = 0;
  switch (holidayRatingText) {
    case "Excellent":
      holidayRating = 4;
      break;
    case "Good":
      holidayRating = 3;
      break;
    case "Regular":
      holidayRating = 2;
      break;
    case "Bad":
      holidayRating = 1;
      break;
  }

  const holidayId = Date.now();

  const newHoliday = {
    id: holidayId,
    name: holidayNameText,
    image: holidayImage,
    cost: holidayCostText,
    rating: holidayRating,
    likes: 0,
  };

  addItemToLocalStorage(newHoliday);
  renderHolidayItem(newHoliday);

  document.getElementById("holidayForm").reset();
}

function renderHolidayItem(holiday) {
  const list = document.querySelector("#holidayList");

  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex flex-column align-items-center justify-content-center";
  li.dataset.id = holiday.id;

  const holidayNameEl = document.createElement("h3");
  holidayNameEl.textContent = holiday.name;
  holidayNameEl.className = "fw-bold";

  const costEl = document.createElement("p");
  costEl.textContent = holiday.cost;

  const image = document.createElement("img");
  image.src = holiday.image;
  image.className = "img-thumbnail w-50 mb-2";

  const starContainer = document.createElement("div");
  starContainer.className =
    "d-flex gap-1 justify-content-center flex-wrap mb-2";
  for (let i = 0; i < holiday.rating; i++) {
    const star = document.createElement("i");
    star.className = "bi bi-star-fill text-warning fs-3";
    starContainer.appendChild(star);
  }

  const likeContainer = document.createElement("div");
  likeContainer.className = "d-flex align-items-center gap-2 mt-2";

  const likeBtn = document.createElement("button");
  likeBtn.className = "btn btn-outline-primary btn-sm";
  likeBtn.innerHTML = '<i class="bi bi-hand-thumbs-up"></i>';

  const likeCount = document.createElement("span");
  likeCount.textContent = holiday.likes || 0;

  likeBtn.addEventListener("click", () => {
    let count = parseInt(likeCount.textContent);
    count++;
    likeCount.textContent = count;
    updateLikesInLocalStorage(holiday.id, count);
  });

  likeContainer.appendChild(likeBtn);
  likeContainer.appendChild(likeCount);

  const button = document.createElement("button");
  button.className = "btn btn-danger mt-2";
  button.textContent = "Remove";

  button.addEventListener("click", () => {
    li.remove();
    removeItemFromLocalStorage(holiday.id);
  });

  li.append(holidayNameEl, starContainer, image, costEl, likeContainer, button);
  list.appendChild(li);
}

function addItemToLocalStorage(item) {
  let holidays = JSON.parse(localStorage.getItem("holidays")) || [];
  holidays.push(item);
  localStorage.setItem("holidays", JSON.stringify(holidays));
}

function removeItemFromLocalStorage(id) {
  let holidays = JSON.parse(localStorage.getItem("holidays")) || [];
  holidays = holidays.filter((holiday) => holiday.id !== id);
  localStorage.setItem("holidays", JSON.stringify(holidays));
}

function updateLikesInLocalStorage(id, newLikes) {
  const holidays = JSON.parse(localStorage.getItem("holidays")) || [];
  const updated = holidays.map((h) =>
    h.id === id ? { ...h, likes: newLikes } : h
  );
  localStorage.setItem("holidays", JSON.stringify(updated));
}
