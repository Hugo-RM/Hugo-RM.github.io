document.querySelector("button").addEventListener("click", gradeQuiz);

shuffleQ1Choices();

function shuffleQ1Choices() {
    let q1Choices = ["Monkey D. Luffy", "Roronoa Zoro", "Gold Roger", "Kaido"];
    q1Choices = _.shuffle(q1Choices);


    for (let choice of q1Choices) {
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "q1";
        input.value = choice;
    
        let label = document.createElement("label");
        label.textContent = choice;

        label.prepend(input);
    
        document.querySelector("#q1ChoicesDiv").append(label);
    }

}

function gradeQuiz() {
    let userAnswer1 = document.querySelector("input[name=q1]:checked").value;

    if (userAnswer1 == "color") {
        alert("CORRECT");
    } else {
        alert("INCORRECT");
    }
}

