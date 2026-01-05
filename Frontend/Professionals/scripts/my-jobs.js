document.addEventListener("DOMContentLoaded", async () => {
  const professionalId = localStorage.getItem("professional_id");
  const container = document.getElementById("myJobs");

  if (!professionalId) {
    window.location.href = "professional_login.html";
    return;
  }

  if (!container) return;

  try {
    const res = await fetch(
      `${window.API_BASE}/professionals/jobs/my-jobs/${professionalId}`
    );

    if (!res.ok) throw new Error();

    const jobs = await res.json();
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
        <p><strong>Price:</strong> ₹${job.price}</p>
        ${
          job.status !== "completed"
            ? `<button class="btn-primary" data-id="${job.booking_id}">
                 Complete Job
               </button>`
            : `<span class="badge success">Completed</span>`
        }
      `;

      const btn = card.querySelector(".btn-primary");

      if (btn) {
        btn.addEventListener("click", async () => {
          try {
            const res = await fetch(
              `${window.API_BASE}/bookings/${job.booking_id}/complete`,
              { method: "PUT" }
            );

            if (!res.ok) return;
            window.location.reload();

          } catch (err) {}
        });
      }

      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = "<p>Failed to load jobs</p>";
  }
});
