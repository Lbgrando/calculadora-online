async function carregarHistorico() {
  const res = await fetch("http://localhost:3000/historico", {
    method: "GET",
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok) {
    alert("Você precisa estar logado!");
    window.location.href = "index.html";
    return;
  }

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  data.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.expressao} = ${item.resultado} (${new Date(item.criado_em).toLocaleString()})`;
    lista.appendChild(li);
  });
}

carregarHistorico();
