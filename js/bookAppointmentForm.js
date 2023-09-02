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

// get available timing of perticular consultant

let consultantDetails =
  JSON.parse(window.localStorage.getItem("consultantData")) || null;

let getAvailableTiming = async () => {
  let url = `http://localhost:8085/api/v4/availableTiming?key=${uuid}`;

  let timing = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(consultantDetails),
  });

  let finalTiming = await timing.json();

  console.log(finalTiming);

  displayAllTiming(finalTiming);
};

getAvailableTiming();

let displayAllTiming = async (finalTiming) => {
  let allTiming = document.getElementById("allTiming");

  finalTiming.forEach((element) => {
    let newDiv = document.createElement("div");

    let para = document.createElement("p");

    para.setAttribute("class", "display-6");

    para.innerText = element;

    newDiv.style.cursor = "pointer";
    newDiv.setAttribute("class", "allTimings");
    newDiv.append(para);

    allTiming.append(newDiv);
  });

  let allTimings = document.getElementsByClassName("allTimings");
  getUserTiming(allTimings);
};

let getUserTiming = (allTimings) => {
  let allTimingsInArray = [...allTimings];

  allTimingsInArray.forEach((eachTiming) => {
    eachTiming.addEventListener("click", (event) => {
      let confirm = window.confirm(
        `Are you sure you want to book appointment on ${eachTiming.innerText} with consultant ${consultantDetails.name}`
      );

      if (confirm) {
        bookAppointmentFinally(eachTiming);
        // window.location.reload();
      }
    });
  });
};

let bookAppointmentFinally = async (eachTiming) => {
  let url = `http://localhost:8085/api/v4/bookAppointment?key=${uuid}`;

  let clientDate = {};

  clientDate.appointmentDateAndTime = eachTiming.innerText;
  clientDate.consultant = consultantDetails;

  let finalData = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(clientDate),
  });

  console.log(finalData);

  let data = await finalData.json();

  console.log(data);

  if (data.errorMsg != undefined) {
    alert(data.errorMsg);
  } else {
    alert(
      `Your appointment booked successfully. ` +
        `Your appointment id ${data.appointmentId}, consultant name is ${data.consultant.name} at ${eachTiming.innerText}`
    );

    window.location.reload();
  }
};
