// event listeners
document.querySelector("#zip").addEventListener("change", displayCityInfo);
document.querySelector("#state").addEventListener("click", displayStates);
document.querySelector("#username").addEventListener("change", userNameCheck);
document.querySelector("#password1").addEventListener("click", suggestPassword);
document.querySelector("#password2").addEventListener("click", suggestPassword);
document.querySelector("#password1").addEventListener("change", checkPassword1Validity);
document.querySelector("#password2").addEventListener("change", checkPassword2Validity);
document.querySelector("#password1").addEventListener("change", checkPasswordMatch);
document.querySelector("#password2").addEventListener("change", checkPasswordMatch);

// https://csumb.space/api/cityInfoAPI.php?zip=
// https://csumb.space/api/allStatesAPI.php
// https://csumb.space/api/countyListAPI.php?state=
// https://csumb.space/api/usernamesAPI.php?username=
// https://csumb.space/api/suggestedPassword.php?length=

// global variables

let statesDisplayed = false;
let countiesDisplayed = false;
let passwordSuggested = false;

async function displayCityInfo() {
    try {
        let zipcode = document.querySelector("#zip").value;

        let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipcode;

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error accessing API endpoint");
        }

        let data = await response.json();

        console.log(data);

        if (!data) {
            document.querySelector("#invalidZip").textContent = "Invalid Input";
            document.querySelector("#invalidZip").style.color = "red";
        } else {
            document.querySelector("#invalidZip").textContent = "";
            document.querySelector("#cityName").textContent = data.city;
            document.querySelector("#cityLatitude").textContent = data.latitude;
            document.querySelector("#cityLongitude").textContent = data.longitude;
        }

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

async function displayStates() {
    try {
        if (statesDisplayed) return;

        let url = "https://csumb.space/api/allStatesAPI.php";

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error accessing API endpoint");
        }

        let data = await response.json();

        for (let state of data) {
            let optionElement = document.createElement("option");
            optionElement.textContent = state.state;
            optionElement.value = state.usps;
            document.querySelector("#state").append(optionElement);
        }
        document.querySelector("#county").addEventListener("click", displayCounties);
        statesDisplayed = true;

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }

}

async function displayCounties() {
    let state = document.querySelector("#state").value;
    try {
        let url = "https://csumb.space/api/countyListAPI.php?state=" + state;
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint");
        }
        let data = await response.json();

        if (Object.keys(data).length === 0) {
            document.querySelector("#county").textContent = "";

            let optionElement = document.createElement("option");
            optionElement.textContent = "Select County";
            document.querySelector("#county").append(optionElement);

            document.querySelector("#noStateSelected").textContent = "Select a State";
            document.querySelector("#noStateSelected").style.color = "red";

            return;
        }

        document.querySelector("#county").textContent = "";
        document.querySelector("#noStateSelected").textContent = "";


        for (let countie of data) {
            let optionElement = document.createElement("option");
            optionElement.textContent = countie.county;
            optionElement.value = countie.county;
            document.querySelector("#county").append(optionElement);
        }

        countiesDisplayed = true;
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
    console.log(state);
}

async function userNameCheck() {
    let username = document.querySelector("#username").value;
    try {
        let nameUrl = "https://csumb.space/api/usernamesAPI.php?username=" + username;

        console.log(username);
        console.log(nameUrl);

        let response = await fetch(nameUrl);

        if (!response.ok) {
            throw new Error("Error accessing API endpoint");
        }

        let data = await response.json();

        if (!data.available) {
            document.querySelector("#usernameMessage").textContent = "Username is not available";
            document.querySelector("#usernameMessage").style.color = "red";
        } else if (username.length < 4) {
            document.querySelector("#usernameMessage").textContent = "Must be at least 3 characters long";
            document.querySelector("#usernameMessage").style.color = "red";
        } else {
            document.querySelector("#usernameMessage").textContent = "Username is available";
            document.querySelector("#usernameMessage").style.color = "green";
        }
    }
    catch (err) {
        alert(err.message);
    }
}

async function suggestPassword() {
    try {
        if (passwordSuggested) return;

        let url = "https://csumb.space/api/suggestedPassword.php?length=8";
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error accessing API endpoint");
        }

        let data = await response.json();

        document.querySelector("#suggestedPassword").textContent = `Suggested Password: ${data.password}`;

        passwordSuggested = true;
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

function checkPassword1Validity() {
    return checkPasswordValidity("#password1", "#invalidPassword1");
}

function checkPassword2Validity() {
    return checkPasswordValidity("#password2", "#invalidPassword2");
}

function checkPasswordValidity(passwordId, invalidPasswordId) {
    let currentPassword = document.querySelector(passwordId).value;
    let pElement = document.querySelector(invalidPasswordId);

    return checkPasswordLength(currentPassword, pElement);
}

function checkPasswordLength(password, pElement) {
    if (password.length >= 6) {
        pElement.textContent = "";
        return true;
    }

    pElement.textContent = "Password too short (Must be at least 6 characters long)!";
    pElement.style.color = "red";

    return false;
}

function checkPasswordMatch() {
    let password1 = document.querySelector("#password1").value;
    let password2 = document.querySelector("#password2").value;

    // I don't want to display an error if deleted or empty box
    if (password1.length == 0 || password2.length == 0) {
        document.querySelector("#password1").textContent = "";
        document.querySelector("#password2").textContent = "";

        return;
    }

    let validLen = checkPassword1Validity() && checkPassword2Validity();

    console.log(`password1: ${password1}`);
    console.log(`password2: ${password2}`);
    console.log(`validLen: ${validLen}`);

    if (validLen && password1 === password2) {
        document.querySelector("#passwordMatch").textContent = "valid password";
        document.querySelector("#passwordMatch").style.color = "green";
    } else if (validLen) {
        document.querySelector("#passwordMatch").textContent = "Password must match";
        document.querySelector("#passwordMatch").style.color = "red";
    }
}