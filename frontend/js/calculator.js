const form = document.getElementById("calculator-form");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const expressao = document.getElementById("expressao").value;

  try {

    const resposta = await fetch("http://localhost:3000/calcular", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        expressao
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      resultado.innerText = dados.erro;
      return;
    }

    resultado.innerText = `${expressao} = ${dados.resultado}`;

  } catch (err) {
    console.log(err);
    resultado.innerText = "Erro no servidor";
  }
});
