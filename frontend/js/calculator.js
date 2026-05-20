async function calcular() {
  const expressao = document.getElementById("expressao").value;

  const res = await fetch("http://localhost:3000/calcular", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ expressao })
  });

  const data = await res.json();

  if (res.ok) {
    document.getElementById("resultado").innerText =
      `${data.expressao} = ${data.resultado}`;
  } else {
    document.getElementById("resultado").innerText = data.erro;
  }
}
