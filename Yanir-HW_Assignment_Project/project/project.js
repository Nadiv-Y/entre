// Load saved notes (as HTML strings) from localStorage
const savedList = JSON.parse(localStorage.getItem("list-items")) || {};
for (const key in savedList) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = savedList[key];
  const noteElement = wrapper.firstElementChild;

  // Reconnect delete button event
  const deleteBtn = noteElement.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    noteElement.remove();
    removeNoteFromStorage(key);
  });

  document.getElementById("notes-container").prepend(noteElement);
}

// Listen to form submission
document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const text = document.getElementById("task-text").value;
  const date = document.getElementById("task-date").value;
  const time = document.getElementById("task-time").value;

  if (!text || !date || !time) return;

  const note = document.createElement("div");
  note.className = "note fade-in";

  // Counter
  const oldCounter = parseInt(localStorage.getItem("counter"));
  const counter = oldCounter ? oldCounter + 1 : 1;
  note.setAttribute("counter", counter);
  localStorage.setItem("counter", counter);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn bi bi-x-square-fill";
  deleteBtn.addEventListener("click", () => {
    note.remove();
    removeNoteFromStorage(counter);
  });

  // Content
  const content = document.createElement("div");
  content.className = "note-text";
  content.textContent = text;

  const dateTime = document.createElement("div");
  dateTime.className = "dateTime";
  dateTime.textContent = `${date} ${time}`;

  note.appendChild(deleteBtn);
  note.appendChild(content);
  note.appendChild(dateTime);

  // Add note to screen
  document.getElementById("notes-container").prepend(note);

  // Save note to localStorage as HTML
  let storedList = JSON.parse(localStorage.getItem("list-items")) || {};
  storedList[counter] = note.outerHTML;
  localStorage.setItem("list-items", JSON.stringify(storedList));

  // Reset form
  e.target.reset();
});

// Delete note from localStorage
function removeNoteFromStorage(counter) {
  let storedList = JSON.parse(localStorage.getItem("list-items")) || {};
  delete storedList[counter];
  localStorage.setItem("list-items", JSON.stringify(storedList));
}
