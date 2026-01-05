async function loadAreas() {
  const grid = document.getElementById("areasGrid");

  try {
    const res = await fetch(`${API_BASE}/areas/`);

    if (!res.ok) {
      throw new Error("Failed to fetch areas");
    }

    const areas = await res.json();
    grid.innerHTML = "";

    if (areas.length === 0) {
      grid.innerHTML = "<p>No areas available</p>";
      return;
    }

    areas.forEach(area => {
      const card = document.createElement("div");
      card.className = "area-card";

      const imageSrc = area.image_url
        ? area.image_url
        : "../assets/areas/default.jpg";

      card.innerHTML = `
        <img src="${imageSrc}" alt="${area.name}">
        <div class="area-info">
          <h3>${area.name}</h3>
          <p>
            City: <strong>${area.city}</strong><br>
            Pincode: <strong>${area.pincode}</strong>
          </p>
          <button class="btn-select">Select Area</button>
        </div>
      `;

      card.querySelector(".btn-select").addEventListener("click", () => {
        localStorage.setItem("selectedArea", JSON.stringify(area));
        window.location.href = "../pages/service.html";
      });

      grid.appendChild(card);
    });

  } catch (error) {
    console.error("Area load error:", error);
    grid.innerHTML = "<p>Unable to load areas. Try again later.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadAreas);
