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




//  function addItemToLocalStorage(note){

 // const isStored = localStorage.getItem('notes')
    // const notes = isStored ? JSON.parse(isStored) : {}
    // notes.push(note)
    // localStorage.setItem('notes', JSON.stringify(notes))

    // const oldCounter = parseInt(localStorage.getItem('counter'))
    // let counter = oldCounter ? oldCounter + 1: 1;
    // note.counter = counter;
    // localStorage.setItem('counter' ,counter) 
    // newDiv.setAttribute("data-counter", obj.counter);
//  }



  
// function removeItemFromLocalStorage(element) {
//     let storedNotes = JSON.parse(localStorage.getItem('notes'));
//     if (!storedNotes) {
//         return;
//     }

//     // const counter = element.getAttribute('data-counter');
//     delete storedNotes[counter];

//     localStorage.setItem('notes', JSON.stringify(storedNotes));
// }


// function getItemFromLocalStorage(){
  
//              const palceholder = document.createElement("object")
//             for (const KEY in object){
//                palceholder.innerHTML = object[KEY];
//                 document.querySelector('.notes').append(palceholder.firstElementChild)
//             }

//             palceholder.parentElement.removeChild(palceholder);
          
// }


// ----------------------------
// Task

//  let oldCounter = localStorage.getItem("counter");
//         if (!oldCounter) {
//         let counter = 0;
//         } else {
//         counter = oldCounter;
//         }
    
//     localStorage.setItem("counter", counter);
//     localStorage.setItem(counter, JSON.stringify(obj));

//     // if(informationObject){
//     //      localStorage.setItem(counter.toString(), JSON.stringify(informationObject));
//     //       counter++;
//     //         localStorage.setItem("counter", counter.toString())
//     // }
//     console.log(informationObject);


//     // const newCard = document.querySelector('.card');
//     // const input = document.getElementById('item');

//     // let storedCard = localStorage.getItem('card') ?
//     // JSON.parse(localStorage.getItem('card')) : [];

// function addItemToLocalStorage(ogj){
   

    // let  = document.querySelector("newCard");
       
    // storedCard = JSON.parse(localStorage.getItem('newCard'))
    // console.log(storedCard);
    
    // storedCard = storedCard ? storedCard : {}
    // // storedCard = card.outerHTML;
    // localStorage.setItem('card', JSON.stringify(storedCard))

// }
