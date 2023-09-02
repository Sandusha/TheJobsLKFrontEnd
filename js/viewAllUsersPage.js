////////////////////////////////check user is login or not/////////////////

let uuid = localStorage.getItem("uuidkey");

import loginORNot from "../components/checkUserLoginOrNot.js";

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////


////////////////adding navbar//////////////////

import navbar from "../components/adminNavbar.js";

let navabar = document.getElementById("navabar");

navabar.innerHTML = navbar;
/////////////////end of adding navbar///////////


fetch(`http://localhost:8085/api/v2/getUsers?key=${uuid}`)
  .then(response => response.json())
  .then(data => {
    

    let table = createTable(data);

    let tableContainer = document.getElementById("tableContainer");
    tableContainer.appendChild(table);
  })
  .catch(error => {
    console.error("Error fetching user data:", error);
  });


  function createTable(data) {
    let table = document.createElement("table");
    table.className = "table table-striped table-bordered table-dark table-responsive"; 
  

    let headerRow = document.createElement("tr");
    let headerColumns = ["User ID", "Name", "Mobile Number", "Email", "Type"];
    headerColumns.forEach(column => {
      let th = document.createElement("th");
      th.textContent = column;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
  
 
    data.forEach(user => {
      let row = document.createElement("tr");
      row.className = "table-row"; 
      let columns = ["userId", "name", "mobileNo", "email", "type"];
      columns.forEach(columnName => {
        let td = document.createElement("td");
        td.textContent = user[columnName];
        row.appendChild(td);
      });
      table.appendChild(row);
    });
  
    return table;
  }
  
  