import { CONSTANTS } from "./constants.js"

$(`#${CONSTANTS.IDS.filterInput}`).on("input", filterSearchedData)

displayCryptoCoins()

async function displayCryptoCoins() {
  let cryptoCoins = localStorage.getItem(CONSTANTS.LOCALSTORAGE.cryptoCoins)
  const progressBar = $(`#${CONSTANTS.IDS.progressBarMain}`)

  await updateProgressBar(progressBar, 10)

  if (cryptoCoins) {
    await updateProgressBar(progressBar, 50)
    cryptoCoins = JSON.parse(cryptoCoins)
  } else {
    cryptoCoins = await retriveDataFromAPI(CONSTANTS.URL.cryptoCoinsURL)
    await updateProgressBar(progressBar, 50)

    if (!cryptoCoins.error) {
      localStorage.setItem(CONSTANTS.LOCALSTORAGE.cryptoCoins, JSON.stringify(cryptoCoins))
    } else {
      const cryptoContainer = $(`#${CONSTANTS.IDS.cryptoContainer}`)
      cryptoContainer.append(`
        <div class="text-center">
          <h2>Error ${cryptoCoins.error}</h2>
          <p>Try again later</p>
        </div>`)
      console.error("API error:", cryptoCoins.error)
      return
    }
  }

  renderCoins(cryptoCoins.slice(0, CONSTANTS.VAR.MAX_RENDER))
  await updateProgressBar(progressBar, 100)
}

async function retriveDataFromAPI(URL) {
  try {
    const response = await fetch(URL)
    if (!response.ok) throw new Error(`${response.status}`)
    return await response.json()
  } catch (error) {
    return { error: error.message }
  }
}

async function updateProgressBar($bar, value) {
  $bar.css("width", `${value}%`).attr("aria-valuenow", value)

  await new Promise((resolve) => requestAnimationFrame(resolve))
  if (value === 100) {
    $bar.parent().addClass("fade")
    $bar.parent().fadeOut(700)
  }
}

function makeCoinHTML(coin) {
  return `<div class="card shadow-sm border-0 rounded-3 g-1" data-symbol="${coin.symbol.toUpperCase()}" id="${coin.id}">
      <div class="card-body ps-4 position-relative">

        <div class="d-flex align-items-center justify-content-between mb-2">
          <h5 class="card-title mb-0">${coin.symbol}</h5>
          <div class="form-check form-switch m-0">
            <input class="form-check-input" type="checkbox" role="switch" />
          </div>
        </div>

        <p class="card-text text-muted mb-3">${coin.name}</p>

        <a class="btn btn-sm btn-outline-primary" data-bs-toggle="collapse" 
        href="#collapse-${coin.id}" role="button" aria-expanded="false" aria-controls="collapse-${coin.id}"> More Info </a>

        <div class="collapse position-absolute w-100 mt-2 shadow" style="top: 100%; left: 0; z-index: 10;"
             id="collapse-${coin.id}"
             data-bs-parent="#${CONSTANTS.IDS.cryptoContainer}">
          <div class="card card-body border-0">
            Some placeholder content for <b>${coin.name}</b>.
          </div>
        </div>

      </div>
    </div>`
}

function renderCoins(list) {
  const cryptoContainer = $(`#${CONSTANTS.IDS.cryptoContainer}`)
  cryptoContainer.empty()
  list.forEach((c) => cryptoContainer.append(makeCoinHTML(c)))
}

function filterSearchedData() {
  const input = $(`#${CONSTANTS.IDS.filterInput}`).val().toUpperCase()
  let cryptoCoins = JSON.parse(localStorage.getItem(CONSTANTS.LOCALSTORAGE.cryptoCoins))

  const filtered = cryptoCoins.filter((c) => c.symbol.toUpperCase().startsWith(input))

  renderCoins(filtered.slice(0, CONSTANTS.VAR.MAX_RENDER))
}
