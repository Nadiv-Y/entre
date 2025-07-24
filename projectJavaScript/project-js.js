displayNoteAfterRefresh();

let clickCreat = document.querySelector("#clickCreat").addEventListener("click", creatReminder);

document.querySelector("#clickReset").addEventListener("click", resetForme)

function resetForme() {
  const inputText = document.querySelector("#textReminder");
  const inputDate = document.querySelector("#date");
  const inputTime = document.querySelector("#time");

  inputText.value = "";
  inputDate.value = "";
  inputTime.value = "";
}


function creatReminder() {
  const reminderNotes = document.querySelector("#reminderNotes");
  const inputText = document.querySelector("#textReminder");
  const inputDate = document.querySelector("#date");
  const inputTime = document.querySelector("#time");

  const containNote = document.createElement("div");
  const imgNote = document.createElement("img");
  const gridOverNote = document.createElement('div')
  const divContainValText = document.createElement("div");
  const divContainValDate = document.createElement("div");
  const divContainValTime = document.createElement("div");
  const btnClose = document.createElement("button");

  const valText = inputText.value
  const valDate = inputDate.value;
  const valTime = inputTime.value;


  containNote.className = "containNote";
  imgNote.src = "lib-project/notebg.png";
  imgNote.className = "imgNote";
  gridOverNote.className ='gridOverNote'

  divContainValText.innerText = valText;
  divContainValText.className = "divContainValText ";


  divContainValDate.innerText = valDate;
  divContainValDate.className = "divContainValDate";

  divContainValTime.innerText = valTime;
  divContainValTime.className = "divContainValTime";

  btnClose.className = "btn-close btnClose ";
  btnClose.addEventListener("click", removeReminder);

 
    if (!valText ||!valDate || !valTime) {
    alert("Please fill out the entire form...");
    return;
  }
 


  gridOverNote.append(divContainValText, btnClose,divContainValDate,divContainValTime)
  containNote.append(imgNote,gridOverNote);
  reminderNotes.append(containNote);

  setTimeout(() => {
    containNote.classList.add("fade-in");
  }, 10);


  imgNote.onload = () => {
  gridOverNote.style.height = imgNote.offsetHeight + 'px';}

  addNoteToLocalStorg(containNote);
  resetForme()
}




function removeReminder(event) {
  if (confirm("Are you sure?")) {
   const  element= event.target.parentElement.parentElement
    
    element.classList.add('fade-out')
    setTimeout(() => {
    element.remove();
    }, 500);

   
    removeNoteFromLocalStorg(element);

  }
  
}

function addNoteToLocalStorg(element) {
  const oldCounter = parseInt(localStorage.getItem("counter"));
  const counter = oldCounter ? oldCounter + 1 : 1;
  element.setAttribute("counter", counter);
  localStorage.setItem("counter", counter);

  let tagNote = JSON.parse(localStorage.getItem("tagNote"));
  tagNote = tagNote ? tagNote : {};
  tagNote[counter] = element.outerHTML;
  localStorage.setItem("tagNote", JSON.stringify(tagNote));
}

function removeNoteFromLocalStorg(elemant) {
  const tagNote = JSON.parse(localStorage.getItem("tagNote"));

  const counter = elemant.getAttribute("counter");
  delete tagNote[counter];
  localStorage.setItem("tagNote", JSON.stringify(tagNote));
}

function displayNoteAfterRefresh() {
  let tagNotes = JSON.parse(localStorage.getItem("tagNote"));
  if (!tagNotes) {
    return;
  }

  const reminderNotes = document.querySelector("#reminderNotes");
  const div = document.createElement("div");


  for (const tagNote in tagNotes) {
    div.innerHTML = tagNotes[tagNote];

    const noteElement = div.firstElementChild;
    const btnClose = noteElement.querySelector('.btnClose ')
    btnClose.addEventListener("click", removeReminder);
    reminderNotes.append(div.firstElementChild);
    setTimeout(() => {
    noteElement.classList.add("fade-in");
    }, 10);
  
  }

  div.remove();
}


