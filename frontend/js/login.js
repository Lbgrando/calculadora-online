const form = document.getElementById("login-form");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch("http://localhost:3000/login", {
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

    window.location.href = "calculator.html";

  } catch (err) {
    mensagem.innerText = "Erro no servidor";
  }
});
