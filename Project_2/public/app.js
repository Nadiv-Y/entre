const contentArea = document.querySelector('#inner-content-area')



const navBarButtons = document.querySelectorAll('.nav-btn')
const burgerMenuButtons = document.querySelectorAll('.nav-btn.humburger')
const homePageBtn = document.querySelector('#home-page-btn')
const homePageBtnBurger = document.querySelector('#home-page-btn-humburger')

console.log(navBarButtons)
homePageBtn.classList.add('active')
homePageBtnBurger.classList.add('active')

renderHomePage()

for (const button of navBarButtons) {
    button.addEventListener('click', () => {
        for (const btn of navBarButtons) {
            btn.classList.remove('active')
        }

        button.classList.add('active')

        if (button.id === 'home-page-btn' || button.id === 'home-page-btn-humburger') {
            renderHomePage()

        } else if (button.id === 'about-page-btn' || button.id === 'about-page-btn-humburger') {
            renderAboutPage()

        } else if (button.id === 'reports-page-btn' || button.id === 'reports-page-btn-humburger') {
            console.log('reports-page');
        }
    })

}


const burgerMenuBtn = document.querySelector('.humburger-menu')
const burgerMenu = document.querySelector('.buttons-group-humburger')


burgerMenuBtn.addEventListener('click', () => {
    burgerMenu.classList.toggle('show')
})


for (const btn of burgerMenuButtons) {
    btn.addEventListener('click', () => {
        burgerMenu.classList.remove('show')
    })
}


async function getCryptoCoins() {

    

    try {

        const response = await fetch('https://api.coingecko.com/api/v3/coins/list')


        if (response.status !== 200) {
            throw new Error('Faild to fetch coins API')
        }

        const coinsResponse = await response.json()



        return coinsResponse.slice(0, 100)

    } catch (error) {
        console.error(error)
        return []
    }
}




async function renderHomePage() {
    const coins = await getCryptoCoins()

    contentArea.innerHTML = ''

    for (const coin of coins) {
        const card = createCoinCard(coin)
        contentArea.append(card)
    }

    openModalAfterFiveToggledButtons()
}

function renderAboutPage() {

    contentArea.innerHTML = ''

    const aboutPage = document.createElement('div')
    aboutPage.classList = 'about-page'

    const textWrapper = document.createElement('div')
    textWrapper.className = 'about-page-text-wrapper'

    const heading = document.createElement('h2')
    heading.className = 'about-page-heading'
    heading.innerText = 'About Crypto'

    const description = document.createElement('p')
    description.className = 'about-page-description'
    description.innerText = 'Crypto is a modern platform that provides a simple and interactive dashboard for tracking the world of cryptocurrencies. Our mission is to make digital assets more accessible by giving users real-time insights into the latest coins, prices, and market trends. With a clean interface and intuitive design, Crypto helps both beginners and experienced investors explore, compare, and stay informed about the fast-moving crypto market.'

    const coinImg = document.createElement('img')
    coinImg.className = 'about-page-img'
    coinImg.src = 'lib/coins.png'

    aboutPage.append(textWrapper, coinImg)
    textWrapper.append(heading, description)

    contentArea.append(aboutPage)

}

function createCoinCard(coin) {
    const card = document.createElement('div')
    card.className = 'card glass-effect'
    card.dataset.id = coin.id

    const cardHeader = document.createElement('div')
    cardHeader.className = 'card-header'

    const coinInfoWrapper = document.createElement('div')
    coinInfoWrapper.className = 'coin-info-wrapper'

    const coinSymbolAndNameWrapper = document.createElement('div')
    coinSymbolAndNameWrapper.className = 'coin-name-and-symbol'

    const coinSymbol = document.createElement('p')
    coinSymbol.className = 'coin-symbol'
    coinSymbol.innerText = coin.symbol
    coinSymbol.setAttribute('data-fulltext', coin.symbol)

    const coinName = document.createElement('p')
    coinName.className = 'coin-name'
    coinName.innerText = coin.name
    coinName.setAttribute('data-fulltext', coin.name)

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


const aboutPageBtn = document.querySelector('#about-page-btn')

const searchInput = document.querySelector('#search-input')
const searchInputBtn = document.querySelector('#search-btn')
const searchInputClearBtn = document.querySelector('#clear-search-btn')

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

searchInputClearBtn.addEventListener('click', () => {
    searchInput.value = ''
    renderHomePage()
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
            console.log(coinData)

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

    const imgDataTile = document.createElement('div')
    imgDataTile.className = 'data-tile'

    const imgDataTileTitle = document.createElement('p')
    imgDataTileTitle.className = 'data-tile-title'
    imgDataTileTitle.innerText = 'Coin Image'

    const coinImg = document.createElement('img')
    coinImg.className = 'coin-img'
    coinImg.src = coinData.image.small

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

    accordionSeeMoreContent.append(imgDataTile, dollarsDataTile, euroDataTile, shekelDataTile)
    imgDataTile.append(imgDataTileTitle, coinImg)
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
let count = 0

function openModalAfterFiveToggledButtons() {
    const switchButtons = contentArea.querySelectorAll('.checkbox')


    let coinsNames = []
    let switchSelected

    for (const switchBtn of switchButtons) {

        switchBtn.addEventListener('click', (e) => {

            if (switchBtn.checked && count >= 5) {
                e.preventDefault()
                for (const coinName of coinsNames) {
                    modalCoinsList.append(createCoinDataTile(coinName))
                }
                modalOverlay.classList.remove('hidden')
                switchSelected = e.target

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
                for (let i = 0; i < coinsNames.length; i++) {
                    if (coinsNames[i].Id === coinId) {
                        coinsNames.splice(i, 1)
                        count--
                        console.log(coinsNames);
                    }
                }
                modalCoinsList.innerHTML = ''
                modalOverlay.classList.add('hidden')
                switchSelected.checked = true
                const selectedSwitchCard = switchSelected.closest('.card')
                const coinid = selectedSwitchCard.dataset.id
                const coinName = selectedSwitchCard.querySelector('.coin-name').innerText
                coinsNames.push({ name: coinName, Id: coinid })
                count++
                console.log(coinsNames);
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


