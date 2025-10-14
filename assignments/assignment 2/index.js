$("#btn").on("click", () => {
  getAll();
});

$("#search-form").on("submit", (event) => {
  event.preventDefault();

  const input = $("#search-input").val();

  if (input.length > 0) {
    getInput(input);
  }
});

function renderStats(countriesList){

  const container = document.getElementById("main-content");
  const subContainer = document.createElement("div");
  const countriesTable = document.createElement("table");
  const regionTable = document.createElement("table");

  container.innerHTML = "";

  const totalPopulation = countriesList
    .map((country) => country.population)
    .reduce((sum, population) => sum + population, 0);

  const countriesSum = countriesList.flatMap(
    (country) => country.name ?? []
  ).length;

  const avgPopulation = totalPopulation / countriesSum;

  countriesTable.innerHTML = `
    <thead>
      <tr>
        <th>Country Name</th>
        <th>Population</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = countriesTable.querySelector("tbody");

  countriesList.forEach((country) => {
    const name = country.name.official;
    const population = country.population.toLocaleString();
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${name}</td>
      <td>${population}</td>
    `;

    tbody.appendChild(row);
  });

  regionTable.innerHTML = `
    <thead>
      <tr>
        <th>Region</th>
        <th>Number of Countries</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const regionBody = regionTable.querySelector("tbody");

  const regionCounts = {};
  countriesList.forEach((country) => {
    const region = country.region;

    if (regionCounts[region]) {
      regionCounts[region]++;
    } else {
      regionCounts[region] = 1;
    }
    });

  Object.keys(regionCounts).forEach((region) => {
    const count = regionCounts[region];
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${region}</td>
      <td>${count}</td>
    `;

    regionBody.appendChild(row);
  });

  subContainer.innerHTML = `
  <p>Total countries result: ${countriesSum}</p>
  <p>Total Countries Population: ${totalPopulation.toLocaleString()}</p>
  <p>Average Countries Population: ${Math.round(
    avgPopulation
  ).toLocaleString()}</p>
  `;

  subContainer.appendChild(countriesTable);
  subContainer.appendChild(regionTable);
  container.appendChild(subContainer);
}

function getAll() {
  fetch("https://restcountries.com/v3.1/all?fields=name,region,population", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((countriesList) => {
      renderStats(countriesList)
    })
  .catch((err) => console.error("Failed to fetch countries data:", err));
}

function getInput(input) {
  fetch(`https://restcountries.com/v3.1/name/${input}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((countriesList) => {
      renderStats(countriesList)
    })
    .catch((err) => console.error("Failed to fetch countries data:", err));
}
