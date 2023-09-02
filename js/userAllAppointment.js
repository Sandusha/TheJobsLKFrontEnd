////////////////////////////////check user is login or not/////////////////

let uuid = localStorage.getItem("uuidkey");

import loginORNot from "../components/checkUserLoginOrNot.js";

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////

////////////////adding navbar//////////////////

import navbar from "../components/userNavbar.js";

let navabar = document.getElementById("navabar");

navabar.innerHTML = navbar;
/////////////////end of adding navbar///////////

let allAppointmentArea = document.getElementById("AllAppointmentArea");

let allAppointmentData;

let getAllAppointment = async () => {
  let url = `http://localhost:8085/api/v4/allAppointment?key=${uuid}`;

  let data = await fetch(url);

  allAppointmentData = await data.json();

  let upcomingAppointment = filterAppointment(
    allAppointmentData,
    "upcommingAppointment"
  );

  displayAllAppointment(upcomingAppointment);
};

let displayAllAppointment = (allAppointmentData) => {
  allAppointmentArea.innerHTML = "";

  if (allAppointmentData.length == 0) {
    allAppointmentArea.style.width = "50%";
    allAppointmentArea.style.margin = "auto";

    let p = document.createElement("p");
    p.innerText = "No Upcoming Appointments. Book Your appointment now.";
    p.style.margin = "auto";
    p.style.color="aliceblue";

    allAppointmentArea.append(p);

    console.log("HI");

    return;
  }
  // neutral all properties

  allAppointmentArea.style.width = "";
  allAppointmentArea.style.margin = "";

  allAppointmentData.forEach((data) => {
    let html = "";

    if (data.filterType == "upcommingAppointment") {
      html = `
      <div class="card-container">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Appointment</h5>
      <p><strong>Date and Time:</strong> ${data.appointmentDateAndTime}</p>
      <p><strong>Consultant Name:</strong> ${data.consultant.name}</p>
      <p><strong>Consultant Experience:</strong> ${data.consultant.experience}</p>
      <p><strong>Consultant Email:</strong> ${data.consultant.email}</p>
      <p><strong>Consultant Specialty:</strong> ${data.consultant.specialty}</p>
      <p><strong>Consultant Contact:</strong> ${data.consultant.mobileNo}</p>
             <a id="disable" class="btn btn-danger deleteAppointmentButton">Cancel Appointment</a>
          </div>
      </div>`;
    } else {
      html = `
      <div class="card-container">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Appointment</h5>
          <p><strong>Date and Time:</strong> ${data.appointmentDateAndTime}</p>
          <p><strong>Consultant Name:</strong> ${data.consultant.name}</p>
          <p><strong>Consultant Experience:</strong> ${data.consultant.experience}</p>
          <p><strong>Consultant Email:</strong> ${data.consultant.email}</p>
          <p><strong>Consultant Specialty:</strong> ${data.consultant.specialty}</p>
          <p><strong>Consultant Contact:</strong> ${data.consultant.mobileNo}</p>
          </div>    
            </div>
        </div>`;
    }

    allAppointmentArea.innerHTML += html;
  });

  // upcomming appointment

  let upcommingAppointmentButton = document.getElementsByClassName(
    "upcommingAppointmentButton"
  );

 

  // past Appointment

  let pastAppoinmentButton = document.getElementsByClassName(
    "pastAppoinmentButton"
  );

  pastAppoinmentButton = [...pastAppoinmentButton];

  pastAppoinmentButton.forEach((eachAppointment, index) => {
    eachAppointment.addEventListener("click", (event) => {
      setObjectForReview(allAppointmentData[index]);
     
    });
  });

  // delete appointment

  let deleteAppointmentButton = document.getElementsByClassName(
    "deleteAppointmentButton"
  );

  deleteAppointmentButton = [...deleteAppointmentButton];

  deleteAppointmentButton.forEach((eachAppointment, index) => {
    eachAppointment.addEventListener("click", async (event) => {
      let result = confirm("Are you sure you want to cancel appointment?");

      if (result) {
        let url = `http://localhost:8085//api//v4//cancelappointment?key=${uuid}`;

        let data = await fetch(url, {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(allAppointmentData[index]),
        });

        data = await data.json();

        console.log(data);

        getAllAppointment();
      }

     
    });
  });
};

getAllAppointment();

// get past appointment and upcomming appointment

let appointmentFilter = document.getElementById("appointmentFilter");

appointmentFilter.addEventListener("change", (event) => {
  let filterValue = appointmentFilter.value;

  let pastAppointments = filterAppointment(allAppointmentData, filterValue);

  displayAllAppointment(pastAppointments);
});

let filterAppointment = (data, filterValue) => {
  let presentDate = new Date(); // get the current date and time
  presentDate = new Date(presentDate.getTime() + 60 * 60 * 1000); // add 1 hour in milliseconds

  let filterData = [];

  data.forEach((eachAppointment) => {
    const date = new Date(eachAppointment.appointmentDateAndTime);
    if (filterValue == "upcommingAppointment") {
      if (presentDate < date) {
        filterData.push(eachAppointment);
        eachAppointment.filterType = filterValue;
      }
    } else {
      if (presentDate > date) {
        filterData.push(eachAppointment);
        eachAppointment.filterType = filterValue;
      }
    }
  });

  return filterData;
};


