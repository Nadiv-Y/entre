(function () {
  var API = "https://restcountries.com/v3.1";

  var fields = "name,population,region,flags";

  var $form = $("#searchForm");
  var $q = $("#q");
  var $loadAll = $("#loadAll");
  var $loading = $("#loading");
  var $error = $("#error");
  var $area = $("#resultsArea");

  var $statCount = $("#statCount");
  var $statSum = $("#statSum");
  var $statAvg = $("#statAvg");

  var $countriesWrap = $("#countriesTableWrap");
  var $regionsWrap = $("#regionsTableWrap");

  var allCountries = null;

  function hasHebrew(str) {
    return /[\u0590-\u05FF]/.test(str);
  }

  function setLoading(on) {
    if (on) $loading.removeAttr("hidden");
    else $loading.attr("hidden", true);
  }
  function showError(msg) {
    $error.text(msg || "שגיאה לא צפויה").removeAttr("hidden");
  }
  function clearError() {
    $error.attr("hidden", true).text("");
  }

  function tableHTML(headers, rows) {
    var thead =
      "<thead><tr>" +
      headers
        .map(function (h) {
          return "<th>" + h + "</th>";
        })
        .join("") +
      "</tr></thead>";
    var body = rows
      .map(function (r) {
        return (
          "<tr>" +
          r
            .map(function (c) {
              return "<td>" + c + "</td>";
            })
            .join("") +
          "</tr>"
        );
      })
      .join("");
    return "<table>" + thead + "<tbody>" + body + "</tbody></table>";
  }

  function fmt(n) {
    return (n == null ? 0 : n).toLocaleString();
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function flagImg(country) {
    var png = country && country.flags && country.flags.png;
    var svg = country && country.flags && country.flags.svg;
    var alt =
      (country && country.flags && country.flags.alt) ||
      (country && country.name && country.name.common ? "דגל " + country.name.common : "דגל");
    var src = png || svg || "";
    if (!src) return '<span class="muted">—</span>';
    return '<img class="flag" src="' + src + '" alt="' + escapeHtml(alt) + '">';
  }

  function renderStats(list) {
    var count = list.length;
    var sum = 0;
    for (var i = 0; i < list.length; i++) sum += list[i].population || 0;
    var avg = count ? Math.round(sum / count) : 0;
    $statCount.text(fmt(count));
    $statSum.text(fmt(sum));
    $statAvg.text(fmt(avg));
  }

  function renderCountriesTable(list) {
    var copy = list.slice().sort(function (a, b) {
      return (b.population || 0) - (a.population || 0);
    });

    var rows = copy.map(function (c) {
      var name = c && c.name && c.name.common ? c.name.common : "(ללא שם)";
      return [
        '<div class="flag-cell">' + flagImg(c) + "</div>",
        '<div class="country-cell">' + escapeHtml(name) + "</div>",
        fmt(c.population || 0),
      ];
    });

    if (!rows.length) {
      rows = [['<span class="muted">—</span>', '<span class="muted">אין נתונים</span>', "—"]];
    }

    $countriesWrap.html(tableHTML(["דגל", "שם המדינה", "מספר תושבים"], rows));
  }

  function renderRegionsTable(list) {
    var tally = {};
    for (var i = 0; i < list.length; i++) {
      var r = list[i].region || "Unknown";
      tally[r] = (tally[r] || 0) + 1;
    }
    var entries = Object.keys(tally)
      .map(function (k) {
        return [k, tally[k]];
      })
      .sort(function (a, b) {
        return b[1] - a[1];
      });

    var rows = entries.map(function (e) {
      return [e[0], fmt(e[1])];
    });
    if (!rows.length) rows = [['<span class="muted">אין נתונים</span>', "—"]];

    $regionsWrap.html(tableHTML(["יבשת", "מספר מדינות"], rows));
  }

  function renderAll(list) {
    $area.removeAttr("hidden");
    renderStats(list);
    renderCountriesTable(list);
    renderRegionsTable(list);
  }

  function fetchAll(cb) {
    setLoading(true);
    clearError();
    $.ajax({
      url: API + "/all",
      method: "GET",
      data: { fields: fields },
      dataType: "json",
    })
      .done(function (data) {
        if (Array.isArray(data)) {
          allCountries = data;
          renderAll(data);
          if (cb) cb(null, data);
        } else {
          allCountries = [];
          renderAll([]);
          if (cb) cb(null, []);
        }
      })
      .fail(function (xhr) {
        var msg =
          (xhr && xhr.responseJSON && xhr.responseJSON.message) || xhr.statusText || "שגיאה בקריאת הנתונים (all)";
        showError(msg);
        if (cb) cb(new Error(msg));
      })
      .always(function () {
        setLoading(false);
      });
  }

  function fetchByName(q) {
    setLoading(true);
    clearError();
    $.ajax({
      url: API + "/name/" + encodeURIComponent(q),
      method: "GET",
      data: { fields: fields },
      dataType: "json",
    })
      .done(function (data) {
        var term = ($q.val() || "").trim().toLowerCase();
        var list = Array.isArray(data) ? data : [];
        list = list.filter(function (c) {
          var nm = c && c.name && c.name.common ? c.name.common.toLowerCase() : "";
          return nm.indexOf(term) !== -1;
        });
        renderAll(list);
        if (!list.length) showError("לא נמצאו מדינות תואמות לחיפוש.");
      })
      .fail(function (xhr) {
        if (xhr && xhr.status === 404) {
          renderAll([]);
          showError("לא נמצאו מדינות תואמות לחיפוש.");
        } else {
          var msg =
            (xhr && xhr.responseJSON && xhr.responseJSON.message) || xhr.statusText || "שגיאה בקריאת הנתונים (name)";
          showError(msg);
        }
      })
      .always(function () {
        setLoading(false);
      });
  }

  $q.on("input", function () {
    var term = ($q.val() || "").trim();

    if (hasHebrew(term)) {
      showError("יש להזין אותיות באנגלית בלבד.");
      return;
    } else {
      clearError();
    }

    term = term.toLowerCase();

    if (!term) {
      $countriesWrap.empty();
      $regionsWrap.empty();
      $statCount.text("—");
      $statSum.text("—");
      $statAvg.text("—");
      return;
    }

    if (Array.isArray(allCountries) && allCountries.length) {
      var filtered = allCountries.filter(function (c) {
        var nm = c && c.name && c.name.common ? c.name.common.toLowerCase() : "";
        return nm.indexOf(term) !== -1;
      });
      renderAll(filtered);
    }
  });

  $loadAll.on("click", function () {
    fetchAll();
  });

  $form.on("submit", function (e) {
    e.preventDefault();
    var q = ($q.val() || "").trim();

    if (!q) {
      showError("יש להזין שם מדינה או חלק ממנו.");
      return;
    }
    if (hasHebrew(q)) {
      showError("יש להזין אותיות באנגלית בלבד.");
      return;
    }

    fetchByName(q);
  });
})();
