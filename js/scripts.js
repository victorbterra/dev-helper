let dados = [];

const resultadoContainer = document.querySelector("#resultado-pesquisa");
const btnPesquisa = document.querySelector("#btn-pesquisa");

async function carregarDados() {
  const campoPesquisa = document.querySelector("#campo-pesquisa");
  const valorPesquisa = campoPesquisa.value.toLowerCase();

  try {
    const resposta = await fetch("mock/erros.json");
    dados = await resposta.json();
  } catch (erro) {
    mensagemErro("Erro ao carregar dados: ");
    return;
  }
}
