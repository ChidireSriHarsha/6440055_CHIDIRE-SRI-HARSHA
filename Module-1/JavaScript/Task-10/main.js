const eventContainer = document.getElementById('eventContainer');
const spinner = document.getElementById('spinner');
const categoryFilter = document.getElementById('categoryFilter');

let allEvents = [];

const showSpinner = show => (spinner.style.display = show ? 'block' : 'none');

const renderEvents = events => {
  eventContainer.innerHTML = '';

  if (!events.length) {
    eventContainer.innerHTML = `<p class="empty">No events available.</p>`;
    return;
  }

  events.forEach(({ id, name, date, category, seats }) => {
    const card = document.createElement('div');
    card.className = 'event-card';

    card.innerHTML = `
      <div class="event-name">${name}</div>
      <div class="event-details"><strong>Date:</strong> ${date}</div>
      <div class="event-details"><strong>Category:</strong> ${category}</div>
      <div class="event-details"><strong>Seats Left:</strong> <span id="seats-${id}">${seats}</span></div>
      <button class="register-btn" id="btn-${id}" ${seats === 0 ? 'disabled' : ''}>${seats === 0 ? 'Full' : 'Register'}</button>
    `;

    eventContainer.appendChild(card);

    // Add click event listener to register button
    const btn = document.getElementById(`btn-${id}`);
    btn.onclick = () => registerUser(id);
  });
};

const populateCategoryFilter = events => {
  const categories = [...new Set(events.map(({ category }) => category))];
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
};

const filterEventsByCategory = (events, category = 'all') =>
  category === 'all' ? events : events.filter(event => event.category === category);

const registerUser = id => {
  const event = allEvents.find(ev => ev.id === id);
  if (!event) return alert('Event not found.');

  if (event.seats === 0) return alert('Sorry, no seats left.');

  event.seats--; // reduce seats by 1
  document.getElementById(`seats-${id}`).textContent = event.seats;

  const btn = document.getElementById(`btn-${id}`);
  if (event.seats === 0) {
    btn.disabled = true;
    btn.textContent = 'Full';
  }

  alert(`Successfully registered for "${event.name}"!`);
};

const showError = message => {
  eventContainer.innerHTML = `<p class="error">⚠️ ${message}</p>`;
};

const fetchEvents = async (url = 'mock-events.json') => {
  try {
    showSpinner(true);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Invalid data format received');

    allEvents = [...data].filter(({ seats }) => seats >= 0); // keep all events

    populateCategoryFilter(allEvents);
    renderEvents(allEvents);
  } catch (error) {
    showError(error.message);
  } finally {
    showSpinner(false);
  }
};

categoryFilter.onchange = () => {
  const filtered = filterEventsByCategory(allEvents, categoryFilter.value);
  renderEvents(filtered);
};

fetchEvents();
