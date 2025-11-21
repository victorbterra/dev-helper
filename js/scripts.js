let dados = [];

const resultadoContainer = document.querySelector("#resultado-pesquisa");
const btnPesquisa = document.querySelector("#btn-pesquisa");



async function carregarDados() {
  const campoPesquisa = document.querySelector("#campo-pesquisa");
  const valorPesquisa = campoPesquisa.value.toLowerCase();

  if(!valorPesquisa) {
    alert("Por favor, insira um termo de pesquisa.");
    return;
  } // verifica se o campo está vazio

  if (dados.length === 0) {
    try {
      const resposta = await fetch("mock/erros.json"); // faz a requisição para o arquivo JSON
      if (!resposta.ok) {throw new Error("Erro na requisição: " + resposta.status);} // verifica resposta da requisição
      dados = await resposta.json(); // armazena os dados carregados
    } catch (erro) {
      console.error("Erro ao carregar dados:", erro);
      alert("Não foi possível carregar os dados. Tente novamente mais tarde.");
      return;
    }
} // carrega os dados apenas uma vez

    const resultados = dados.find((item) => item.titulo.toLowerCase().includes(valorPesquisa)
        || item.descricao.toLowerCase().includes(valorPesquisa)
        || item.tags.some(tag => tag.toLowerCase().includes(valorPesquisa))
        || item.possiveis_solucoes.some(solucao => solucao.toLowerCase().includes(valorPesquisa))
); // busca o termo na lista de erros

    if (resultados) {
        exbirResultados(resultados);
    } else {
        alert("Nenhum resultado encontrado para: " + valorPesquisa);
    } // exibe resultados ou mensagem de erro
}

function exbirResultados(resultado) {
    document.querySelector(".titulo-resultado").textContent = resultado.titulo;
    document.querySelector(".descricao-resultado").textContent = resultado.descricao;

    const exemploResultado = document.querySelector(".exemplo-resultado");
    exemploResultado.querySelector("code").textContent = resultado.exemplo;

    const listaTags = document.querySelector(".tags-wrapper");
    listaTags.innerHTML = resultado.tags
    .map((tag) => `<li class="tag-resultado">${tag}</li>`)
    .join(""); // cria lista de tags

    const listaSolucoes = document.querySelector(".lista-solucoes");
    listaSolucoes.innerHTML = resultado.possiveis_solucoes
    .map((solucao) => `<li><i class="fas fa-check-circle"></i>${solucao}</li>`)
    .join(""); // cria lista de soluções

    resultadoContainer.classList.remove("hidden");
}


const campoPesquisa = document.querySelector("#campo-pesquisa"); // seleciona o campo de pesquisa
campoPesquisa.addEventListener("input", carregarDados); // adiciona evento de input para pesquisa em tempo real
btnPesquisa.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        carregarDados();
    }
}); // adiciona evento de tecla para pesquisa ao pressionar Enter