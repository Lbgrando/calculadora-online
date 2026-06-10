const lista = document.getElementById("lista-historico");


async function carregarHistorico() {


  try {


    const resposta = await fetch("http://localhost:3000/historico", {
      method: "GET",
      credentials: "include"
    });


    const dados = await resposta.json();


    console.log(dados);


    lista.innerHTML = "";


    dados.forEach(item => {


      lista.innerHTML += `
        <div>
          <p>${item.expressao} = ${item.resultado}</p>
          <small>
            ${new Date(item.criado_em).toLocaleString()}
          </small>
          <hr>
        </div>
      `;
    });


  } catch (err) {


    console.log(err);


    lista.innerHTML = `
      <p>Erro ao carregar histórico</p>
    `;
  }
}


carregarHistorico();