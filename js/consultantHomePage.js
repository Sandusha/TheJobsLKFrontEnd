////////////////////////////////check user is login or not/////////////////

let uuid = localStorage.getItem("uuidkey");

import loginORNot from "../components/checkUserLoginOrNot.js";

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////

////////////////adding navbar//////////////////

import navbar from "../components/consultantNavbar.js";

let navabar = document.getElementById("navabar");

navabar.innerHTML = navbar;
/////////////////end of adding navbar///////////

let allAppointmentArea = document.getElementById("AllAppointmentArea");

let getUpcommingAppointment = async () => {
  let url = `http://localhost:8085/api/v3/upcomingAppointments?key=${uuid}`;

  let data = await fetch(url);

  let upcomingAppointment = await data.json();

  displayAllAppointment(upcomingAppointment, "upcommingAppointment");
};

let getPastAppointment = async () => {
  let url = `http://localhost:8085/api/v3/pastAppointments?key=${uuid}`;

  let data = await fetch(url);

  let pastAppointment = await data.json();

  displayAllAppointment(pastAppointment, "pastAppointment");
};

let displayAllAppointment = (allAppointmentData, filterValue) => {
  if (allAppointmentData.errorMsg != undefined) {
    console.log(allAppointmentData.errorMsg);
    return;
  }
  allAppointmentArea.innerHTML = "";

  if (allAppointmentData.length == 0) {
    allAppointmentArea.style.width = "50%";
    allAppointmentArea.style.margin = "auto";

    let p = document.createElement("p");
    p.innerText = "No Upcoming Appointments. Book Your appointment now.";
    p.style.margin = "auto";
    p.style.color="aliceblue";

    allAppointmentArea.append(p);

    console.log("No upcoming appointments");

    return;
  }

  allAppointmentArea.style.width = "";
  allAppointmentArea.style.margin = "";

  allAppointmentData.forEach((data) => {
    let html;

    if (filterValue == "upcommingAppointment") {
      html = ` 
      <div class="card-container">
      <div class="card">

          <div class="card-body">
              <h5 class="card-title">Appointment</h5>
              <p>Appointment Data and Time: ${data.appointmentDateAndTime}</p>
              <p> Name: ${data.user.name}</p>
              <p> Mobile Number: ${data.user.mobileNo}</p>
              <p> Email Address: ${data.user.email}</p>
          </div>
          </div>
      </div>`;
      
    } else {
      html = `
      <div class="card-container">
      <div class="card">

          <div class="card-body">
              <h5 class="card-title">Appointment</h5>
              <p>Appointment Data and Time: ${data.appointmentDateAndTime}</p>
              <p>Name: ${data.user.name}</p>
              <p>Mobile Number: ${data.user.mobileNo}</p>
              <p>Email Address: ${data.user.email}</p>
          </div>
          </div>
      </div>`;
    }

    allAppointmentArea.innerHTML += html;
  });


};

let appointmentFilter = document.getElementById("appointmentFilter");

appointmentFilter.addEventListener("change", (event) => {
  let value = appointmentFilter.value;

  if (value == "pastAppointment") {
    getPastAppointment();
  } else {
    getUpcommingAppointment();
  }
});

getUpcommingAppointment();
