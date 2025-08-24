let countries = []

async function getAllCountries() {

    try {

        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,currencies')

        countries = await res.json()

        console.log(countries);
        return countries

    } catch (error) {
        console.log(error);

    }
}

async function init() {
    const countries = await getAllCountries()
    renderCountryRow(countries)
    submitingDatatToTable()
}

init()


function createCountryRow(country) {

    const countryRow = document.createElement('div')
    countryRow.className = 'country-row'

    const checkboxWrapper = document.createElement('div')
    checkboxWrapper.className = 'checkbox-wrapper'

    const checkMarkIcon = document.createElement('i')
    checkMarkIcon.className = 'ph ph-check'

    const checkbox = document.createElement('input')
    checkbox.className = 'checkbox'
    checkbox.type = 'checkbox'
    checkbox.id = 'countrey-checkbox'

    const flagImg = document.createElement('img')
    flagImg.className = 'country-flag'
    flagImg.src = country.flags.png

    const countryName = document.createElement('p')
    countryName.className = 'country-name'
    countryName.innerText = country.name.common

    countryRow.append(checkboxWrapper, flagImg, countryName)
    checkboxWrapper.append(checkMarkIcon, checkbox)

    return countryRow
}

const countriesList = document.querySelector('.serach-results-list')


function renderCountryRow(countries) {
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
    countries.forEach(country => {
        countriesList.append(createCountryRow(country))
    });
}


const searchInput = document.querySelector('#search-input')

searchInput.addEventListener('input', (e) => {

    const userInput = e.target.value.toLowerCase()
    const countryRows = document.querySelectorAll('.country-row')

    console.log(userInput);
    countryRows.forEach(country => {
        if (!country.innerText.toLowerCase().includes(userInput)) {
            console.log(country.innerText.toLowerCase());

            country.classList.add('hide')
        } else {
            country.classList.remove('hide')
        }
    })

})

let countriesToRender = []
let selectedCountries = []
let isAllSelected = false

function toggleShowDataButton() {
    const showDataBtn = document.querySelector('#show-data-btn')
    showDataBtn.disabled = (selectedCountries.length > 0) ? false : true
    console.log(selectedCountries);
}

function getOneCheckboxAtATime() {
    const countriesRows = document.querySelectorAll('.country-row')

    countriesRows.forEach(row => {
        const checkbox = row.querySelector('.checkbox')

        checkbox.addEventListener('change', () => {
            const countryName = row.querySelector('p').innerText
            if (checkbox.checked) {
                selectedCountries.push(countryName)
            } else {
                const unselectedRow = selectedCountries.indexOf(countryName)
                if (unselectedRow !== -1) {
                    selectedCountries.splice(unselectedRow, 1)
                }
            }

            toggleShowDataButton()
        })
    })
}

function updateAllCheckboxesState() {
    const checkboxes = document.querySelectorAll('.checkbox')

    checkboxes.forEach(checkbox => {
        const countryRow = checkbox.closest('.country-row')
        const countryName = countryRow.querySelector('p').innerText
        const unselectedRow = selectedCountries.indexOf(countryName)
        if (!isAllSelected) {
            if (checkbox.checked) {
                if (unselectedRow !== -1) {
                    selectedCountries.splice(unselectedRow, 1)
                }
            }
            checkbox.checked = true
            selectedCountries.push(countryName)
        } else {
            checkbox.checked = false
            if (unselectedRow !== -1) {
                selectedCountries.splice(unselectedRow, 1)
            }
        }
    })
}



function toggleAllCheckboxes() {
    const selectAllBtn = document.querySelector('#select-all-in-search-btn')


    selectAllBtn.addEventListener('click', () => {
        if (selectedCountries.length < 250) {
            updateAllCheckboxesState()

        } else if (selectedCountries.length == 250) {
            selectedCountries = []
            updateAllCheckboxesState()
        }

        isAllSelected = !isAllSelected

        toggleShowDataButton()
        selectAllBtnCopyChange(selectAllBtn)
    })
}

function selectAllBtnCopyChange(selectAllBtn) {
    if (selectedCountries.length === 250) {
        selectAllBtn.innerText = 'Unselect All'
    } else {
        selectAllBtn.innerText = 'Select All'
    }
}


function submitingDatatToTable() {
    const showDataBtn = document.querySelector('#show-data-btn')

    getOneCheckboxAtATime()
    toggleAllCheckboxes()

    showDataBtn.addEventListener('click', () => {
        countriesToRender = countries.filter(country => selectedCountries.includes(country.name.common))

        countriesToRender.sort((a, b) => a.name.common.localeCompare(b.name.common))

        tabButtons.forEach(tab => {
            if (tab.id === 'country-tab' && tab.className === 'tab-btn active') {
                renderCountryTable(countriesToRender)

            } else if (tab.id === 'region-tab' && tab.className === 'tab-btn active') {
                renderRegionTable(countriesToRender)

            } else if (tab.id === 'coin-tab' && tab.className === 'tab-btn active') {

            }
        })

        const populationData = sumAndAvgOfPopulation(countriesToRender)
        console.log(populationData);
        
        renderPopulationCards(populationData)
       
    })
}


