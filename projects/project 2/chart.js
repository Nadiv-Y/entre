window.onload = function () {
  console.log("Rendering chart with selectedCoins:", selectedCoins);

  //works great and understandable
  if (!selectedCoins || selectedCoins.length === 0) {
    $("#chartContainer").html("<p class='text-danger'>No coins selected!</p>");
    return;
  }

  $("#chartContainer").html("");

  var chart = {
    animationEnabled: true,
    title: {
      text: "Live Coin Prices (USD)",
    },
    axisX: {
      title: "Time",
      valueFormatString: "HH:mm:ss",
    },
    axisY: {
      title: "Price (USD)",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      itemclick: function (e) {
        e.dataSeries.visible = !e.dataSeries.visible;
        e.chart.render();
      },
    },
    data: selectedCoins.map((coin, i) => ({
      type: "line",
      showInLegend: true,
      name: coin.symbol,
      lineColor: getColor(i),
      dataPoints: [],
    })),
  };
  $("#chartContainer").CanvasJSChart(options);

  chart.render();
  
  if (liveReportInterval) clearInterval(liveReportInterval);

  liveReportInterval = setInterval(() => {
    const symbols = selectedCoins.map((coin) => coin.symbol).join(",");
    fetch(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbols}&tsyms=USD`
    )
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();
        chart.options.data.forEach((series, i) => {
          const coin = selectedCoins[i].symbol;
          const price = data[coin]?.USD;
          if (price) {
            series.dataPoints.push({ x: now, y: price });
            if (series.dataPoints.length > 30) {
              series.dataPoints.shift();
            }
          }
        });
        chart.render();
      });
  }, 2000);
};

function getColor(index) {
  const colors = ["#FF5733", "#33C3FF", "#28B463", "#AF7AC5", "#FFC300"];
  return colors[index % colors.length];
}
