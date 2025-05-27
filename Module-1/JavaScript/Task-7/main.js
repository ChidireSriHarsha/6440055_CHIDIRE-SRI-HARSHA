// Event data
const events = [
  { id: 1, name: "Painting Workshop", date: "2025-06-15", seats: 5 },
  { id: 2, name: "Music Fest Live", date: "2025-06-20", seats: 0 },
  { id: 3, name: "Tech Talk", date: "2025-07-01", seats: 10 }
];

// Select container with querySelector
const eventContainer = document.querySelector("#eventContainer");

// Render all event cards
function renderEvents() {
  eventContainer.innerHTML = ""; // Clear previous content

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    // Status based on seats availability
    const isAvailable = event.seats > 0;
    const statusText = isAvailable ? "Seats Available" : "Fully Booked";

    // Create elements for event data
    const title = document.createElement("div");
    title.className = "event-title";
    title.textContent = event.name;

    const dateInfo = document.createElement("div");
    dateInfo.className = "event-info";
    dateInfo.textContent = `Date: ${event.date}`;

    const seatsInfo = document.createElement("div");
    seatsInfo.className = "event-info";
    seatsInfo.textContent = `Seats Left: ${event.seats}`;

    const status = document.createElement("div");
    status.className = `status ${isAvailable ? "available" : "full"}`;
    status.textContent = statusText;

    // Register button
    const registerBtn = document.createElement("button");
    registerBtn.className = "register";
    registerBtn.textContent = "Register";
    registerBtn.disabled = !isAvailable;
    registerBtn.addEventListener("click", () => {
      if (event.seats > 0) {
        event.seats--;
        renderEvents();  // Re-render UI to update seats and button states
        alert(`You registered for ${event.name}!`);
      }
    });

    // Cancel button
    const cancelBtn = document.createElement("button");
    cancelBtn.className = "cancel";
    cancelBtn.textContent = "Cancel Registration";
    cancelBtn.disabled = event.seats === 10; // Assuming max seats = 10 for demo
    cancelBtn.addEventListener("click", () => {
      if (event.seats < 10) {
        event.seats++;
        renderEvents();
        alert(`You canceled registration for ${event.name}`);
      }
    });

    // Append elements to card
    card.appendChild(title);
    card.appendChild(dateInfo);
    card.appendChild(seatsInfo);
    card.appendChild(status);
    card.appendChild(registerBtn);
    card.appendChild(cancelBtn);

    eventContainer.appendChild(card);
  });
}

// Initial render
renderEvents();
