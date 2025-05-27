const eventContainer = document.getElementById('eventContainer');
const spinner = document.getElementById('spinner');

function showSpinner(show) {
  spinner.style.display = show ? 'block' : 'none';
}

function renderEvents(events) {
  eventContainer.innerHTML = ''; // Clear container

  if (!events.length) {
    eventContainer.innerHTML = `<p class="empty">No events available at the moment.</p>`;
    return;
  }

  events.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-card';

    card.innerHTML = `
      <div class="event-name">${event.name}</div>
      <div class="event-details"><strong>Date:</strong> ${event.date}</div>
      <div class="event-details"><strong>Category:</strong> ${event.category}</div>
      <div class="event-details"><strong>Seats Left:</strong> ${event.seats}</div>
    `;

    eventContainer.appendChild(card);
  });
}

function showError(message) {
  eventContainer.innerHTML = `<p class="error">⚠️ ${message}</p>`;
}

async function fetchEvents(url) {
  try {
    showSpinner(true);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    if (!Array.isArray(data)) throw new Error("Invalid data format received");

    renderEvents(data);
  } catch (error) {
    showError(error.message);
  } finally {
    showSpinner(false);
  }
}

// URL to your mock JSON file
const EVENTS_API_URL = 'mock-events.json';

// Start fetching on page load
fetchEvents(EVENTS_API_URL);
