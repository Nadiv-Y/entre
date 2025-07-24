
const array = ["Hello", "World", "My", "Name", 4, {"id":"idddddd"}, ]
const myObjIndex = array.findIndex(item => typeof(item) === "object")
const myObjId = array[myObjIndex].id
const object = {"id1": "asaf", "idNadiv": "Nadiv"}
console.log(object["idNadiv"])
//UID
//timestamp
const notesItems = [{id:"id1", title:'', description:"", created: 1123213124126, lastModified: 12321321321, deadline:123123141}]
window.localStorage.setItem("notes", notesItems)
const render = () => {
    const notes = window.localStorage.getItem("notes")
    notes.map(noteItem => renderNoteItem(noteItem))
}

function render () {

}

const renderNoteItem = (noteItem) => {
    return <div id={noteItem.id} key={noteItem.id}>
        <h1>{noteItem.title}</h1>
        <p1>{noteItem.description}</p1>
    </div>
}


