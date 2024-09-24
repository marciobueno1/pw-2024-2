const olPersonagens = document.getElementById("olPersonagens");
const btPrevious = document.getElementById("btPrevious");
const btNext = document.getElementById("btNext");

const createList = (url, data) => {
  const personagens = data.results;
  const page = Number(url.split("=")[1]);
  olPersonagens.innerHTML = "";
  olPersonagens.start = `${(page - 1) * 10 + 1}`;
  personagens.forEach((personagem) => {
    const text = document.createTextNode(
      `${personagem.name} - ${personagem.birth_year}`
    );
    const li = document.createElement("li");
    li.appendChild(text);
    olPersonagens.appendChild(li);
  });
  btPrevious.disabled = data.previous == null;
  btPrevious.onclick = () => fetchList(data.previous);
  btNext.disabled = data.next == null;
  btNext.onclick = () => fetchList(data.next);
};

const fetchList = (url) => {
  fetch(url)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        alert("Erro ao acessar o servidor: " + response.status);
        throw new Error("Erro encontrado: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      createList(url, data);
    })
    .catch((error) => {
      console.log(error);
    });
};

window.onload = () => fetchList(`https://swapi.dev/api/people/?page=1`);
