displayTasksFromLocalStorage()
const deleteButs = document.querySelectorAll('.del-note-but')
for(const deleteBut of deleteButs){
    deleteBut.addEventListener('click', deleteTask)
}

document.querySelector('#saveBut').addEventListener('click', createNote)
document.querySelector('#resetbut').addEventListener('click', resetForm)

function resetForm() {
    document.querySelector('#taskDescription').value = ''
    document.querySelector('#dueDate').value = ''
    document.querySelector('#dueTime').value = ''
}

function createNote() {
    const taskDescription = document.querySelector('#taskDescription').value
    const taskDate = document.querySelector('#dueDate').value
    const taskTime = document.querySelector('#dueTime').value

    if(!taskDescription){
        alert('You must enter a task description!')
        return
    }
    if(!taskDate){
        alert('You must enter a due date for your task!')
        return
    }
    if(!taskTime){
        alert('You must enter a due time for your task!')
        return
    }

    const notesContainer = document.querySelector('.notes-container')
    const note = document.createElement('div')
    note.className = 'note'

    const noteHeader = document.createElement('div')
    noteHeader.className = 'noteHeader'
    const noteDeletBut = document.createElement('button')
    noteDeletBut.className = 'del-note-but'
    noteDeletBut.addEventListener('click', deleteTask)
    const noteDeletIcon = document.createElement('i')
    noteDeletIcon.className = 'bi bi-x-lg'
    noteDeletBut.append(noteDeletIcon)
    noteHeader.append(noteDeletBut)

    const noteBody = document.createElement('div')
    noteBody.className = 'noteBody'
    const noteText = document.createElement('p')
    noteText.className = 'noteText'
    noteText.innerText = taskDescription
    noteBody.append(noteText)

    const noteFooter = document.createElement('div')
    noteFooter.className = 'noteFooter'
    const noteDueDate = document.createElement('p')
    noteDueDate.className = 'noteDue'
    noteDueDate.innerText = taskDate
    const noteDuTime = document.createElement('p')
    noteDuTime.className = 'noteDue'
    noteDuTime.innerText = taskTime
    noteFooter.append(noteDueDate, noteDuTime)

    note.append(noteHeader, noteBody, noteFooter)
    notesContainer.append(note)

    document.querySelector('#taskDescription').value = ''
    document.querySelector('#dueDate').value = ''
    document.querySelector('#dueTime').value = ''

    AddTaskToLocalStorage(note)
    
}

function deleteTask(event) {
    if(!confirm('Are you sure you want to delete this task?')){
        return
    }
    const noteToBeDeletet = event.target.closest('.note')
    const notesContainer = noteToBeDeletet.parentElement
    notesContainer.removeChild(noteToBeDeletet)

    deleteTaskFromLocalStorage(noteToBeDeletet)
}

function AddTaskToLocalStorage(element) {
    const oldCounter = parseInt(localStorage.getItem('counter'))
    const counter = oldCounter ? oldCounter + 1 : 1
    element.setAttribute('counter', counter)
    localStorage.setItem('counter', counter)

    let storedTasks = JSON.parse(localStorage.getItem('tasks-list'))
    storedTasks = storedTasks ? storedTasks : {}
    storedTasks[counter] = element.outerHTML
    localStorage.setItem('tasks-list', JSON.stringify(storedTasks))

}

function deleteTaskFromLocalStorage(element) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks-list'))
    const counter = element.getAttribute('counter')
    delete storedTasks[counter]
    localStorage.setItem('tasks-list', JSON.stringify(storedTasks)) 
}

function displayTasksFromLocalStorage() {
    let storedTasks = JSON.parse(localStorage.getItem('tasks-list'))

    if(!storedTasks){
        return
    }
    const placeholder = document.createElement('div')
    for(const key in storedTasks){
        placeholder.innerHTML = storedTasks[key]
        document.querySelector('.notes-container').append(placeholder.firstElementChild)
    }


}