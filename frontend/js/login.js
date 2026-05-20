async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, senha })
  });

  const data = await res.json();

  if (res.ok) {
    window.location.href = "calculator.html";
  } else {
    document.getElementById("msg").innerText = data.erro;
  }
}
