
let bancoDeDados_img = [ 
    {class:"car1",
     scr:"assets/img/img1.png"},

     {class:"card2",
     scr:"assets/img/img2.png"},

     {class:"card3",
     scr:"assets/img/img3.png"},

     {class:"card4",
     scr:"assets/img/img4.png"},

     {class:"card5",
     scr:"assets/img/img5.png"},

     {class:"card6",
     scr:"assets/img/img6.png"},

     {class:"card7",
     scr:"assets/img/img7.png"},

     {class:"card8",
     scr:"assets/img/img8.png"},

     {class:"card9",
     scr:"assets/img/img9.png"},

     {class:"card10",
     scr:"assets/img/img10.png"},

     {class:"card11",
     scr:"assets/img/img11.png"},

     {class:"card12",
     scr:"assets/img/img12.png"},

     {class:"card13",
     scr:"assets/img/img13.png"},

     {class:"card14",
     scr:"assets/img/img14.png"},

     {class:"card15",
     scr:"assets/img/img15.png"}   
];
console.log(bancoDeDados_img)


//array para setar o id das cartas
let setId = [];
for (let i = 0; i < 30; i++) {
     setId[i] = "cart"+ (i+1);            
};


//====================================================================================================================

function iniciarJogo() {
    let dificuldade = document.getElementById("dificuldade_id").value;
    let nome = document.getElementById("nome_id").value;
    let numeros_de_cartas = 0;
    let numero_de_linha = 0;
    let numero_de_img = 0;
    let tabuleiro = document.getElementById("tabuleiro_do_jogo");

    //Setando as variaveis de controle de acordo com o nivel escolhido pelo jogador
    switch (dificuldade) {
        case "facil":
            numeros_de_cartas = 12;
            numero_de_linha = 3;     
            numero_de_img = numeros_de_cartas / 2;               
            break;
        
        case "medio":
            numeros_de_cartas = 20;
            numero_de_linha = 4;
            numero_de_img = numeros_de_cartas / 2;      

            break;
        case "dificil":
            numeros_de_cartas = 30;
            numero_de_linha = 5;
            numero_de_img = numeros_de_cartas / 2;          
    
        default:
            break;
    }

    //Forma array para buscar no banco de dados de imagem, algumas imagem aleatorias
    let array_img = [];

    


    //estrutura de repeticao para acresentar um determinadoo numeros de imagem dentro de um array, sem repetir as imagens.
    while(array_img.length < numeros_de_cartas){

        // gerando um numero aleatorio de 0 a 15
        let num_ale = Math.floor(Math.random() * 15);
        
        // Essa variavel ira pegar uma referencia de imagem aleatoria no meu banco de dados de imagem
        let var_verifica = bancoDeDados_img[num_ale]

        //Verificando se no meu array_img ja existe a imagem gerada a cima, se sim ele pula o if e pega uma outra imagem
        if (array_img.indexOf(var_verifica) == -1)
        {
            
            array_img.push(var_verifica);
            array_img.push(var_verifica);
            
        }

    }

    console.log(array_img);
    //Aqui por meio de um loop for eu estarei embaralhando o meu array_img aleatoriamento 3 vezes,
    //para que eu consiga setar a imagens nas cartas utilizando a função shift.h
    for (let i = 0; i < 3; i++) {

        array_img.sort(function(a, b){return 0.5 - Math.random()});
    }
    

    
    //Iniciando variaveis para formacao e renderizacao da div card
    let divCard = null;
    let linha = null;
    let ponto_em_linha = null;
    let divFaceBack = null;
    let divFaceFront = null; 
    let tagImagem = null;
    let tagImagem2 = null;
    let control_id = 0;
    let set_id = null;
    let img_card = null;
    let class_card = null;
    let indice = null;

    
    //Fazendo o calculo para obter o numero de colunas

    let colunas = numeros_de_cartas / numero_de_linha;


    for (let i = 0; i < numero_de_linha; i++) {
        
        linha = document.createElement("tr");
    
        for (let i = 0; i < colunas; i++) {

        //jogando o primeiro item do array para a variavel img_card e logo apos, tirando o esse item do array 
        img_card = array_img[0].scr;
        class_card = array_img[0].class;
        array_img.shift();    

        //console.log(img_card);
        //console.log(array_img);

        //jogando dentro da variavel set_id em ordem crescente os valor do array setId (card1, card2 ... card 30).
        set_id = setId[control_id];


        //formando a div card
        ponto_em_linha = document.createElement("td");    

        divCard = document.createElement("div");
        divCard.setAttribute("class", "card");
        divCard.classList.add(class_card);
        divCard.setAttribute("id",set_id);
        divCard.setAttribute("onclick", "girarCarta()");

        divFaceBack = document.createElement("div");
        divFaceBack.setAttribute("class","face_back visivel");

        tagImagem = document.createElement("img");
        tagImagem.setAttribute("src", "assets/img/palhaco.png");
        tagImagem.setAttribute("height", "35%");
        tagImagem.setAttribute("width", "50%");
        tagImagem.setAttribute("style", "opacity: 90%");

        divFaceFront = document.createElement("div");
        divFaceFront.setAttribute("class","face_front invisivel");

        tagImagem2 = document.createElement("img");
        tagImagem2.setAttribute("src",img_card);
        tagImagem2.setAttribute("height", "35%");
        tagImagem2.setAttribute("width", "50%");


        divFaceBack.appendChild(tagImagem);
        divFaceFront.appendChild(tagImagem2);
        divCard.appendChild(divFaceBack);
        divCard.appendChild(divFaceFront);
        ponto_em_linha.appendChild(divCard);
        linha.appendChild(ponto_em_linha);

        control_id++ ;
          

      
        
        }
        //renderizar uma carta na tela.
        tabuleiro.appendChild(linha)
        
    }

    //Referencia de div card feito acima 
    /*
        <table id="tabuleiro_do_jogo">
        <tr>
            <td>
                <div class="card" id="card1" onclick="girarCarta()">
                    <div class="face_back visivel" ><img src="assets/img/palhaco.png" width="50%" height="35%" style="opacity: 75%;"/></div>
                    <div class="face_front invisivel"  ><img src="assets/img/bussola.png" width="50%" height="35%"/></div>
                </div>
            </td>    

    */

}




