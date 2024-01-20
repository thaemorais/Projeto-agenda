// Dicionário para armazenar anotações por data
const anotacoesPorData = {};

// Função para obter a data de hoje no formato "Dia de Mês de Ano"
function obterDataHoje() {
    const hoje = new Date();
    const dia = hoje.getDate();
    const mes = hoje.toLocaleString('default', { month: 'long' }); // Obtemos o nome do mês
    const ano = hoje.getFullYear();

    return `${dia} de ${mes} de ${ano}`;
}

// Função para obter a chave da data no formato "YYYY-MM-DD"
function obterChaveData(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Adiciona um zero à esquerda se necessário
    const dia = String(data.getDate()).padStart(2, '0'); // Adiciona um zero à esquerda se necessário
    return `${ano}-${mes}-${dia}`;
}

// Função para atualizar a exibição da data
function atualizarDataHoje(data) {
    const dataHojeElemento = document.getElementById('data-hoje');
    const dataExibicao = data ? obterDataHoje(data) : obterDataHoje(new Date());
    dataHojeElemento.textContent = `${dataExibicao}`;
}

// Função para salvar a anotação
function salvarAnotacao() {
    const cadernoTexto = document.querySelector('.caderno-texto');
    const anotacaoTexto = cadernoTexto.innerHTML.trim();

    if (anotacaoTexto !== '') {
        const dataHoje = new Date();
        const chaveData = obterChaveData(dataHoje);

        if (!anotacoesPorData[chaveData]) {
            anotacoesPorData[chaveData] = [];
        }

        anotacoesPorData[chaveData].push(anotacaoTexto);

        // Armazenar no localStorage
        localStorage.setItem('anotacoesPorData', JSON.stringify(anotacoesPorData));

        // Atualizar a interface
        exibirAnotacoesParaData(dataHoje);
    }
}



// Função para exibir as anotações para uma data específica
function exibirAnotacoesParaData(data) {
    const chaveData = obterChaveData(data);
    const anotacoes = anotacoesPorData[chaveData] || [];

    const cadernoTexto = document.querySelector('.caderno-texto');
    cadernoTexto.innerHTML = anotacoes.join('<br>');

    // Atualizar a exibição da data
    atualizarDataHoje(data);
}

// Função para navegar para a próxima página
function navegarProximaPagina() {
    const dataAtual = new Date();
    const dataProxima = new Date(dataAtual);
    dataProxima.setDate(dataAtual.getDate() + 1);

    // Atualizar a interface sem limpar a área de anotação
    exibirAnotacoesParaData(dataProxima);
}


// Função para exibir as anotações para uma data específica
function exibirAnotacoesParaData(data) {
    const chaveData = obterChaveData(data);
    const anotacoes = anotacoesPorData[chaveData] || [];

    const cadernoTexto = document.querySelector('.caderno-texto');
    cadernoTexto.innerHTML = anotacoes.join('<br>');

    // Atualizar a exibição da data
    atualizarDataHoje(data);
}

// Função para navegar para a página anterior
function navegarPaginaAnterior() {
    const dataAtual = new Date();
    const dataAnterior = new Date(dataAtual);
    dataAnterior.setDate(dataAtual.getDate() - 1);

    // Atualizar a interface
    exibirAnotacoesParaData(dataAnterior);
}

// Chamando a função para inicializar a exibição da data
atualizarDataHoje();

// Adicionando um ouvinte de evento para o botão "Salvar Anotação"
document.getElementById('botaoSalvar').addEventListener('click', salvarAnotacao);

// Adicionando um ouvinte de evento para o botão "Próxima Página"
document.getElementById('botaoProxima').addEventListener('click', navegarProximaPagina);

// Adicionando um ouvinte de evento para o botão "P
