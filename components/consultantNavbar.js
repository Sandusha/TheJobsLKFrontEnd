let uuid = localStorage.getItem("uuidkey");

let consultantDeatils = JSON.parse(localStorage.getItem("consultantDeatils")) || null;

let getuserDetails = async () => {
  let url = `http://localhost:8085//api//v3//getConsultantDetails?key=${uuid}`;

  let data = await fetch(url);

  let finalData = await data.json();

  localStorage.setItem("consultantDeatils", JSON.stringify(finalData));
};

getuserDetails();

let html = () => { 
  return `<nav class="navbar navbar-expand-lg bg-black navbar-dark py-3 ">
  <div class="container">
  <a class="navbar-brand" href="#" > <img class=logo src="Img/logo.png" alt="" width="64" height="40"> </a> 
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
    <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="../consultantHomePage.html">Home</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="../consultantUpdateInfo.html">Update</a>
        </li>

        <li  class="d-flex">
          <a class="nav-link float-end " href="../ConsultantProfile.html"><b>Welcome ${consultantDeatils.name} </b></a>
        </li>
      </ul>
    </div>
  </div>
</nav>`;
};

export default html();
