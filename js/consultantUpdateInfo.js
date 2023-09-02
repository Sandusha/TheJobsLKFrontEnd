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


let profileDeatils = document.getElementById("profileDeatils");
let consProfile = JSON.parse(localStorage.getItem("consultantDeatils")) || null;

let displayProfile = () => {
  let appointmentFromTimeInput = createInput("text", consProfile.appointmentFromTime, "Begin Time:");
  let appointmentToTimeInput = createInput("text", consProfile.appointmentToTime, "End Time:");

  let updateButton = createButton("Update", "btn btn-success");

  profileDeatils.innerHTML = ""; 
  profileDeatils.append(
    appointmentFromTimeInput,
    appointmentToTimeInput,
    updateButton
  );

  updateButton.addEventListener("click", async (event) => {
    let updatedAppointmentFromTime = parseInt(appointmentFromTimeInput.querySelector("input").value, 10);
  let updatedAppointmentToTime = parseInt(appointmentToTimeInput.querySelector("input").value, 10);


  let requestData = {
    appointmentFromTime: updatedAppointmentFromTime,
    appointmentToTime: updatedAppointmentToTime
  };


  const url = `http://localhost:8085/api/v3/timeUpdate?key=${uuid}`;
  try {
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    });

    if (response.ok) {
   
      alert("Time updated successfully!");
      appointmentFromTimeInput.querySelector("input").value = updatedAppointmentFromTime;
        appointmentToTimeInput.querySelector("input").value = updatedAppointmentToTime;
    } else {
 
      alert("Error updating Times. Please try again.");
    }
  } catch (error) {
    console.error("Error updating times:", error);
    alert("An error occurred while updating values.");
  }
  });
};

function createInput(type, value, label) {
  let container = document.createElement("div");
  container.className = "form-group";

  let labelElement = document.createElement("label");
  labelElement.innerText = label;

  let input = document.createElement("input");
  input.className = "form-control";
  input.setAttribute("type", type);
  input.value = value;

  container.appendChild(labelElement);
  container.appendChild(input);

  return container;
}

function createButton(text, className) {
  let button = document.createElement("button");
  button.setAttribute("class", className);
  button.setAttribute("type", "button");
  button.innerText = text;
  return button;
}

displayProfile();