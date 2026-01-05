const signupForm = document.querySelector(".signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("mobile").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      name,
      email,
      phone,
      address: "Not provided",
      password
    };

    try {
      const res = await fetch(`${window.API_BASE}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
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
}
