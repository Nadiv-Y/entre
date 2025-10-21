
getAllCoins()
function displayLoader() {
    const loader = $('#loader')
    loader.show()
}
function hideLoader() {
    const loader = $('#loader')
    loader.hide()
}

function hasTwoMinutesPast(reqTime) {
    const timeNow = Date.now()
    const timePast = timeNow - reqTime
    return timePast >= 2 * 60 * 1000
}

function infoButTextChange(event) {
    const infoBut = $(event.target)
    if(infoBut.text() === 'More info'){
        infoBut.text('Less info')
    }else{
        infoBut.text('More info')
    }
    
}

function createMoreInfo(info, reqTime, coinId) {
    const moreInfo = $(`.info-for-${coinId}`)
    const errMsg = $('<h4>More info is unavailable right now, try again in 2 minutes</h4>')
    $(errMsg).addClass('text-light')
    if(info.error){
       $(moreInfo).empty().append(errMsg)
       return 
    }
    const moreInfoImgAndTexts = $('<div></div>')
    $(moreInfoImgAndTexts).addClass('d-flex m-2 align-items-center')

    const infoImgContainer = $('<div></div>')
    $(infoImgContainer).addClass('coin-img')
    const infoImg = $('<img>')
    $(infoImg).attr({
        'src': info.image.large,
        'alt':'image of the coin'
    })
    $(infoImgContainer).append(infoImg)

    const infoTexts = $('<div></div>')
    $(infoTexts).addClass('coin-values m-3')
    const shekel = '&#8362;'
    const usd = $('<p></p>').html(`current price in USD: ${info.market_data.current_price.usd}&dollar;`)
    const ero = $('<p></p>').html(` current price in EUR: ${info.market_data.current_price.eur}&euro;`)
    const ils = $('<p></p>').html(`current price in ILS: ${info.market_data.current_price.ils}${shekel}`)
    $(infoTexts).append(usd, ero, ils)

    $(moreInfoImgAndTexts).append(infoImgContainer, infoTexts)
    $(moreInfo).empty().append(moreInfoImgAndTexts)

    const infoForLocalStorage = {'div': moreInfoImgAndTexts[0].outerHTML, 'created': reqTime}

    addMoreInfoToLocalStorage(infoForLocalStorage, coinId)
    
}


async function getAllCoins() {
    displayLoader()
    let allCoins = []
    try {
        const allCoinsPromise = await fetch ('https://api.coingecko.com/api/v3/coins/list', {method: 'GET'})
        allCoins = await allCoinsPromise.json()
        let partOfAllCoins = allCoins.slice(0, 100)
        console.log(partOfAllCoins);
        filterCards(partOfAllCoins)
        for(let coin of partOfAllCoins){
            buildCard(coin.symbol, coin.id)
        }
        
    } catch (error) {
        console.log('failed loading coins from api.coingecko.com', error);
        const container = $('#all-coins')
        container.addClass('text-center my-5')
        const msg = $('<h2>ERROR...FAILED LOADING COINS</h2>')
        msg.addClass('text-light bg-danger py-5')
        $(container).empty().append(msg)
    }
    hideLoader()
}
async function getCoinInfo(coinId) {
    const reqTime = Date.now()
    let coinInfo = {}
    try {
        const coinInfoPromise = await fetch ('https://api.coingecko.com/api/v3/coins/'+coinId, {method: 'GET'})
        coinInfo = await coinInfoPromise.json()
    } catch (error) {
        console.log(error);
        coinInfo = {'error': error}
        
    }
    createMoreInfo(coinInfo, reqTime, coinId)
}

