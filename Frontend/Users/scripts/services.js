const selectedArea = JSON.parse(localStorage.getItem("selectedArea"));

if (!selectedArea) {
  window.location.href = "../pages/area.html";
}

async function loadServices() {
  const grid = document.getElementById("servicesGrid");

  if (!grid) return;

  try {
    const res = await fetch(`${window.API_BASE}/services/`);

    if (!res.ok) {
      throw new Error();
    }

    const services = await res.json();
    grid.innerHTML = "";

    if (services.length === 0) {
      grid.innerHTML = "<p>No services available</p>";
      return;
    }

    services.forEach(service => {
      const card = document.createElement("div");
      card.className = "service-card";

      card.innerHTML = `
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <div class="price-badge">
          Starting from: <strong>₹${service.base_price}</strong>
        </div>
        <button class="btn-view">View Professionals</button>
      `;

      card.querySelector(".btn-view").addEventListener("click", () => {
        localStorage.setItem("selectedService", JSON.stringify(service));
        window.location.href = "../pages/professionals.html";
      });

      grid.appendChild(card);
    });

  } catch (err) {
    grid.innerHTML = "<p>Unable to load services</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadServices);
