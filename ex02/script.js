const btAdic = document.getElementById("btAdic");
const inputNum = document.getElementById("inputNum");
const inputSoma = document.getElementById("inputSoma");
let somatorio = 0;

btAdic.onclick = () => {
  let num = parseInt(inputNum.value);
  if (isNaN(num)) {
    alert("Digite um número inteiro!");
    return;
  }

  somatorio += num;
  inputSoma.value = somatorio;
  inputNum.value = "";
  inputNum.focus();
};
