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


const formArea = document.getElementById('formArea');
const validateMobileNumber = mobileNo => {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobileNo);
};

const displayForm = () => {
  const form = document.createElement('form');
  form.id = 'form';
  form.classList.add('modern-form'); 

  const fields = [
    { id: 'name', label: 'Name', type: 'text', required: 'true'  },
    { id: 'specialty', label: 'Specialty', type: 'text', required: 'true'  },
    { id: 'experience', label: 'Experience', type: 'text', required: 'true'  },
    { id: 'appointmentFromTime', label: 'Appointment From Time', type: 'number' , required: 'true', min: '9', max: '18'  },
    { id: 'appointmentToTime', label: 'Appointment To Time', type: 'number', required: true, min: '9', max: '18' },
    { id: 'mobileNo', label: 'Mobile Number', type: 'number' , required: 'true'  },
    { id: 'password', label: 'Password', type: 'password', required: 'true', minlength: '8' },
    { id: 'email', label: 'Email', type: 'email', required: 'true', pattern: '^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' },
  ];

  fields.forEach(field => {
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('mb-3');

    const label = document.createElement('label');
    label.htmlFor = field.id;
    label.classList.add('form-label');
    label.textContent = field.label;

    const input = document.createElement('input');
    input.type = field.type;
    input.classList.add('form-control');
    input.id = field.id;

    inputGroup.appendChild(label);
    inputGroup.appendChild(input);
    form.appendChild(inputGroup);
    if (field.id === 'appointmentFromTime') {
      const footerNotice = document.createElement('small');
      footerNotice.classList.add('form-text', 'text-white');
      footerNotice.textContent = 'Enter a number between 9 and 18(24h auto generate)';
      inputGroup.appendChild(footerNotice);
    }
  });

  const submitButtonWrapper = document.createElement('div');
  submitButtonWrapper.classList.add('button-wrapper'); 
  
  const submitButton = document.createElement('button');
  submitButton.id = 'formButton';
  submitButton.type = 'submit';
  submitButton.classList.add('btn', 'btn-primary');
  submitButton.textContent = 'Register Consultant';
  
  submitButtonWrapper.appendChild(submitButton);
  form.appendChild(submitButtonWrapper);
  formArea.appendChild(form);

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const consultantDetails = fields.reduce((details, field) => {
      details[field.id] = document.getElementById(field.id).value;
      return details;
    }, {});

    const emptyFields = fields.filter(field => {
      return field.required && !consultantDetails[field.id];
    });

    if (emptyFields.length > 0) {
      alert('Please enter all details.');
      return;
    }

    if (!validateMobileNumber(consultantDetails.mobileNo)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    const emailPattern = new RegExp(fields.find(field => field.id === 'email').pattern);
    if (!emailPattern.test(consultantDetails.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    await sendConsultantDetails(consultantDetails);
  });


const sendConsultantDetails = async consultantDetails => {
  const url = `http://localhost:8085/api/v2/registerConsultant?key=${uuid}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consultantDetails),
    });

    const data = await response.json();

    if (data.errorMsg) {
      alert(data.errorMsg);
    } else {
      alert('Consultant successfully registered');
      resetInputFields(); 
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while registering the consultant.');
  }
};


const resetInputFields = () => {
  fields.forEach(fields => {
    document.getElementById(fields.id).value = '';
  });
};
};

displayForm();