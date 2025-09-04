let countries = [];

async function getCountriesData() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,currencies"
    );
    const data = await response.json();
    countries = data;
    console.log({ countries });
    return countries;
  } catch (err) {
    console.log("error" + err.message);
  }
}

getCountriesData();

const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", () => {
  dislplayCountries(countries);
});

function dislplayCountries(countries) {
  searchTerm = searchInput.value.toLocaleLowerCase();
  const tableBody = document.querySelector("#tbody");
  const totalPop = document.querySelector("#totalPop");
  const averagePop = document.querySelector("#averagePop");
  const regionTable = document.querySelector("#secondery");

  tableBody.innerHTML = "";

  if (!searchTerm) {
    totalPop.innerHTML = `<a class="nav-link active" aria-current="page" href="#">Total Countries Population:</a>`;
    averagePop.innerHTML = `<a class="nav-link active" aria-current="page" href="#">Average Population: </a>`;
    regionTable.innerHTML = `
        <th scope="row"></th>
        <td></td>
        <td></td>
      `;
    return;
  }

  let filtered = [];

  for (let i = 0; i < countries.length; i++) {
    const countryName = countries[i].name.common.toLocaleLowerCase();
    const citizensNumber = countries[i].population;
    const regions = countries[i].region;
    if (countryName.includes(searchTerm)) {
      filtered.push({
        index: i,
        name: countries[i].name.common,
        population: citizensNumber,
        region: regions,
      });
    }
  }

  filtered.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  const sum = filtered.reduce((total, num) => total + num.population, 0);
  const numberOfCountries = filtered.length;
  const average = sum / numberOfCountries;

  totalPop.innerHTML = `<a class="nav-link active" aria-current="page" href="#">Total Countries Population: ${sum.toLocaleString()}</a>`;
  averagePop.innerHTML = `<a class="nav-link active" aria-current="page" href="#">Average Population: ${average.toLocaleString()}</a>`;

  let index = 1;


  for (let i = 0; i < filtered.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = ` 
          <th scope="row">${index}</th>
          <td>${filtered[i].name}</td>
          <td>${filtered[i].population.toLocaleString()}</td>
        `;
    index++;
    tableBody.appendChild(row);
  }



  const countRegion = {};

  for (let i = 0; i < filtered.length; i++) {
    const region = filtered[i].region;
    countRegion[region] = (countRegion[region] || 0) + 1;
  }

  displayRegions(countRegion);
}

function displayRegions(countRegion) {
  const regionTable = document.querySelector("#secondery");
  regionTable.innerHTML = "";
  let index = 1;

  for (const key in countRegion) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <th scope="row">${index}</th>
        <td>${key}</td>
        <td>${countRegion[key]}</td>
      `;
    regionTable.appendChild(row);
    index++;
  }
}
