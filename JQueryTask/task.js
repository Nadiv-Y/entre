let countries = [];

async function getCountriesData() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,currencies"
    );
    const data = await response.json();
    countries.push(...data);
    console.log({ countries });
    return countries;
  } catch (err) {
    console.log("error" + err.message);
  }
}

getCountriesData();

const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", () => {
  dislpayCountries(countries);
});

function dislpayCountries(countries) {
  searchTerm = searchInput.value.toLocaleLowerCase();
  const tableBody = document.querySelector("#tbody");
  const totalPop = document.querySelector("#totalPop");
  const averagePop = document.querySelector("#averagePop");

  tableBody.innerHTML = "";

  if (!searchTerm) {
    totalPop.innerHTML = `<a class="nav-link active" aria-current="page" href="#">Total Countries Population:</a>`;
    averagePop.innerHTML = `<a class="nav-link active" aria-current="page" href="#">Average Population: </a>`;
    return;
  }

  let filtered = [];

  for (let i = 0; i < countries.length; i++) {
    const countryName = countries[i].name.common.toLocaleLowerCase();
    const citizensNumber = countries[i].population;
    if (countryName.includes(searchTerm)) {
      filtered.push({
        index: i,
        name: countries[i].name.common,
        population: citizensNumber,
      });
    }
  }

  filtered.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  const sum = filtered.reduce((total, num) => total + num.population, 0);
  const numberOfCountries = filtered.length;
  const average = sum / numberOfCountries
 console.log(sum);
 console.log(numberOfCountries);
 
 console.log(average);
 
 

  totalPop.innerHTML = `<a class="nav-link active" aria-current="page" href="#">Total Countries Population: ${sum.toLocaleString()}</a>`;
  averagePop.innerHTML = `<a class="nav-link active" aria-current="page" href="#">Average Population: ${average.toLocaleString()}</a>`;

  for (let i = 0; i < filtered.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = ` 
          <th scope="row">${filtered[i].index}</th>
          <td>${filtered[i].name}</td>
          <td>${filtered[i].population}</td>
        `;
    tableBody.appendChild(row);
  }
}
