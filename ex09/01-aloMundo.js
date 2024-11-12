console.log("Alô Mundo!");

// for (let i = 1; i <= 10; ++i) {
//   console.log(i);
// }

// alert("Olá!"); // alert não está diponível no nodeJS

// IMPRIMIR TODOS OS NUMEROS PRIMOS DE 1 A 100
function isPrime(n) {
  // versão otimizada!!!!
  if (n <= 1) return false; // 1 and below are not prime
  if (n <= 3) return true; // 2 and 3 are prime
  if (n % 2 === 0 || n % 3 === 0) return false; // Exclude multiples of 2 and 3
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false; // Check i and i + 2
  }
  return true;
}

function ehPrimo(n) {
  if (n < 2) {
    return false;
  }

  if (n == 2) {
    return true;
  }

  for (let i = 2; i < n / 2; ++i) {
    if (n % i == 0) {
      return false;
    }
  }

  return true;
}

let resposta = "2";
for (let i = 3; i <= 1000000; ++i) {
  if (isPrime(i)) {
    console.log(i);
    //resposta += ", " + i;
  }
}
console.log(resposta);
