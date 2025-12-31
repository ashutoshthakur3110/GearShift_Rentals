const searchBtn = document.querySelector('.loc-sec .pick a');
const pickUp = document.querySelectorAll('#abc')[0];
const drop = document.querySelectorAll('#abc')[1];
const dateInputs = document.querySelectorAll('#date');
const pickDate = dateInputs[0];
const returnDate = dateInputs[1];
const today = new Date().toISOString().split("T")[0];

dateInputs.forEach(input => {
    input.value = "";
    input.setAttribute("min", today);
});

searchBtn.addEventListener("click", (e) => {
    if (pickUp.value.trim() === "" || drop.value.trim() === "" || pickDate.value === "" || returnDate.value === "") {
        e.preventDefault();
        alert("Please fill Pickup, Drop and both Dates!");
    }
});