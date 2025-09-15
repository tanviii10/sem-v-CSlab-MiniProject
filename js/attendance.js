let students = JSON.parse(localStorage.getItem("students")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || {};

function renderAttendance() {
  const table = document.getElementById("attendanceTable");
  table.innerHTML = "";
  students.forEach((student, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${student}</td>
        <td>
          <button class="btn btn-success btn-sm" onclick="markAttendance('${student}','Present')">Present</button>
          <button class="btn btn-danger btn-sm" onclick="markAttendance('${student}','Absent')">Absent</button>
        </td>
      </tr>`;
  });
}

function markAttendance(student, status) {
  const date = document.getElementById("attendanceDate").value;
  if (!date) {
    alert("Please select a date!");
    return;
  }
  if (!attendance[date]) attendance[date] = {};
  attendance[date][student] = status;
}

function saveAttendance() {
  localStorage.setItem("attendance", JSON.stringify(attendance));
  alert("Attendance saved!");
}

renderAttendance();
