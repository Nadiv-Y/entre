const form = document.querySelector("#task-form");
const taskBoard = document.querySelector("#task-board");
const textInput = document.querySelector("#task-text");
const dateInput = document.querySelector("#task-date");
const timeInput = document.querySelector("#task-time");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = textInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;

    if (!task || !date || !time) {
        alert("Please fill all fields.");
        return;
    }

    const taskObj = {
        id: Date.now(),
        text: task,
        date,
        time,
    };

    addTaskToBoard(taskObj);
    saveTaskToStorage(taskObj);
    form.reset();
});

function addTaskToBoard({ id, text, date, time }) {
    const note = document.createElement("div");
    note.className = "task-note";
    note.setAttribute("data-id", id);

    const deleteBtn = document.createElement("i");
    deleteBtn.className = "bi bi-x-circle-fill delete-btn";
    deleteBtn.title = "Delete";
    deleteBtn.addEventListener("click", () => {
        if (confirm("Delete this task?")) {
            note.remove();
            removeTaskFromStorage(id);
        }
    });

    const textDiv = document.createElement("div");
    textDiv.className = "task-text";
    textDiv.textContent = text;

    const footer = document.createElement("div");
    footer.className = "task-footer";
    footer.textContent = `${date} ${time}`;

    note.append(deleteBtn, textDiv, footer);
    taskBoard.append(note);
    setTimeout(() => note.classList.add("visible"), 10);
}

function saveTaskToStorage(taskObj) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (const task of tasks) {
        addTaskToBoard(task);
    }
}

window.addEventListener("DOMContentLoaded", loadTasks);