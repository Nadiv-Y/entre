
const modal = document.getElementById('add-note-dialog');
const openBtn = document.getElementById('open-modal-btn');
const notesArea = document.querySelector('#notes-area');
const addNoteForm = document.getElementById('dialog-form')
const closeBtn = document.getElementById('close-modal')
const resetBtn = document.getElementById('reset-form-btn')



addNoteForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const taskInput = document.querySelector('#task-input').value
    const dateInput = document.querySelector('#date-input').value
    const timeInput = document.querySelector('#time-input').value
    const noteId = setNoteId()

    const note = {
        taskInput,
        dateInput,
        timeInput,
        noteId,
    }

    addNoteForm.reset();
    saveNoteToLocalStorage(note)
    modal.close();
    renderNotes()

})


openBtn.addEventListener('click', () => {
    modal.showModal();
});

closeBtn.addEventListener('click', () => {
    modal.close();
})

resetBtn.addEventListener('click', () => {
    addNoteForm.reset();
})

function renderNotes() {
    const notes = getNotesFromLocalStorage()
    for (const note of notes) {
        const isExisitingNoteCard = document.querySelector(`[data-id="${note.noteId}`)
        if (!isExisitingNoteCard) {
            const noteCard = addNote(note)
            notesArea.append(noteCard)
        }
    }

    const AllNotes = document.querySelectorAll('.note-wrapper')

    AllNotes.forEach(note => {
        const noteId = parseInt(note.dataset.id)
        const pin = note.querySelector('.pin')

        const exist = notes.some(note => note.noteId === noteId)

        if (!exist) {
            pin.classList.add('pin-out')
            note.classList.add('note-fall')
            pin.addEventListener('animationend', () => {
                
                note.addEventListener('animationend', () => {
                    note.remove()
                }, { once: true })
            }, { once: true })
        }
    })

}

function addNote(note) {
    const noteWrapper = document.createElement('div')
    noteWrapper.className = 'note-wrapper'
    noteWrapper.dataset.id = note.noteId

    const tooltipAndPinWrapper = document.createElement('div')
    tooltipAndPinWrapper.className = 'tooltip-wrapper'

    const tooltipText = document.createElement('span')
    tooltipText.className = 'tooltip-text'
    tooltipText.innerText = 'Delete Note'

    const pinImg = document.createElement('img')
    pinImg.className = 'pin'
    pinImg.alt = 'Pushpin'
    pinImg.src = 'lib/Pushpin red.png'

    const noteShadow = document.createElement('div')
    noteShadow.className = 'note-shadow'

    const noteCard = document.createElement('div')
    noteCard.className = 'note'

    const task = document.createElement('p')
    task.className = 'task'
    task.innerText = note.taskInput

    const dateAndtimeWrapper = document.createElement('div')
    dateAndtimeWrapper.className = 'date-and-time-wrapper'

    const date = document.createElement('p')
    date.innerText = note.dateInput

    const time = document.createElement('p')
    time.innerText = note.timeInput

    noteWrapper.append(tooltipAndPinWrapper, noteShadow, noteCard)
    tooltipAndPinWrapper.append(pinImg, tooltipText)
    noteCard.append(task, dateAndtimeWrapper)
    dateAndtimeWrapper.append(date, time)

    return noteWrapper
}

function saveNoteToLocalStorage(note) {
    const isStored = localStorage.getItem('notes')

    const notes = isStored ? JSON.parse(isStored) : []

    notes.push(note)

    localStorage.setItem('notes', JSON.stringify(notes))
}

function getNotesFromLocalStorage() {
    const isStored = localStorage.getItem('notes')

    const notes = isStored ? JSON.parse(isStored) : []

    return notes
}



function removeNoteFromLocalStrage(e) {
    if (e.target.classList.contains('pin')) {
        const noteCard = e.target.closest('.note-wrapper')
        const noteId = parseInt(noteCard.dataset.id)


        const notes = getNotesFromLocalStorage()

        const updatedNotes = notes.filter(note => note.noteId !== noteId)

        localStorage.setItem('notes', JSON.stringify(updatedNotes))
        renderNotes()
    }
}

function setNoteId() {
    const currentCount = parseInt(localStorage.getItem('countId') || 0)
    const nextCount = currentCount + 1;

    localStorage.setItem('countId', nextCount)

    return nextCount
}


notesArea.addEventListener('click', removeNoteFromLocalStrage)
renderNotes()