function buildCard(coinSymbol, coinId) {
    const cardContainer = $('#all-coins')
    const card = $('<div></div>')
    $(card).addClass('card col-md-4 col-sm-12 bg-warning p-1')
    .attr({'id':`${coinId}`, 'symbol':`${coinSymbol}`})
    const cardBody = $('<div></div>')
    $(cardBody).addClass('card-body bg-dark text-warning')
    const cardBodyContent = $('<div></div>')
    $(cardBodyContent).addClass('d-flex justify-content-between')

    const titleTextInfoBut = $('<div></div>')
    let cardTitle = $('<h3></h3>').text(coinSymbol)
    coinSymbol.length > 20 ? $(cardTitle).addClass('card-title smallheader') : $(cardTitle).addClass('card-title')
    
    const cardText = $('<p></p>').text(coinId)
    coinId.length > 30 ? $(cardText).addClass('card-text smalltext') : $(cardText).addClass('card-text')
    const infoBut = $('<button></button>').text('More info')
    $(infoBut).addClass('info-but btn btn-warning')
    .attr({
        'type':"button",
        'data-bs-toggle':"collapse",
        'data-bs-target':`.info-for-${coinId}`
    })
    $(infoBut).on('click', function(){
        if((infoBut).text()==='More info'){
            $(infoBut).text('Less info');
            chooseSourceOfMoreInfo(coinId)
        }else{
            $(this).text('More info')
        }
    })
    
    $(titleTextInfoBut).append(cardTitle, cardText, infoBut)

    const formSwichContainer = $('<div></div>')
    const formSwich = $('<div></div>')
    $(formSwich).addClass('form-check form-switch')
    const formSwichInput = $('<input>')
    $(formSwichInput).addClass('form-check-input')
    .attr({
        'type':'checkbox',
        'name':'add-coin-switch'
    })
    let checkedList = JSON.parse(localStorage.getItem('checked-cards-list'))
    if(checkedList){
        if(checkedList[coinId]){
            $(formSwichInput).attr({'checked':true})
        }
    }
     
    $(formSwichInput).click(function() {
        if(this.checked){
            $(this).attr({'checked':true})
            const checkedList = JSON.parse(localStorage.getItem('checked-cards-list'))
            if(checkedList){
                const checkedListItem = Object.keys(checkedList)
                if(checkedListItem.length == 5){
                    showCheckedCardsModal(checkedList, coinId)
                    return
                }
            }
            addToggle($(this).closest('.card'))
        }else{
            $(this).attr({'checked':false})
            removeFromCheckedList($(this).closest('.card'))
        }
    })
    
    $(formSwich).append(formSwichInput)
    $(formSwichContainer).append(formSwich)

    const moreInfo = $('<div></div>')
    $(moreInfo).addClass(`info-for-${coinId} collapse`)

    const loader = $('<div></div>')
    $(loader).addClass('spinner-border text-warning col-md-4 col-sm-12 mt-3 d-block')
    
    
    $(moreInfo).append(loader)

    $(cardBodyContent).append(titleTextInfoBut, formSwichContainer)
    $(cardBody).append(cardBodyContent, moreInfo)
    $(card).append(cardBody)
    $(cardContainer).append(card)
}

function chooseSourceOfMoreInfo(coinId) {
    const infofromLocalStorage = JSON.parse(localStorage.getItem('info-list'))
    if(!infofromLocalStorage){
        getCoinInfo(coinId)
        return
    }
    if(!infofromLocalStorage[coinId]){
        getCoinInfo(coinId)
        return
    }
    
    if(hasTwoMinutesPast(infofromLocalStorage[coinId].created)){
        getCoinInfo(coinId)
    }else{
        displayinfofromLocalStorage(coinId)
        console.log(hasTwoMinutesPast(infofromLocalStorage[coinId].created));
        
    }
}

function addMoreInfoToLocalStorage(obj, coinId) {
    let moreInfoList = JSON.parse(localStorage.getItem('info-list'))
    moreInfoList = moreInfoList ? moreInfoList : {}
    moreInfoList[coinId] = obj
    localStorage.setItem('info-list', JSON.stringify(moreInfoList))
}

function displayinfofromLocalStorage(coinId) {
    const infofromLocalStorage = JSON.parse(localStorage.getItem('info-list'))
    const moreInfo = $(`.info-for-${coinId}`)
    $(moreInfo).empty().append(infofromLocalStorage[coinId].div)

}


