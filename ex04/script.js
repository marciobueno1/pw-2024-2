const inputID = document.getElementById("inputID");
const btFetch = document.getElementById("btFetch");
const prePersonagem = document.getElementById("prePersonagem");

const handleBtFetchClick = () => {
  const id = inputID.value.trim();
  if (!id) {
    alert("Precisa digitar o ID!");
    return;
  }

  fetch(`https://swapi.dev/api/people/${id}`)
    .then((response) => {
      console.log(response);
      if (response.ok) {
        console.log("Sucesso!");
      } else {
        console.log("Erro: ", response.status, response.statusText);
        alert("Erro ao acessar o servidor - ID inválido?");
        throw new Error("Erro encontrado: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log("data", data);
      // prePersonagem.innerHTML = JSON.stringify(data);
      prePersonagem.innerHTML = `${data.name} - ${data.birth_year}`;
    })
    .catch((error) => {
      console.log(error);
    });
};

btFetch.onclick = handleBtFetchClick;
