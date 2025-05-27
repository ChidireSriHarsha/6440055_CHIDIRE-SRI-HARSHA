// Events data
const events = [
  { id: 1, name: "Painting Workshop", date: "2025-06-15", category: "Art", seats: 5 },
  { id: 2, name: "Music Fest Live", date: "2025-06-20", category: "Music", seats: 3 },
  { id: 3, name: "Tech Talk", date: "2025-07-01", category: "Technology", seats: 10 },
  { id: 4, name: "Workshop on Baking", date: "2025-06-25", category: "Cooking", seats: 2 },
  { id: 5, name: "Guitar Night", date: "2025-06-30", category: "Music", seats: 0 }
];

const eventContainer = document.querySelector("#eventContainer");
const categoryFilter = document.querySelector("#categoryFilter");
const searchInput = document.querySelector("#searchInput");

// Render events based on filtered data
function renderEvents(eventList) {
  eventContainer.innerHTML = "";
  if (eventList.length === 0) {
    eventContainer.innerHTML = "<p>No events match your criteria.</p>";
    return;
  }

  eventList.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    const isAvailable = event.seats > 0;
    const statusText = isAvailable ? "Seats Available" : "Fully Booked";

    const title = document.createElement("div");
    title.className = "event-title";
    title.textContent = event.name;

    const dateInfo = document.createElement("div");
    dateInfo.className = "event-info";
    dateInfo.textContent = `Date: ${event.date}`;

    const categoryInfo = document.createElement("div");
    categoryInfo.className = "event-info";
    categoryInfo.textContent = `Category: ${event.category}`;

    const seatsInfo = document.createElement("div");
    seatsInfo.className = "event-info";
    seatsInfo.textContent = `Seats Left: ${event.seats}`;

    const status = document.createElement("div");
    status.className = `status ${isAvailable ? "available" : "full"}`;
    status.textContent = statusText;

    const registerBtn = document.createElement("button");
    registerBtn.className = "register";
    registerBtn.textContent = "Register";
    registerBtn.disabled = !isAvailable;
    registerBtn.onclick = () => {
      if (event.seats > 0) {
        event.seats--;
        alert(`You registered for ${event.name}`);
        applyFilters(); // re-render with updated seats
      }
    };

    card.append(title, dateInfo, categoryInfo, seatsInfo, status, registerBtn);
    eventContainer.appendChild(card);
  });
}

// Filter and search logic
function applyFilters() {
  const category = categoryFilter.value;
  const searchTerm = searchInput.value.toLowerCase();

  let filteredEvents = events;

  if (category !== "all") {
    filteredEvents = filteredEvents.filter(event => event.category === category);
  }

  if (searchTerm) {
    filteredEvents = filteredEvents.filter(event => event.name.toLowerCase().includes(searchTerm));
  }

  renderEvents(filteredEvents);
}

// Event listeners
categoryFilter.onchange = applyFilters;
searchInput.onkeydown = applyFilters;

// Initial render
renderEvents(events);