//===================================================================================================================================

//Inicializando variavel de controle, e tambem arreys
//no array verificaCartasIguais iremos guardar as classe que irao verificar se o par é o certo uo não
//no array cartasViradas iremos guardar a referencia das duas cartas viradas pelo jogador
let control_cartasViradas = 0;
let verificarCartasIguais = [];
let cartasViradas = [];
let pontuacao = 0;





function girarCarta(){

    //pegando  carta que foi virada e armazenando-a na variavel carta 
    let carta = document.getElementById(event.currentTarget.id);

    let tabuleiro3 = document.getElementById("tabuleiro_do_jogo");
    let pontuacaoParaGanhar = 0;

    switch (tabuleiro3.children.length) {
        case 3:
            pontuacaoParaGanhar = 6;
            break;
        case 4:
            pontuacaoParaGanhar = 10;
            break;
        case 5:
            pontuacaoParaGanhar = 15;
            break;    
    
        default:
            break;
    }

    //Se a largura do meu array cartaVirada for menor que dois eu entro na condicional if
    if  (cartasViradas.length < 2) {

        
        
        //Aqui ele verifica se a carta clicada não é a mesma, e se for, ele sai da função antes de excutar o código 
        let carta_clicada = carta.children[1].classList[1];
        if (carta_clicada == "visivel") {
            return
        }



        // Aqui temos a lógica para conseguirmos virar e desvirar as cartas sempre que essa função é chamada
        carta.children[0].classList.toggle("invisivel");
        carta.children[1].classList.toggle("invisivel");

        carta.children[0].classList.toggle("visivel");
        carta.children[1].classList.toggle("visivel");

        //Armazenando a carta selecionada(virada) em um array  
        cartasViradas[control_cartasViradas] = carta;  

        //Armazena a class que ira determinar se as cartas são iguais ou não (Mesmo desenho)
        verificarCartasIguais[control_cartasViradas] = carta.classList[1];

        control_cartasViradas++
        return
    }
    //Quando as duas cartas forem selecionadas e as tais forem iguais...
    else if (verificarCartasIguais[0] == verificarCartasIguais[1]) {

    cartasViradas[0].remove()
    cartasViradas[1].remove()
    pontuacao++

    if (pontuacao == pontuacaoParaGanhar) {
        alert("Voce ganhou meus parábens")
    }
    
    } 
    //Senão forem iguais
    {
        //Gira as cartas selecionadas para sua posição padrão
        for (let i = 0; i < 2; i++) {

            carta_teste_back = cartasViradas[i].children[0].classList;

            carta_teste_back.remove("invisivel");
            carta_teste_back.add("visivel");
            

            carta_teste_front = cartasViradas[i].children[1].classList;

            carta_teste_front.remove("visivel");
            carta_teste_front.add("invisivel");

            
        }
        
        //limpo minha variavel de controle e limpa meu array para a proxima chamada da função
         control_cartasViradas = 0;

         cartasViradas = [];

    }
}

//========================================================================================================================

function reset() {
    //alert("oi");
    let tabuleiro2 = document.getElementById("tabuleiro_do_jogo").children;
    console.log(tabuleiro2);
    let dificuldade2 = document.getElementById("dificuldade_id").value;
    let numero_de_linha2 = 0;

    
    //Setando as variaveis de controle de acordo com o nivel escolhido pelo jogador
    switch (dificuldade2) {
        case "facil":
           
            numero_de_linha2 = 3;     
                       
            break;
        
        case "medio":
            
            numero_de_linha2 = 4;
                 

            break;
        case "dificil":    
            numero_de_linha2 = 5;    
    
        default:
            break;
    }
    console.log(numero_de_linha2.length)
    if(numero_de_linha2.length != 0 ){

    
        for (let i = numero_de_linha2 - 1; i < numero_de_linha2; i--) {
            tabuleiro2[i].remove();
            console.log(tabuleiro2);
            
        }
    }


    // if (tabuleiro2.parentNode)
    // {
    //     tabuleiro2.parentNode.removeChild();
    // }

}
