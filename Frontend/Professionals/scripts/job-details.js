const professionalId = localStorage.getItem("professional_id");
if (!professionalId) location.href = "professional_login.html";

const params = new URLSearchParams(window.location.search);
const bookingId = params.get("booking_id");

fetch(`http://127.0.0.1:8000/professionals/jobs/details/${bookingId}?professional_id=${professionalId}`)
  .then(res => res.json())
  .then(job => {
    document.getElementById("service").innerText = job.details;
    document.getElementById("status").innerText = job.status;
    document.getElementById("scheduled").innerText = job.scheduled_at;
  });

function startJob() {
  fetch(`http://127.0.0.1:8000/bookings/${bookingId}/start`, {
    method: "PUT"
  }).then(() => location.reload());
}

function completeJob() {
  fetch(`http://127.0.0.1:8000/bookings/${bookingId}/complete`, {
    method: "PUT"
  }).then(() => location.reload());
}

function logout() {
  localStorage.clear();
  window.location.href = "professional_login.html";
}
