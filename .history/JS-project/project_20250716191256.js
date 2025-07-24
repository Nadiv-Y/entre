document.querySelector("#insert-task").addEventListener("click", addTask());

function addTask() {
const note = document.querySelector('#insert-task')
  const task = document.createElement("div");
  task.className = "note note1";
  task.id = "note-created";

  const inputValue = document.querySelector("#insert-task").value;

  if (!inputValue) {
    alert("Please type something...");
    return;
  }

  task.append(inputValue);
}
