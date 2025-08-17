
async function getCryptoCoins() {
    try {

        const response = await fetch('https://api.coingecko.com/api/v3/coins/list')


        if (response.status !== 200) {
            throw new Error('Faild to fetch coins API')
        }

        const coinsResponse = await response.json()

        contentArea.innerHTML = '';

        let coins = []

        for (let i = 0; i < 10; i++) {
            coins.push(coinsResponse[i])
        }

        for (const coin of coins) {
            const card = createCoinCard(coin)
            contentArea.append(card)
        }

        openModalAfterFiveToggledButtons()

        return coins

    } catch (error) {
        console.error(error)
        contentArea.innerHTML = "<p>Cant get the data right now</p>"
    }
}

getCryptoCoins()


function createCoinCard(coin) {
    const card = document.createElement('div')
    card.className = 'card glass-effect'
    card.dataset.id = coin.id

    const cardHeader = document.createElement('div')
    cardHeader.className = 'card-header'

    const coinInfoWrapper = document.createElement('div')
    coinInfoWrapper.className = 'coin-info-wrapper'

    // const coinImg = document.createElement('img')
    // coinImg.className = 'coin-img'
    // // coinImg.src = coin.image

    const coinSymbolAndNameWrapper = document.createElement('div')
    coinSymbolAndNameWrapper.className = 'coin-name-and-symbol'

    const coinSymbol = document.createElement('p')
    coinSymbol.className = 'coin-symbol'
    coinSymbol.innerText = coin.symbol

    const coinName = document.createElement('p')
    coinName.className = 'coin-name'
    coinName.innerText = coin.name

    const switchBtn = document.createElement('label')
    switchBtn.className = 'switch'

    const switchCheckbox = document.createElement('input')
    switchCheckbox.className = 'checkbox'
    switchCheckbox.type = 'checkbox'

    const switchSlider = document.createElement('span')
    switchSlider.className = 'slider round glass-effect'

    const accordion = document.createElement('details')
    accordion.className = 'see-more-accordion'

    const loader = document.createElement('div')
    loader.className = 'loader hidden'

    const accordionSummary = document.createElement('summary')
    accordionSummary.className = 'see-more-heading'
    accordionSummary.innerText = 'See More'

    const accordionContentBox = document.createElement('div')
    accordionContentBox.className = 'accordion-content-box'


    card.append(cardHeader, accordion)
    cardHeader.append(coinInfoWrapper, switchBtn)
    coinInfoWrapper.append(coinSymbolAndNameWrapper)
    coinSymbolAndNameWrapper.append(coinSymbol, coinName)
    switchBtn.append(switchCheckbox, switchSlider)
    accordion.append(accordionSummary, accordionContentBox)
    accordionSummary.append(loader)

    return card
}


const homePageBtn = document.querySelector('#home-page-btn')
const aboutPageBtn = document.querySelector('#about-page-btn')
const contentArea = document.querySelector('#inner-content-area')

aboutPageBtn.addEventListener('click', async (e) => {
    e.preventDefault()

    try {
        const response = await fetch('about.html')

        if (response.status !== 200) {
            throw new Error('Error fetching the about page data')
        }

        const responseHTML = await response.text()

        contentArea.innerHTML = responseHTML


    } catch (error) {
        console.error(error)
        contentArea.innerHTML = "<p>Cant get the data right now</p>"
    }

})

homePageBtn.addEventListener('click', async (e) => {
    e.preventDefault()

    getCryptoCoins()

})


const searchInput = document.querySelector('#search-input')
const searchInputBtn = document.querySelector('#search-btn')

let userInput = ''

searchInput.addEventListener('input', () => {
    userInput = searchInput.value.toLowerCase()
    console.log(userInput)
})

searchInputBtn.addEventListener('click', () => {

    const cards = document.querySelectorAll('.card')

    for (const card of cards) {
        if (!card.innerText.toLowerCase().includes(userInput)) {
            card.classList.add('hide')
        }
    }
})


