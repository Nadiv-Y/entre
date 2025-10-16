function fetchAndRender(url, searchTerm = "") {
  $.get(url, (data) => {
    if (!data || !data.length) {
      resetTables()
      return
    }

    // Filter results if searchTerm is provided
    if (searchTerm) {
      data = data.filter((c) => c.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
      if (!data.length) {
        resetTables()
        return
      }
    }

    // Sort countries by population descending
    data.sort((a, b) => b.population - a.population)

    // Summary statistics
    const totalCountries = data.length
    const totalPopulation = data.reduce((sum, c) => sum + (c.population || 0), 0)
    const avgPopulation = Math.round(totalPopulation / totalCountries)

    $("#totalCountries").text(totalCountries)
    $("#totalPopulation").text(totalPopulation.toLocaleString())
    $("#avgPopulation").text(avgPopulation.toLocaleString())

    // Build countries table
    let countriesRows = ""
    const regionCount = {}
    const currencyCount = {}

    data.forEach((c) => {
      countriesRows += `<tr><td>${c.name.common}</td><td>${c.population.toLocaleString()}</td></tr>`

      const region = c.region || "Other"
      regionCount[region] = (regionCount[region] || 0) + 1

      if (c.currencies) {
        Object.keys(c.currencies).forEach((cur) => {
          currencyCount[cur] = (currencyCount[cur] || 0) + 1
        })
      }
    })

    $("#countriesTable tbody").html(countriesRows)

    // Build regions table
    const sortedRegions = Object.entries(regionCount).sort((a, b) => b[1] - a[1])
    let regionsRows = ""
    sortedRegions.forEach(([region, count]) => {
      regionsRows += `<tr><td>${region}</td><td>${count}</td></tr>`
    })
    $("#regionsTable tbody").html(regionsRows)

    // Build currencies table
    const sortedCurrencies = Object.entries(currencyCount).sort((a, b) => b[1] - a[1])
    let currenciesRows = ""
    sortedCurrencies.forEach(([cur, count]) => {
      currenciesRows += `<tr><td>${cur}</td><td>${count}</td></tr>`
    })
    $("#currenciesTable tbody").html(currenciesRows)
  })
}

// Fetch all countries
$("#allBtn").on("click", function () {
  fetchAndRender("https://restcountries.com/v3.1/all?fields=name,population,region,currencies")
})

// Search by input
$("#searchBtn").on("click", function () {
  const country = $("#searchInput").val().trim()
  if (!country) {
    resetTables()
    return
  }
  fetchAndRender(`https://restcountries.com/v3.1/name/${country}?fields=name,population,region,currencies`, country)
})

// Reset all tables and stats
function resetTables() {
  $("#countriesTable tbody").empty()
  $("#regionsTable tbody").empty()
  $("#currenciesTable tbody").empty()
  $("#totalCountries").text("0")
  $("#totalPopulation").text("0")
  $("#avgPopulation").text("0")
}
