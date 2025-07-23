const form = document.getElementById("taskForm");
const notesGrid = document.getElementById("notesGrid");

window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("notes") || "[]");
  saved.forEach(addNoteToGrid);
});

document.getElementById("add-item").addEventListener("click", () => {
  const task = document.querySelector("#task").value;
  const date = document.querySelector("#taskDate").value;
  const time = document.querySelector("#taskTime").value;

  if (!task) {
    alert("תכתוב משימה בטוח יש לך מה לעשות!");
    return;
  }

  const noteObj = { task, date, time };
  saveNote(noteObj);
  addNoteToGrid(noteObj);
  form.reset();
});

function addNoteToGrid({ task, date, time }) {
  const col = document.createElement("div");
  col.className = "col-6 col-sm-4 col-md-3 col-lg-2";

  const note = document.createElement("div");
  note.classList.add("note", "position-relative");

  note.innerHTML = `
<button class="btn btn-sm btn-danger position-absolute top-0 start-0 m-1 delete-btn" title="מחק משימה">
  <i class="bi bi-trash"></i>
</button>
    <div class="note-content">
      <div>${task}</div>
      <div style="font-size:0.9rem;">${date} ${time}</div>
    </div>
  `;

  note.querySelector(".delete-btn").addEventListener("click", () => {
    if (confirm("למחוק את המשימה הזו?")) {
      col.remove();
      deleteNote(task, date, time);
    }
  });

  col.appendChild(note);
  notesGrid.appendChild(col);
}

function saveNote(note) {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function deleteNote(task, date, time) {
  let notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes = notes.filter(
    (n) => n.task !== task || n.date !== date || n.time !== time
  );
  localStorage.setItem("notes", JSON.stringify(notes));
}
