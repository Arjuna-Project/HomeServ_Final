document.addEventListener("DOMContentLoaded", () => {
  const bookingTypeInput = document.getElementById("bookingType");
  const form = document.getElementById("bookingForm");

  const bookingType = localStorage.getItem("bookingType"); // "emergency" | "scheduled"
  const selectedPackage = JSON.parse(localStorage.getItem("selectedPackage"));
  const user = JSON.parse(localStorage.getItem("user"));
  const area = JSON.parse(localStorage.getItem("selectedArea"));
  const service = JSON.parse(localStorage.getItem("selectedService"));
  const professional = JSON.parse(localStorage.getItem("selectedProfessional"));

  /* ===============================
     BASIC VALIDATION
  ================================ */
  if (!user || !area) {
    alert("Booking data missing. Please start again.");
    window.location.href = "../index.html";
    return;
  }

  if (!selectedPackage && (!service || !professional)) {
    alert("Booking data missing. Please start again.");
    window.location.href = "../index.html";
    return;
  }

  /* ===============================
     DISPLAY BOOKING TYPE
  ================================ */
  if (selectedPackage) {
    bookingTypeInput.value = selectedPackage.name;
  } else if (bookingType === "emergency") {
    bookingTypeInput.value = "Emergency Service";
  } else {
    bookingTypeInput.value = "Scheduled Booking";
  }

  /* ===============================
     FORM SUBMIT
  ================================ */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const isPackageBooking = !!selectedPackage;
    const isEmergencyBooking = bookingType === "emergency";

    /* ===============================
       SCHEDULED TIME
    ================================ */
    let scheduledAt;

    if (isPackageBooking || isEmergencyBooking) {
      scheduledAt = new Date();
    } else {
      const date = localStorage.getItem("bookingDate");
      const time = localStorage.getItem("bookingTime");

      if (!date || !time) {
        alert("Please select date & time");
        return;
      }

      scheduledAt = new Date(`${date}T${time}:00`);
    }

    /* ===============================
       PRICE
    ================================ */
    let price = 329;
    if (isEmergencyBooking) price = 494;
    if (isPackageBooking) price = selectedPackage.price;

    /* ===============================
       BASE PAYLOAD
    ================================ */
    const payload = {
      user_id: user.user_id,
      area_id: area.area_id,
      scheduled_at: scheduledAt.toISOString(),
      total_price: price,
      details: JSON.stringify({
        booking_type: isPackageBooking
          ? "package"
          : isEmergencyBooking
          ? "emergency"
          : "scheduled"
      })
    };

    /* ===============================
       BOOKING TYPE HANDLING
    ================================ */
    if (isPackageBooking) {
      payload.package_id = selectedPackage.package_id;
      payload.service_id = null;
      payload.professional_id = null;
    } else {
      payload.package_id = null;
      payload.service_id = service.service_id;
      payload.professional_id = professional.professional_id;
    }

    /* ===============================
       API CALL (PRODUCTION)
    ================================ */
    try {
      const res = await fetch(
        "https://homeserv-final-3.onrender.com/bookings/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) {
        const err = await res.text();
        console.error("Booking failed:", err);
        alert("Booking failed");
        return;
      }

      const data = await res.json();
      localStorage.setItem("bookingId", data.booking_id);

      window.location.href = "../pages/confirm.html";

    } catch (err) {
      console.error("Network error:", err);
      alert("Something went wrong");
    }
  });
});
