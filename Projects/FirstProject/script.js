import { CONSTANTS } from "./constans.js"
document.getElementById(CONSTANTS.IDS.taskForm).addEventListener("submit", createTask)
loadTasks()

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem(CONSTANTS.LOCALSTORAGE.tasks)) || {}
  const taskContainer = document.getElementById(CONSTANTS.IDS.taskContainer)

  for (const task in tasks) {
    taskContainer.insertAdjacentHTML("beforeend", JSON.parse(tasks[task]))

    const lastTask = taskContainer.lastElementChild;
    const xButton = lastTask.getElementsByClassName(CONSTANTS.CLASSES.xButton)[0];
    xButton.addEventListener("click", deleteTask);
  }
}

function addTaskToLocalStorage(task, counter) {
  const localStorageVariable = JSON.parse(localStorage.getItem(CONSTANTS.LOCALSTORAGE.tasks)) || {}
  localStorageVariable[counter] = task
  localStorage.setItem(CONSTANTS.LOCALSTORAGE.tasks, JSON.stringify(localStorageVariable))
}

function returnAndUpdateCounter() {
  let counter = parseInt(localStorage.getItem(CONSTANTS.LOCALSTORAGE.counter))
  counter = counter ? counter + 1 : 1
  localStorage.setItem(CONSTANTS.LOCALSTORAGE.counter, counter)
  return counter
}

function deleteTask(event) {
  let task = event.target.parentElement
  const counter = task.getAttribute(CONSTANTS.LOCALSTORAGE.counter)
  const localStorageVariable = JSON.parse(localStorage.getItem(CONSTANTS.LOCALSTORAGE.tasks))
  task.parentElement.removeChild(task)

  delete localStorageVariable[counter]
  console.log(localStorageVariable)

  localStorage.setItem(CONSTANTS.LOCALSTORAGE.tasks, JSON.stringify(localStorageVariable))
}

function createTask(event) {
  let task = document.createElement("div")
  task.setAttribute("class", CONSTANTS.CLASSES.task)

  let xButton = document.createElement("i")
  xButton.setAttribute("class", CONSTANTS.CLASSES.xButton)

  let text = document.createElement("div")
  text.setAttribute("class", CONSTANTS.CLASSES.text)
  text.innerText = event.target[0].value

  let container = document.createElement("div")
  container.setAttribute("class", CONSTANTS.CLASSES.timeContainer)

  let date = document.createElement("div")
  date.setAttribute("class", CONSTANTS.CLASSES.date)
  date.innerText = event.target[1].value

  let time = document.createElement("div")
  time.setAttribute("class", CONSTANTS.CLASSES.time)
  time.innerText = event.target[2].value

  container.appendChild(date)
  container.appendChild(time)
  task.appendChild(xButton)
  task.appendChild(text)
  task.appendChild(container)

  let counter = returnAndUpdateCounter()
  task.setAttribute(CONSTANTS.LOCALSTORAGE.counter, counter)

  document.getElementById(CONSTANTS.IDS.taskContainer).appendChild(task)

  xButton.addEventListener("click", deleteTask)

  addTaskToLocalStorage(JSON.stringify(task.outerHTML), counter)
}
