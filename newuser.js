const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");

const emailField = emailInput.closest(".field");
const nameField = nameInput.closest(".field");
const passField = passwordInput.closest(".field");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let hasError = false;

  if (emailInput.value.trim() === "") {
    emailField.classList.add("error");
    emailField.querySelector(".error-txt").innerText = "Email can't be blank";
    hasError = true;
  } else {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailInput.value.trim().match(pattern)) {
      emailField.classList.add("error");
      emailField.querySelector(".error-txt").innerText = "Enter a valid email address";
      hasError = true;
    } else {
      emailField.classList.remove("error");
    }
  }

  if (nameInput.value.trim() === "") {
    nameField.classList.add("error");
    nameField.querySelector(".error-txt").innerText = "User Name can't be blank";
    hasError = true;
  } else {
    nameField.classList.remove("error");
  }

  if (passwordInput.value.trim() === "") {
    passField.classList.add("error");
    passField.querySelector(".error-txt").innerText = "Password can't be blank";
    hasError = true;
  } else {
    passField.classList.remove("error");
  }

  if (hasError) return;

  fetch("https://gearshift-rentals-1.onrender.com/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailInput.value.trim(),
      name: nameInput.value.trim(),
      password: passwordInput.value.trim()
    })
  })
    .then(async (res) => {
      const data = await res.json();
      alert(data.message);
      if (res.ok && data.message === "register success") {
        window.location.href = "login.html";
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Server error");
    });
});
