let ansText = document.querySelector("#ansTextBox");

ansText.textContent = "Previous Guesses: ";

const randomNum = (Math.floor(Math.random() * 99) % 100) + 1;
let numGuesses = 0;
let won = false;

function guess() {
    if (numGuesses > 6 || won) {
        return;
    }

    let userGuess = document.querySelector("#userGuess").value;
    
    if (!userGuess) {
        return;
    }

    ansText.textContent += `${userGuess} `;
    numGuesses++;
    
    let response = document.querySelector("#message");
    
    if (userGuess > randomNum) {
        response.textContent = "Your guess was too high!";
        response.style.color = "orange";
    } else if (userGuess < randomNum) {
        response.textContent = "Your guess was too low!";
        response.style.color = "orange";
    } else {
        response.textContent = "CORRECT!";
        response.style.color = "green";
        won = true;
        return;
    }

    if (numGuesses == 7) {
        let endMessage = document.querySelector("#endGame");
        endMessage.textContent = `You Lost, Number was: ${randomNum}`;
        endMessage.style.color = "red";
    }
}

document.querySelector("#guessButton").addEventListener("click", guess)

