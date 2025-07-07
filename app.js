let listaDeNumerosSorteados = [];
let numeroLimite = 10; // Limite do numero que pode ser sorteado
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {
        rate: 1.2
    });
}

function exibirMensagemInicial () {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 10');
}
exibirMensagemInicial();


function verificarChute() {
    let chute = document.querySelector('input').value; // Pega o valor do input

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o numero com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O numero secreto é menor');
    } else {
        exibirTextoNaTela('p', 'O numero secreto é maior');
    }
    tentativas++;
    limparCampo();
}

function gerarNumeroAleatorio () {
    let numeroEscolhido =  parseInt(Math.random() * numeroLimite ) +1; // Gera numero aleatorio
    let quantidadeDeElementosDaLista = listaDeNumerosSorteados.length; // Pega a quantidade de elementos da lista

    if (quantidadeDeElementosDaLista == numeroLimite) {
        listaDeNumerosSorteados = []; // Se a lista tiver 10 elementos, limpa a lista
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); // Se o numero ja foi sorteado, chama a função novamente
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o numero sorteado na lista
        return numeroEscolhido; // Se o numero não foi sorteado, retorna o numero
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo() {
    numeroSecreto = gerarNumeroAleatorio;
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}