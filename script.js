// Dados iniciais
let square = {//Cada uma das posições do tabuleiro
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}
let player = '';//Jogador atual
let warning = '';//O texto que aparece em vencedor
let playing = false;

reset();

// Eventos
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach( (item)=>{
    item.addEventListener('click', itemClick);
})

// Funções
function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if (square[item] === '' && playing === true) {
     
    square[item] = player;   
        renderSquare();
        togglePlayer();
}
    
}
function reset() {
    warning = '';
    let random = Math.floor(Math.random() * 2);

    player = (random === 0) ? "X" : "O";
    for (let i in square) {
        square[i] = '';
    }
    playing = true;
    renderSquare();
    renderInfo();
}
function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        
        item.innerHTML = square[i];
       
        

    }
    checkGame();
}
function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}
function togglePlayer(){
    if (player === "X") {
        player = "O"
    } else {
        player = "X"
    }
    renderInfo();
}
function checkGame(){
    if (checkWinnerFor("X")) {//Executa essa função passando o X
        warning = "Vencedor: 'X'";
        playing = false;
    }else if (checkWinnerFor("O")) {
        warning = "Vencedor: 'O'";
        playing = false;
    }else if (isFull()) {
        warning = "Empate";
        playing = false;
    }
}
function checkWinnerFor(player){
  let winPoss = [// Array que mostra todas as possibilidades de vitória
      "a1,a2,a3",
      "b1,b2,b3",
      "c1,c2,c3",

      "a1,b1,c1",
      "a2,b2,c2",
      "a3,b3,c3",

      "a1,b2,c3",
      "a3,b2,c1",
  ];
  for(let w in winPoss){//Checa todas as possibilidades de vitória
      let wpSplit = winPoss[w].split(',');//E separa cada possibilidade em uma só array, separando assim os itens para cada posição do tabuleiro
      let hasWon = wpSplit.every((option)=>{//Se todas as vezes que função foi executada retornou como verdade, ela retorna verdade, fazendo assim a variável hasWon uma variável booleana
        if (square[option] == player) {//Se na posição do tabuleiro for igual ao jogador passado na função, ele retorna verdadeiro. Caso uma posição sequer retorne falso (ou seja era outro jogador) a função retorna falso e mostra que ninguém ganhou ainda
            return true;
        }else {
            return false
        }
      })
      if(hasWon){//No fim, se todas as posições forem verdade (ou seja, seja o mesmo jogador) e as posições são uma das posições de vitória, ele retorna um vencedor
          return true;
      }
  } 
  return false; 
}
function isFull(){
    for(let i in square){
        if (square[i] ==='') {
            return false;
        }
    }
    return true;
}
