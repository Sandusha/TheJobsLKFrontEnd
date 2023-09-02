////////////////////////////////check user is login or not/////////////////

let uuid = localStorage.getItem("uuidkey");

import loginORNot from "../components/checkUserLoginOrNot.js";

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////


////////////////adding navbar//////////////////

import navbar from "../components/adminNavbar.js";

let navbarContainer = document.getElementById("navabar"); // Corrected variable name

navbarContainer.innerHTML = navbar; // Used corrected variable name
/////////////////end of adding navbar///////////


fetch(`http://localhost:8085/api/v2/getAllAppointments?key=${uuid}`)
  .then(response => response.json())
  .then(data => {
    let table = createTable(data);

    let tableContainer = document.getElementById("tableContainer");
    tableContainer.appendChild(table);
  })
  .catch(error => {
    console.error("Error fetching appointment data:", error); // Updated error message
  });

function createTable(data) {
  let table = document.createElement("table");
  table.className = "table table-striped table-bordered table-dark table-responsive";

  let headerRow = document.createElement("tr");
  let headerColumns = ["Appointment ID", "Name", "Appointment Date and Time", "Consultant Name"]; // Updated column headers
  headerColumns.forEach(column => {
    let th = document.createElement("th");
    th.textContent = column;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  data.forEach(appointment => {
    let row = document.createElement("tr");
    row.className = "table-row"; 
    let columns = ["appointmentId", "user", "appointmentDateAndTime", "consultant"]; // Updated variable names
    columns.forEach(columnName => {
      let td = document.createElement("td");
      if (columnName === "user") {
        td.textContent = appointment.user.name; // Extract user's name
      } else if (columnName === "consultant") {
        td.textContent = appointment.consultant.name; // Extract consultant's name
      } else {
        td.textContent = appointment[columnName];
      }
      row.appendChild(td);
    });
    table.appendChild(row);
  });

  return table;
}
