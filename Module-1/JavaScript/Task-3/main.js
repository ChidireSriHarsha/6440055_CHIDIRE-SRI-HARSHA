const events = [
  { name: "Local Food Festival", date: "2025-06-30", seats: 10 },
  { name: "Yoga in the Park", date: "2024-05-10", seats: 20 }, // Past event
  { name: "Art Workshop", date: "2025-07-05", seats: 0 }, // Full event
  { name: "Music Night", date: "2025-08-01", seats: 25 }
];

const eventList = document.getElementById("eventList");
const today = new Date().toISOString().split("T")[0];
let foundValidEvent = false;

events.forEach((event, index) => {
  if (event.date >= today && event.seats > 0) {
    foundValidEvent = true;

    const eventDiv = document.createElement("div");
    eventDiv.className = "event";

    const formattedDate = new Date(event.date).toLocaleDateString();

    eventDiv.innerHTML = `
      <h3>${event.name}</h3>
      <p>Date: ${formattedDate}</p>
      <p>Available Seats: <span id="seats-${index}">${event.seats}</span></p>
      <button id="btn-${index}" onclick="register(${index})">Register</button>
      <p id="msg-${index}" style="color: green; font-weight: bold;"></p>
    `;

    eventList.appendChild(eventDiv);
  } else {
    console.log(`Skipping event "${event.name}" (past or full)`);
  }
});

if (!foundValidEvent) {
  eventList.innerHTML = `<p style="color: red;">No upcoming events with available seats.</p>`;
}

// Enhanced try-catch for registration
function register(index) {
  try {
    const event = events[index];
    const seatsElement = document.getElementById(`seats-${index}`);
    const buttonElement = document.getElementById(`btn-${index}`);
    const msgElement = document.getElementById(`msg-${index}`);

    if (!event || !seatsElement || !buttonElement || !msgElement) {
      throw new Error("Event elements missing or invalid index.");
    }

    if (event.seats <= 0) {
      throw new Error("This event is already full.");
    }

    event.seats--;
    seatsElement.textContent = event.seats;
    msgElement.textContent = "✅ Registration successful!";
    msgElement.style.color = "green";

    console.log(`Registered for ${event.name}. Seats left: ${event.seats}`);

    if (event.seats === 0) {
      buttonElement.disabled = true;
      buttonElement.textContent = "Sold Out";
    }
  } catch (error) {
    alert(`⚠️ Error: ${error.message}`);
    console.error(error);
  }
}
