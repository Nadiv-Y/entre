// function aviMoyal() {
//   alert("Hello World");
// }

// document.getElementById("button").addEventListener("click", function (e) {
//   console.log(e); //
//   console.log(e.type); //click
//   console.log(e.target); //element
//   console.log(e.target.id); //button
//   console.log(e.target.className); //btn btn-primary
//   console.log(e.target.classList); //array
//   console.log("vp x", e.clientX);
//   console.log("vp y", e.clientY);
//   console.log("elem x", e.offsetX);
//   console.log("elem y", e.offsetY);

//   switch (true) {
//     case e.altKey:
//       console.log("alt clicked");
//       break;
//     case e.ctrlKey:
//       console.log("ctrl clicked");
//       break;
//     case e.shiftKey:
//       console.log("shift clicked");
//       break;
//     default:
//       console.log("do nothing");
//   }
// });

const plate = document.querySelector(".plate");

// plate.addEventListener("click", displayType);
// plate.addEventListener("dblclick", displayType);
// plate.addEventListener("mousedown", displayType);
// plate.addEventListener("mouseup", displayType);
// plate.addEventListener("mouseenter", displayType);
// plate.addEventListener("mouseout", displayType);
// plate.addEventListener("mouseover", displayType);
// plate.addEventListener("mouseleave", displayType);
// plate.addEventListener("mouseleave", function (e) {
//   console.log("event type: ", e.type);
// });
// plate.addEventListener("mousemove", changeColors);

function displayType(e) {
  console.log("event type: ", e.type);
}

function displayValue(e) {
  console.log("value: ", e.target.value);
}

function changeColors(e) {
  let red = e.offsetX > 255 ? 255 : e.offsetX;
  let green = e.offsetY > 255 ? 255 : e.offsetY;
  let blue =
    Math.abs(e.offsetX - e.offsetY) > 255
      ? 255
      : Math.abs(e.offsetX - e.offsetY);
  plate.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  console.log(red, green, blue);
}

const nameInput = document.querySelector("#name");

// nameInput.addEventListener("keydown", displayValue);
// nameInput.addEventListener("keyup", displayValue);
// nameInput.addEventListener("focus", displayValue);
// nameInput.addEventListener("blur", displayValue);
// nameInput.addEventListener("copy", displayValue);
// nameInput.addEventListener("paste", displayValue);
// nameInput.addEventListener("cut", displayValue);
nameInput.addEventListener("input", displayValue);

const select = document.getElementById("drop-down");
select.addEventListener("change", displayValue);

const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(e.type);
});
