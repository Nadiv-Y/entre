$("#AllBut").click(() => {
  getCountriesInfo();
});

$("#search-but").click((e) => {
  e.preventDefault();

  const input = $("#search-input").val();

  if(!input){
    alert('please type the name of the country you are looking for')
    return 
  }

  if (input.length > 0) {
    getsInfoFromInput(input);
  }
  
  $('#search-input').val('')
});

function buildTables(info) {
  const container = $('#resaultDiv');
  const subContainer = $('<div></div>');
  const countriesTable = $('<table></table>');
  const regionTable = $('<table></table>');

  container.empty();

  const totalPopulation = info
    .map((country) => country.population)
    .reduce((acc, population) => acc + population, 0);

  const countriesSum = info.length;

  const avgPopulation = totalPopulation / countriesSum;

  countriesTable.html(`
    <thead>
      <tr>
        <th>Country Name</th>
        <th>Population</th>
      </tr>
    </thead>
    <tbody></tbody>
  `);

  const tbody = countriesTable.find("tbody");

  info.forEach((country) => {
    const name = country.name.official;
    const population = country.population.toLocaleString();
    const row = $('<tr></tr>');

    row.html(`
      <td>${name}</td>
      <td>${population}</td>
    `);

    tbody.append(row);
  });

  regionTable.html(`
    <thead>
      <tr>
        <th>Region</th>
        <th>Number of Countries</th>
      </tr>
    </thead>
    <tbody></tbody>
  `);

  const regionBody = regionTable.find("tbody");

  const regionCounts = {};
  info.forEach((country) => {
    const region = country.region || "Unknown";
    regionCounts[region] = (regionCounts[region] || 0) + 1;
  });

  Object.keys(regionCounts).forEach((region) => {
    const count = regionCounts[region];
    const row = $('<tr></tr>');

    row.html(`
      <td>${region}</td>
      <td>${count}</td>
    `);

    regionBody.append(row);
  });

  subContainer.html(`
    <p>Total countries result: ${countriesSum}</p>
    <p>Total Countries Population: ${totalPopulation.toLocaleString()}</p>
    <p>Average Countries Population: ${Math.round(avgPopulation).toLocaleString()}</p>
  `);

  subContainer.append(countriesTable);
  subContainer.append(regionTable);
  container.append(subContainer);
}

async function getCountriesInfo() {
  try {
    const allInfoPromise = await fetch('https://restcountries.com/v3.1/all?fields=name,region,population', { method: 'GET' });
    const allInfo = await allInfoPromise.json();
    buildTables(allInfo);
  } catch (error) {
    console.log('Failed loading information', error);
    alert('Sorry, the input you inserted can not be found 😒')
  }
}

async function getsInfoFromInput(input) {
  try {
    const inputInfoPromise = await fetch(`https://restcountries.com/v3.1/name/${input}?fields=name,region,population`, { method: 'GET' });
    const inputInfo = await inputInfoPromise.json();
    buildTables(inputInfo);
  } catch (error) {
    console.log('Failed loading information for input', error);
    alert('Sorry, the input you inserted can not be found 😒')
  }
}

