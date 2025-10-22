const searchResults = $(".search-results");
const additionalDataPopulationStatus = $(".additional-data");
const body= $('body')
let bool = true;

$("#btnAll").on("click", allCountry);

async function allCountry() {
  $(searchResults).empty();
  $(additionalDataPopulationStatus).empty();
   $('.addData').empty()

  try {
    const resAll = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,population,region"
    );

    console.log(resAll.data);
    const countryData = resAll.data;

    dataDisplay(countryData);

    bool = true;
  } catch (error) {
    console.log(error);
  }
}

$("#btnSearch").on("click", filterCountries);
async function filterCountries() {
  $(searchResults).empty();
  $(additionalDataPopulationStatus).empty();
  $('.addData').empty()
  const valInputSearch = $("#inputSearch").val().trim().toLowerCase();

  try {
    const resFilterCountries = await axios.get(
      `https://restcountries.com/v3.1/name/${valInputSearch}`
    );
    console.log(resFilterCountries);

    const countryData = resFilterCountries.data;
    console.log(countryData);

    dataDisplay(countryData);
    


  

    const addDataToDisplay = $('.addData')
    const dataRegionTitle = $(`<div class="titel-table">Region</div> <div class="titel-table">Number of Countries</div>`);
   
    addDataToDisplay.append(dataRegionTitle)
   let counter= 0 
    countryData.map((res) => {
        let dataRegion = $(`<div class="${res.region}">${res.region}</div>`);
        let dataNumOfCountries= $(`<div counter="0" class="numOfCountries-${res.region}">${counter}</div>`)
        const arrRegion = $(`.${res.region}`) 
        arrRegion.length === 0 ? addDataToDisplay.append(dataRegion,dataNumOfCountries):(dataRegion = '' , dataNumOfCountries = '');
         counter = $(`.numOfCountries-${res.region}`).attr('counter');
         counter= Number(counter)+1
       $(`.numOfCountries-${res.region}`).attr('counter',`${counter}`);
        console.log(counter);
        
        $(`.numOfCountries-${res.region}`).text(counter)
   

    });
       
   $("#inputSearch").val('')
  } catch (error) {
    console.log(error);
  }
}

function dataDisplay(data) {
  const arrNumPopulation = data.map((res) => {
    if (bool) {
      const titleTable = `<div class="titel-table">Country Name</div>
                <div class="titel-table">Population</div>`;

      searchResults.append(titleTable);
      bool = false;
    }

    const contentTableAllCountry = `<div class="table">${res.name.common}</div>
                <div class="table">${res.population.toLocaleString()}</div>
                `;
    searchResults.append(contentTableAllCountry);

    return res.population;
  });
  console.log(arrNumPopulation);

  const totalPopulation = arrNumPopulation
    .reduce((accumulator, correntvalue) => accumulator + correntvalue)
    ;
  console.log(totalPopulation);
  const populationAverage = totalPopulation / arrNumPopulation.length;

  const populationStatus = `<div> Total countries result: ${data.length} </div>
    <div> TotalCountries Population: ${totalPopulation.toLocaleString()}</div>
    <div> Average countries Population: ${populationAverage.toLocaleString()}</div>`;

  additionalDataPopulationStatus.append(populationStatus);
   bool = true;
}
