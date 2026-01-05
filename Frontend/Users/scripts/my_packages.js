document.addEventListener("DOMContentLoaded", async () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const list = document.getElementById("packagesList");

  if (!user) {
    list.innerHTML = "<p>Please login to view packages</p>";
    return;
  }

  try {
    const res = await fetch(
      `${API_BASE}/bookings/user/${user.user_id}`
    );

    if (!res.ok) throw new Error("Failed");

    const bookings = await res.json();

    const packageBookings = bookings.filter(b => {
      const d = JSON.parse(b.details);
      return d.booking_type?.startsWith("package:");
    });

    list.innerHTML = "";

    if (packageBookings.length === 0) {
      list.innerHTML = "<p>No packages found</p>";
      return;
    }

    packageBookings.forEach(b => {
      const details = JSON.parse(b.details);
      const packageName = details.booking_type.replace("package:", "");

      const card = document.createElement("div");
      card.className = "booking-card";

      card.innerHTML = `
        <div class="booking-info">
          <p><strong>Package:</strong> ${packageName}</p>
          <p><strong>Amount:</strong> ₹${b.total_price}</p>
          <p><strong>Package ID:</strong> HS${b.booking_id}</p>
        </div>

        <div class="booking-status ${b.status}">
          Status: ${b.status.charAt(0).toUpperCase() + b.status.slice(1)}
        </div>
      `;

      list.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    list.innerHTML = "<p>Unable to load packages</p>";
  }
});
