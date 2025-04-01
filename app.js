//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDenumerosSorteados = []
let numeroLimite = 10;
let numeroScreto = gerarNumeroAleatorio();
let tentativas = 1

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2});
}

function exibirMensagemInicial() {

exibirTextoNaTela ('h1', 'Jogo do número secreto');
exibirTextoNaTela ('p', 'Escolha um número entre 1 e 10');

}
//*** */
exibirMensagemInicial();

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdDeElementosNaLista = listaDenumerosSorteados.length;

    if (qtdDeElementosNaLista == numeroLimite){
        listaDenumerosSorteados = []
    }
    if (listaDenumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDenumerosSorteados.push(numeroEscolhido);
        console.log(listaDenumerosSorteados);
        return numeroEscolhido
    }
}

 // para saber só o valor digitado coloca .value
function verificarChute(){
    let chute = document.querySelector('input').value;
            if  (chute == numeroScreto){
            exibirTextoNaTela ('h1', 'Você acertou!');
                let palavraTentativa = tentativas > 1 ? ' tentativas' : ' tentativa';
                let mensagemmTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`
            exibirTextoNaTela ('p',mensagemmTentativas);
            document.getElementById('reiniciar').removeAttribute('disabled');
        }else{
            if( chute > numeroScreto){
            exibirTextoNaTela ('p', 'O numero é menor que: ' +chute);
             }else{
            exibirTextoNaTela ('p', 'O numero é maior que: ' +chute)
            
            }
            
            tentativas++
            limparCampo();
        }

}

function limparCampo() {
   chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroScreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}