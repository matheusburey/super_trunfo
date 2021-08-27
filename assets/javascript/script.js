const screen = document.getElementById('screen');
const objPlayers = {
  player: {
    cards: '',
    points: 0,
    amountCards: 0
  },
  pc: {
    cards: '',
    points: 0
  },
  returnImgaen: function(player){
    return this[player].cards.img;
  },
  returnAtributs: function(player, atribut) {
    return this[player].cards.atributos[atribut];
  }
};

const initialOptions = () => {
  const div = document.createElement('div');
  const span = document.createElement('span');
  const select = document.createElement('select');
  const options1 = document.createElement('option');
  const options2 = document.createElement('option');
  const options3 = document.createElement('option');
  const button = document.createElement('button');

  div.className = 'initiDiv';
  span.innerText = 'Deck com:';
  select.className = 'game-options';
  select.id = 'numberCards'
  options1.innerText = '03 cartas';
  options1.value = '03';
  options2.innerText = '05 cartas';
  options2.value = '05';
  options3.innerText = '10 cartas';
  options3.value = '10';
  button.innerText = 'Start Game';
  button.id = 'startGame';
  button.className = 'button';

  select.appendChild(options1);
  select.appendChild(options2);
  select.appendChild(options3);
  div.appendChild(span);
  div.appendChild(select);
  div.appendChild(button);
  screen.appendChild(div);
};

const functionRoutes = (event) => {
  const clickedTarget = event.target;
  const clickedTargetId = clickedTarget.id;
  
  if (clickedTargetId === "startGame") {
    amountOfCards(objPlayers);
    cleanScreen();
    startGame();
    setWaitingTime(500, drawLetter, objetoCartas);
  };
  if(clickedTarget.name === "atributo"){
    setWaitingTime(200, playerAttribute, {clickedTargetId, objPlayers});
    setWaitingTime(200, exibeCartaMaquina, objPlayers);
    setWaitingTime(200, showScore);
  };
};

const amountOfCards = ({player}) => {
  const number = document.getElementById('numberCards');
  player.amountCards = Number(number.value);
};

const startGame = () => {
  const scoreboard = document.createElement('div');
  const scoreboardText = document.createElement('h2');
  const winner = document.createElement('di');
  const cardPc = document.createElement('div');
  const cardPlayer = document.createElement('div');
  const imgCardPc = document.createElement('img');
  const imgCardPlayer = document.createElement('img');

  scoreboardText.innerHTML = 'Jogador 0 X 0 Maquina';
  scoreboard.className = 'scoreboard';
  winner.className = 'winner';
  cardPc.className = 'div-cards';
  cardPc.id = 'card-pc';
  cardPlayer.className = 'div-cards';
  cardPlayer.id = 'card-player';
  imgCardPc.src = 'assets/imagens/fundo.jpg';
  imgCardPc.className = 'cards';
  imgCardPlayer.src = 'assets/imagens/fundo.jpg';
  imgCardPlayer.className = 'cards';

  scoreboard.appendChild(scoreboardText);
  scoreboard.appendChild(winner);
  cardPc.appendChild(imgCardPc);
  cardPlayer.appendChild(imgCardPlayer);
  screen.appendChild(scoreboard);
  screen.appendChild(cardPlayer);
  screen.appendChild(cardPc);
};

const showScore = () => {
  const scoreboard = document.querySelector(".scoreboard h2");
  scoreboard.innerText = `Jogador ${objPlayers.player.points} X ${objPlayers.pc.points} Maquina`;
};

const random = (maxValue) => {
  return parseInt(Math.random() * maxValue);
}

const returnLetters = (objetoCards) => {
  const nameCards = Object.keys(objetoCards);
  let index = random(nameCards.length);
  let indexCard = nameCards[index];
  return objetoCards[indexCard];
};

const drawLetter = (objetoCards) => {
  objPlayers.pc.cards = returnLetters(objetoCards);

  objPlayers.player.cards = returnLetters(objetoCards);

  displaysPlayerCard();
};

function displaysPlayerCard() {
  const attributesValue = ['ki', "tecnicas", "velocidade", "transformacoes"];
  const divCardPlayer = document.querySelector("#card-player");
  const imgCardPlayer = document.querySelector("#card-player .cards");
  const divInputs = document.createElement('div');
  for(let i = 0; i < 4; i++){
    const input = document.createElement('input');
    input.type = 'button';
    input.name = 'atributo';
    input.id = attributesValue[i];

    divInputs.appendChild(input);
  }
  flipCard(imgCardPlayer);
  imgCardPlayer.src = objPlayers.returnImgaen('player');
  divInputs.className = "cards-status";
  divCardPlayer.appendChild(divInputs);
}

function playerAttribute({clickedTargetId, objPlayers}) {
  const vencedor = document.querySelector(".winner");
  const playerSelectedAttribute = objPlayers.returnAtributs('player',clickedTargetId);
  const pcSelectedAttribute = objPlayers.returnAtributs('pc',clickedTargetId);

  if (playerSelectedAttribute > pcSelectedAttribute) {
    vencedor.innerHTML = "<h2>Venceu</h2>";
    objPlayers.player.points++;
  } else if (playerSelectedAttribute < pcSelectedAttribute) {
    vencedor.innerHTML = "<h2>Perdeu</h2>";
    objPlayers.pc.points++;
  } else {
    vencedor.innerHTML = "<h2>Empate</h2>";
  }
}

const exibeCartaMaquina = (objPlayers) => {
  const divCards = document.getElementsByClassName("cards");
  flipCard(divCards[1]);
  divCards[1].src = objPlayers.returnImgaen('pc');
  setWaitingTime(5000, divertLetter);
}

const divertLetter = () => {
  const divCards = document.getElementsByClassName("cards");
  divCards[0].src = 'assets/imagens/fundo.jpg';
  divCards[1].src = 'assets/imagens/fundo.jpg';

  objPlayers.player.amountCards--;
  if(objPlayers.player.amountCards > 0){
    drawLetter(objetoCartas);
  }else {
    reset(objPlayers);
  }
}

const setWaitingTime = (time, callBack, value) =>{
  setTimeout(() => callBack(value), time);
};

const reset = (objPlayers) => {
  cleanScreen();

  objPlayers.player.cards = [];
  objPlayers.player.index = 0;
  objPlayers.player.points = 0;

  objPlayers.pc.cards = [];
  objPlayers.pc.index = 0;
  objPlayers.pc.points = 0;
  initialOptions();
}

const cleanScreen = () => {
  screen.innerText = ''
}

const flipCard = (imgCard) => {
  imgCard.classList.add('flip');
  setTimeout(() => imgCard.classList.remove('flip'), 800);
}

initialOptions();
screen.addEventListener("click", functionRoutes);