async function getCoinMoreInfoData(cardId, card) {

    const Id = cardId
    const coinCard = card
    const loader = coinCard.querySelector('.loader')
    const cacheKey = `cache:coin${Id}`

    try {

        loader.classList.remove('hidden')

        const cached = getChace(cacheKey)
        let coinData

        if (cached) {
            coinData = cached

        } else {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${Id}`)

            if (response.status !== 200) {
                throw new Error('failed to fetch the coin data')
            }

            coinData = await response.json()

            setCache(cacheKey, coinData, 2 * 60 * 1000)
        }



        const accordionContentBox = coinCard.querySelector('.accordion-content-box')
        loader.classList.add('hidden')
        accordionContentBox.append(addMoreInfoDetailsToCard(coinData))

    } catch (error) {
        console.error(error)
        contentArea.innerHTML = "<p>Cant get the data right now</p>"
        loader.classList.add('hidden')
    }
}


contentArea.addEventListener('click', (e) => {

    if (e.target.classList.contains('see-more-heading')) {
        const card = e.target.closest('.card')
        const cardId = card.dataset.id
        const accordionContentBox = card.querySelector('.accordion-content-box')
        const hasContent = accordionContentBox.querySelector('.see-more-content') !== null
        console.log(hasContent)

        if (hasContent) {
            accordionContentBox.innerHTML = ''
        } else {
            getCoinMoreInfoData(cardId, card)
        }

    }
})

function addMoreInfoDetailsToCard(coinData) {

    const accordionSeeMoreContent = document.createElement('div')
    accordionSeeMoreContent.className = 'see-more-content'

    const dollarsDataTile = document.createElement('div')
    dollarsDataTile.className = 'data-tile'

    const dollarDataTileTitle = document.createElement('p')
    dollarDataTileTitle.className = 'data-tile-title'
    dollarDataTileTitle.innerText = 'Price in Dollar'

    const dollarDataTileValue = document.createElement('p')
    dollarDataTileValue.className = 'data-tile-value'
    dollarDataTileValue.innerText = coinData.market_data.current_price.usd + '$'

    const euroDataTile = document.createElement('div')
    euroDataTile.className = 'data-tile'

    const euroDataTileTitle = document.createElement('p')
    euroDataTileTitle.className = 'data-tile-title'
    euroDataTileTitle.innerText = 'Price in Euro'

    const euroDataTileValue = document.createElement('p')
    euroDataTileValue.className = 'data-tile-value'
    euroDataTileValue.innerText = coinData.market_data.current_price.eur + '€'

    const shekelDataTile = document.createElement('div')
    shekelDataTile.className = 'data-tile'

    const shekelDataTileTitle = document.createElement('p')
    shekelDataTileTitle.className = 'data-tile-title'
    shekelDataTileTitle.innerText = 'Price in Shekel'

    const shekelDataTileValue = document.createElement('p')
    shekelDataTileValue.className = 'data-tile-value'
    shekelDataTileValue.innerText = coinData.market_data.current_price.ils + '₪'


    accordionSeeMoreContent.append(dollarsDataTile, euroDataTile, shekelDataTile)
    dollarsDataTile.append(dollarDataTileTitle, dollarDataTileValue)
    euroDataTile.append(euroDataTileTitle, euroDataTileValue)
    shekelDataTile.append(shekelDataTileTitle, shekelDataTileValue)

    return accordionSeeMoreContent
}


function setCache(key, data, ttlMs) {
    const record = {
        data,
        expiry: Date.now() + ttlMs
    }

    localStorage.setItem(key, JSON.stringify(record))
}

function getChace(key) {
    const raw = localStorage.getItem(key)
    if (!raw) return null

    try {
        const record = JSON.parse(raw)
        if (Date.now() > record.expiry) {
            localStorage.removeItem(key)
            return null
        }
        return record.data

    } catch (error) {
        localStorage.removeItem(key)
        return null
    }
}

const reportModal = document.querySelector('.report-modal')
const modalOverlay = document.querySelector('.overlay')
const modalCoinsList = document.querySelector('.coins-switch-list')

function openModalAfterFiveToggledButtons() {
    const switchButtons = contentArea.querySelectorAll('.checkbox')

    let count = 0
    let coinsNames = []

    for (const switchBtn of switchButtons) {

        switchBtn.addEventListener('click', (e) => {

            if (switchBtn.checked && count >= 5) {
                e.preventDefault()
                for (const coinName of coinsNames) {
                    modalCoinsList.append(createCoinDataTile(coinName))
                }
                modalOverlay.classList.remove('hidden')  
                
                return
            }

            if (switchBtn.checked) {
                const selectedSwitchCard = switchBtn.closest('.card')
                const coinId = selectedSwitchCard.dataset.id
                const coinName = selectedSwitchCard.querySelector('.coin-name').innerText
                coinsNames.push({ name: coinName, Id: coinId })
                count++
            } else {
                const selectedSwitchCard = switchBtn.closest('.card')
                const coinName = selectedSwitchCard.querySelector('.coin-name').innerText
                for (let i = 0; i < coinsNames.length; i++) {
                    if (coinsNames[i].name === coinName) {
                        coinsNames.splice(i, 1)
                        break
                    }
                }
                count--
            }
            console.log(count);
            console.log(coinsNames);

        })
    }

    modalCoinsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('checkbox')) {
            const coinDataTile = e.target.closest('.coin-switch-wrapper')
            const coinId = coinDataTile.dataset.id

            const card = contentArea.querySelector(`.card[data-id="${coinId}"]`)

            if (card) {
                const cardSwitch = card.querySelector('.checkbox')
                cardSwitch.checked = false
                for(let i = 0; i < coinsNames.length; i++){
                    if(coinsNames[i].Id === coinId){
                        coinsNames.splice(i, 1)
                        count--
                        console.log(coinsNames);      
                    }
                }
                modalCoinsList.innerHTML = ''
                modalOverlay.classList.add('hidden')
                
            }
        }
    })
}



const closeModalIconBtn = document.querySelector('#close-modal')
const cancelModalBtn = document.querySelector('.cancel-btn')

closeModalIconBtn.addEventListener('click', () => {
    modalCoinsList.innerHTML = ''
    modalOverlay.classList.add('hidden')
})

cancelModalBtn.addEventListener('click', () => {
    modalCoinsList.innerHTML = ''
    modalOverlay.classList.add('hidden')
})

function createCoinDataTile(coinName) {
    const coinDataTile = document.createElement('div')
    coinDataTile.className = 'coin-switch-wrapper'
    coinDataTile.dataset.id = coinName.Id

    const coinNameModal = document.createElement('p')
    coinNameModal.className = 'coin-name-modal'
    coinNameModal.innerText = coinName.name

    const switchBtn = document.createElement('label')
    switchBtn.className = 'switch'

    const switchCheckbox = document.createElement('input')
    switchCheckbox.className = 'checkbox'
    switchCheckbox.type = 'checkbox'
    switchCheckbox.checked = true

    const switchSlider = document.createElement('span')
    switchSlider.className = 'slider round glass-effect'

    coinDataTile.append(coinNameModal, switchBtn)
    switchBtn.append(switchCheckbox, switchSlider)

    return coinDataTile
}



