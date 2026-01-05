document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("packagesGrid");

  if (!container) return;

  try {
    const res = await fetch(`${window.API_BASE}/packages/`);
    if (!res.ok) throw new Error();

    const packages = await res.json();
    container.innerHTML = "";

    if (packages.length === 0) {
      container.innerHTML = "<p>No packages available</p>";
      return;
    }

    packages.forEach(pkg => {
      const features = pkg.features
        ? pkg.features.split(",").map(f => f.trim())
        : [];

      const card = document.createElement("div");
      card.className = "package-card";

      card.innerHTML = `
        <div class="card-header">
          <h3>${pkg.name}</h3>
          <p>${pkg.description}</p>
        </div>
        <div class="price">
          ₹${pkg.price} <small>/${pkg.duration}</small>
        </div>
        <ul class="services-list">
          ${features.map(f => `<li>${f}</li>`).join("")}
        </ul>
        <button class="btn-subscribe">Subscribe Now</button>
      `;

      card.querySelector(".btn-subscribe").addEventListener("click", () => {
        localStorage.setItem(
          "selectedPackage",
          JSON.stringify({
            package_id: pkg.package_id,
            name: pkg.name,
            price: pkg.price,
            duration: pkg.duration
          })
        );

        localStorage.removeItem("bookingType");
        localStorage.removeItem("selectedService");
        localStorage.removeItem("selectedProfessional");
        localStorage.removeItem("bookingDate");
        localStorage.removeItem("bookingTime");

        window.location.href = "../pages/details.html";
      });

      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = "<p>Unable to load packages</p>";
  }
});
