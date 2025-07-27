loadCards()
document.getElementById("cardForm").addEventListener("submit", createCard)

function loadCards() {
  const cards = JSON.parse(localStorage.getItem("cards")) || {}
  const cardContainer = $("#cardContainer")

  for (const card in cards) {
    const cardHTML = $(cards[card])
    cardContainer.append(cardHTML)

    cardHTML.find(".deleteCard").on("click", deleteCard)
    cardHTML.find(".addHeart").on("click", addHeart)
  }
}

function addHeart(event) {
  const cards = JSON.parse(localStorage.getItem("cards")) || {}
  const card = $(event.target).closest(".card")

  const span = $(event.target).siblings("span")
  let count = parseInt(span.text()) + 1 || 1
  span.text(count)

  card.find(".heartContainer > span").text(count)

  cards[card.attr("counter")] = card.prop("outerHTML")

  localStorage.setItem("cards", JSON.stringify(cards))
}

function addCardToLocalStorage(card, counter) {
  const localStorageVariable = JSON.parse(localStorage.getItem("cards")) || {}
  localStorageVariable[counter] = card
  localStorage.setItem("cards", JSON.stringify(localStorageVariable))
}

function returnAndUpdateCounter() {
  let counter = parseInt(localStorage.getItem("counter"))
  counter = counter ? counter + 1 : 1
  localStorage.setItem("counter", counter)
  return counter
}

function deleteCard(event) {
  const cards = JSON.parse(localStorage.getItem("cards")) || {}
  const card = $(event.target).parent().parent()
  const counter = card.attr("counter")

  card.remove()
  delete cards[counter]

  localStorage.setItem("cards", JSON.stringify(cards))
}

function createCard(event) {
  const name = $("#tripIdea").val()
  const url = $("#tripURL").val()
  const price = $("#tripPrice").val()
  const rating = $("#tripRating").val()

  const stars = '<i class="bi bi-star-fill"></i>'.repeat(rating)

  let counter = returnAndUpdateCounter()
  const card = `
      <div counter=${counter} class="flex-shrink-0 card border-primary mb-3" style="max-width: 18rem">
        <div class="card-header bg-transparent border-primary d-flex justify-content-between">
          <div class="heartContainer d-flex align-items-center gap-1 text-danger">
            <span>0</span>
            <i class="bi bi-heart-fill cursor-pointer addHeart"></i>
          </div>
          <span class="d-inline fw-semibold">${name}</span>
          <i class="bi bi-x-square cursor-pointer deleteCard"></i>
        </div>
        <div class="d-flex justify-content-center card-body text-primary p-2">
          <img class="card-img-top" src="${url}" alt="${name}" />
        </div>
        <div class="card-footer bg-transparent border-primary p-2">
          <div class="text-success">Price: $${price}</div>
          <div class="text-warning">Rating: ${stars}</div>
        </div>
      </div>
    `
  addCardToLocalStorage(card, counter)
}
