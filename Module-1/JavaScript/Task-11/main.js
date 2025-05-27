// Sample events data - in real app, you might fetch from API or elsewhere
const allEvents = [
  { id: 1, name: "Music Concert", seats: 5 },
  { id: 2, name: "Art Workshop", seats: 0 },  // Full event
  { id: 3, name: "Tech Talk", seats: 3 },
  { id: 4, name: "Cooking Class", seats: 2 }
];

// Cache DOM elements
const form = document.getElementById('registrationForm');
const eventSelect = document.getElementById('eventSelect');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const eventError = document.getElementById('eventError');

// Populate event select dropdown with only events that have available seats
function populateEventOptions() {
  eventSelect.innerHTML = `<option value="">--Please choose an event--</option>`;
  allEvents.forEach(event => {
    if (event.seats > 0) {
      const option = document.createElement('option');
      option.value = event.id;
      option.textContent = `${event.name} (${event.seats} seats available)`;
      eventSelect.appendChild(option);
    }
  });
}

// Validate single input field
function validateInput(input, errorElem, condition, message) {
  if (!condition) {
    errorElem.textContent = message;
    input.classList.add('invalid');
    return false;
  } else {
    errorElem.textContent = '';
    input.classList.remove('invalid');
    return true;
  }
}

// Form submission handler
form.addEventListener('submit', e => {
  e.preventDefault();

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const selectedEventId = eventSelect.value;

  // Validate inputs
  const isNameValid = validateInput(nameInput, nameError, nameValue !== '', "Name is required.");
  const isEmailValid = validateInput(emailInput, emailError, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue), "Please enter a valid email.");
  const isEventValid = validateInput(eventSelect, eventError, selectedEventId !== '', "Please select an event.");

  if (isNameValid && isEmailValid && isEventValid) {
    // Find the event object
    const eventObj = allEvents.find(event => event.id === parseInt(selectedEventId));

    // Confirm registration
    alert(`Thank you, ${nameValue}! You have successfully registered for "${eventObj.name}".`);

    // Update seats count
    eventObj.seats--;

    // Update dropdown options & clear form
    populateEventOptions();
    form.reset();
  }
});

// Initial population of event dropdown
populateEventOptions();
