document.addEventListener("DOMContentLoaded", async () => {
  const bookingId = localStorage.getItem("bookingId");
  if (!bookingId) {
    window.location.href = "../../index.html";
    return;
  }

  try {
    const res = await fetch(`${window.API_BASE}/bookings/${bookingId}`);
    if (!res.ok) return;

    const booking = await res.json();
    const details = booking.details ? JSON.parse(booking.details) : {};

    const area = JSON.parse(localStorage.getItem("selectedArea"));
    const service = JSON.parse(localStorage.getItem("selectedService"));
    const professional = JSON.parse(localStorage.getItem("selectedProfessional"));

    const set = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    set("bookingId", `HS${booking.booking_id}`);
    set("amount", booking.total_price);
    set("areaName", area?.name || "N/A");

    if (details.booking_type === "emergency") {
      set("type", "Emergency Service");
      set("dateTime", "Immediate Service");
    } else if (details.booking_type === "package") {
      set("type", "Package Service");
    } else {
      set("type", "Scheduled Booking");
      const dt = new Date(booking.scheduled_at);
      set(
        "dateTime",
        dt.toLocaleDateString("en-IN") +
          " at " +
          dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
      );
    }

    if (service) set("serviceName", service.name);
    if (professional) set("professionalName", professional.name);

  } catch (err) {}
});
