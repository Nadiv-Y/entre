// import { CONSTANTS } from "./constants.js";

displayItemsFromLocalStorage ()

orderListBackground();

document.querySelector("#add-item").addEventListener("click", addItem);

const trashItems = document.querySelectorAll("i");

for (const trashItem of trashItems) {
  trashItem.addEventListener("click", removeItem);
}

function addItem() {
  const list = document.querySelector("#list");
  const li = document.createElement("li");
  const i = document.createElement("i");
  li.className = "list-group-item";
  i.className = "bi bi-trash float-end";

  const inputValue = document.querySelector("#item-name").value;

  if (!inputValue) {
    alert("Please type something...");
    return;
  }

  li.append(inputValue, i);
  list.append(li);

  i.addEventListener("click", removeItem);

  orderListBackground();

  document.querySelector("#item-name").value = "";

  addItemToLocalStorage(li);
}

function removeItem(event) {
  if (!confirm("Are you sure?")) {
    return;
  }
  const li = event.target.parentElement;
  const list = li.parentElement;

  list.removeChild(li);

  removeItemFromLocalStorage(li);

  orderListBackground();
}

function orderListBackground() {
  const selectorOddsChild = document.querySelectorAll("li:nth-child(odd)");
  const selectorEvensChild = document.querySelectorAll("li:nth-child(even)");

  for (const oddElem of selectorOddsChild) {
    oddElem.classList.add("list-group-item-success");
  }

  for (const evenElem of selectorEvensChild) {
    evenElem.classList.remove("list-group-item-success");
  }
}

function addItemToLocalStorage(element) {
  const oldCounter = parseInt(localStorage.getItem("counter"));
  const counter = oldCounter ? oldCounter + 1 : 1;
  element.setAttribute("counter", counter);
  localStorage.setItem("counter", counter);

  let storedList = JSON.parse(localStorage.getItem("list-items"));
  storedList = storedList ? storedList : {};
  storedList[counter] = element.outerHTML;
  localStorage.setItem("list-items", JSON.stringify(storedList));
}

function removeItemFromLocalStorage(element) {
  let storedList = JSON.parse(localStorage.getItem("list-items"));

  if (!storedList) {
    return;
  }

  const counter = element.getAttribute("counter");
  delete storedList[counter];
  localStorage.setItem("list-items", JSON.stringify(storedList));
}

function displayItemsFromLocalStorage (){
    let storedList = JSON.parse(localStorage.getItem("list-items"));

    if (!storedList) {
    return;
  }

  const placeholder = document.createElement("div")
  for(const key in storedList){
    placeholder.innerHTML = storedList[key]
    document.querySelector('#list').append(placeholder.firstChild)
  }

//   placeholder.parentElement.removeChild(placeholder)

}