// addEventListener("click", function)
// function (event){
// alart
// }


//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   const forms = document.querySelectorAll('.needs-validation')

//   // Loop over them and prevent submission
//   for (const form of forms){
//     forms.addEventListener('submit', validation)
//         function validation(e){
//         if (!form.checkValidity()) {
//             e.preventDefault()
//             e.stopPropagation()
//         }

//         form.classList.add('was-validated')
//         }
//     }


document.addEventListener('DOMContentLoaded', renderSavedCards);


document.querySelector("form").addEventListener("submit",addItem)


function generateId() {
  let currentId = localStorage.getItem("cardIdCounter");
  if (!currentId) currentId = 0;
  const newId = Number(currentId) + 1;
  localStorage.setItem("cardIdCounter", newId);
  return newId.toString();
}

function addItem(event){
    event.preventDefault(); 

    const newCard = document.createElement("div");
    newCard.className = "card p-2 me-2 mt-2 w-25 h-100 bg-body-tertiary rounded newCard shadow p-3 mb-5 bg-body-tertiary rounded"
    document.querySelector("#papaDiv").appendChild(newCard);
    const cardId = generateId();
    newCard.dataset.id = cardId;

    const newImage = document.createElement('img');
    const imageSrc = document.querySelector('#image').value
    newImage.setAttribute('src' , imageSrc);
    newImage.className="card-img-top"
    

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title"
    const nameOfVacation = document.querySelector('#vacationName').value
    cardTitle.append(nameOfVacation)

    const cardBody = document.createElement("h6");
    cardBody.className = "card-subtitle mb-2 mt-2 card-text"
    const priceOfVacation = document.querySelector('#price').value
    cardBody.append(priceOfVacation)

    
    const trash = document.createElement('i');
    trash.className = 'bi bi-trash text-end';
    trash.style.fontSize = "20px";

    const cardFooter = document.createElement('div');
    const grade = document.querySelector(".form-select");
    const gradeInNumber = parseInt(grade.value);

    
    
    for (let i = 0; i < gradeInNumber; i++) {
        const star = document.createElement('i');
        star.className = 'bi bi-star-fill';
        star.style.color = 'gold';
        star.style.marginRight = '5px';
        star.style.fontSize = "24px";
        cardFooter.append(star);
  }

    const like = document.createElement('i');
    like.className ="bi bi-hand-thumbs-up"
    like.style.marginRight = '5px';
    like.style.fontSize = "20px";
    const likeNumber = document.createElement('p');
    likeNumber.className = "likeNumber"
    const divForLike = document.createElement('div');
    divForLike.append(like, likeNumber);


    // let informationObject = document.createElement ('object');
      let informationObject = {
        id: cardId,
        imageSrc: imageSrc,
        title: nameOfVacation,
        price: priceOfVacation,
        grade: gradeInNumber,
        likes: 0
};

if (!nameOfVacation || !imageSrc || !priceOfVacation || !gradeInNumber) {
  alert("אנא מלאי את כל השדות לפני השליחה.");
  return; 
}   
      
    newCard.append(cardTitle, newImage, cardBody, cardFooter, divForLike, trash)
    
     trash.addEventListener('click',removeItem);
     like.addEventListener('click',countLikes);

     addItemToLocalStorage(informationObject);

}

let like = 0;
function countLikes(event) {
  const cardElement = event.target.closest('.card');
  const cardId = cardElement.dataset.id;

  let cards = JSON.parse(localStorage.getItem('vacations')) || [];
  const cardIndex = cards.findIndex(card => card.id === cardId);

  if (cardIndex !== -1) {
    cards[cardIndex].likes += 1;
    localStorage.setItem('vacations', JSON.stringify(cards));

    const likeNumber = cardElement.querySelector('.likeNumber');
    likeNumber.textContent = cards[cardIndex].likes;
  }
}





// function removeItem(event){
//     if (!confirm('Are you sure?')){
//         return
//     }

//     const deleteWho = event.target.parentElement;
//     const card = deleteWho.parentElement;

//     card.removeChild(deleteWho);
//     removeItemFromLocalStorage (card);
// }

function removeItem(event) {
  if (!confirm("Are you sure?")) return;

  const card = event.target.closest(".card");
  card.remove();
  removeItemFromLocalStorage(card);
}


   
function addItemToLocalStorage(card) {
    const save = JSON.parse(localStorage.getItem('vacations')) || [];
    save.push(card);
    localStorage.setItem('vacations', JSON.stringify(save));
}

function removeItemFromLocalStorage(cardElement) {
  const cardId = cardElement.dataset.id;
  let cards = JSON.parse(localStorage.getItem('vacations')) || [];
  const updatedCards = cards.filter(card => card.id !== cardId);
  localStorage.setItem('vacations', JSON.stringify(updatedCards));
}



function renderSavedCards() {
  const container = document.getElementById('papaDiv');
  container.innerHTML = "";

  const cards = JSON.parse(localStorage.getItem('vacations')) || [];

  cards.forEach(card => {
    const newCard = document.createElement("div");
    newCard.className = "card p-2 me-2 mt-2 w-25 h-100 bg-body-tertiary rounded newCard shadow";
    newCard.dataset.id = card.id;

    const newImage = document.createElement('img');
    newImage.setAttribute('src', card.imageSrc);
    newImage.className = "card-img-top";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = card.title;

    const cardBody = document.createElement("h6");
    cardBody.className = "card-subtitle mb-2 mt-2 card-text";
    cardBody.textContent = card.price;

    const cardFooter = document.createElement("div");
    for (let i = 0; i < card.grade; i++) {
      const star = document.createElement("i");
      star.className = "bi bi-star-fill";
      star.style.color = "gold";
      star.style.marginRight = "5px";
      star.style.fontSize = "24px";
      cardFooter.appendChild(star);
    }

    const like = document.createElement("i");
    like.className = "bi bi-hand-thumbs-up";
    like.style.marginRight = "5px";
    like.style.fontSize = "20px";

    const likeNumber = document.createElement("p");
    likeNumber.className = "likeNumber";
    likeNumber.textContent = card.likes;

    const divForLike = document.createElement("div");
    divForLike.append(like, likeNumber);

    const trash = document.createElement("i");
    trash.className = "bi bi-trash text-end";
    trash.style.fontSize = "20px";

    newCard.append(cardTitle, newImage, cardBody, cardFooter, divForLike, trash);
    container.appendChild(newCard);

    like.addEventListener("click", countLikes);
    trash.addEventListener("click", removeItem);
  });
}



