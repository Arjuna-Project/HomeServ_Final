const API_BASE = window.API_BASE;
const signupForm = document.querySelector(".signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  const payload = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("mobile").value,
    address: "Not provided",
    password: password
  };

  try {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.detail || "Signup failed");
      return;
    }

    alert("Signup successful. Please login.");
    window.location.href = "../pages/login.html";

  } catch (err) {
    alert("Server error");
  }
});
