import { CONSTANTS } from "./constants.js"

$(`#${CONSTANTS.IDS.filterInput}`).on("input", filterSearchedData)

$(`#cancelButton`).on("click", function () {
  const lastCoinID = $(this).attr("lastcoin")
  $(`#${lastCoinID}`)[0].checked = false
  $(`#${CONSTANTS.IDS.overlay}`).removeClass("d-block").addClass("d-none")
})

$(document).on("click", `.${CONSTANTS.CLASSES.moreInfo}`, displayCryptoCoinInfo)
$(document).on("click", `.form-check-input`, checkMaxSwitchs)

displayCryptoCoins()

function checkMaxSwitchs() {
  const clickedSwitch = $(this)

  const coinID = clickedSwitch.attr("id").slice(7)
  const coinSymbol = clickedSwitch.parent().parent().children("h5").html()
  const IDinArray = CONSTANTS.VAR.SWITCHES[coinID]

  $(`#${CONSTANTS.IDS.cancelButton}`).attr("lastcoin", clickedSwitch.attr("id"))

  if (!IDinArray && clickedSwitch[0].checked) {
    if (Object.keys(CONSTANTS.VAR.SWITCHES).length >= 5) {
      const choiceContainer = $("#choiceContainer")

      choiceContainer.siblings("h4").html(`Choose a coin to swap with ${coinSymbol}`)

      choiceContainer.empty()
      for (const [key, value] of Object.entries(CONSTANTS.VAR.SWITCHES)) {
        choiceContainer.append(`<a class="btn btn-sm btn-outline-primary m-2 choice-btn" data-name="${key}" role="button">${value}</a>`)
      }
      $(document)
        .off("click", ".choice-btn")
        .on("click", ".choice-btn", function () {
          const switchOffID = $(this).attr("data-name")
          const coinSwitch = $(`#switch-${switchOffID}`)[0]
          if (coinSwitch) coinSwitch.checked = false
          delete CONSTANTS.VAR.SWITCHES[switchOffID]

          CONSTANTS.VAR.SWITCHES[coinID] = coinSymbol

          $(`#${CONSTANTS.IDS.overlay}`).removeClass("d-block").addClass("d-none")
        })

      $(`#${CONSTANTS.IDS.overlay}`).addClass("d-block").removeClass("d-none")

      return
    }
    CONSTANTS.VAR.SWITCHES[coinID] = coinSymbol
  } else if (IDinArray && !clickedSwitch[0].checked) {
    delete CONSTANTS.VAR.SWITCHES[coinID]
  }
}

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

