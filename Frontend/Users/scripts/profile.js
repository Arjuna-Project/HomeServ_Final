document.addEventListener("DOMContentLoaded", () => {
  console.log("PROFILE JS LOADED");

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User from storage:", user);

  if (!user) {
    console.log("No user found, redirecting");
    window.location.href = "../pages/login.html";
    return;
  }

  const nameInput = document.getElementById("profileName");
  const emailInput = document.getElementById("profileEmail");
  const avatar = document.getElementById("avatarInitial");

  if (nameInput) nameInput.value = user.name || "";
  if (emailInput) emailInput.value = user.email || "";
  if (avatar) avatar.textContent = user.name ? user.name[0].toUpperCase() : "U";

  const logoutBtn = document.getElementById("logoutBtn");
  console.log("Logout button:", logoutBtn);

  if (!logoutBtn) {
    console.error("Logout button not found in DOM");
    return;
  }

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    console.log("Logout clicked");

    const ok = confirm("Are you sure you want to logout?");
    if (!ok) return;

    localStorage.clear();
    console.log("LocalStorage cleared");

    window.location.href = "../pages/login.html";
  });
});
