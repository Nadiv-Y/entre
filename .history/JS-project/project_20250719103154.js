
document.querySelector("#add-task").addEventListener("click", addTask);
document.querySelector("#Reset-task").addEventListener("click", resetTask);

document.addEventListener("DOMContentLoaded", function () { //צריך לשבת על לוקל סטורג'
  displayTaskFromLocalStorage();
});

function addTask() {
  const container = document.querySelector(".note-container");
  const task = document.createElement("div");
  task.className = "note";
  task.id = "note-created";
  task.style.fontSize = "2rem";

  const deleteBtn = document.createElement("button");
  deleteBtn.id = "delete-task";
  deleteBtn.type = "button";
  deleteBtn.className = "btn-close";
  deleteBtn.innerText = "delete";
  deleteBtn.style.width = "15%";
  deleteBtn.style.height = "15%";
  deleteBtn.style.marginLeft = "25%";

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

 document.querySelector("#input-value").value = " ";
  document.querySelector("#date-task").value = " ";
  document.querySelector("#time-task").value = " ";

  deleteBtn.addEventListener("click", removeTask);

  addTasklToLocalStorage(task);
}

function removeTask(event) {
  if (!confirm("Are you sure?")) {
    return;
  }
  const task = event.target.parentElement;
  const container = task.parentElement;

  container.removeChild(task);

  removeTaskFromLocalStorage(task);
}

function resetTask() {
  if (!confirm("Are you sure?")) {
    return;
  }
  document.querySelector("#input-value").value = " ";
  document.querySelector("#date-task").value = " ";
  document.querySelector("#time-task").value = " ";
}

function addTasklToLocalStorage(element) {
  const oldCounter = parseInt(localStorage.getItem("counter"));
  const counter = oldCounter ? oldCounter + 1 : 1;
  element.setAttribute("counter", counter);
  localStorage.setItem("counter", counter);

  let storedList = JSON.parse(localStorage.getItem("list-items"));
  storedList = storedList ? storedList : {};
  storedList[counter] = element.outerHTML;
  localStorage.setItem("list-items", JSON.stringify(storedList));
}

function removeTaskFromLocalStorage(element) {
  let storedList = JSON.parse(localStorage.getItem("list-items"));

  if (!storedList) {
    return;
  }

  const counter = element.getAttribute("counter");
  delete storedList[counter];
  localStorage.setItem("list-items", JSON.stringify(storedList));
}

function displayTaskFromLocalStorage() {
  let storedList = JSON.parse(localStorage.getItem("list-items"));
  if (!storedList) return;

  const container = document.querySelector(".note-container");
  const placeholder = document.createElement("div");

  for (const key in storedList) {
    placeholder.innerHTML = storedList[key];
    const restoredTask = placeholder.firstChild;

    const deleteBtn = restoredTask.querySelector("#delete-task");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", removeTask);
    }

    container.append(restoredTask);
  }
}
