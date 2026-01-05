document.addEventListener("DOMContentLoaded", async () => {

  const bookingId = localStorage.getItem("bookingId");
  const area = JSON.parse(localStorage.getItem("selectedArea"));

  if (!bookingId) {
    alert("No booking found");
    window.location.href = "../../index.html";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/bookings/${bookingId}`);
    if (!res.ok) throw new Error("Failed to load booking");

    const booking = await res.json();
    const details = JSON.parse(booking.details);

    document.getElementById("areaName").textContent =
      area?.name || "N/A";

    let isPackage = false;
    if (details.booking_type.startsWith("package:")) {
      document.getElementById("bookingType").textContent =
        details.booking_type.replace("package:", "");
      isPackage = true;
    } else {
      document.getElementById("bookingType").textContent =
        details.booking_type === "emergency"
          ? "Emergency Service"
          : "Scheduled Booking";
    }

    document.getElementById("amount").textContent = booking.total_price;

    document.getElementById("bookingId").textContent = booking.booking_id;

    const primaryBtn = document.getElementById("primaryBtn");
    if (isPackage) {
      primaryBtn.textContent = "View My Packages";
      primaryBtn.href = "../pages/my_packages.html";
    } else {
      primaryBtn.textContent = "View My Bookings";
      primaryBtn.href = "../pages/my_bookings.html";
    }

  } catch (err) {
    console.error(err);
    alert("Unable to load booking confirmation");
  }
});
