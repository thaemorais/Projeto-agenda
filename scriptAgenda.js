// Dicionário para armazenar anotações por data
const anotacoesPorData = {};

// Função para abrir a agenda quando o botão for clicado
document.getElementById("botaoAgenda").addEventListener("click", function () {
	const agenda = document.getElementById("agenda");
	const calendario = document.getElementById("calendario");
	const compromissos = document.getElementById("compromissos");

	if (calendario.style.display == "block") {
		alternarExibicao(calendario, agenda);
	} else if (compromissos.style.display == "block") {
		alternarExibicao(compromissos, agenda);
	}
});

// Função para alternar exibição entre uma div e outra
function alternarExibicao(divAtual, divDestino) {
	divAtual.style.display = "none";
	divDestino.style.display = "block";
}

// Função para selecionar uma data no seletor de datas
function selecionarData(data) {
	const dataSelecionada = new Date(data);
	exibirAnotacoesParaData(dataSelecionada);
}

// Função para formatar a data para o formato do seletor
function formatarDataParaSeletor(data) {
	const ano = data.getFullYear();
	const mes = String(data.getMonth() + 1).padStart(2, "0");
	const dia = String(data.getDate()).padStart(2, "0");
	return `${ano}-${mes}-${dia}`;
}

// Função para preencher o seletor de datas com opções próximas à data atual
function preencherSeletorData() {
	const seletorData = document.getElementById("seletorData");
	const dataAtual = new Date();

	// Adicionar opções para os próximos 5 dias antes e 5 dias depois
	for (let i = -5; i <= 5; i++) {
		const dataOpcao = new Date(dataAtual);
		dataOpcao.setDate(dataAtual.getDate() + i);

		const opcao = document.createElement("option");
		opcao.value = formatarDataParaSeletor(dataOpcao);
		opcao.textContent = obterDataHoje(dataOpcao);

		seletorData.appendChild(opcao);
	}
}

// Função para obter a data de hoje no formato "Dia de Mês de Ano"
function obterDataHoje() {
	const hoje = new Date();
	const dia = hoje.getDate();
	const mes = hoje.toLocaleString("default", { month: "long" });
	const ano = hoje.getFullYear();
	return `${dia} de ${mes} de ${ano}`;
}

// Função para atualizar a exibição da data
function atualizarDataHoje(data) {
	const dataHojeElemento = document.getElementById("data-hoje");
	const dataExibicao = data ? obterDataHoje(data) : obterDataHoje(new Date());
	dataHojeElemento.textContent = `${dataExibicao}`;
}

// Função para obter a chave da data no formato YYYY-MM-DD para armazenamento da anotação
function obterChaveData(data) {
	const ano = data.getFullYear();
	const mes = String(data.getMonth() + 1).padStart(2, "0");
	const dia = String(data.getDate()).padStart(2, "0");
	return `${ano}-${mes}-${dia}`;
}

// Função para salvar a anotação
function salvarAnotacao() {
	const cadernoTexto = document.querySelector(".caderno-texto");
	const anotacaoTexto = cadernoTexto.innerHTML.trim();

	if (anotacaoTexto !== "") {
		const dataHoje = new Date();
		const chaveData = obterChaveData(dataHoje);

		if (!anotacoesPorData[chaveData]) {
			anotacoesPorData[chaveData] = [];
		}

		anotacoesPorData[chaveData].push(anotacaoTexto);

		// Armazenar no localStorage
		localStorage.setItem("anotacoesPorData", JSON.stringify(anotacoesPorData));

		// Atualizar a interface
		exibirAnotacoesParaData(dataHoje);
	}
}

// Função para exibir as anotações para uma data específica
function exibirAnotacoesParaData(data) {
	const chaveData = obterChaveData(data);
	const anotacoes = anotacoesPorData[chaveData] || [];

	const cadernoTexto = document.querySelector(".caderno-texto");
	cadernoTexto.innerHTML = anotacoes.join("<br>");

	// Atualizar a exibição da data
	atualizarDataHoje(data);
}

// Chamando a função para inicializar a exibição da data
atualizarDataHoje();

// Chamando a função para preencher o seletor de datas
preencherSeletorData();

// Adicionando um ouvinte de evento para o botão "Salvar Anotação"
document
	.getElementById("botaoSalvar")
	.addEventListener("click", salvarAnotacao);

// Adicionando um ouvinte de evento para o botão "Próxima Página"
document
	.getElementById("botaoProxima")
	.addEventListener("click", navegarProximaPagina);

// Adicionando um ouvinte de evento para o botão "Página Anterior"
document
	.getElementById("botaoAnterior")
	.addEventListener("click", navegarPaginaAnterior);
