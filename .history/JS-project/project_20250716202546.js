document.querySelector("#add-task").addEventListener("click", addTask);

function addTask() {
const container = document.querySelector(".note-container");
  const task = document.createElement("div");
  const deleteBtn = document.createElement("span");
  task.className = "note note1";
  task.id = "note-created";
  deleteBtn.className = "bi bi-trash float-end"

deleteBtn.style.width = "15%"
deleteBtn.style.height = "15%"
deleteBtn.style.marginLeft = "25%"

  const inputValue = document.querySelector("#input-value").value;

 if (!inputValue) {
    alert("Please type something...");
    return;
  }
 

  task.append(inputValue, deleteBtn);
  container.append(task)




}
