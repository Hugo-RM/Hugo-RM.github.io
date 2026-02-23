document.querySelector("button").addEventListener("click", gradeQuiz);

shuffleQ1Choices();

function shuffleQ1Choices() {
    let q1Choices = ["Bogo Sort", "Bubble Sort", "Merge Sort", "BogoBogo Sort"];
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
    if (!isFormValid()) {
        return;
    }
    
    let score = 75;
    
    let userAnswer1 = document.querySelector("input[name=q1]:checked").value;
    let userAnswer2 = document.querySelector("input[name=q2]").value.trim();
    let userAnswer3 = document.querySelector("select[name=q3]").value;
    let userAnswer4 = document.querySelector("input[name=q4]").value;
    let userAnswer5 = document.querySelector("select[name=q5]").value;

    if (userAnswer1 != "BogoBogo Sort") {
        score -= 15;
    }
    if (userAnswer2.toLowerCase() != "binary search") {
        score -= 15;
    }
    if (userAnswer3 != "Merge Sort") {
        score -= 15;
    }
    if (userAnswer4 != "2") {
        score -= 15;
    }
    if (userAnswer5 != "Stack") {
        score -= 15;
    }

    document.querySelector("#totalScore").innerHTML = `SCORE: ${score} / 80`;
}

function isFormValid() {
    let isValid = true;
    let errorStr = "";

    if (!document.querySelector("input[name=q1]:checked")) {
        isValid = false;
        errorStr += "Question 1 was not answered<br>";
    }

    if (document.querySelector("input[name=q2]").value.trim() == "") {
        isValid = false;
        errorStr += "Question 2 was not answered<br>";
    }

    if (document.querySelector("select[name=q3]").value == "") {
        isValid = false;
        errorStr += "Question 3 was not answered<br>";
    }

    if (document.querySelector("input[name=q4]").value == "") {
        isValid = false;
        errorStr += "Question 4 was not answered<br>";
    }

    if (document.querySelector("select[name=q5]").value == "") {
        isValid = false;
        errorStr += "Question 5 was not answered<br>";
    }

    if (!isValid) {
        document.querySelector("#validationFdbk").innerHTML = errorStr;
    } else {
        document.querySelector("#validationFdbk").innerHTML = "";
    }

    return isValid;
}
