import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('[name="delay"]');
const radioButtons = form.querySelectorAll('[name="state"]');
const submitButton = form.querySelector('[type="submit"]');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const delay = parseInt(input.value);
  const state = [...radioButtons].find(rb => rb.checked).value;

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else if (state === 'rejected') {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });

  input.value = '';
  radioButtons.forEach(rb => (rb.checked = false));
});
