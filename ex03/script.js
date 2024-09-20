const btAdic = document.getElementById("btAdic");
const inputNum = document.getElementById("inputNum");
const inputSoma = document.getElementById("inputSoma");
const inputMedia = document.getElementById("inputMedia");
const inputQtd = document.getElementById("inputQtd");
const btLimpar = document.getElementById("btLimpar");
let somatorio = 0;
let qtd = 0;

const handleBtAdicionarClick = () => {
  let num = parseInt(inputNum.value);
  if (isNaN(num)) {
    alert("Digite um número inteiro!");
    inputNum.focus();
    return;
  }

  ++qtd;
  somatorio += num;
  const media = somatorio / qtd;
  inputSoma.value = somatorio;
  inputMedia.value = media;
  inputQtd.value = qtd;
  inputNum.value = "";
  inputNum.focus();
};

const handleBtLimparClick = (evt) => {
  console.log("evt.target", evt.target);
  inputSoma.value = 0;
  inputMedia.value = 0;
  inputQtd.value = 0;
  inputNum.value = "";
  inputNum.focus();
};

// configuração de todos os eventos
btAdic.onclick = handleBtAdicionarClick;
btLimpar.onclick = handleBtLimparClick;
