function clearData() {
  if (confirm("Are you sure you want to delete all student and attendance records?")) {
    localStorage.clear();
    alert("All records deleted successfully!");
    location.reload(); // reloads index.html
  }
}
