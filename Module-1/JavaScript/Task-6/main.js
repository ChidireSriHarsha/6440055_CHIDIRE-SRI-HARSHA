// Initial list of events
let events = [
  { name: "Workshop on Painting", date: "2025-06-15", category: "Art" },
  { name: "Music Fest Live", date: "2025-06-20", category: "Music" },
  { name: "Tech Talk", date: "2025-07-01", category: "Technology" }
];

// 1. Add a new event using .push()
events.push({ name: "Workshop on Baking", date: "2025-06-25", category: "Cooking" });
events.push({ name: "Guitar Night", date: "2025-06-30", category: "Music" });

// 2. Format names using .map()
const formattedEvents = events.map(event => ({
  ...event,
  name: event.name.startsWith("Workshop") ? event.name : `Event: ${event.name}`
}));

// 3. Display all events
function showAllEvents() {
  renderEvents(formattedEvents);
}

// 4. Filter only music events using .filter()
function showMusicEvents() {
  const musicEvents = formattedEvents.filter(event => event.category === "Music");
  renderEvents(musicEvents);
}

// 5. Render function
function renderEvents(eventList) {
  const container = document.getElementById("eventContainer");
  container.innerHTML = ""; // Clear previous

  eventList.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <h3>${event.name}</h3>
      <p><strong>📅 Date:</strong> ${event.date}</p>
      <p><strong>📂 Category:</strong> ${event.category}</p>
    `;
    container.appendChild(card);
  });
}

// Initial view
showAllEvents();
