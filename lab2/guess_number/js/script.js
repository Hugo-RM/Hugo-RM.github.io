//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

let winsText = document.querySelector("#wins");
let lossesText = document.querySelector("#losses");

winsText.textContent = wins;
lossesText.textContent = losses;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);
    attempts = 0;

    document.querySelector("#resetBtn").style.display = "none";

    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus();
    playerGuess.value = "";

    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    document.querySelector("#guesses").textContent = "";

    winsText.textContent = wins;
    lossesText.textContent = losses;
}

function checkGuess() {
    let attemptsLeft = document.querySelector("#attemptsLeft");
    let feedback = document.querySelector("#feedback");
    let guess = document.querySelector("#playerGuess").value;

    console.log("Player Guess: " + guess);
    feedback.textContent = "";

    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    attemptsLeft.textContent = 7 - attempts;
    console.log(attempts);
    feedback.style.color = "orange";

    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "green";
        wins++;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) {
            feedback.textContent = "Sorry you lost!";
            feedback.style.color = "red";
            losses++;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was too high";
        } else {
            feedback.textContent = "Guess was too low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
}
