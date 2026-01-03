const professionalId = localStorage.getItem("professional_id");

if (!professionalId) {
  window.location.href = "professional_login.html";
}

fetch(`http://127.0.0.1:8000/professionals/dashboard/${professionalId}`)
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
