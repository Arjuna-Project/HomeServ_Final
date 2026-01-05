document.addEventListener("DOMContentLoaded", async () => {
  const professionalId = localStorage.getItem("professional_id");

  if (!professionalId) {
    window.location.href = "professional_login.html";
    return;
  }

  try {
    const res = await fetch(
      `${window.API_BASE}/professionals/dashboard/${professionalId}`
    );

    if (!res.ok) throw new Error();

    const data = await res.json();

    const pending = document.getElementById("pendingJobs");
    const completed = document.getElementById("completedJobs");
    const earnings = document.getElementById("totalEarnings");

    if (pending) pending.textContent = data.pending_jobs;
    if (completed) completed.textContent = data.completed_jobs;
    if (earnings) earnings.textContent = `₹ ${data.total_earnings}`;

  } catch (err) {}

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("professional_id");
      localStorage.removeItem("professional_name");
      window.location.href = "professional_login.html";
    });
  }
});
