/* -------------------------------------------------
   Elements
   ------------------------------------------------- */
const form          = document.getElementById('survey-form');
const firstName     = document.getElementById('first-name');
const email         = document.getElementById('email');
const terms         = document.getElementById('terms-and-conditions');
const submitBtn     = document.getElementById('submit-btn');
const textareas     = document.querySelectorAll('textarea[data-counter]');

/* -------------------------------------------------
   Submit button toggle
   ------------------------------------------------- */
function toggleSubmit() {
  const valid = firstName.value.trim() &&
                email.value.trim() &&
                terms.checked;
  submitBtn.disabled = !valid;
}
[firstName, email].forEach(el => el.addEventListener('input', toggleSubmit));
terms.addEventListener('change', toggleSubmit);
toggleSubmit();   // initial state

/* -------------------------------------------------
   Character counters (reusable)
   ------------------------------------------------- */
const MAX = 200;
textareas.forEach(textarea => {
  const counter = document.createElement('small');
  counter.className = 'char-counter';
  counter.textContent = `0/${MAX}`;
  counter.setAttribute('aria-live', 'polite');
  textarea.after(counter);

  const update = () => {
    let len = textarea.value.length;
    if (len > MAX) {
      textarea.value = textarea.value.slice(0, MAX);
      len = MAX;
    }
    counter.textContent = `${len}/${MAX}`;
    counter.style.color = len > MAX * 0.9 ? '#ff5555' : '#ddd';
  };
  textarea.addEventListener('input', update);
  update();   // init
});

/* -------------------------------------------------
   Form submission (demo)
   ------------------------------------------------- */
form.addEventListener('submit', e => {
  e.preventDefault();
  alert(`Thank you, ${firstName.value.trim()}! Your feedback has been submitted.`);
  form.reset();
  toggleSubmit();   // keep button disabled after reset
});