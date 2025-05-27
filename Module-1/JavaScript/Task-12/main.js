const allEvents = [
  { id: 1, name: "Music Concert", seats: 4 },
  { id: 2, name: "Cooking Workshop", seats: 0 },
  { id: 3, name: "Tech Talk", seats: 5 }
];

const form = document.getElementById('registrationForm');
const eventSelect = document.getElementById('eventSelect');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageDiv = document.getElementById('message');
const spinner = document.getElementById('spinner');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const eventError = document.getElementById('eventError');

function populateEvents() {
  eventSelect.innerHTML = '<option value="">Select an event</option>';
  allEvents.forEach(ev => {
    if (ev.seats > 0) {
      const option = document.createElement('option');
      option.value = ev.id;
      option.textContent = `${ev.name} (${ev.seats} seats available)`;
      eventSelect.appendChild(option);
    }
  });
}

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

// Simulated API POST with fetch + setTimeout + Promise
function postRegistration(data) {
  spinner.style.display = "block";
  messageDiv.textContent = "";
  messageDiv.className = "";
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 85% success rate
      if (Math.random() < 0.85) {
        resolve({ status: 200, message: "Registration successful!" });
      } else {
        reject({ status: 500, message: "Server error! Please try again." });
      }
    }, 2500);
  }).finally(() => {
    spinner.style.display = "none";
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const nameVal = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const eventId = eventSelect.value;

  const validName = validateInput(nameInput, nameError, nameVal !== "", "Name is required");
  const validEmail = validateInput(emailInput, emailError, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal), "Valid email is required");
  const validEvent = validateInput(eventSelect, eventError, eventId !== "", "Please select an event");

  if (validName && validEmail && validEvent) {
    const selectedEvent = allEvents.find(ev => ev.id === parseInt(eventId));

    const payload = {
      name: nameVal,
      email: emailVal,
      event: selectedEvent.name
    };

    postRegistration(payload)
      .then(res => {
        messageDiv.textContent = res.message;
        messageDiv.className = "success";
        selectedEvent.seats--;
        populateEvents();
        form.reset();
      })
      .catch(err => {
        messageDiv.textContent = err.message;
        messageDiv.className = "error";
      });
  }
});

// Populate events on load
populateEvents();
