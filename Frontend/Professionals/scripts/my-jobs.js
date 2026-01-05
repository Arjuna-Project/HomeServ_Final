const professionalId = localStorage.getItem("professional_id");
if (!professionalId) {
  window.location.href = "professional_login.html";
}

fetch(`${API_BASE}/professionals/jobs/my-jobs/${professionalId}`)
  .then(res => res.json())
  .then(jobs => {
    const container = document.getElementById("myJobs");
    container.innerHTML = "";

    if (jobs.length === 0) {
      container.innerHTML = "<p>No jobs found</p>";
      return;
    }

    jobs.forEach(job => {
      const card = document.createElement("div");
      card.className = "job-card";

      card.innerHTML = `
        <h3>${job.service}</h3>
        <p><strong>User:</strong> ${job.user}</p>
        <p><strong>Type:</strong> ${job.booking_type}</p>
        <p><strong>Status:</strong> ${job.status}</p>
        <p><strong>Price:</strong> ₹ ${job.price}</p>

        ${
          job.status !== "completed"
            ? `<button class="btn-primary" onclick="completeJob(${job.booking_id})">
                 Complete Job
               </button>`
            : `<span class="badge success">Completed</span>`
        }
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error(err);
    alert("Failed to load jobs");
  });

function completeJob(bookingId) {
  fetch(`http://127.0.0.1:8000/bookings/${bookingId}/complete`, {
    method: "PUT"
  })
  .then(res => {
    if (!res.ok) throw new Error();
    location.reload();
  })
  .catch(() => alert("Failed to complete job"));
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // 🔥 THIS is the key line
    localStorage.removeItem("professional_id");

    // optional cleanup
    localStorage.removeItem("professional");

    // redirect to login
    window.location.href = "professional_login.html";
  });
}
