// Solver
// import React from "react";
// import ReactDOM from "react-dom";
// import "../solver"
// import Calculator from "./components/Calculator"

// function tes() {
//     let name = document.getElementById('fname');
//     return "Mau coba ajah"+name;
// }


function euclidean(m,n) {
   let r = 0;
   while (n !== 0) {
       r = m % n;
       m = n;
       n = r;
   }
   const gcd = m;
   return gcd;
};

function isCoprime(a,b) {
    return (euclidean(a,b) === 1);
}


function checkCoprime(equations) {
    let coprime = [];
    for (let i = 0; i < equations.length; i++) {
        for (let j = i; j < equations.length; j++) {
            if (i != j) {
                if (isCoprime(equations[i][1],equations[j][1])) {
                    coprime.push([equations[i][1],equations[j][1],true]);
                }
                else {
                    coprime.push([equations[i][1],equations[j][1],false]);
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
    while ((i < coprime.length) && (coprime[i][2] === false)) {
        allCoprime = false;
        i++;
    }
    return allCoprime;
}

function moduloInverse(a,m) {
    for (let i = 0; i < m; i++) {
        if ((a*i) % m === 1) {
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
    let arrayOfCoefficient = [];
    equations.forEach(element => {
        arrayOfCoefficient.push(m/element[1]);
    });
    return arrayOfCoefficient;
}

function calculateInverse(equations) {
    const M = calculateCoefficient(equations);
    let inverse = [];
    for (let i = 0; i < equations.length; i++) {
        inverse.push(moduloInverse(M[i],equations[i][1]));
    }
    return inverse;
}

function crtSolver(equations) {
    let sum = 0;
    const m = calculateModuloProduct(equations);
    const M = calculateCoefficient(equations);
    const y = calculateInverse(equations);
    for (let i = 0; i < equations.length; i++) {
        sum += equations[i][0] * M[i] * y[i];
    }
    const x = sum % m;
    return [m,M,y,sum,x];
}

// TODO String formatting functions
function singleEquationToString(equations) {

}

function makeEquation() {

}

// console.log(euclidean(80,12));
console.log(euclidean(4,9)); //ok
console.log(isCoprime(4,9)); //ok
console.log(checkCoprime([[3,5],[5,7],[7,11]]));
console.log(isAllCoprime([[3,5],[5,7],[7,11]]));
console.log("Modulo product = ",calculateModuloProduct([[3,5],[5,7],[7,11]]));
console.log(calculateCoefficient([[3,5],[5,7],[7,11]]));
console.log(calculateInverse([[3,5],[5,7],[7,11]]));
console.log(crtSolver([[3,5],[5,7],[7,11]]))