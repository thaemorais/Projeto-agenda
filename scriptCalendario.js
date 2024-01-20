// Função para abrir o calendário quando o botão for clicado
document
	.getElementById("botaoCalendario")
	.addEventListener("click", function () {
		const calendario = document.getElementById("calendario");
		const agenda = document.getElementById("agenda");
		const compromissos = document.getElementById("compromissos");

		if (agenda.style.display == "block") {
			alternarExibicao(agenda, calendario);
		} else if (compromissos.style.display == "block") {
			alternarExibicao(compromissos, calendario);
		}
	});

// Função para alternar exibição entre uma div e outra
function alternarExibicao(divAtual, divDestino) {
    if (window.getComputedStyle(divAtual).display !== "none") {
        divAtual.style.display = "none";
        divDestino.style.display = "block";
    }
}


// Adicione este trecho no seu arquivo JavaScript
const tabelaCalendario = document.getElementById("tabelaCalendario");
const tituloMesAno = document.getElementById("tituloMesAno");
const corpoCalendario = document.getElementById("corpoCalendario");

function exibirCalendario(mes, ano) {
	// Limpar o conteúdo anterior da tabela
	corpoCalendario.innerHTML = "";

	// Lógica para obter os dias do mês e preencher a tabela
	const primeiroDia = new Date(ano, mes, 1);
	const ultimoDia = new Date(ano, mes + 1, 0);

	let diaAtual = new Date(primeiroDia);
	let linha = document.createElement("tr");

	// Preencher células vazias até o primeiro dia da semana
	for (let i = 0; i < primeiroDia.getDay(); i++) {
		const celulaVazia = document.createElement("td");
		linha.appendChild(celulaVazia);
	}

	// Preencher os dias do mês
	while (diaAtual <= ultimoDia) {
		const celula = document.createElement("td");
		celula.textContent = diaAtual.getDate();
		linha.appendChild(celula);

		// Avançar para o próximo dia
		diaAtual.setDate(diaAtual.getDate() + 1);

		// Quebrar a linha no final da semana
		if (diaAtual.getDay() === 0) {
			corpoCalendario.appendChild(linha);
			linha = document.createElement("tr");
		}
	}

	// Preencher células vazias após o último dia da semana
	for (let i = diaAtual.getDay(); i < 7; i++) {
		const celulaVazia = document.createElement("td");
		linha.appendChild(celulaVazia);
	}

	// Adicionar a última linha à tabela
	corpoCalendario.appendChild(linha);

	// Atualizar o título com o mês e ano
	tituloMesAno.textContent = `${obterNomeMes(mes)} ${ano}`;
}

function obterNomeMes(mes) {
	const meses = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];
	return meses[mes];
}

function navegarMes(anterior) {
	const dataAtual = new Date(tituloMesAno.textContent);
	let novoMes = dataAtual.getMonth() + (anterior ? -1 : 1);
	let novoAno = dataAtual.getFullYear();

	if (novoMes < 0) {
		novoMes = 11;
		novoAno -= 1;
	} else if (novoMes > 11) {
		novoMes = 0;
		novoAno += 1;
	}

	exibirCalendario(novoMes, novoAno);
}

// Adicione event listeners para os botões de navegação do calendário
document
	.getElementById("botaoAnteriorCalendario")
	.addEventListener("click", function () {
		navegarMes(true);
	});

document
	.getElementById("botaoProximoCalendario")
	.addEventListener("click", function () {
		navegarMes(false);
	});
