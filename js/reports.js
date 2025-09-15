let attendance = JSON.parse(localStorage.getItem("attendance")) || {};

function renderReports() {
  const table = document.getElementById("reportsTable");
  table.innerHTML = "";
  for (const [date, record] of Object.entries(attendance)) {
    for (const [student, status] of Object.entries(record)) {
      table.innerHTML += `
        <tr>
          <td>${date}</td>
          <td>${student}</td>
          <td>${status}</td>
        </tr>`;
    }
  }
}

renderReports();
