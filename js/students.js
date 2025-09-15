let students = JSON.parse(localStorage.getItem("students")) || ["Aarav", "Riya", "Tanvi"];

function renderStudents() {
  const table = document.getElementById("studentTable");
  table.innerHTML = "";
  students.forEach((student, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${student}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeStudent(${index})">Remove</button></td>
      </tr>`;
  });
  localStorage.setItem("students", JSON.stringify(students));
}

function addStudent() {
  const name = document.getElementById("studentName").value.trim();
  if (name) {
    students.push(name);
    document.getElementById("studentName").value = "";
    renderStudents();
  }
}

function removeStudent(index) {
  students.splice(index, 1);
  renderStudents();
}

renderStudents();
