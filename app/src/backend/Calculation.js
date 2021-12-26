export function euclidean(m, n) {
  let r = 0;
  while (n !== 0) {
    r = m % n;
    m = n;
    n = r;
  }
  let gcd = m;
  return gcd;
}

export function isCoprime(a, b) {
  return euclidean(a, b) === 1;
}

export function checkCoprime(arrayOfEquation) {
  let coprime = [];
  for (let i = 0; i < arrayOfEquation.length; i++) {
    for (let j = i; j < arrayOfEquation.length; j++) {
      if (i !== j) {
        if (isCoprime(arrayOfEquation[i][1], arrayOfEquation[j][1])) {
          coprime.push([arrayOfEquation[i][1], arrayOfEquation[j][1], true]);
        } else {
          coprime.push([arrayOfEquation[i][1], arrayOfEquation[j][1], false]);
        }
      }
    }
  }
  return coprime;
}

export function isAllCoprime(arrayOfEquation) {
  const coprime = checkCoprime(arrayOfEquation);
  let allCoprime = true;
  for (let i = 0; i < coprime.length; i++) {
    if (coprime[i][2] === false) {
      allCoprime = false;
    }
  }
  return allCoprime;
}

export function moduloInverse(a, m) {
  for (let i = 0; i < m; i++) {
    if ((a * i) % m === 1) {
      return i;
    }
  }
  return -1;
}

export function calculateModuloProduct(arrayOfEquation) {
  let m = 1;
  arrayOfEquation.forEach((element) => {
    m *= element[1];
  });
  return m;
}

export function calculateCoefficient(arrayOfEquation) {
  const m = calculateModuloProduct(arrayOfEquation);
  let arrayOfCoefficient = [];
  arrayOfEquation.forEach((element) => {
    arrayOfCoefficient.push(m / element[1]);
  });
  return arrayOfCoefficient;
}

export function calculateInverse(arrayOfEquation) {
  const M = calculateCoefficient(arrayOfEquation);
  let inverse = [];
  for (let i = 0; i < arrayOfEquation.length; i++) {
    inverse.push(moduloInverse(M[i], arrayOfEquation[i][1]));
  }
  return inverse;
}

export function crtSolver(arrayOfEquation) {
  let sum = 0;
  const m = calculateModuloProduct(arrayOfEquation);
  const M = calculateCoefficient(arrayOfEquation);
  const y = calculateInverse(arrayOfEquation);
  for (let i = 0; i < arrayOfEquation.length; i++) {
    sum += arrayOfEquation[i][0] * M[i] * y[i];
  }
  const x = sum % m;
  return [m, M, y, sum, x];
}
