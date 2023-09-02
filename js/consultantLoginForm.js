let form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let url = "http://localhost:8085/api/v1/loginConsultant";

  let mobile = document.getElementById("formMobile").value;

  let password = document.getElementById("formPassword").value;

  let ConsultantDeatils = {
    mobileNo: mobile,
    password: password,
  };

  let data = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(ConsultantDeatils),
  });

  let data1 = await data.json();

  let uuidKey = data1.uuid;

  localStorage.setItem("uuidkey", uuidKey);

  if (uuidKey != undefined) {
    localStorage.setItem("uuidkey", uuidKey);
    let type = await checkUserOrAdmin(uuidKey);

    window.location.href = "../consultantHomePage.html";
  } else {
    alert(data1.errorMsg);
  }
});

let checkUserOrAdmin = async (uuid) => {
  let url = `http://localhost:8085//api//v4//UserDetails?key=${uuid}`;
  let userDeatils = await fetch(url);

  userDeatils = await userDeatils.json();

  if (userDeatils.type == "user") {
    return "user";
  } else {
    return "admin";
  }
};
