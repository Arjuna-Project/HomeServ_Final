document.addEventListener("DOMContentLoaded", () => {
  const bookingTypeInput = document.getElementById("bookingType");
  const form = document.getElementById("bookingForm");

  if (!form || !bookingTypeInput) return;

  const bookingType = localStorage.getItem("bookingType");
  const selectedPackage = JSON.parse(localStorage.getItem("selectedPackage"));
  const user = JSON.parse(localStorage.getItem("user"));
  const area = JSON.parse(localStorage.getItem("selectedArea"));
  const service = JSON.parse(localStorage.getItem("selectedService"));
  const professional = JSON.parse(localStorage.getItem("selectedProfessional"));

  if (!user || !area) {
    window.location.href = "../../index.html";
    return;
  }

  if (!selectedPackage && (!service || !professional)) {
    window.location.href = "../../index.html";
    return;
  }

  if (selectedPackage) {
    bookingTypeInput.value = selectedPackage.name;
  } else if (bookingType === "emergency") {
    bookingTypeInput.value = "Emergency Service";
  } else {
    bookingTypeInput.value = "Scheduled Booking";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let scheduledAt;

    if (selectedPackage || bookingType === "emergency") {
      scheduledAt = new Date();
    } else {
      const date = localStorage.getItem("bookingDate");
      const time = localStorage.getItem("bookingTime");
      if (!date || !time) return;
      scheduledAt = new Date(`${date}T${time}:00`);
    }

    let price = 329;
    if (bookingType === "emergency") price = 494;
    if (selectedPackage) price = selectedPackage.price;

    const payload = {
      user_id: user.user_id,
      area_id: area.area_id,
      scheduled_at: scheduledAt.toISOString(),
      total_price: price,
      details: JSON.stringify({
        booking_type: selectedPackage
          ? "package"
          : bookingType === "emergency"
          ? "emergency"
          : "scheduled"
      })
    };

    if (selectedPackage) {
      payload.package_id = selectedPackage.package_id;
    } else {
      payload.service_id = service.service_id;
      payload.professional_id = professional.professional_id;
    }

    try {
      const res = await fetch(`${window.API_BASE}/bookings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) return;

      const data = await res.json();
      localStorage.setItem("bookingId", data.booking_id);
      window.location.href = "../pages/confirm.html";

    } catch (err) {}
  });
});
