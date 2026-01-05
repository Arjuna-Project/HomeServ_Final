document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "../pages/login.html";
    return;
  }

  const nameInput = document.getElementById("editName");
  const emailInput = document.getElementById("editEmail");
  const phoneInput = document.getElementById("editPhone");
  const passwordInput = document.getElementById("editPassword");
  const confirmInput = document.getElementById("editConfirmPassword");
  const form = document.getElementById("editProfileForm");

  if (nameInput) nameInput.value = user.name || "";
  if (emailInput) emailInput.value = user.email || "";
  if (phoneInput) phoneInput.value = user.phone || "";

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    if (password && password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const updatedUser = {
      ...user,
      name,
      email,
      phone
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.location.href = "../pages/profile.html";
  });
});
