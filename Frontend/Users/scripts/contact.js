document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value
    };

    try {
      const res = await fetch("https://homeserv-final-3.onrender.com/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      window.location.href = "../pages/message_sent.html";

    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please try again.");
    }
  });

});
