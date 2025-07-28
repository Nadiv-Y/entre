document.querySelector("#save").addEventListener("click", createCard);

function createCard() {
  const cardContainer = document.querySelector(".card-container");
  if (cardContainer.children.length >= 4) {
    alert("you can only create up to 4 cards");
    return;
  }
  const card = document.createElement("div");
  card.className = "card";
  const header = document.createElement("div");
  header.className = "header";
  const image = document.createElement("div");
  image.className = "image";
  const footer = document.createElement("div");
  footer.className = "footer";
  const deleteBtn = document.createElement("button");
  deleteBtn.id = "delete-card";
  deleteBtn.type = "button";
  deleteBtn.className = "btn-close";
  deleteBtn.innerText = ""
  deleteBtn.addEventListener("click", function (event) {
    if (!confirm("Are you sure?")) return;
    const card = event.target.parentElement;
    card.remove();
  });

  const vacationName = document.querySelector("#vacation-name").value;
  header.append(vacationName);
  if (!vacationName) {
    alert("please enter vacation name...");
    return;
  }

  const URL2image = document.querySelector("#basic-url").value;
  
  if (!URL2image || !URL2image.startsWith("http")) {
    alert("Please enter a valid image URL.");
    return;
  }
  const img = document.createElement("img");
  img.setAttribute('src', URL2image)
  img.alt = "Image from URL";
  img.style.width = "100%";
  img.style.height = "auto";
  img.style.objectFit = "cover";
  img.style.display = "block";

  image.append(img);

  const price = document.querySelector("#price").value;
  if (!price) {
    alert("please enter the price...");
    return;
  }
  const pForPrice = document.createElement("p");
  pForPrice.innerText = "the price is: $";

  pForPrice.append(price);

  const rating = document.querySelector("#rate").value;
  if (rating === "How was your vaction - Give a rating") {
    alert("please enter rating...");
    return;
  }

  document.querySelector("#vacation-name").value = " ";
  document.querySelector("#basic-url").value = " ";
  document.querySelector("#price").value = " ";
  document.querySelector("#rate").value = "How was your vaction - Give a rating"


  const pForRating = document.createElement("p");
  pForRating.textContent = "⭐".repeat(parseInt(rating));

  footer.append(pForPrice, pForRating);

  card.append(header, image, footer, deleteBtn);
  cardContainer.append(card);
}
