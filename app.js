const sheetURL = "https://docs.google.com/spreadsheets/d/121czIj8ktNbQZpiCwjMY0slvIzlItVmHwluf_OWkn_c/export?format=csv";

function login() {
  const pin = document.getElementById("pin").value;
  if (pin === "1234") {
    document.getElementById("login").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadData();
  } else {
    alert("Wrong PIN");
  }
}

async function loadData() {
  const res = await fetch(sheetURL);
  const text = await res.text();

  const rows = text.split("\n").slice(1);
  const data = rows.map(r => r.split(","));

  const last = data[data.length - 1];

  document.getElementById("weight").innerText = last[0];
  document.getElementById("temp").innerText = last[1];
  document.getElementById("humidity").innerText = last[2];

  drawChart(data);
}

function drawChart(data) {
  const labels = data.map((_, i) => i);

  const tempData = data.map(d => d[1]);
  const humidityData = data.map(d => d[2]);

  new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        { label: "Temperature", data: tempData },
        { label: "Humidity", data: humidityData }
      ]
    }
  });
}

function generateQR() {
  const qrData = `
    Weight: ${document.getElementById("weight").innerText}
    Temp: ${document.getElementById("temp").innerText}
    Humidity: ${document.getElementById("humidity").innerText}
  `;

  document.getElementById("qr").innerText = qrData;
}

// Google Map
function initMap() {
  const location = { lat: -17.8292, lng: 31.0522 }; // Harare example

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: location
  });

  new google.maps.Marker({
    position: location,
    map: map
  });
}
