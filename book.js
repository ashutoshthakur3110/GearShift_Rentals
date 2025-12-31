const form = document.querySelector("form");
  const pickupDateInput = document.getElementById("pickup-date");
  const returnDateInput = document.getElementById("return-date");

  const today = new Date().toISOString().split("T")[0];
  pickupDateInput.setAttribute("min", today);
  returnDateInput.setAttribute("min", today);

  pickupDateInput.addEventListener("change", () => {
    const pickupDate = pickupDateInput.value;

    returnDateInput.setAttribute("min", pickupDate);

    if (returnDateInput.value && returnDateInput.value < pickupDate) {
      returnDateInput.value = pickupDate;
    }
  });

  returnDateInput.addEventListener("change", () => {
    const pickupDate = pickupDateInput.value;
    const returnDate = returnDateInput.value;

    if (pickupDate && returnDate < pickupDate) {
      alert("Return date cannot be before Pickup date");
      returnDateInput.value = pickupDate;
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const pickupDate = pickupDateInput.value;
    const returnDate = returnDateInput.value;
    const carType = document.getElementById("car-type").value;

    if (!name || !email || !phone || !pickupDate || !returnDate || !carType) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3500/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, pickupDate, returnDate, carType })
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        window.location.href = "thanku.html";
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  });