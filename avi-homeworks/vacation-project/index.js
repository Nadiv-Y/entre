loadVacationsFromStorage();

document.getElementById("save-vacation").addEventListener("click", function() {
    const name = document.getElementById("vacationName").value.trim();
    const image = document.getElementById("vacationImage").value.trim();
    const price = document.getElementById("vacationPrice").value.trim();
    const rating = document.getElementById("vacationRating").value.trim();

    if (!name || !image || !price || !rating) {
        alert("Please fill in all fields before saving the vacation.");
        return;
    }

    createVacationCard(name, image, price, rating, 0);
    clearFormFields();
});

function createVacationCard(name, image, price, rating, likes) {
    const cardWrapper = document.createElement("div");
    cardWrapper.className = "col-md-4 mb-4";


    const card = document.createElement("div");
    card.className = "card shadow-sm mx-2";

    const title = document.createElement("h5");
    title.className = "card-header text-center";
    title.textContent = name;
    card.appendChild(title);

    const imageEl = document.createElement("img");
    imageEl.className = "card-img-top img-fluid rounded";
    imageEl.src = image;
    imageEl.alt = name;
    card.appendChild(imageEl);

    const priceEl = document.createElement("p");
    priceEl.className = "text-center fw-bold mb-2";
    priceEl.textContent = `$${price}`;
    card.appendChild(priceEl);

    const starsEl = document.createElement("div");
    starsEl.className = "text-center mb-3";
    let starsCount = 0;

    switch (rating) {
        case "Excellent":
            starsCount = 4;
            break;
        case "Good":
            starsCount = 3;
            break;
        case "Regular":
            starsCount = 2;
            break;
        case "Bad":
            starsCount = 1;
            break;
    }

    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement("i");
        star.className = "bi bi-star-fill text-warning mx-1";
        starsEl.appendChild(star);
    }

    card.appendChild(starsEl);


    const likeSection = document.createElement("div");
    likeSection.className = "text-center mb-3";

    const likeBtn = document.createElement("button");
    likeBtn.className = "btn btn-outline-primary btn-sm me-2";
    likeBtn.textContent = "👍 Like";

    const likeCount = document.createElement("span");
    likeCount.className = "fw-bold";
    likeCount.textContent = likes;

    likeBtn.addEventListener("click", function() {
        const currentLikes = parseInt(likeCount.textContent) + 1;
        likeCount.textContent = currentLikes;
        updateVacationInLocalStorage(cardWrapper);
    });

    likeSection.appendChild(likeBtn);
    likeSection.appendChild(likeCount);
    card.appendChild(likeSection);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm d-block mx-auto mb-3";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", removeVacation);

    card.appendChild(deleteBtn);
    cardWrapper.appendChild(card);
    document.getElementById("vacations-container").appendChild(cardWrapper);

    addVacationToLocalStorage(cardWrapper);
}

function removeVacation(event) {
    if (!confirm("Are you sure you want to delete this vacation?")) {
        return;
    }


    const deleteBtn = event.target;
    const card = deleteBtn.parentElement;
    const cardWrapper = card.parentElement;
    const container = cardWrapper.parentElement;

    container.removeChild(cardWrapper);
    removeVacationFromLocalStorage(cardWrapper);
}

function clearFormFields() {
    document.getElementById("vacationName").value = "";
    document.getElementById("vacationImage").value = "";
    document.getElementById("vacationPrice").value = "";
    document.getElementById("vacationRating").value = "";
}

function addVacationToLocalStorage(element) {
    const oldCounter = parseInt(localStorage.getItem("counter"));
    const counter = oldCounter ? oldCounter + 1 : 1;
    element.setAttribute("counter", counter);
    localStorage.setItem("counter", counter);

    let storedVacations = JSON.parse(localStorage.getItem("vacations"));
    storedVacations = storedVacations ? storedVacations : {};
    storedVacations[counter] = element.outerHTML;
    localStorage.setItem("vacations", JSON.stringify(storedVacations));
}

function updateVacationInLocalStorage(element) {
    let storedVacations = JSON.parse(localStorage.getItem("vacations"));
    if (!storedVacations) {
        return;
    }

    const counter = element.getAttribute("counter");
    storedVacations[counter] = element.outerHTML;
    localStorage.setItem("vacations", JSON.stringify(storedVacations));
}

function removeVacationFromLocalStorage(element) {
    let storedVacations = JSON.parse(localStorage.getItem("vacations"));
    if (!storedVacations) {
        return;
    }

    const counter = element.getAttribute("counter");
    delete storedVacations[counter];
    localStorage.setItem("vacations", JSON.stringify(storedVacations));
}

function loadVacationsFromStorage() {
    const storedVacations = JSON.parse(localStorage.getItem("vacations"));
    if (!storedVacations) {
        return;
    }

    const container = document.getElementById("vacations-container");
    for (const counter in storedVacations) {
        container.innerHTML = container.innerHTML + storedVacations[counter];
    }


    const deleteButtons = document.querySelectorAll(".btn-danger");
    for (const btn of deleteButtons) {
        btn.addEventListener("click", removeVacation);
    }


    const likeButtons = document.querySelectorAll(".btn-outline-primary");
    for (const btn of likeButtons) {
        btn.addEventListener("click", function() {
            const card = btn.parentElement.parentElement;
            const cardWrapper = card.parentElement;
            const likeCount = btn.parentElement.querySelector("span");

            const currentLikes = parseInt(likeCount.textContent) + 1;
            likeCount.textContent = currentLikes;
            updateVacationInLocalStorage(cardWrapper);
        });
    }
}