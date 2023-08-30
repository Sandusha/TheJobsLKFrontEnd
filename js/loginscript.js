let userbtn = document.getElementById("userbtn");
let consultantbtn = document.getElementById("consultantbtn");

userbtn.addEventListener("click", (event) => {
  window.location.href = "./userLoginForm.html";
});

consultantbtn.addEventListener("click", (event) => {
  window.location.href = "./consultantLoginForm.html";
});
