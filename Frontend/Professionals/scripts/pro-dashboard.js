const professionalId = localStorage.getItem("professional_id");

if (!professionalId) {
  window.location.href = "professional_login.html";
}

fetch(`https://homeserv-final-3.onrender.com/professionals/dashboard/${professionalId}`)
  .then(res => {
    if (!res.ok) throw new Error("API error");
    return res.json();
  })
  .then(data => {
    document.getElementById("pendingJobs").innerText = data.pending_jobs;
    document.getElementById("completedJobs").innerText = data.completed_jobs;
    document.getElementById("totalEarnings").innerText = `₹ ${data.total_earnings}`;
  })
  .catch(err => {
    console.error(err);
    alert("Failed to load dashboard");
  });
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
