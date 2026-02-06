const randomNum = 88;

function guess() {
    let guess = document.querySelector("#userGuess").value;
    let ansText = document.querySelector("#ansTextBox");
    ansText.textContent = guess;
}

document.querySelector("#guessButton").addEventListener("click", guess)

