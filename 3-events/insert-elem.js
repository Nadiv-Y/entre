document.getElementById("button").addEventListener("click", updateElem);

function insertElem(e) {
  const newDiv = document.createElement("div");
  newDiv.innerText = "button clicked!";

  const form = document.getElementById("form");

  form.parentElement.insertBefore(newDiv, form.nextSibling);

  const offsetXDiv = document.createElement("div");
  offsetXDiv.innerText = `coordinate x relative to the element clicked is ${e.offsetX}`;

  //   offsetXDiv.style.display = "inline";
  //   offsetXDiv.style.marginRight = "5px";

  form.parentElement.insertBefore(offsetXDiv, form.nextSibling);

  const offsetYDiv = document.createElement("div");
  offsetYDiv.innerText = `coordinate y relative to the element clicked is ${e.offsetY}`;
  //   offsetYDiv.style.display = "inline";
  //   offsetYDiv.style.marginRight = "5px";

  form.parentElement.insertBefore(offsetYDiv, form.nextSibling);
}

function updateElem(e) {
  let offsetXDiv = document.getElementById("mouse-x");
  let offsetYDiv = document.getElementById("mouse-y");

  if (!offsetXDiv) {
    offsetXDiv = document.createElement("div");
    offsetXDiv.id = "mouse-x";
    form.parentElement.insertBefore(offsetXDiv, form.nextSibling);
  }

  if (!offsetYDiv) {
    offsetYDiv = document.createElement("div");
    offsetYDiv.id = "mouse-y";
    form.parentElement.insertBefore(offsetYDiv, form.nextSibling);
  }

  offsetXDiv.innerText = `coordinate x relative to the element clicked is ${e.offsetX}`;
  offsetYDiv.innerText = `coordinate y relative to the element clicked is ${e.offsetY}`;

  let countDiv = document.getElementById("click-counter");
  if (!countDiv) {
    countDiv = document.createElement("div");
    countDiv.id = "click-counter";
    form.parentElement.insertBefore(countDiv, form.nextSibling);
  }

  const counter = counterByLocalStorage(countDiv);

  countDiv.innerText = `click numbers ${counter}`;
}

function setAndGetCounter(countDiv) {
  if (!countDiv.getAttribute("counter")) {
    countDiv.setAttribute("counter", 0);
  }
  let counter = parseInt(countDiv.getAttribute("counter")) + 1;
  countDiv.setAttribute("counter", counter);
  return counter;
}

function counterByLocalStorage() {
  if (!localStorage.getItem("click-counter")) {
    localStorage.setItem("click-counter", 0);
  }

  let counter = parseInt(localStorage.getItem("click-counter")) + 1;
  localStorage.setItem("click-counter", counter);
  return counter;
}
