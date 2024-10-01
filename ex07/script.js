const olTarefas = document.getElementById("olTarefas");
const inputDescricao = document.getElementById("inputDescricao");
const btAdicionar = document.getElementById("btAdicionar");

const baseURL = "https://parseapi.back4app.com/classes/Tarefa";
const headers = {
  "X-Parse-Application-Id": "4cRNaPFAu9tGO59OrBIJpH4v6qeHUUbtReuVmjP7",
  "X-Parse-REST-API-Key": "x3OZm4ZBkTNLy3jJUc9JImiuAi6XK4ih7zfKOVwk",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

const createList = (data) => {
  olTarefas.innerHTML = "";
  const tarefas = data.results;
  tarefas.forEach((tarefa) => {
    const text = document.createTextNode(`${tarefa.descricao} `);
    const li = document.createElement("li");
    li.appendChild(text);
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = tarefa.concluida;
    cb.onchange = () => handleCheckboxClick(cb, tarefa);
    li.appendChild(cb);
    const bt = document.createElement("button");
    bt.innerHTML = "x";
    bt.onclick = () => handleBtRemoverClick(bt, tarefa);
    li.appendChild(bt);
    olTarefas.appendChild(li);
  });
};

const handleCheckboxClick = async (cb, tarefa) => {
  try {
    cb.disabled = true;
    const response = await fetch(`${baseURL}/${tarefa.objectId}`, {
      method: "PUT",
      headers: headersJson,
      body: JSON.stringify({ concluida: !tarefa.concluida }),
    });
    cb.disabled = false;
    console.log(response);
    if (!response.ok) {
      cb.checked = !cb.checked;
      alert("Erro ao acessar o servidor: " + response.status);
      throw new Error("Erro encontrado: " + response.status);
    }
  } catch (error) {
    cb.checked = !cb.checked;
    console.log(error);
  }
};

const handleBtRemoverClick = async (bt, tarefa) => {
  try {
    bt.disabled = true;
    const response = await fetch(`${baseURL}/${tarefa.objectId}`, {
      method: "DELETE",
      headers: headers,
    });
    bt.disabled = false;
    console.log(response);
    if (!response.ok) {
      alert("Erro ao acessar o servidor: " + response.status);
      throw new Error("Erro encontrado: " + response.status);
    }
    getTarefas();
  } catch (error) {
    console.log(error);
  }
};

const getTarefas = async () => {
  try {
    const response = await fetch(baseURL, {
      method: "GET",
      headers: headers,
    });
    console.log(response);
    if (!response.ok) {
      alert("Erro ao acessar o servidor: " + response.status);
      throw new Error("Erro encontrado: " + response.status);
    }
    const data = await response.json();
    createList(data);
  } catch (error) {
    console.log(error);
  }
};

const handleBtAdicionarClick = async () => {
  const descricao = inputDescricao.value.trim();
  if (!descricao) {
    alert("Necessário adicionar uma descrição para criar a tarefa!");
    inputDescricao.focus();
    return;
  }
  try {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: headersJson,
      body: JSON.stringify({ descricao: descricao }),
    });
    console.log(response);
    if (!response.ok) {
      alert("Erro ao acessar o servidor: " + response.status);
      throw new Error("Erro encontrado: " + response.status);
    }
    inputDescricao.value = "";
    inputDescricao.focus();
    getTarefas();
  } catch (error) {
    console.log(error);
  }
};

window.onload = getTarefas;
btAdicionar.onclick = handleBtAdicionarClick;
