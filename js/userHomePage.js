////////////////////////////////check user is login or not/////////////////

let uuid = localStorage.getItem("uuidkey");

import loginORNot from "../components/checkUserLoginOrNot.js";

loginORNot();

///////////////////////////////////////end of check user is login or not //////////////////

// get all consultants's present in database

let cardArea = document.getElementById("cardArea");

////////////////adding navbar//////////////////

import navbar from "../components/userNavbar.js";

let navabar = document.getElementById("navabar");

navabar.innerHTML = navbar;
/////////////////end of adding navbar///////////

let getAllConsultants = async () => {
  let url = `http://localhost:8085//api//v4//getAllConsultants?key=${uuid}`;
  let consultantssDetails = await fetch(url);
  let data = await consultantssDetails.json();
  renderConsultantsDetails(data);
};

getAllConsultants();

let renderConsultantsDetails = (data) => {
  const validConsultants = data.filter((consultant) => consultant.validConsultant);

  validConsultants.forEach((consultant, index) => {
    let card = `
    <div class="card-container">
    <div class="card style="width: 18rem;">
      <div class="card-body">
        <h3 class="card-title">${consultant.name}</h3>
        <p class="card-text">
        <p><strong>Experience:</strong> ${consultant.experience}</p>
        <p><strong>Specialty:</strong> ${consultant.specialty}</p>
        <p><strong>Email:</strong> ${consultant.email}</p>
        <p><strong>Contact Number:</strong> ${consultant.mobileNo}</p>
        <p><strong>Available from:</strong> ${consultant.appointmentFromTime} (24 hours)</p>
        <p><strong>Available to:</strong> ${consultant.appointmentToTime} (24 hours)</p>
        </p>

       <div class = "rating">

          <p class="card-text"><strong> Consultant Rating</strong></p>
        
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
           

       </div>

        <button type="button" class="btn btn-primary bookAppointment">Book Appointment</button>
      </div>
      </div>
    </div>
  `;

  cardArea.innerHTML += card;
});

let bookAppointment = document.querySelectorAll(".bookAppointment");

addEventToButton(bookAppointment, validConsultants);
};




let addEventToButton = (bookAppointment, validConsultants) => {
  bookAppointment.forEach((eachButton, index) => {
    eachButton.addEventListener("click", (event) => {
      console.log(validConsultants[index]);

      let consultantsDetailsData = validConsultants[index];

      localStorage.setItem("consultantData", JSON.stringify(consultantsDetailsData));
      window.location.href = "../bookAppointmentForm.html";
    });
  });
};
