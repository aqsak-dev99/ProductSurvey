const form = document.getElementById('survey-form');
const firstName = document.getElementById('first-name');
const email = document.getElementById('email');
const terms = document.getElementById('terms-and-conditions');
const submitBtn = form.querySelector('input[type="submit"]');
const features = document.getElementById('features');
const improvements = document.getElementById('improvements');

// Disable submit initially
submitBtn.disabled = true;

// Enable submit only if required fields are filled
function toggleSubmit() {
  submitBtn.disabled = !(firstName.value && email.value && terms.checked);
}

[firstName, email].forEach(el => el.addEventListener('input', toggleSubmit));
terms.addEventListener('change', toggleSubmit);

// Character counters for textareas
function addCounter(textarea) {
  const counter = document.createElement('small');
  counter.textContent = `0/200`;
  textarea.parentNode.appendChild(counter);

  textarea.addEventListener('input', () => {
    if (textarea.value.length > 200) textarea.value = textarea.value.slice(0, 200);
    counter.textContent = `${textarea.value.length}/200`;
  });
}

addCounter(features);
addCounter(improvements);

// Form submission alert
form.addEventListener('submit', function(e) {
  e.preventDefault();
  alert(`Thank you, ${firstName.value}! Your feedback has been submitted.`);
  form.reset();
  submitBtn.disabled = true;
});
