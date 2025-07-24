document.querySelector("#add-task").addEventListener("click", addTask);
document.querySelector("#Reset-task").addEventListener("click", resetTask);

function addTask() {
  const container = document.querySelector(".note-container");
  const task = document.createElement("div");
  task.className = "note note1";
  task.id = "note-created";
  task.style.fontSize = "2rem";

  const deleteBtn = document.createElement("button");
  deleteBtn.id = "delete-task";
  deleteBtn.type = "button";
  deleteBtn.className = "btn-close";
  deleteBtn.ariaLabel = "close"
//   deleteBtn.style.width = "15%";
//   deleteBtn.style.height = "15%";
//   deleteBtn.style.marginLeft = "25%";
  
  const inputValue = document.querySelector("#input-value").value;

  const date = document.createElement("p");
  const inputDate = document.querySelector("#date-task").value;
  date.innerText = inputDate;

  const time = document.createElement("p");
  const inputTime = document.querySelector("#time-task").value;
  time.innerText = inputTime;

  if (!inputValue) {
    alert("Please add task...");
    return;
  }

  if (!inputDate) {
    alert("Please add date...");
    return;
  }

  if (!inputTime) {
    alert("Please add time...");
    return;
  }

  task.append(inputValue, deleteBtn, date, time);
  container.append(task);

  deleteBtn.addEventListener("click", removeItem);

  addTasklToLocalStorage()
}

function removeItem(event) {
  if (!confirm("Are you sure?")) {
    return;
  }
  const task = event.target.parentElement;
  const container = task.parentElement;

  container.removeChild(task);
}

function resetTask() {
  document.querySelector("#input-value").value = " ";
  document.querySelector("#date-task").value = " ";
  const inputTime = (document.querySelector("#time-task").value = " ");
}

function addTasklToLocalStorage() {
  const oldCounter = parseInt(localStorage.getItem("counter"));
  const counter = oldCounter ? oldCounter + 1 : 1;
  element.setAttribute("counter", counter);
  localStorage.setItem("counter", counter);

//   let storedList = JSON.parse(localStorage.getItem("list-items"));
//   storedList = storedList ? storedList : {};
//   storedList[counter] = element.outerHTML;
//   localStorage.setItem("list-items", JSON.stringify(storedList));
}
