document.addEventListener("DOMContentLoaded", () => {
  const bookingTypeInput = document.getElementById("bookingType");
  const form = document.getElementById("bookingForm");

  const bookingType = localStorage.getItem("bookingType");
  const selectedPackage = JSON.parse(localStorage.getItem("selectedPackage"));
  const user = JSON.parse(localStorage.getItem("user"));
  const area = JSON.parse(localStorage.getItem("selectedArea"));
  const service = JSON.parse(localStorage.getItem("selectedService"));
  const professional = JSON.parse(localStorage.getItem("selectedProfessional"));

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

    if (selectedPackage) {
      scheduledAt = new Date();
    }

    else if (bookingType === "emergency") {
      scheduledAt = new Date();
    }

    else {
      const date = localStorage.getItem("bookingDate");
      const time = localStorage.getItem("bookingTime");

      if (!date || !time) {
        alert("Please select date & time");
        return;
      }

      scheduledAt = new Date(`${date}T${time}:00`);
    }

    let price = 329;
    if (bookingType === "emergency") price = 494;
    if (selectedPackage) price = selectedPackage.price;

    const payload = {
      user_id: user.user_id,
      area_id: area.area_id,
      service_id: selectedPackage ? 0 : service.service_id,
      professional_id: selectedPackage ? 0 : professional.professional_id,
      scheduled_at: scheduledAt.toISOString(),
      total_price: price,
      details: JSON.stringify({
        booking_type: selectedPackage
          ? `package:${selectedPackage.name}`
          : bookingType
      })
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/bookings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.text();
        console.error(err);
        alert("Booking failed");
        return;
      }

      const data = await res.json();
      localStorage.setItem("bookingId", data.booking_id);

      window.location.href = "../pages/confirm.html";

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  });
});
