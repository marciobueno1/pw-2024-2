const inputMin = document.getElementById("inputMin");
const inputMax = document.getElementById("inputMax");
const btSortear = document.getElementById("btSortear");
const h1Resultado = document.getElementById("h1Resultado");

const handleBtSortearClick = () => {
  let min = parseInt(inputMin.value);
  let max = parseInt(inputMax.value);

  if (isNaN(min)) {
    alert("Digite um número inteiro para o menor valor!");
    inputMin.value = "";
    inputMin.focus();
    return;
  }

  if (isNaN(max)) {
    alert("Digite um número inteiro para o maior valor!");
    inputMax.value = "";
    inputMax.focus();
    return;
  }

  if (min > max) {
    alert("O  menor valor precisa ser menor ou igual ao maior valor!");
    inputMin.focus();
    return;
  }

  let intervalo = max - min + 1;
  h1Resultado.innerHTML = Math.trunc(Math.random() * intervalo) + min;
};

// configuração de todos os eventos
btSortear.onclick = handleBtSortearClick;
