document.addEventListener("DOMContentLoaded", () => {
  const dateContainer = document.getElementById("dateButtons");
  const timeButtons = document.querySelectorAll(".time-btn");
  const continueBtn = document.getElementById("continueBtn");

  if (!dateContainer || !continueBtn) return;

  let selectedDate = null;
  let selectedTime = null;

  const today = new Date();

  for (let i = 0; i < 5; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "date-btn";
    btn.textContent = d.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });

    btn.dataset.date = d.toISOString().split("T")[0];

    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".date-btn")
        .forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedDate = btn.dataset.date;
    });

    dateContainer.appendChild(btn);
  }

  timeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      timeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedTime = btn.dataset.time;
    });
  });

  continueBtn.addEventListener("click", () => {
    if (!selectedDate || !selectedTime) return;

    localStorage.setItem("bookingDate", selectedDate);
    localStorage.setItem("bookingTime", selectedTime);
    window.location.href = "../pages/details.html";
  });
});