const table = document.querySelector('.data-table')

function renderCountryTableRows(country) {

    const tableRegularRow = document.createElement('tr')
    tableRegularRow.className = 'regular-row'

    const countryNameCell = document.createElement('td')
    countryNameCell.innerText = country.name.common

    const NumberOfCitizensCell = document.createElement('td')
    NumberOfCitizensCell.innerText = country.population

    const coinCell = document.createElement('td')
    if (country.currencies && Object.keys(country.currencies).length > 0) {
        const currencyKeys = Object.keys(country.currencies)
        const firstKey = currencyKeys[0]
        const currncy = country.currencies[firstKey]
        coinCell.innerText = `${currncy.name} (${currncy.symbol})`
    } else {
        coinCell.innerText = 'N/A'
    }


    tableRegularRow.append(countryNameCell, NumberOfCitizensCell, coinCell)

    return tableRegularRow

}

function renderCountryTable(countriesToRender) {
    table.innerHTML = ''

    const tableHeaderRow = document.createElement('tr')
    tableHeaderRow.className = 'headers-row'

    const countryNameHeaderCell = document.createElement('th')
    countryNameHeaderCell.innerText = 'Country Name'

    const NumberOfCitizensHeaderCell = document.createElement('th')
    NumberOfCitizensHeaderCell.innerText = 'Number of citizens'

    const coinHeaderCell = document.createElement('th')
    coinHeaderCell.innerText = 'Coin Used In Country'

    tableHeaderRow.append(countryNameHeaderCell, NumberOfCitizensHeaderCell, coinHeaderCell)
    table.append(tableHeaderRow)

    countriesToRender.forEach(country => {
        const tableRegulaRow = renderCountryTableRows(country)
        table.append(tableRegulaRow)
    })
}

function renderRegionTableRows(region, count) {

    const tableRegularRow = document.createElement('tr')
    tableRegularRow.className = 'regular-row'

    const regionCell = document.createElement('td')
    regionCell.innerText = region

    const NumberOfCitizensCell = document.createElement('td')
    NumberOfCitizensCell.innerText = count

    tableRegularRow.append(regionCell, NumberOfCitizensCell)

    return tableRegularRow
}


function renderRegionTable(countriesToRender) {
    table.innerHTML = ''

    const countryByRegion = sumCountriesByRegion(countriesToRender)

    const tableHeaderRow = document.createElement('tr')
    tableHeaderRow.className = 'headers-row'

    const regionHeaderCell = document.createElement('th')
    regionHeaderCell.innerText = 'Region'

    const NumberOfCountriesHeaderCell = document.createElement('th')
    NumberOfCountriesHeaderCell.innerText = 'Number of countries'

    tableHeaderRow.append(regionHeaderCell, NumberOfCountriesHeaderCell)
    table.append(tableHeaderRow)

    Object.entries(countryByRegion).forEach(([region, count]) => {
        const regionCell = renderRegionTableRows(region, count)
        table.append(regionCell)
    })

}



const tabButtons = document.querySelectorAll('.tab-btn')



tabButtons.forEach(tab => {
    tab.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'))

        tab.classList.add('active')

        if (tab.id === 'country-tab') {
            renderCountryTable(countriesToRender)

        } else if (tab.id === 'region-tab') {
            renderRegionTable(countriesToRender)

        } else if (tab.id === 'coin-tab') {

        }
    })


})

function sumCountriesByRegion(countriesToRender) {

    const countryByRegion = countriesToRender.reduce((acc, country) => {
        acc[country.region] = (acc[country.region] || 0) + 1
        return acc
    }, {})

    return countryByRegion
}

function sumAndAvgOfPopulation(countriesToRender){

    const populationData = countriesToRender.reduce((acc, country) => {

        acc.totalPopulation += country.population,
        acc.amountOfCountries += 1

        return acc

    }, {amountOfCountries: 0, totalPopulation: 0})

    populationData.populationAverage = populationData.totalPopulation / populationData.amountOfCountries

    return populationData
}

function renderPopulationCards(populationData){

    const totalCountriesPopulationValue = document.querySelector('#total-countries-population-value')
    const averagePopulation = document.querySelector('#average-population-value')

    totalCountriesPopulationValue.innerText = populationData.totalPopulation
    averagePopulation.innerText = populationData.populationAverage
}

 