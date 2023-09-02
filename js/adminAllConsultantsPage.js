////////////////////////////////check user is login or not/////////////////

let uuid = localStorage.getItem("uuidkey");

import loginORNot from "../components/checkUserLoginOrNot.js";

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////

// get all consultants's present in database

let cardArea = document.getElementById("cardArea");

////////////////adding navbar//////////////////

import navbar from "../components/adminNavbar.js";

let navabar = document.getElementById("navabar");

navabar.innerHTML = navbar;

/////////////////end of adding navbar///////////

let getAllConsultants = async () => {
  let url = `http://localhost:8085/api/v2/getValidInValidConsultants?key=${uuid}`;

  let ConsultantsDetails = await fetch(url);

  let data = await ConsultantsDetails.json();



  renderConsultantsDetails(data);
};

getAllConsultants();



let renderConsultantsDetails = (data) => {
  let consultantTableBody = document.getElementById("consultantTableBody");
  consultantTableBody.innerHTML = ""; 

  data.forEach((consultant) => {
    let row = document.createElement("tr");
    let actionsCell = document.createElement("td");
    let actionButton = document.createElement("button");
    actionButton.className = "btn";
    actionButton.className = "btn custom-btn";
    
    if (consultant.validConsultant) {
      actionButton.className += " btn-danger";
      actionButton.textContent = "Revoke Permission";
    } else {
      actionButton.className += " btn-primary";
      actionButton.textContent = "Grant Permission";
    }

    actionButton.addEventListener("click", () => givePermissionOrRevokPermission(consultant));
    actionsCell.appendChild(actionButton);

    row.innerHTML = `
      <td>${consultant.name}</td>
      <td>${consultant.experience}</td>
      <td>${consultant.specialty}</td>
      <td>${consultant.email}</td>
      <td>${consultant.mobileNo}</td>
      <td>${consultant.appointmentFromTime}</td>
      <td>${consultant.appointmentToTime}</td>
    `;
    row.appendChild(actionsCell);
    consultantTableBody.appendChild(row);
  });
};



let addEventToButton = (bookAppointment, data) => {
  bookAppointment.forEach((eachButton, index) => {
    eachButton.addEventListener("click", (event) => {
      // let confirmation = confirm("Are you sure to ")
      let consultantData = data[index];

      console.log(consultantData);

      givePermissionOrRevokPermission(consultantData);
    });
  });
};

let givePermissionOrRevokPermission = async (consultantData) => {
  if (consultantData.validConsultant == false) {
    let confirmation = confirm("Are you sure to grant permission?");

    if (confirmation == true) {
      const url = `http://localhost:8085/api/v2/grantPermission?key=${uuid}`;
      let data = await fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(consultantData),
      });

      data = await data.json();

      if (data.errorMsg != undefined) {
        alert(data.errorMsg);
      } else {
        alert("Permission Granted");
        window.location.reload();
      }
    }
  } else {
    let confirmation = confirm("Are you sure to revoke permission?");

    if (confirmation == true) {
      const url = `http://localhost:8085/api/v2/revokePermission?key=${uuid}`;
      let data = await fetch(url, {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(consultantData),
      });

      data = await data.json();

      if (data.errorMsg != undefined) {
        alert(data.errorMsg);
      } else {
        alert("Permission Revoke");
        window.location.reload();
      }
    }
  }
};
