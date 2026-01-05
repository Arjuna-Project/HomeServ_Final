document.addEventListener("DOMContentLoaded", async () => {
  const list = document.querySelector(".professionals-list");

  if (!list) return;

  const selectedArea = JSON.parse(localStorage.getItem("selectedArea"));
  const selectedService = JSON.parse(localStorage.getItem("selectedService"));

  if (!selectedArea || !selectedService) {
    list.innerHTML = "<p>Please select area and service</p>";
    return;
  }

  const areaId = Number(selectedArea.area_id);
  const serviceId = Number(selectedService.service_id);

  list.innerHTML = "<p>Loading professionals...</p>";

  try {
    const res = await fetch(
      `${window.API_BASE}/professionals/search?area_id=${areaId}&service_id=${serviceId}`
    );

    if (!res.ok) {
      throw new Error();
    }

    const professionals = await res.json();
    list.innerHTML = "";

    if (professionals.length === 0) {
      list.innerHTML = "<p>No professionals available</p>";
      return;
    }

    professionals.forEach(p => {
      const card = document.createElement("div");
      card.className = "pro-card";

      card.innerHTML = `
        <div class="pro-avatar">
          <div class="avatar-circle">${p.name.charAt(0)}</div>
        </div>
        <div class="pro-info">
          <h3>${p.name}</h3>
          <div class="pro-stats">
            <i class="fas fa-star"></i> ${p.rating ?? 0}
          </div>
          <p class="jobs">Verified Professional</p>
        </div>
        <button class="btn-book">Book Now</button>
      `;

      card.querySelector(".btn-book").addEventListener("click", () => {
        localStorage.setItem("selectedProfessional", JSON.stringify(p));
        window.location.href = "../pages/booking.html";
      });

      list.appendChild(card);
    });

  } catch (err) {
    list.innerHTML = "<p>Failed to load professionals</p>";
  }
});
