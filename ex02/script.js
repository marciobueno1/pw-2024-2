const btAdic = document.getElementById("btAdic");
const inputNum = document.getElementById("inputNum");
const inputSoma = document.getElementById("inputSoma");
const inputMedia = document.getElementById("inputMedia");
const inputQtd = document.getElementById("inputQtd");
const btLimpar = document.getElementById("btLimpar");
let somatorio = 0;
let qtd = 0;

btAdic.onclick = () => {
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

btLimpar.onclick = () => {
  inputSoma.value = 0;
  inputMedia.value = 0;
  inputQtd.value = 0;
  inputNum.value = "";
  inputNum.focus();
};
