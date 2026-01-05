document.addEventListener("DOMContentLoaded", async () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const container = document.getElementById("bookingsList");

  if (!user) {
    container.innerHTML = "<p>Please login to view your bookings.</p>";
    return;
  }

  await loadBookings();

  async function loadBookings() {
    try {
      const res = await fetch(
        `https://homeserv-final-3.onrender.com/bookings/user/${user.user_id}`
      );

      if (!res.ok) throw new Error("Failed to fetch bookings");

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
            ${
              b.status === "pending"
                ? `<a href="#" class="cancel-link" data-id="${b.booking_id}">
                     Cancel
                   </a>`
                : ""
            }
          </div>
        `;

        container.appendChild(card);
      });

      attachCancelEvents();

    } catch (err) {
      console.error(err);
      container.innerHTML = "<p>Failed to load bookings.</p>";
    }
  }

  function attachCancelEvents() {
    document.querySelectorAll(".cancel-link").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();

        const bookingId = btn.dataset.id;

        if (!confirm("Are you sure you want to cancel this booking?")) return;

        try {
          const res = await fetch(
            `http://127.0.0.1:8000/bookings/${bookingId}/status?status=cancelled`,
            { method: "PATCH" }
          );

          if (!res.ok) throw new Error("Cancel failed");

          await loadBookings(); 

        } catch (err) {
          console.error(err);
          alert("Failed to cancel booking");
        }
      });
    });
  }
});
