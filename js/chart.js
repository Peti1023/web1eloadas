document.addEventListener('DOMContentLoaded', function() {
  // Get references to the ChartJS-hez szükséges elemekhez
  const chartDataTable = document.getElementById('chartDataTable');
  const chartCanvas = document.getElementById('chartCanvas');

  // Chart.js vonaldiagram inicializálása
  let myChart = new Chart(chartCanvas, {
    type: 'line',
    data: {
      labels: ['1', '2', '3', '4', '5'], // Az 5 oszlopnak megfelelő címkék
      datasets: [{
        label: 'Row Data',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Minden sorhoz kattintási esemény hozzáadása a chartDataTable-ben.
  // Kattintáskor a sor celláiban lévő számokat használjuk a diagram adatainak beállítására.
  chartDataTable.querySelectorAll('tr').forEach(row => {
    row.addEventListener('click', function() {
      // Az extra szóközök eltávolítása a cellák szövegéből
      const rowData = Array.from(this.querySelectorAll('td')).map(td => Number(td.textContent.trim()));
      console.log("Kattintott sor adatai:", rowData);  // Debug: konzolra írja a számokat
      myChart.data.datasets[0].data = rowData;
      myChart.update();
    });
  });
});
