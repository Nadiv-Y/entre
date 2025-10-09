var KEY = "project1";
var tasks = [];

var saveBtn = document.getElementById("save");
var board = document.getElementById("board");
var form = document.getElementById("form");
var taskIn = document.getElementById("task");
var dateIn = document.getElementById("date");
var timeIn = document.getElementById("time");

function load() {
  try {
    var raw = localStorage.getItem(KEY);
    var arr = raw ? JSON.parse(raw) : [];
    tasks = Array.isArray(arr) ? arr : [];
  } catch (e) {
    tasks = [];
  }
}
function save() {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

function formatDate(dateStr) {
  var parts = dateStr.split("-");
  return parts[2] + "/" + parts[1] + "/" + parts[0];
}

function render() {
  board.innerHTML = "";
  for (var i = 0; i < tasks.length; i++) {
    var t = tasks[i];

    var col = document.createElement("div");
    col.className = "note-col col-xs-12 col-sm-6 col-md-4 col-lg-3";

    var note = document.createElement("div");
    note.className = "note";

    var close = document.createElement("button");
    close.className = "note-close";
    close.type = "button";
    close.innerHTML = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
    (function (id) {
      close.addEventListener("click", function () {
        removeById(id);
      });
    })(t.id);

    var content = document.createElement("div");
    content.className = "note-content";
    content.textContent = t.text;

    var meta = document.createElement("div");
    meta.className = "note-meta";

    var dateSpan = document.createElement("div");
    dateSpan.textContent = formatDate(t.date);

    var timeSpan = document.createElement("div");
    timeSpan.textContent = t.time;

    meta.appendChild(dateSpan);
    meta.appendChild(timeSpan);

    note.appendChild(close);
    note.appendChild(content);
    note.appendChild(meta);
    col.appendChild(note);
    board.appendChild(col);

    setTimeout(
      function (n) {
        n.classList.add("show");
      }.bind(null, note),
      10
    );
  }
}

function add() {
  var text = taskIn.value.trim();
  var date = dateIn.value;
  var time = timeIn.value;

  if (!text) {
    alert("Please enter a task");
    return;
  }
  if (!date) {
    alert("Please choose a due date");
    return;
  }
  if (!time) {
    alert("Please choose a due time");
    return;
  }

  tasks.push({
    id: Date.now(),
    text: text,
    date: date,
    time: time,
  });
  save();
  render();
  form.reset();
  taskIn.focus();
}

function removeById(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      break;
    }
  }
  save();
  render();
}

load();
render();
saveBtn.addEventListener("click", add);
