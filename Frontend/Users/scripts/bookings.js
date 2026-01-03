document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".booking-card");
  const continueBtn = document.getElementById("continueBtn");

  let selectedBookingType = null;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      selectedBookingType = card.dataset.type;
      localStorage.setItem("bookingType", selectedBookingType);
    });
  });

  continueBtn.addEventListener("click", () => {
    if (!selectedBookingType) {
      alert("Please select a booking type");
      return;
    }

    localStorage.removeItem("selectedPackage");

    if (selectedBookingType === "emergency") {
      window.location.href = "../pages/details.html";
    } else {
      window.location.href = "../pages/date&time.html";
    }
  });
});
