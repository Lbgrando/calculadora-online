const form = document.getElementById("register-form");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        senha
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      mensagem.innerText = dados.erro;
      return;
    }

    mensagem.innerText = dados.mensagem;

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);

  } catch (err) {
    mensagem.innerText = "Erro no servidor";
  }
});
