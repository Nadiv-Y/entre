
const vacationForm = document.getElementById('vacation-form')

vacationForm.addEventListener('submit', function (e) {
    e.preventDefault()

    const vacationName = document.getElementById('vacation-name').value
    const vacationTag = document.getElementById('vacation-tag').value
    const vacationPrice = document.getElementById('vacation-price').value
    const vacationRating = document.getElementById('vacation-rating').value
    const vacationImg = document.getElementById('vacation-img').value
    const countId = setCardId()
    const vacationLikes = 0

    const vacation = {
        countId,
        vacationName,
        vacationTag,
        vacationPrice,
        vacationRating,
        vacationImg,
        vacationLikes,
    }

    vacationForm.reset();
    saveVacationsToLocalStorage(vacation)
    renderInGallery()
})



function createVacationCard(vacation) {
    const card = document.createElement('div')
    card.className = 'vactaion-card'
    card.dataset.id = vacation.countId

    const imgAndLikeWrapper = document.createElement('div')
    imgAndLikeWrapper.className = 'img-and-like-wrapper'

    const cardImg = document.createElement('img')
    cardImg.className = 'card-img'
    cardImg.src = vacation.vacationImg

    const likeButtonWrapper = document.createElement('div')
    likeButtonWrapper.className = 'like-btn-wrapper'

    const likeButton = document.createElement('button')
    likeButton.className = 'like-btn'
    likeButton.id = 'like-btn'

    const likesAmount = document.createElement('p')
    likesAmount.className = 'likes-amount'
    likesAmount.innerText = vacation.vacationLikes

    const heartIcon = document.createElement('i')
    heartIcon.className = 'ph ph-heart'

    const detailsWrapper = document.createElement('div')
    detailsWrapper.className = 'details-wrapper'

    const titleAndTag = document.createElement('div')
    titleAndTag.className = 'title-and-tag'

    const cardTitle = document.createElement('p')
    cardTitle.className = 'card-title'
    cardTitle.innerText = vacation.vacationName

    const tag = document.createElement('div')
    tag.className = 'tag'
    tag.innerText = vacation.vacationTag

    const ratingWrapper = document.createElement('div')
    ratingWrapper.className = 'star-rating-wrapper'

    for (let i = 0; i < 4; i++) {
        const starIcon = document.createElement('i')
        starIcon.className = 'ph-fill ph-star'

        if (i < ratingState(vacation)) {
            starIcon.classList.replace('ph', 'ph-fill')
            starIcon.classList.add('yellow-star')
        }

        ratingWrapper.append(starIcon)
    }

    const priceAndDeleteButtonWrapper = document.createElement('div')
    priceAndDeleteButtonWrapper.className = 'price-and-delete-btn'

    const price = document.createElement('p')
    price.className = 'price'
    price.innerText = vacation.vacationPrice + '₪'

    const deleteButton = document.createElement('button')
    deleteButton.className = 'delete-btn'
    deleteButton.innerText = 'Delete'

    card.append(imgAndLikeWrapper, detailsWrapper, ratingWrapper)
    imgAndLikeWrapper.append(cardImg, likeButtonWrapper)
    likeButtonWrapper.append(likeButton, likesAmount)
    likeButton.append(heartIcon)
    detailsWrapper.append(titleAndTag, ratingWrapper, priceAndDeleteButtonWrapper)
    titleAndTag.append(cardTitle, tag)
    priceAndDeleteButtonWrapper.append(price, deleteButton)


    return card

}

function ratingState(vacation) {

    const ratingSelection = vacation.vacationRating

    switch (ratingSelection) {
        case 'bad':
            return 1

        case 'regular':
            return 2

        case 'good':
            return 3

        case 'excellent':
            return 4

        default:
            return 0
    }
}

function renderInGallery() {
    const vacations = getVacationsFromLocalStorage()
    for (const vacation of vacations) {
        const isExisitingCard = document.querySelector(`[data-id="${vacation.countId}"]`)
        if (!isExisitingCard) {
            const card = createVacationCard(vacation)
            const cardGallery = document.querySelector('#vactions-gallery')
            cardGallery.append(card)
        }

        if (isExisitingCard) {
            const likeAmount = isExisitingCard.querySelector('.likes-amount')
            if (likeAmount) {
                likeAmount.innerText = vacation.vacationLikes;
            }
        }
    }

    const cards = document.querySelectorAll('.vactaion-card')

    for (const card of cards) {
        const cardId = parseInt(card.dataset.id)
        let exist = false

        for (const vacation of vacations) {
            if (vacation.countId === cardId) {
                exist = true
            }
        }
        if (!exist) {
            card.remove()
        }
    }
}

function removeVacationCard(e) {
    if (e.target.classList.contains('delete-btn')) {
        const card = e.target.closest('.vactaion-card')
        const cardId = parseInt(card.dataset.id)

        const vacations = getVacationsFromLocalStorage()

        let updatedVacations = vacations
        
        for(const vacation of vacations){
            if(vacation.countId === cardId){
                updatedVacations.pop(vacation)
            }
        }
    
        localStorage.setItem('vacations', JSON.stringify(updatedVacations))
        renderInGallery()
    }

}

function saveVacationsToLocalStorage(vacation) {
    const vacations = JSON.parse(localStorage.getItem('vacations')) || []

    vacations.push(vacation)

    localStorage.setItem('vacations', JSON.stringify(vacations))
}

function setCardId() {
    const currentCount = parseInt(localStorage.getItem('cardId')) || 0
    const nextCount = currentCount + 1
    localStorage.setItem('cardId', nextCount)

    return nextCount
}


function getVacationsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('vacations')) || []
}


function likesCounter(e) {
    const likeButton = e.target.closest('.like-btn')

    if (likeButton) {
        const card = e.target.closest('.vactaion-card')
        const cardId = parseInt(card.dataset.id)

        const vacations = getVacationsFromLocalStorage()

        for (const vacation of vacations) {
            if (cardId === vacation.countId) {
                vacation.vacationLikes += 1
            }
        }


        localStorage.setItem('vacations', JSON.stringify(vacations));
        renderInGallery()

    }
}


const cardsGallery = document.getElementById('vactions-gallery')

cardsGallery.addEventListener('click', removeVacationCard)

cardsGallery.addEventListener('click', likesCounter)

renderInGallery()
