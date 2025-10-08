
let students = JSON.parse(localStorage.getItem("students")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || {};

// Main render function
function renderSummary() {
  const table = document.getElementById("summaryTable");
  table.innerHTML = "";

  if (students.length === 0) {
    table.innerHTML = `<tr><td colspan="4" class="text-muted">No student data available</td></tr>`;
    return;
  }

  let labels = [];
  let percentages = [];
  let colors = [];

  students.forEach(student => {
    let totalDays = 0, presentDays = 0;

    // Count attendance
    for (const record of Object.values(attendance)) {
      if (record[student]) {
        totalDays++;
        if (record[student] === "Present") presentDays++;
      }
    }

    // Calculate percentage
    let percentage = totalDays ? ((presentDays / totalDays) * 100).toFixed(2) : 0;
    let rowClass =
      percentage >= 75 ? "table-success" :
      percentage >= 50 ? "table-warning" : "table-danger";

    // Add to chart arrays
    labels.push(student);
    percentages.push(percentage);
    colors.push(
      percentage >= 75 ? "#28a745" :
      percentage >= 50 ? "#ffc107" : "#dc3545"
    );

    // Add to table
    table.innerHTML += `
      <tr class="${rowClass}">
        <td>${student}</td>
        <td>${totalDays}</td>
        <td>${presentDays}</td>
        <td>${percentage}%</td>
      </tr>`;
  });

  // Add chart container dynamically if not present
  addChartContainer();
  renderAttendanceChart(labels, percentages, colors);
}

// Function to create chart container if it doesn't exist
function addChartContainer() {
  if (!document.getElementById("attendanceChart")) {
    const chartSection = document.createElement("div");
    chartSection.className = "container my-5";
    chartSection.innerHTML = `
      <h4 class="text-center mb-4">Visual Attendance Overview</h4>
      <canvas id="attendanceChart" style="max-height: 400px;"></canvas>
    `;
    document.body.appendChild(chartSection);

    // Load Chart.js dynamically if not already loaded
    if (typeof Chart === "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js";
      script.onload = () => renderSummary();
      document.body.appendChild(script);
    }
  }
}

// Chart rendering
function renderAttendanceChart(labels, percentages, colors) {
  const ctx = document.getElementById("attendanceChart").getContext("2d");

  // Destroy old chart if it exists
  if (window.attendanceChartInstance) {
    window.attendanceChartInstance.destroy();
  }

  // Create new bar chart
  window.attendanceChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Attendance (%)",
        data: percentages,
        backgroundColor: colors,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Attendance Percentage by Student",
          font: { size: 16, weight: "bold" }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { stepSize: 10 }
        }
      }
    }
  });
}

// Initialize
renderSummary();