async function displayCryptoCoinInfo(e) {
  let coinsInfo = JSON.parse(localStorage.getItem(CONSTANTS.LOCALSTORAGE.cryptoCoinsMoreInfo)) || {}
  const coinID = $(e.currentTarget).parent().parent().attr("id")
  const progressBar = $(`#progress-${coinID}`)

  await updateProgressBar(progressBar, 10)

  let coinInfo = null

  if (coinsInfo && coinID in coinsInfo && coinsInfo[coinID].creationTime + 120000 < +new Date()) {
    
    await updateProgressBar(progressBar, 50)
    coinInfo = coinsInfo[coinID]
  } else {
    coinInfo = await retriveDataFromAPI(`${CONSTANTS.URL.cryptoCoinsInfo}${coinID}`)
    
    await updateProgressBar(progressBar, 50)

    if (!coinInfo.error) {
      coinInfo["creationTime"] = +new Date()
      coinsInfo[coinID] = coinInfo
      localStorage.setItem(CONSTANTS.LOCALSTORAGE.cryptoCoinsMoreInfo, JSON.stringify(coinsInfo))
    } else {
      coinInfo["id"] = coinID
      coinInfo["creationTime"] = 9999999999999
      coinInfo["description"] = {"en":"error"}
      coinInfo["image"] = {"large":"error"}
      coinInfo["market_data"] = {"current_price":{}}
      coinInfo["name"] = coinInfo["error"]
      
      coinsInfo[coinID] = coinInfo
      localStorage.setItem(CONSTANTS.LOCALSTORAGE.cryptoCoinsMoreInfo, JSON.stringify(coinsInfo))
    }
  }

  let text = $(e.currentTarget).siblings(`.${CONSTANTS.CLASSES.coinInfoContainer}`).children(`.${CONSTANTS.CLASSES.coinInfo}`)

  if (text.children().length === 1) text.append(makeCoinInfo(coinInfo))
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

function makeCoinInfo(coinInfo) {
  const dot1 = coinInfo["description"]["en"].indexOf(".\r") + 1
  const dot2 = coinInfo["description"]["en"].indexOf(". ") + 1

  let des = dot1 || dot2
  if (dot1 !== 0) des = Math.min(dot1, dot2)

  return `<img
            class="mx-auto "
            src=${coinInfo["image"]["large"]}
            alt="${coinInfo["name"]}"
            style="width: 50px; height: 50px; object-fit: cover"
          />
          <div class="card-body">
            <p class="card-text text-center">
            ${coinInfo["description"]["en"].slice(0, des)}
            </p>
          </div>
          <div class="container">
            <div class="row text-center">
              <div class="col p-0">${coinInfo["market_data"]["current_price"]["eur"] || "NaN"}€</div>
              <div class="col p-0">${coinInfo["market_data"]["current_price"]["usd"] || "NaN"}$</div>
              <div class="col p-0">${coinInfo["market_data"]["current_price"]["ils"] || "NaN"}₪</div>
            </div>
          </div> `
}

function makeCoinHTML(coin) {
  return `<div class="card shadow-sm border-0 rounded-3 g-1" data-symbol="${coin.symbol.toUpperCase()}" id="${coin.id}">
      <div class="card-body ps-4 position-relative">

        <div class="d-flex align-items-center justify-content-between mb-2">
          <h5 class="card-title mb-0">${coin.symbol}</h5>
          <div class="form-check form-switch m-0">
            <input class="form-check-input" id="switch-${coin.id}" type="checkbox" role="switch" />
          </div>
        </div>

        <p class="card-text coin-name text-muted mb-3">${coin.name}</p>

        <a class="btn btn-sm btn-outline-primary more-info" data-bs-toggle="collapse" 
        href="#collapse-${coin.id}" role="button" aria-expanded="false" aria-controls="collapse-${coin.id}"> More Info </a>

        <div class="collapse position-absolute w-100 mt-2 shadow coin-info-container" style="top: 100%; left: 0; z-index: 10;"
             id="collapse-${coin.id}"
             data-bs-parent="#${CONSTANTS.IDS.cryptoContainer}">
          <div class="card card-body border-0 coin-info">
              <div class="progress position-absolute top-0 start-0 w-100" style="height: 4px">
                <div class="progress-bar progress-bar-striped progress-bar-animated" id="progress-${coin.id}" role="progressbar"></div>
              </div>
          </div>
        </div>

      </div>
    </div>`
}

function renderCoins(list) {
  const cryptoContainer = $(`#${CONSTANTS.IDS.cryptoContainer}`)
  cryptoContainer.empty()
  list.forEach((c) => cryptoContainer.append(makeCoinHTML(c)))
  for (const item in CONSTANTS.VAR.SWITCHES) {
    const coinSwitch = $(`#switch-${item}`)[0]
    if (item && coinSwitch) {
      coinSwitch.checked = true
    }
  }
}

function filterSearchedData() {
  const input = $(`#${CONSTANTS.IDS.filterInput}`).val().toUpperCase()
  let cryptoCoins = JSON.parse(localStorage.getItem(CONSTANTS.LOCALSTORAGE.cryptoCoins))

  const filtered = cryptoCoins.filter((c) => c.symbol.toUpperCase().startsWith(input))

  renderCoins(filtered.slice(0, CONSTANTS.VAR.MAX_RENDER))
}
