document.querySelector("#add-task").addEventListener("click", addTask);

function addTask() {
const container = document.querySelector(".note-container");
  const task = document.createElement("div");
  task.className = "note note1";
  task.id = "note-created";

  const inputValue = document.querySelector("#input-value").value;

 if (!inputValue) {
    alert("Please type something...");
    return;
  }
 

  task.append(inputValue);
  container.append(task)

}
