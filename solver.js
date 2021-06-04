// Solver

function euclidean(m,n) {
   let r = 0;
   while (n != 0) {
       r = m % n;
       m = n;
       n = r;
   }
   let pbb = m;
   return pbb;
};

function isCoprime(a,b) {
    return (euclidean(a,b) == 1);
}

function checkCoprime(equations) {
    let coprime = [];
    for (let i = 0; i < equations.length; i++) {
        for (let j = i; j < equations.length; j++) {
            if (i != j) {
                if (euclidean(equations[i][1],equations[j][1] != 1)) {
                    coprime.push([i,j,false]);
                }
                else {
                    coprime.push([i,j,true]);
                }
            }
        }
    }
    return coprime;
}

function isAllCoprime(equations) {
    const coprime = checkCoprime(equations);
    let i = 0;
    let allCoprime = true;
    while ((i < coprime.length) && (coprime[i][2] == false)) {
        allCoprime = false;
        i++;
    }
    return allCoprime;
}

function moduloInverse(a,m) {
    for (let i = 0; i < m; i++) {
        if ((a*i) % m == 1) {
            return i;
        }
    }
    return -1;
}

function calculateModuloProduct(equations) {
    let m = 1;
    equations.forEach(element => {
        m *= element[1];
    });
    return m;
}

function calculateCoefficient(equations) {
    const m = calculateModuloProduct(equations);
    // let arrayOfCoefficient = [];
    // equations.forEach(element => {
    //     arrayOfCoefficient.push(m/element);
    // });
    const arrayOfCoefficient = equations.map(element => (m/element));
    return arrayOfCoefficient;
}

function calculateInverse(equations) {
    const M = calculateCoefficient(equations);
    const inverse = equations.map(moduloInverse(M[i],equations[i][1]));
    return inverse;
}

function crtSolver(equations) {
    let sum = 0;
    const M = calculateCoefficient(equations);
    const y = calculateInverse(equations);
    for (let i = 0; i < equations.length; i++) {
        sum += equations[i][0] * M[i] * y[i];
    }
    const x = sum % M;
    return x;
}

// TODO String formatting functions
function singleEquationToString(equations) {

}

function makeEquation() {

}

// console.log(euclidean(80,12));
// console.log(euclidean(4,9));

// const N = 3;