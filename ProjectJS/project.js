
document.querySelector("#save").addEventListener("click",addItem)
document.querySelector("#delete").addEventListener("click",cleanForm)
window.addEventListener("load", getItemsFromLocalStorage);





function addItem(event){
    event.preventDefault(); 
    let newDiv = document.createElement("div");
    newDiv.className = "newDiv"
    document.querySelector(".notes").appendChild(newDiv);
      setTimeout(() => {
      newDiv.classList.add("fade-in");
    }, 10);
    
    let taskInfo = document.createElement("p");
    taskInfo.textContent = document.querySelector('#formInfo').value
    console.log(taskInfo);
    let taskInfoDiv = document.createElement("div");
    taskInfoDiv.append(taskInfo);
    taskInfoDiv.className = "infoDiv"
        
    let taskDate = document.createElement("p");
    taskDate.textContent = document.querySelector('#dueDate').value
    taskDate.className = "taskDate";
    console.log(taskDate);
        
    let taskTime = document.createElement("p");
    taskTime.textContent = document.querySelector('#time').value
    taskTime.className = "taskTime";
    console.log(taskTime);
        
    let trash = document.createElement("p");
    trash.className = "trash";
    trash.textContent = "X";
    
    

    const obj = {
  taskInfo: {
    text: taskInfo.textContent,
    class: taskInfo.className
  },
  taskDate: {
    text: taskDate.textContent,
    class: taskDate.className
  },
  taskTime: {
    text: taskTime.textContent,
    class: taskTime.className
  },
  trash: {
    text: trash.textContent,
    class: trash.className
  },
  container: {
    background: newDiv.style.backgroundImage,
    class: newDiv.className
  }
};
    

  console.log(obj);
    


    newDiv.append(taskInfoDiv, taskDate, taskTime, trash)


    newDiv.addEventListener('mouseenter',showTrash);
    newDiv.addEventListener('mouseleave',hideTrash);
    trash.addEventListener("click",removeItem);

    const counter = addItemToLocalStorage(obj);
    newDiv.setAttribute("data-counter", counter);


}


function showTrash(event){
    let div = event.currentTarget;
    let trash = div.querySelector(".trash");
    trash.style.display = "block";
    trash.style.position= "absolute";
    trash.style.top = "0";
    trash.style.right = "0";
    trash.style.width = "30px";
    trash.style.fontStyle= "bold";
    trash.style.textAlign= "center";
    trash.style.backgroundColor = "black";
    trash.style.width="30px";
    trash.style.border="1px solid black";
    trash.style.color= "white";
    trash.style.borderRadius= "50%";
    trash.style.fontSize= "large";
}


function hideTrash(event){
    let div = event.currentTarget;
    let trash = div.querySelector(".trash");
    trash.style.display = "none";
}


function removeItem(newDiv){
    const div = newDiv.target.parentElement;
    const note = div.parentElement;
    note.removeChild(div);

    const counter = div.getAttribute("data-counter");

    removeItemFromLocalStorage(counter);
    
}

function cleanForm(){
    let textInput = document.querySelector("#formInfo")
    let dateInput = document.querySelector("#dueDate")
    let timeInput = document.querySelector("#time")
    textInput.value = ""
    dateInput.value = ""
    timeInput.value = ""
}



function addItemToLocalStorage(note){
   
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    const counter = parseInt(localStorage.getItem('counter')) || 1;
    note.counter = counter
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('counter', counter + 1);
    
    return counter;
}
   


   function removeItemFromLocalStorage(counter) {
    var storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    if (storedNotes.length === 0) {
        return;
    }

    var newNotes = [];

    for (var i = 0; i < storedNotes.length; i++) {
        if (storedNotes[i].counter != counter) {
            newNotes.push(storedNotes[i]);
        }
    }

    localStorage.setItem('notes', JSON.stringify(newNotes));
}


function getItemsFromLocalStorage() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const container = document.querySelector('.notes');
    container.innerHTML = ''; 

    notes.forEach(function(note) {
      
        let newDiv = document.createElement("div");
        newDiv.className = "newDiv";     
        newDiv.setAttribute("data-counter", note.counter);
        newDiv.classList.add("fade-in");

        let taskInfoDiv = document.createElement("div");
        taskInfoDiv.className = "infoDiv";

        let taskInfo = document.createElement("p");
        taskInfo.textContent = note.taskInfo.text;
        taskInfoDiv.appendChild(taskInfo);

 
        let taskDate = document.createElement("p");
        taskDate.textContent = note.taskDate.text;
        taskDate.style.margin = "2px 40px 0";

        let taskTime = document.createElement("p");
        taskTime.textContent = note.taskTime.text;
        taskTime.style.margin = "0px 40px";

        let trash = document.createElement("p");
        trash.className = "trash";
        trash.textContent = "X";

       
        newDiv.append(taskInfoDiv, taskDate, taskTime, trash);

     
        newDiv.addEventListener('mouseenter', showTrash);
        newDiv.addEventListener('mouseleave', hideTrash);
        trash.addEventListener("click", removeItem);

      
        container.appendChild(newDiv);
    });
}


