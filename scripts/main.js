// Aos library
document.addEventListener('DOMContentLoaded', (e) => {
  AOS.init();
});

const $form = document.querySelector('#myForm');
const $output = document.querySelector('#output');

$form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtenemos los valores de entrada
  let yPrimeText = e.target.yPrime.value.toString();
  let x0 = parseFloat(e.target.x0.value);
  let y0 = parseFloat(e.target.y0.value);
  let yn = parseFloat(e.target.yn.value);

  let y = y0;
  let x = x0;

  const eulerMejorado = (f, x0, y0, yn, n) => {
    let h = (yn - x0) / n;

    for (let i = 0; i < n; i++) {
      const slope = eval(f.replace(/x/g, x).replace(/y/g, y));
      const yPrime = y + slope * h;
      const slopePrime = eval(f.replace(/x/g, x + h).replace(/y/g, yPrime));
      y = y + ((slope + slopePrime) * h) / 2;
      x = x + h;
    }
    return y;
  };

  let yr = eulerMejorado(yPrimeText, x0, y0, yn, 1000);

  $output.innerHTML = `El valor de y en el punto y<sub>n</sub> es ${yr}`;
});

$form.addEventListener('reset', (e) => {
  $output.innerHTML = ``;
});
