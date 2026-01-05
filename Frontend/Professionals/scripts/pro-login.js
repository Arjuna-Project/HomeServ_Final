const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Email and password required");
    return;
  }

  const res = await fetch("https://homeserv-final-3.onrender.com/professionals/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    alert("Invalid credentials");
    return;
  }

  const data = await res.json();

  // save professional session
  localStorage.setItem("professional_id", data.professional_id);
  localStorage.setItem("professional_name", data.name);

  // redirect to dashboard
  window.location.href = "professional-dashboard.html";
});

function logout() {
  localStorage.clear();
  window.location.href = "professional_login.html";
}
