function createEventManager() {
  const events = [];
  const registrations = {};

  function addEvent(name, date, seats, category) {
    events.push({ name, date, seats, category });
  }

  function filterEvents(callback) {
    return events.filter(callback);
  }

  function registerToEvent(name) {
    const event = events.find(e => e.name === name);
    if (!event || event.seats <= 0 || event.date < new Date().toISOString().split("T")[0]) {
      return false;
    }
    event.seats--;
    registrations[event.category] = (registrations[event.category] || 0) + 1;
    return true;
  }

  function getTotalRegistrations() {
    return { ...registrations };
  }

  function getAllEvents() {
    return [...events];
  }

  return {
    addEvent,
    filterEvents,
    registerToEvent,
    getTotalRegistrations,
    getAllEvents
  };
}

// -------------------- App Logic ----------------------

const manager = createEventManager();

// Add sample events
manager.addEvent("Farmers Market", "2025-06-15", 10, "Food");
manager.addEvent("Tech Fair", "2025-07-01", 2, "Technology");
manager.addEvent("Local Band Night", "2024-05-20", 15, "Music"); // Past

const eventContainer = document.getElementById("events");
const statsDiv = document.getElementById("stats");

function renderEvents() {
  eventContainer.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];
  const events = manager.filterEvents(e => e.date >= today);

  if (events.length === 0) {
    eventContainer.innerHTML = "<p>No upcoming events available.</p>";
    return;
  }

  events.forEach(event => {
    const div = document.createElement("div");
    div.className = "event";

    div.innerHTML = `
      <h3>${event.name}</h3>
      <p>Category: ${event.category}</p>
      <p>Date: ${event.date}</p>
      <p>Seats Left: ${event.seats}</p>
      <button ${event.seats <= 0 ? "disabled" : ""}>Register</button>
    `;

    const button = div.querySelector("button");
    button.addEventListener("click", () => {
      const success = manager.registerToEvent(event.name);
      if (success) {
        alert("✅ Registered successfully!");
      } else {
        alert("❌ Cannot register. Event full or expired.");
      }
      renderEvents();
      renderStats();
    });

    eventContainer.appendChild(div);
  });
}

function renderStats() {
  const reg = manager.getTotalRegistrations();
  const entries = Object.entries(reg);
  if (entries.length === 0) {
    statsDiv.innerHTML = "<p>No registrations yet.</p>";
    return;
  }

  statsDiv.innerHTML = `
    <h3>📊 Registrations Summary</h3>
    ${entries.map(([cat, count]) => `<p>${cat}: ${count}</p>`).join("")}
  `;
}

renderEvents();
renderStats();
