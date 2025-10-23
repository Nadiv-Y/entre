$("#all-btn").click(function() {
    $.ajax({
        url: "https://restcountries.com/v3.1/all?fields=name,region,population",
        method: "GET",
        dataType: "json",
        success: function(data) {
            buildStatistics(data);
        },
        error: function() {
            alert("Error loading all countries");
        }
    });
});

$("#search-btn").click(function() {
    const name = $("#country-input").val();
    if (name == "") {
        alert("Please enter a country name");
        return;
    }

    $.ajax({
        url: "https://restcountries.com/v3.1/name/" + name + "?fields=name,region,population",
        method: "GET",
        dataType: "json",
        success: function(data) {
            buildStatistics(data);
        },
        error: function() {
            alert("No results for that name");
        }
    });

    $("#country-input").val("");
});

function buildStatistics(data) {
    $("#result-area").empty();


    const totalCountries = data.length;
    let totalPopulation = 0;


    const regions = {};

    let i;
    for (i = 0; i < data.length; i++) {
        const c = data[i];


        totalPopulation = totalPopulation + c.population;


        let r = c.region;
        if (!r || r === "") {
            r = "Unknown";
        }
        if (regions[r]) {
            regions[r] = regions[r] + 1;
        } else {
            regions[r] = 1;
        }
    }

    const avgPopulation = totalCountries > 0 ? Math.round(totalPopulation / totalCountries) : 0;


    const summaryDiv = $("<div></div>");
    summaryDiv.addClass("summary");
    summaryDiv.append("<p>Total countries result: " + totalCountries + "</p>");
    summaryDiv.append("<p>Total Countries Population: " + totalPopulation + "</p>");
    summaryDiv.append("<p>Average Population: " + avgPopulation + "</p>");


    const countriesBox = $("<div></div>");
    countriesBox.addClass("table-box");
    const countriesTable = $("<table></table>");
    const countriesHead = $("<thead><tr><th>Country Name</th><th>Population</th></tr></thead>");
    const countriesBody = $("<tbody></tbody>");

    for (i = 0; i < data.length; i++) {
        const row = $("<tr></tr>");
        row.append("<td>" + data[i].name.official + "</td>");
        row.append("<td>" + data[i].population + "</td>");
        countriesBody.append(row);
    }

    countriesTable.append(countriesHead);
    countriesTable.append(countriesBody);
    countriesBox.append(countriesTable);


    const regionsBox = $("<div></div>");
    regionsBox.addClass("table-box");
    const regionsTable = $("<table></table>");
    const regionsHead = $("<thead><tr><th>Region</th><th>Number of Countries</th></tr></thead>");
    const regionsBody = $("<tbody></tbody>");

    for (const key in regions) {
        const tr = $("<tr></tr>");
        tr.append("<td>" + key + "</td>");
        tr.append("<td>" + regions[key] + "</td>");
        regionsBody.append(tr);
    }

    regionsTable.append(regionsHead);
    regionsTable.append(regionsBody);
    regionsBox.append(regionsTable);


    $("#result-area").append(summaryDiv);
    $("#result-area").append(countriesBox);
    $("#result-area").append(regionsBox);
}