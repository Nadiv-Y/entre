displayItemsFromLocalStorage(); 

document.getElementById("save-task").addEventListener("click", insertNote);
const taskBoard = document.getElementById("task-notes");

const xButtons = document.querySelectorAll("i");

for (const xButton of xButtons) {
  xButton.addEventListener("click", removeNote);
}

function insertNote() {
  const note = document.createElement("div");
  note.className = "note";

  const info = document.querySelector("#task-info").value;
  const date = document.querySelector("#due-date").value;
  const time = document.querySelector("#due-time").value;

  const i = document.createElement("i");
  i.className = "bi bi-x delete-x";

  if (!info || !date || !time) {
    alert("Please fill all fields...");
    return;
  }

  const taskInfo = document.createElement("div");
  taskInfo.className = "note-text";
  taskInfo.innerText = info;

  const dueDate = document.createElement("div");
  dueDate.className = "task-due";
  dueDate.innerText = `Due ${date} at ${time}`;

  i.addEventListener("click", removeNote);

  note.append(taskInfo, dueDate, i);

  const oldCounter = parseInt(localStorage.getItem("counter")); 
  const counter = oldCounter ? oldCounter + 1 : 1; 
  note.setAttribute("counter", counter); 

  taskBoard.append(note);

  addItemToLocalStorage(note, counter); 

  note.style.opacity = 0; 
  $(note).fadeTo(500, 1); 

  document.querySelector("#task-info").value = "";
  document.querySelector("#due-date").value = "";
  document.querySelector("#due-time").value = "";
}

function removeNote(event) {
  const note = event.target.parentElement;
  const taskBoard = note.parentElement;

  taskBoard.removeChild(note);

  removeItemFromLocalStorage(note);
}

function addItemToLocalStorage(element, counter) {
  localStorage.setItem("counter", counter);

  let storedBoard = JSON.parse(localStorage.getItem("board-notes"));
  storedBoard = storedBoard ? storedBoard : {};
  storedBoard[counter] = element.outerHTML;
  localStorage.setItem("board-notes", JSON.stringify(storedBoard));
}

function removeItemFromLocalStorage(element) {
  let taskBoard = JSON.parse(localStorage.getItem("board-notes"));

  if (!taskBoard) {
    return;
  }

  const counter = element.getAttribute("counter");
  delete taskBoard[counter];
  localStorage.setItem("board-notes", JSON.stringify(taskBoard));
}

function displayItemsFromLocalStorage() {
  let taskBoard = JSON.parse(localStorage.getItem("board-notes"));
  if (!taskBoard) {
    return;
  }

  const placeholder = document.createElement("div");
  for (const key in taskBoard) {
    placeholder.innerHTML = taskBoard[key];
    document.querySelector("#task-notes").append(placeholder.firstElementChild);
  }
}
