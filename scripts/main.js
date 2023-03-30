// Aos library
document.addEventListener('DOMContentLoaded', (e) => {
  AOS.init();
});

// Toast
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

// Validation
document.addEventListener('input', (e) => {
  document.querySelector('#myForm').classList.add('was-validated');
});

// My form
const $form = document.querySelector('#myForm');
const $output = document.querySelector('#output');

// Listener of reset
$form.addEventListener('reset', (e) => {
  $output.innerHTML = ``;
  document.querySelector('#myForm').classList.remove('was-validated');
});

// Function of f'
function dydx(x, y, dydx) {
  return math.evaluate(dydx, { x: x, y: y });
}

// Function euler
function eulerMejorado(f, x0, y0, yn, n) {
  let y = y0;
  let x = x0;
  let h = (yn - x0) / n;

  for (let i = 0; i < n; i++) {
    k1 = dydx(x, y, f);
    k2 = dydx(x + h, y + h * k1, f);
    y = y + (h / 2) * (k1 + k2);
    x = x + h;
  }
  console.log('h: ' + h);
  return y;
}

// Listener of form
$form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtenemos los valores de entrada
  let yPrimeText = e.target.yPrime.value;
  let x0 = parseFloat(e.target.x0.value);
  let y0 = parseFloat(e.target.y0.value);
  let yn = parseFloat(e.target.yn.value);

  let result;

  try {
    result = eulerMejorado(yPrimeText, x0, y0, yn, 1000);
  } catch (error) {
    // En caso de error se muestra una alerta
    Toast.fire({
      icon: 'error',
      title: 'Ocurrió un error',
    });
  }
  console.log(result);

  $output.innerHTML = `
  El valor de 
  <span class="badge text-bg-info rounded-pill">y</span> 
  en el punto 
  <span class="badge text-bg-success rounded-pill">x<sub>${yn}</sub></span> es: 
  <p class="badge bg-primary-subtle text-primary-emphasis rounded-pill fs-4">${result}</p>`;
});
