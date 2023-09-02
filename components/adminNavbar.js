let uuid = localStorage.getItem("uuidkey");

let adminDeatils = JSON.parse(localStorage.getItem("adminDeatils")) || null;

let getUserDetails = async () => {
  let url = `http://localhost:8085//api//v4//UserDetails?key=${uuid}`;

  let data = await fetch(url);

  let finalData = await data.json();

  console.log(finalData);

  localStorage.setItem("adminDeatils", JSON.stringify(finalData));
};

getUserDetails();

let html = () => {
  return `<nav class="navbar navbar-expand-lg navbar-dark py-3 ">
  <div class="container">
    <a class="navbar-brand" href="#" > <img class=logo src="Img/logo.png" alt="" width="64" height="40"> </a> 
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="../adminHomePage.html">Home</a>
        </li>

        <li  class="d-flex">
          <a class="nav-link float-end " href="../adminAllConsultantsPage.html">All Consultants</a>
        </li>
        <li  class="d-flex">
        <a class="nav-link float-end " href="../viewAllUsersPage.html">View Users</a>
      </li>
      <li  class="d-flex">
      <a class="nav-link float-end " href="../viewAllAppointmentsPage.html">View Appointments</a>
    </li>
        <li  class="d-flex">
          <a class="nav-link float-end " href="../AdminProfile.html"><b>Welcome ${adminDeatils.name} Admin</b></a>
        </li>
      </ul>
    </div>
  </div>
</nav>`;
};

export default html();
