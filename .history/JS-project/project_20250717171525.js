document.querySelector("#add-task").addEventListener("click", addTask);

function addTask() {
  const container = document.querySelector(".note-container");
  const task = document.createElement("div");
  task.className = "note note1";
  task.id = "note-created";
  task.style.fontSize = "2rem"

  const deleteBtn = document.createElement("button");
  deleteBtn.id = "delete-task"
  deleteBtn.type = "button";
  deleteBtn.className = "btn btn-secondary btn-sm";
  deleteBtn.style.width = "15%";
  deleteBtn.style.height = "15%";
  deleteBtn.style.marginLeft = "25%";
  deleteBtn.innerText = "delete";

  const inputValue = document.querySelector("#input-value").value;

  if (!inputValue) {
    alert("Please type something...");
    return;
  }

  task.append(inputValue, deleteBtn);
  container.append(task);

   deleteBtn.addEventListener("click", removeItem);
}


function removeItem(event){
if(!confirm ("Are you sure?")){
return
}
const task = event.target.parentElement
const container = task.parentElement

container.removeChild(task)

}