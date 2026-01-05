const form = document.querySelector(".login-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) return;

    try {
      const res = await fetch(`${window.API_BASE}/professionals/login`, {
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

      localStorage.setItem("professional_id", data.professional_id);
      localStorage.setItem("professional_name", data.name);

      window.location.href = "professional-dashboard.html";

    } catch (err) {
      alert("Server error");
    }
  });
}
