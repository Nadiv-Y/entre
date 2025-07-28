document.addEventListener("DOMContentLoaded", function () {
  var titleInput = document.getElementById("titleTask");
  var textInput = document.getElementById("textTask");
  var dateInput = document.getElementById("dateTask");
  var timeInput = document.getElementById("timeTask");
  var addTaskBtn = document.getElementById("addTaskBtn");
  var clearFormBtn = document.getElementById("clearFormBtn");
  var notesContainer = document.getElementById("notes");

  var notes = JSON.parse(localStorage.getItem("notes")) || [];

  function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function clearForm() {
    titleInput.value = "";
    textInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
  }

  function renderNotes() {
    notesContainer.innerHTML = "";

    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];

      var col = document.createElement("div");
      col.className = "col-md-3";

      var card = document.createElement("div");
      card.className = "note-card fade-in";

      var delIcon = document.createElement("i");
      delIcon.className = "fas fa-times delete-icon";
      delIcon.setAttribute("data-index", i);

      var title = document.createElement("h5");
      title.textContent = note.title;

      var text = document.createElement("div");
      text.className = "note-description";
      text.textContent = note.text;

      var footer = document.createElement("div");
      footer.className = "note-footer text-primary";
      footer.innerHTML =
        '<i class="bi bi-calendar3"></i> ' +
        note.date +
        '<br><i class="bi bi-clock"></i> ' +
        note.time;

      card.appendChild(delIcon);
      card.appendChild(title);
      card.appendChild(text);
      card.appendChild(footer);
      col.appendChild(card);
      notesContainer.appendChild(col);
    }
  }

  function addNote() {
    var title = titleInput.value.trim();
    var text = textInput.value.trim();
    var date = dateInput.value;
    var time = timeInput.value;

    if (!title || !text || !date || !time) {
      alert("Please fill in all fields.");
      return;
    }

    var note = {
      title: title,
      text: text,
      date: date,
      time: time,
    };

    notes.push(note);
    saveNotes();
    renderNotes();
    clearForm();
  }

  notesContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-icon")) {
      var index = e.target.getAttribute("data-index");
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    }
  });

  addTaskBtn.addEventListener("click", addNote);
  clearFormBtn.addEventListener("click", clearForm);
  renderNotes();
});
