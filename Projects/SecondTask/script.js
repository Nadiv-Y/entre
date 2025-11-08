function fetchAndRender(url, searchTerm = "") {
  $.get(url, (data) => {
    if (!data || !data.length) {
      resetTables()
      return
    }

    if (searchTerm) {
      data = data.filter((c) => c.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
      if (!data.length) {
        resetTables()
        return
      }
    }

    data.sort((a, b) => b.population - a.population)

    const totalCountries = data.length
    const totalPopulation = data.reduce((sum, c) => sum + (c.population || 0), 0)
    const avgPopulation = Math.round(totalPopulation / totalCountries)

    $("#totalCountries").text(totalCountries)
    $("#totalPopulation").text(totalPopulation.toLocaleString())
    $("#avgPopulation").text(avgPopulation.toLocaleString())

    // countries table
    let countriesRows = ""
    const regionCount = {}
    const currencyCount = {}

    data.forEach((c) => {
      countriesRows += tablecolumn(c.name.common, c.population.toLocaleString())

      const region = c.region || "Other"
      regionCount[region] = (regionCount[region] || 0) + 1

      if (c.currencies) {
        Object.keys(c.currencies).forEach((cur) => {
          currencyCount[cur] = (currencyCount[cur] || 0) + 1
        })
      }
    })

    $("#countriesTable tbody").html(countriesRows)

    //regions table
    const sortedRegions = Object.entries(regionCount).sort((a, b) => b[1] - a[1])
    let regionsRows = ""
    sortedRegions.forEach(([region, count]) => {
      regionsRows += tablecolumn(region, count)
    })
    $("#regionsTable tbody").html(regionsRows)

    //currencies table
    const sortedCurrencies = Object.entries(currencyCount).sort((a, b) => b[1] - a[1])
    let currenciesRows = ""
    sortedCurrencies.forEach(([cur, count]) => {
      currenciesRows += tablecolumn(cur, count)
    })
    $("#currenciesTable tbody").html(currenciesRows)
  })
}

$("#allBtn").on("click", function () {
  fetchAndRender("https://restcountries.com/v3.1/all?fields=name,population,region,currencies")
})

$("#searchBtn").on("click", function () {
  const country = $("#searchInput").val().trim()
  if (!country) {
    resetTables()
    return
  }
  fetchAndRender(`https://restcountries.com/v3.1/name/${country}?fields=name,population,region,currencies`, country)
})

function tablecolumn(key, value) {
  return `<tr><td>${key}</td><td>${value}</td></tr>`

}
function resetTables() {
  $("#countriesTable tbody").empty()
  $("#regionsTable tbody").empty()
  $("#currenciesTable tbody").empty()
  $("#totalCountries").text("0")
  $("#totalPopulation").text("0")
  $("#avgPopulation").text("0")
}