const addToggle = (element) => {
    const cardId = element.attr('id')
    const obj = element[0].outerHTML
    console.log(`${cardId} is toggled`);
    console.log(obj);
    addCardToLocalStorage(obj, cardId) 
}
const removeFromCheckedList = (element) => {
    const cardId = element.attr('id')
    let checkedList = JSON.parse(localStorage.getItem('checked-cards-list'))
    delete checkedList[cardId]
    localStorage.setItem('checked-cards-list', JSON.stringify(checkedList))
}

function showCheckedCardsModal(list, coinId) {
    const modal = $('#checked-cards-mod')
    const chekedListHolder = $('#checked-list-form')
    const cardPending = $(`#${coinId}`)
    chekedListHolder.empty()
    for(let card in list){
        let listItemDiv = $('<div></div>')
        $(listItemDiv).addClass('form-check')
        let listItem = $('<input>')
        $(listItem).addClass('form-check-input')
        .attr({
            'type': 'radio',
            'id': `line-for-${card}`,
            'name': 'cardInCheckedList',
            'value': `${card}`
        })
        let listLabel = $('<label></label>')
        $(listLabel).addClass('form-check-label')
        .attr({
            'for': `line-for-${card}`
        })
        .text(`${card}`)
        $(listItemDiv).append(listItem, listLabel)
        $(chekedListHolder).append(listItemDiv)
    }
    let lastInput = chekedListHolder.find('input[type="radio"]:last')
    $(lastInput).attr({'checked': true})
    
    $('#replace-tagged').click(function(){
        let cardToremove = chekedListHolder
        .find('input[name="cardInCheckedList"]:checked').val()
        delete list[cardToremove]
        localStorage.setItem('checked-cards-list', JSON.stringify(list))
        $(`#${cardToremove}`).find('input[type="checkbox"]')
        .prop('checked', false)
        addToggle(cardPending);
        modal.hide()
    })
    $('#cancel-replace').click(function(){
        cardPending.find('input[type="checkbox"]')
        .prop('checked', false);
        modal.hide()
    })
    modal.show()
}

function closeModel() {
    const modal = $('#checked-cards-mod')
    modal.hide()
}

function addCardToLocalStorage(obj, coinId) {
    let checkedList = JSON.parse(localStorage.getItem('checked-cards-list'))
    checkedList = checkedList ? checkedList : {}
    checkedList[coinId] = obj
    localStorage.setItem('checked-cards-list', JSON.stringify(checkedList))

}



function filterCards(list){
    $('#search-btn').click(function(e){
        e.preventDefault()
        const searchedCoin = $('#search-input').val().toUpperCase()
        if(!searchedCoin){
           alert('please type the symbol of the coin you are looking for')
           return 
        }
        $('.card').hide()
        let relevantCards = list.filter(card => (card.symbol).toUpperCase() === searchedCoin)
        if(relevantCards.length === 0){
            alert(`no coins with symbol ${searchedCoin} found`);
            $('.card').show()
            return
        }
        relevantCards.forEach(match => {
            $(`[symbol="${match.symbol}"]`).show()
        });
        $('#search-input').val('')
    })
}

$(document).ready(function(){
    navButsFun()
    $('#all-coins-with-pict').removeClass('d-none');
    $('#but-to-home').addClass('active')
})

function navButsFun(){
    $(".nav-item").click(function(){
        $(".nav-item").removeClass('active');
        $(this).addClass('active')
    }
)}

$('#but-to-home').click(function(){
    $('.card').show()
    $('#all-coins-with-pict').removeClass('d-none');
    $('#live-reports').addClass('d-none');
    $('#about').addClass('d-none')
    $('#parallax-scrolling').addClass('d-inline-block');
})

$('#but-to-reports').click(function(){
    $('#all-coins-with-pict').addClass('d-none');
    $('#live-reports').removeClass('d-none');
    $('#about').addClass('d-none');
    $('#parallax-scrolling').removeClass('d-inline-block');
})
$('#but-to-about').click(function(){
    $('#all-coins-with-pict').addClass('d-none');
    $('#live-reports').addClass('d-none');
    $('#about').removeClass('d-none')
    $('#aparallax-scrolling').removeClass('d-inline-block');
})

