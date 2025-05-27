const eventName = "Local Food Festival";
const eventDate = "2025-06-30";
let availableSeats = 50;

const eventNameEl = document.getElementById("eventName");
const eventDateEl = document.getElementById("eventDate");
const availableSeatsEl = document.getElementById("availableSeats");
const registerBtn = document.getElementById("registerBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Display event info
function displayEventInfo() {
  eventNameEl.textContent = eventName;
  eventDateEl.textContent = `Date: ${eventDate}`;
  availableSeatsEl.textContent = `Available Seats: ${availableSeats}`;

  // Disable register if no seats left
  registerBtn.disabled = availableSeats <= 0;
  // Disable cancel if seats are at max (50)
  cancelBtn.disabled = availableSeats >= 50;
}

displayEventInfo();

// Register click handler
registerBtn.addEventListener("click", () => {
  if (availableSeats > 0) {
    availableSeats--;
    displayEventInfo();
    console.log(`Seats after registration: ${availableSeats}`);
  }
});

// Cancel click handler
cancelBtn.addEventListener("click", () => {
  if (availableSeats < 50) {
    availableSeats++;
    displayEventInfo();
    console.log(`Seats after cancellation: ${availableSeats}`);
  }
});
