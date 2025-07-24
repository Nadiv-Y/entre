displayFromLocalStorage()

document.querySelector("#btn-save").addEventListener("click", addCardVacation);

function addCardVacation(event) {
  const cardsVacation = document.querySelector("#cardsVacation");
  const inputNameVacation = document.querySelector("#nameVacation");
  const inputImgFromVacation = document.querySelector("#imgFromVacation");
  const inputPrice = document.querySelector("#price");
  const inputVacationRating = document.querySelector("#vacationRating");

  const valNameVacation = inputNameVacation.value;
  const valImgFromVacation = inputImgFromVacation.value;
  const valPrice = inputPrice.value;
  const valVacationRating = inputVacationRating.value;

  if (
    !valNameVacation ||
    !valImgFromVacation ||
    !valPrice ||
    !valVacationRating
  ){
    alert("Please fill out the entire form.");
  return;
  }

const card = document.createElement("div");
card.className = "card";

const divimgVacation = document.createElement("div");
divimgVacation.className = "divimgVacation";
const imgVacation = document.createElement("img");
imgVacation.className = "imgVacation";
imgVacation.src = `${valImgFromVacation}`;
imgVacation.alt = "img vacation";

const titleCard = document.createElement("div");
titleCard.className = "titleCard";
titleCard.innerText = valNameVacation;

const priceCard = document.createElement("div");
priceCard.className = "priceCard";
priceCard.innerText = `- ₪${valPrice} -`;

const rating = document.createElement("div");
rating.className = "rating";

let iconStar = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
  fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 
  6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 
  0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 
  4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
  </svg>`;
let iconLike = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
  <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
</svg>`;

const like = document.createElement("div");
like.className = "like";
like.innerHTML = iconLike;

const divCounter = document.createElement("div");
divCounter.className = " divCounter";
divCounter.innerText = '0'

const svgIcon = like.firstElementChild;
svgIcon.className = "svgIcon";

svgIcon.addEventListener("click", clickLike);

switch (true) {
  case valVacationRating === "excellent":
    rating.innerHTML = iconStar + iconStar + iconStar + iconStar;
    break;

  case valVacationRating === "good":
    rating.innerHTML = iconStar + iconStar + iconStar;
    break;

  case valVacationRating === "regular":
    rating.innerHTML = iconStar + iconStar;
    break;

  case valVacationRating === "bad":
    rating.innerHTML = iconStar;
    break;
  }

like.append(divCounter);
divimgVacation.append(imgVacation);
card.append(divimgVacation, titleCard, priceCard, rating, like);
cardsVacation.append(card);

addCardToLocalStorage(card)

inputNameVacation.value = "";
inputImgFromVacation.value = "";
inputPrice.value = "";
inputVacationRating.value = "";
}

function clickLike(event) {
  const like = event.target.closest(".like");
  const divCounter = like.querySelector(".divCounter");

  let oldcounter = Number(like.getAttribute("counterLike"));
  let counter = oldcounter ? oldcounter + 1 : 1;
  like.setAttribute("counterLike", counter);
  divCounter.innerText = counter;

  updateCardLikesInLocalStorage(like, counter);

}


function addCardToLocalStorage(element) {
    let oldcounter = parseInt(localStorage.getItem('counter'))
    let counter = oldcounter ? oldcounter+1 : 1;
    localStorage.setItem("counter", counter)

    let counterLike = element.querySelector(".like").getAttribute("counterLike") || 0;



    let oldlistCards = JSON.parse(localStorage.getItem("listCards"))
    let listCards = oldlistCards ? oldlistCards : {};
    listCards[counter]=element.outerHTML
    localStorage.setItem('listCards', JSON.stringify(listCards))
}


function displayFromLocalStorage(){
   let listCards =  JSON.parse(localStorage.getItem("listCards"))
   if(!listCards){
      return
   }

    const cardsVacation = document.querySelector("#cardsVacation");
    const div = document.createElement('div')
    for(const card in listCards){
        div.innerHTML = listCards[card]
       
       const itemCard = div.firstElementChild
       const like = itemCard.querySelector('.like')
       const svgIcon = like.firstElementChild
       svgIcon.addEventListener('click' ,clickLike )

      const numClick =  like.getAttribute('counterLike')
       const divCounter = like.lastChild
       divCounter.innerText = numClick
       cardsVacation.append(div.firstElementChild)
  
    div.remove();
}
}

