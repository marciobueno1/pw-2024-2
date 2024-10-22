const olTarefas = document.getElementById("olTarefas");
const inputDescricao = document.getElementById("inputDescricao");
const btAdicionar = document.getElementById("btAdicionar");

const baseURL = "https://parseapi.back4app.com/classes/Tarefa";
const headers = {
  "X-Parse-Application-Id": "IjMQNnxBbsuYKEsnvNuQhwiEw9pkLJkwWfhB9aG1",
  "X-Parse-REST-API-Key": "ip0a7zYuKwJNXicmLC5TkLN6DGWVbLhRtIYDjU6R",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

const getUser = () => {
  let user = null;
  const userJson = localStorage.user;
  if (userJson) {
    user = JSON.parse(userJson);
  }
  console.log("user", user);
  return user;
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
  let user = getUser();
  if (!user) {
    alert("Você precisa estar logado");
    return;
  }

  try {
    cb.disabled = true;
    const response = await fetch(`${baseURL}/${tarefa.objectId}`, {
      method: "PUT",
      headers: {
        ...headersJson,
        "X-Parse-Session-Token": user.sessionToken,
      },
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
  let user = getUser();
  if (!user) {
    alert("Você precisa estar logado");
    return;
  }
  try {
    bt.disabled = true;
    const response = await fetch(`${baseURL}/${tarefa.objectId}`, {
      method: "DELETE",
      headers: {
        ...headers,
        "X-Parse-Session-Token": user.sessionToken,
      },
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
  let user = getUser();
  if (!user) {
    alert("Você precisa estar logado para listar as tarefas!");
    return;
  }
  try {
    console.log("baseURL", baseURL);
    console.log("headers", {
      ...headers,
      "X-Parse-Session-Token": user.sessionToken,
    });
    const response = await fetch(baseURL, {
      method: "GET",
      headers: {
        ...headers,
        "X-Parse-Session-Token": user.sessionToken,
      },
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
  let user = getUser();
  if (!user) {
    alert("Você precisa estar logado");
    return;
  }
  const descricao = inputDescricao.value.trim();
  if (!descricao) {
    alert("Necessário adicionar uma descrição para criar a tarefa!");
    inputDescricao.focus();
    return;
  }
  try {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: {
        ...headersJson,
        "X-Parse-Session-Token": user.sessionToken,
      },
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

const handleWindowOnLoad = () => {
  console.log("onload");
  let user = getUser();
  if (!user) {
    location.assign("../login.html");
  }
  getTarefas();
};

window.onload = handleWindowOnLoad;
btAdicionar.onclick = handleBtAdicionarClick;
