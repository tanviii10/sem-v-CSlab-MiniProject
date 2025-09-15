let students = JSON.parse(localStorage.getItem("students")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || {};

function renderSummary() {
  const table = document.getElementById("summaryTable");
  table.innerHTML = "";
  students.forEach(student => {
    let totalDays = 0, presentDays = 0;
    for (const record of Object.values(attendance)) {
      if (record[student]) {
        totalDays++;
        if (record[student] === "Present") presentDays++;
      }
    }
    let percentage = totalDays ? ((presentDays / totalDays) * 100).toFixed(2) : 0;
    table.innerHTML += `
      <tr>
        <td>${student}</td>
        <td>${totalDays}</td>
        <td>${presentDays}</td>
        <td>${percentage}%</td>
      </tr>`;
  });
}

renderSummary();
