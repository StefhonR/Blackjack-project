let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;

const deck = [
  "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
];

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function startGame() {
  playerHand = [];
  dealerHand = [];
  playerScore = 0;
  dealerScore = 0;

  shuffleDeck();

  // Deal initial cards
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());

  updateScores();
  updateHands();

  document.getElementById('new-game-button').disabled = true;
  document.getElementById('hit-button').disabled = false;
  document.getElementById('stand-button').disabled = false;
}

function hit() {
  playerHand.push(deck.pop());
  updateScores();
  updateHands();

  if (playerScore > 21) {
    endGame();
  }
}

function stand() {
  while (dealerScore < 17) {
    dealerHand.push(deck.pop());
    updateScores();
    updateHands();
  }

  endGame();
}

function updateScores() {
  playerScore = calculateScore(playerHand);
  dealerScore = calculateScore(dealerHand);
  document.getElementById('player-score').textContent = `Score: ${playerScore}`;
  document.getElementById('dealer-score').textContent = `Score: ${dealerScore}`;
}

function calculateScore(hand) {
  let score = 0;
  let hasAce = false;

  for (let card of hand) {
    if (card === 'A') {
      hasAce = true;
    } else if (card === 'K' || card === 'Q' || card === 'J') {
      score += 10;
    } else {
      score += parseInt(card); //parseInt basically takes a string and converts it to its corresponding interger value
    }
  }

  if (hasAce && score + 10 <= 21) {
    score += 10;
  }

  return score;
}

function updateHands() {
    const playerCardsDiv = document.getElementById('player-cards');
    const dealerCardsDiv = document.getElementById('dealer-cards');
  
    playerCardsDiv.innerHTML = '';
    dealerCardsDiv.innerHTML = '';
  
    for (let card of playerHand) {
      const img = document.createElement('img');
      img.src = `images/${card}.png`;
      playerCardsDiv.appendChild(img);
    }
  
    for (let i = 0; i < dealerHand.length; i++) {
      const img = document.createElement('img');
      if (i === 0) {
        img.src = 'images/back.png';
      } else {
        img.src = `images/${dealerHand[i]}.png`;
      }
      dealerCardsDiv.appendChild(img);
    }
  }


function endGame() {
  document.getElementById('new-game-button').disabled = false;
  document.getElementById('hit-button').disabled = true;
  document.getElementById('stand-button').disabled = true;

  if (playerScore > 21) {
    alert('You bust! Dealer wins.');
  } else if (dealerScore > 21) {
    alert('Dealer bust! You win.');
  } else if (playerScore > dealerScore) {
    alert('You win!');
  } else if (playerScore < dealerScore) {
    alert('Dealer wins.');
  } else {
    alert("It's a tie!");
  }
}

startGame();
