const form = document.getElementById("vacationForm");
const notesGrid = document.getElementById("notesGrid");

window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("notes") || "[]");
  saved.forEach(addCard);
});

document.getElementById("add-item").addEventListener("click", () => {
  const vacationName = document.querySelector("#vacationName").value.trim();
  const vacationPhoto = document.querySelector("#vacationPhoto").value.trim();
  const vacationPrice = document.querySelector("#vacationPrice").value.trim();
  const vacationRating = document.querySelector("#vacationRating").value;

  if (!vacationName || !vacationPhoto || !vacationPrice || !vacationRating) {
    alert("תספר על כל החופשה אין להחסיר שום פרט!");
    return;
  }

  const noteObj = {
    vacationName,
    vacationPhoto,
    vacationPrice,
    vacationRating,
  };

  saveNote(noteObj);
  addCard(noteObj);
  form.reset();
});

function saveNote(note) {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function deleteCard(
  vacationName,
  vacationPhoto,
  vacationPrice,
  vacationRating
) {
  let notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes = notes.filter(
    (n) =>
      n.vacationName !== vacationName ||
      n.vacationPhoto !== vacationPhoto ||
      n.vacationPrice !== vacationPrice ||
      n.vacationRating !== vacationRating
  );
  localStorage.setItem("notes", JSON.stringify(notes));
}

function addCard({
  vacationName,
  vacationPhoto,
  vacationPrice,
  vacationRating,
}) {
  const col = document.createElement("div");
  col.className = "col-6 col-sm-4 col-md-3 col-lg-2";

  const card = document.createElement("div");
  card.className = "card text-center h-100 position-relative";

  card.innerHTML = `
          <img src="${vacationPhoto}" class="card-img-top" alt="${vacationName}" />
          <div class="card-body">
            <h5 class="card-title">${vacationName}</h5>
            <h6 class="my-2 text-primary">מחיר: ₪${vacationPrice}</h6>
            <p class="card-text">דירוג: ${vacationRating}</p>
          </div>
          <button class="btn btn-sm btn-danger position-absolute top-0 start-0 m-1 delete-btn" title="מחק">
            <i class="bi bi-trash"></i>
          </button>
        `;

  card.querySelector(".delete-btn").addEventListener("click", () => {
    if (confirm("למחוק את החופשה הזו?")) {
      col.remove();
      deleteCard(vacationName, vacationPhoto, vacationPrice, vacationRating);
    }
  });

  col.appendChild(card);
  notesGrid.appendChild(col);
}
