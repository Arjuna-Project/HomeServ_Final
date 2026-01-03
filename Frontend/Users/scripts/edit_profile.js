document.addEventListener("DOMContentLoaded", () => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "../pages/login.html";
    return;
  }

  document.getElementById("editName").value = user.name || "";
  document.getElementById("editEmail").value = user.email || "";
  document.getElementById("editPhone").value = user.phone || "";

  const form = document.getElementById("editProfileForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("editName").value.trim();
    const email = document.getElementById("editEmail").value.trim();
    const phone = document.getElementById("editPhone").value.trim();
    const password = document.getElementById("editPassword").value;
    const confirmPassword = document.getElementById("editConfirmPassword").value;

    if (password && password !== confirmPassword) {
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

    alert("Profile updated successfully");

    window.location.href = "../pages/profile.html";
  });
});
