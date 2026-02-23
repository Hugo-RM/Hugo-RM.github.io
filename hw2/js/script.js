const dealBtn = document.getElementById('deal-btn');
const hitBtn = document.getElementById('hit-btn');
const standBtn = document.getElementById('stand-btn');
const message = document.getElementById('message');

dealBtn.addEventListener('click', startGame);
hitBtn.addEventListener('click', hit);
standBtn.addEventListener('click', stand);

const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let playerCards = [];
let dealerCards = [];
let deck = [];

let hideDealer = true;
let balance = 500;

function makeDeck() {
    deck = [];
    for (let i = 0; i < 4; i++) {
        for (let value of values) {
            deck.push(value);
        }
    }

    for (let i = 0; i < 100; i++) {
        let a = Math.floor(Math.random() * deck.length);
        let b = Math.floor(Math.random() * deck.length);

        let temp = deck[a];
        deck[a] = deck[b];
        deck[b] = temp;
    }
}

function getScore(cards) {
    let score = 0;
    let aces = 0;
    
    for (let i = 0; i < cards.length; i++) {
        let val = cards[i];
        if (val === 'A') {
            aces++;
            score += 11;
        } else if (val === 'J' || val === 'Q' || val === 'K') {
            score += 10;
        } else {
            score += parseInt(val);
        }
    }
    
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    
    return score;
}

function showCards() {
    let dealerDiv = document.getElementById('dealer-cards');
    let playerDiv = document.getElementById('player-cards');
    
    dealerDiv.innerHTML = '';
    playerDiv.innerHTML = '';
    
    for (let i = 0; i < dealerCards.length; i++) {
        let cardText = document.createElement('span');
        cardText.className = 'card';
        if (hideDealer && i === 0) {
            cardText.textContent = '[?]';
        } else {
            cardText.textContent = '[' + dealerCards[i] + ']';
        }
        dealerDiv.appendChild(cardText);
    }
    
    for (let i = 0; i < playerCards.length; i++) {
        let cardText = document.createElement('span');
        cardText.className = 'card';
        cardText.textContent = '[' + playerCards[i] + ']';
        playerDiv.appendChild(cardText);
    }
    
    document.getElementById('player-score').textContent = getScore(playerCards);
    if (hideDealer) {
        document.getElementById('dealer-score').textContent = '?';
    } else {
        document.getElementById('dealer-score').textContent = getScore(dealerCards);
    }
}

function startGame() {
    if (balance < 50) {
        message.textContent = 'Not enough money!';
        return;
    }
    
    balance -= 50;
    document.getElementById('balance').textContent = balance;
    
    makeDeck();
    playerCards = [deck.pop(), deck.pop()];
    dealerCards = [deck.pop(), deck.pop()];
    hideDealer = true;
    
    showCards();
    
    hitBtn.disabled = false;
    standBtn.disabled = false;
    dealBtn.disabled = true;
    message.textContent = '';
}

function hit() {
    playerCards.push(deck.pop());
    showCards();
    
    if (getScore(playerCards) > 21) {
        endGame('Bust! You lose!');
    }
}

function stand() {
    hideDealer = false;
    showCards();
    
    while (getScore(dealerCards) < 17) {
        dealerCards.push(deck.pop());
        showCards();
    }
    
    let playerScore = getScore(playerCards);
    let dealerScore = getScore(dealerCards);
    
    if (dealerScore > 21) {
        endGame('Dealer busts! You win!');
        balance += 100;
    } else if (playerScore > dealerScore) {
        endGame('You win!');
        balance += 100;
    } else if (dealerScore > playerScore) {
        endGame('You lose!');
    } else {
        endGame('Tie!');
        balance += 50;
    }
    
    document.getElementById('balance').textContent = balance;
}

function endGame(msg) {
    message.textContent = msg;
    
    let resultImg = document.createElement('img');
    if (msg.includes('win')) {
        resultImg.src = 'imgs/win.gif';
        resultImg.alt = 'You win!';
        message.style.color = '#00ff00';
    } else if (msg.includes('lose') || msg.includes('Bust')) {
        resultImg.src = 'imgs/lose.gif';
        resultImg.alt = 'You lose!';
        message.style.color = '#ff0000';
    } else {
        message.style.color = '#ffd900';
    }
    
    if (resultImg.src) {
        message.appendChild(document.createElement('br'));
        message.appendChild(resultImg);
    }
    
    hitBtn.disabled = true;
    standBtn.disabled = true;
    dealBtn.disabled = false;
}