const $form = document.querySelector('#myForm');
const $output = document.querySelector('#output');

$form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtenemos los valores de entrada
  let yPrimeText = e.target.yPrime.value;
  let x0 = parseFloat(e.target.x0.value);
  let y0 = parseFloat(e.target.y0.value);
  let yn = parseFloat(e.target.yn.value);

  const eulerMejorado = (f, x0, y0, yn, n) => {
    let h = (yn - x0) / n;
    let y = y0;
    let x = x0;
    for (let i = 0; i < n; i++) {
      let y_pred = y + h * f(x, y);
      y = y + (h / 2) * (f(x, y) + f(x + h, y_pred));
      x = x + h;
    }
    return y;
  };

  const yPrime = (x, y) => eval(yPrimeText);

  let y = eulerMejorado(yPrime, x0, y0, yn, 1000);

  $output.innerHTML = `El valor de y en el punto y<sub>n</sub> es ${y}`;
});
