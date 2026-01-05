document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const container = document.getElementById("bookingsList");

  if (!container) return;

  if (!user) {
    container.innerHTML = "<p>Please login to view your bookings.</p>";
    return;
  }

  try {
    const res = await fetch(`${window.API_BASE}/bookings/user/${user.user_id}`);
    if (!res.ok) throw new Error();

    const bookings = await res.json();
    container.innerHTML = "";

    if (bookings.length === 0) {
      container.innerHTML = "<p>No bookings found.</p>";
      return;
    }

    bookings.forEach(b => {
      const dt = new Date(b.scheduled_at).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short"
      });

      const card = document.createElement("div");
      card.className = "booking-card";

      card.innerHTML = `
        <div class="booking-info">
          <p><strong>Date & Time:</strong> ${dt}</p>
          <p><strong>Amount:</strong> ₹${b.total_price}</p>
          <p><strong>Booking ID:</strong> HS${b.booking_id}</p>
        </div>
        <div class="booking-status ${b.status}">
          Status: ${b.status.toUpperCase()}
        </div>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = "<p>Failed to load bookings.</p>";
  }
});
