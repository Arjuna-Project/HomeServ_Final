document.addEventListener("DOMContentLoaded", async () => {
  console.log("confirm.js loaded");

  const bookingId = localStorage.getItem("bookingId");
  if (!bookingId) {
    alert("Booking ID not found");
    return;
  }

  let booking;
  try {
    const res = await fetch(`${API_BASE}/bookings/${bookingId}`);
    if (!res.ok) throw new Error("API failed");
    booking = await res.json();
  } catch (e) {
    console.error("Booking fetch error", e);
    alert("Unable to load booking");
    return;
  }

  console.log("Booking from API:", booking);

  let details = {};
  try {
    details = JSON.parse(booking.details || "{}");
  } catch {
    details = {};
  }

  setText("bookingId", `HS${booking.booking_id}`);
  setText("amount", booking.total_price);

  const area = JSON.parse(localStorage.getItem("selectedArea"));
  setText("areaName", area?.name || "N/A");

  const bookingType = details.booking_type || "unknown";

  let isPackage = false;
  let isEmergency = false;

  if (bookingType.startsWith("package:")) {
    isPackage = true;
    setText("type", bookingType.replace("package:", ""));
  } else if (bookingType === "emergency") {
    isEmergency = true;
    setText("type", "Emergency Service");
  } else {
    setText("type", "Scheduled Booking");
  }

  if (isPackage) {
    hide("serviceRow");
    hide("professionalRow");
  } else {
    const service = JSON.parse(localStorage.getItem("selectedService"));
    const professional = JSON.parse(localStorage.getItem("selectedProfessional"));

    setText("serviceName", service?.name || "N/A");
    setText("professionalName", professional?.name || "N/A");
  }

  if (isPackage) {
    hide("dateTimeRow");
  } else if (isEmergency) {
    setText("dateTime", "Immediate Service");
  } else {
    const dt = new Date(booking.scheduled_at);
    setText(
      "dateTime",
      dt.toLocaleDateString("en-IN") +
        " at " +
        dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    );
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
    else console.warn(`⚠ Missing element #${id}`);
  }

  function hide(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
    else console.warn(`⚠ Missing element #${id}`);
  }
});
