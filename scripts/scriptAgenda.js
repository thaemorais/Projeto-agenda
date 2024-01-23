// Variáveis globais
const anotacoesPorData = {};
let dataAtual = new Date();

// Função para abrir a agenda quando o botão for clicado
document.getElementById("botaoAgenda").addEventListener("click", function () {
	const agenda = document.getElementById("agenda");
	agenda.style.display = "block";
});

// Função para inicializar a página com o Flatpickr
function inicializarPagina() {
	const seletorData = document.getElementById("seletorData");

	flatpickr(seletorData, {
		dateFormat: "Y-m-d",
		defaultDate: "today",
		onChange: function (selectedDates, dateStr) {
			const dataSelecionada = new Date(dateStr);
			exibirAnotacoesParaData(dataSelecionada);
		},
	});
	// Exibir as anotações para a data de hoje ao carregar a página
	exibirAnotacoesParaData(dataAtual);
}

// Função para exibir as anotações para uma data específica
function exibirAnotacoesParaData(data) {
    // Ajustar para o mesmo fuso horário
    const dataFormatada = new Date(Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()));

    const chaveData = obterChaveData(dataFormatada);
    const anotacoes = anotacoesPorData[chaveData] || [];
    const agendaTexto = document.querySelector(".agenda-texto");

    agendaTexto.innerHTML = anotacoes.join("<br>");

    // Atualizar a exibição da data
    atualizarDataHoje(dataFormatada);
}


// Função para inicializar o Flatpickr
function inicializarCalendario() {
	const seletorData = document.getElementById("seletorData");

	flatpickr(seletorData, {
		dateFormat: "d-m-Y",
		defaultDate: "today",
		onChange: function (selectedDates, dateStr) {
			redirecionarParaPaginaAnotacoes(dateStr);
		},
	});
}

// Função para redirecionar para a página de anotações com a data selecionada
function redirecionarParaPaginaAnotacoes(dataSelecionada) {
	// Você pode ajustar a URL conforme necessário
	const urlPaginaAnotacoes = `/anotacoes?data=${dataSelecionada}`;

	// Redirecionar para a página de anotações
	window.location.href = urlPaginaAnotacoes;
}

// Função para navegar para a próxima página
function navegarProximaPagina() {
    console.log("Navegando para a próxima página");
    dataAtual.setDate(dataAtual.getDate() + 1);
    exibirAnotacoesParaData(dataAtual);
}

// Função para navegar para a página anterior
function navegarPaginaAnterior() {
    console.log("Navegando para a página anterior");
    dataAtual.setDate(dataAtual.getDate() - 1);
    exibirAnotacoesParaData(dataAtual);
}

// Função para obter a data no formato "Dia de Mês de Ano"
function obterDataFormatada(data) {
	const dia = data.getDate();
	const mes = data.toLocaleString("default", { month: "long" });
	const ano = data.getFullYear();
	return `${dia} de ${mes} de ${ano}`;
}

// Função para atualizar a exibição da data
function atualizarDataHoje(data) {
	const dataHojeElemento = document.getElementById("data-hoje");
	const dataExibicao = data ? obterDataFormatada(data) : obterDataFormatada(new Date());
	dataHojeElemento.textContent = `${dataExibicao}`;
}

// Função para obter a chave da data no formato YYYY-MM-DD para armazenamento da anotação
function obterChaveData(data) {
	const ano = data.getFullYear();
	const mes = String(data.getMonth() + 1).padStart(2, "0");
	const dia = String(data.getDate()).padStart(2, "0");
	console.log("Obtendo a chave da data");
	return `${ano}-${mes}-${dia}`;
}



// Função para salvar a anotação
function salvarAnotacao() {
	const agendaTexto = document.querySelector(".agenda-texto");
	const anotacaoTexto = agendaTexto.innerHTML.trim();

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

		console.log("Salvando anotação");
	}
}

// Chamando a função para inicializar a exibição da data
atualizarDataHoje();

// Adicionando um ouvinte de evento para o botão "Próxima Página"
document
	.getElementById("botaoProxima")
	.addEventListener("click", navegarProximaPagina);

// Adicionando um ouvinte de evento para o botão "Página Anterior"
document
	.getElementById("botaoAnterior")
	.addEventListener("click", navegarPaginaAnterior);

// Adicionando um ouvinte de evento para o botão "Salvar Anotação"
document
	.getElementById("botaoSalvar")
	.addEventListener("click", salvarAnotacao);

// Adicionando um ouvinte de evento para garantir que a inicialização ocorra após o carregamento da página
document.addEventListener("DOMContentLoaded", function () {
    inicializarPagina();
});

