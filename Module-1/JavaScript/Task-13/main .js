// Grab form and elements
const form = document.getElementById('registrationForm');
const nameInput = form.elements['name'];
const emailInput = form.elements['email'];
const eventSelect = form.elements['event'];
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const eventError = document.getElementById('eventError');
const messageDiv = document.getElementById('message');

// Simple validation helper
function validateInput(inputElem, errorElem, condition, errorMsg) {
  if (!condition) {
    errorElem.textContent = errorMsg;
    inputElem.classList.add('error');
    return false;
  } else {
    errorElem.textContent = '';
    inputElem.classList.remove('error');
    return true;
  }
}

// Simulated POST function with delay
function postRegistration(data) {
  console.log('Simulating POST:', data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success 80% of the time
      if (Math.random() < 0.8) {
        resolve({ message: `Thank you ${data.name}! You are registered for ${data.event}.` });
      } else {
        reject(new Error('Server error: Registration failed.'));
      }
    }, 1500);
  });
}

// Form submit handler with detailed logs for debugging
form.addEventListener('submit', e => {
  e.preventDefault();
  console.log('Form submission started');

  const nameVal = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const eventVal = eventSelect.value;

  console.log('Input values:', { nameVal, emailVal, eventVal });

  // Validate fields
  const validName = validateInput(nameInput, nameError, nameVal !== '', 'Name is required.');
  const validEmail = validateInput(emailInput, emailError, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal), 'Valid email is required.');
  const validEvent = validateInput(eventSelect, eventError, eventVal !== '', 'Please select an event.');

  console.log('Validation results:', { validName, validEmail, validEvent });

  if (validName && validEmail && validEvent) {
    const payload = { name: nameVal, email: emailVal, event: eventSelect.options[eventSelect.selectedIndex].text };

    console.log('Payload prepared for POST:', payload);

    // Disable form during submission
    form.querySelector('button[type="submit"]').disabled = true;
    messageDiv.textContent = 'Registering...';
    messageDiv.className = '';

    postRegistration(payload)
      .then(response => {
        console.log('POST success:', response);
        messageDiv.textContent = response.message;
        messageDiv.className = 'success';
        form.reset();
      })
      .catch(error => {
        console.error('POST failure:', error);
        messageDiv.textContent = error.message;
        messageDiv.className = 'error';
      })
      .finally(() => {
        form.querySelector('button[type="submit"]').disabled = false;
        console.log('Form submission finished');
      });
  } else {
    console.log('Form validation failed; submission cancelled.');
    messageDiv.textContent = 'Please correct the errors and try again.';
    messageDiv.className = 'error';
  }
});
