document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "../pages/login.html";
    return;
  }

  const nameInput = document.getElementById("profileName");
  const emailInput = document.getElementById("profileEmail");
  const avatar = document.getElementById("avatarInitial");
  const logoutBtn = document.getElementById("logoutBtn");

  if (nameInput) nameInput.value = user.name || "";
  if (emailInput) emailInput.value = user.email || "";
  if (avatar) avatar.textContent = user.name ? user.name[0].toUpperCase() : "U";

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();
      window.location.href = "../pages/login.html";
    });
  }
});
