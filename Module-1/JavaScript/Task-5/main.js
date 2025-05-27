class Event {
  constructor(name, date, seats, category) {
    this.name = name;
    this.date = date;
    this.seats = seats;
    this.category = category;
  }

  checkAvailability() {
    const today = new Date().toISOString().split("T")[0];
    return this.seats > 0 && this.date >= today;
  }
}

const events = [
  new Event("🎨 Art Workshop", "2025-06-12", 15, "Art"),
  new Event("🎶 Music Fest", "2025-05-28", 0, "Music"),
  new Event("💡 Tech Talk", "2025-06-30", 25, "Technology"),
  new Event("🏺 History Exhibit", "2024-05-01", 10, "Culture")
];

const eventList = document.getElementById("eventList");

events.forEach(event => {
  const isAvailable = event.checkAvailability();
  const eventDiv = document.createElement("div");
  eventDiv.className = "event";

  eventDiv.innerHTML = `
    <h2>${event.name}</h2>
    <p><strong>📅 Date:</strong> ${event.date}</p>
    <p><strong>📂 Category:</strong> ${event.category}</p>
    <p><strong>🎫 Seats Available:</strong> ${event.seats}</p>
    <p class="status ${isAvailable ? 'available' : 'closed'}">
      ${isAvailable ? "✅ Available for Registration" : "❌ Registration Closed"}
    </p>
    <p><strong>📋 Event Info:</strong></p>
    <ul>
      ${Object.entries(event).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join("")}
    </ul>
  `;

  eventList.appendChild(eventDiv);
});
