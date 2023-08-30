let form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let url = "http://localhost:8085/api/v4/registerUser";

  let name = document.getElementById("formName").value;

  let mobileNumber = document.getElementById("formMobile").value;

  let password = document.getElementById("InputPassword").value;
  let confirmPassword = document.getElementById("InputConfirmPassword").value; 

  let email = document.getElementById("InputEmail").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match. Please confirm your password.");
    return; // Prevent submission if passwords don't match
  }

  let customerDetails = {
    name: name,
    mobileNo: mobileNumber,
    password,
    email: email,
  };

  let data = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(customerDetails),
  });

  let data1 = await data.json();

  console.log(data1);

  if (!data1.errorMsg) {
    alert(
      "You have succefully registered. You are redirecting towards login page."
    );
    window.location.href = "../userLoginForm.html";
  } else {
    alert(data1.errorMsg);
  }
});
