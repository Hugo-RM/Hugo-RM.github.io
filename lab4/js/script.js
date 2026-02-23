// event listeners
document.querySelector("#zip").addEventListener("change", displayCityInfo);
document.querySelector("#state").addEventListener("click", displayStates);
document.querySelector("#username").addEventListener("change", userNameCheck);
document.querySelector(".password").addEventListener("click", suggestPassword);
document.querySelector(".password").addEventListener("change", checkPasswordLength);

// https://csumb.space/api/cityInfoAPI.php?zip=
// https://csumb.space/api/allStatesAPI.php
// https://csumb.space/api/countyListAPI.php?state=
// https://csumb.space/api/usernamesAPI.php?username=
// https://csumb.space/api/suggestedPassword.php?length=


async function displayCityInfo() {
    try {
        let zipcode = document.querySelector("#zip").value;

        let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipcode;

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error accessing API endpoint");
        }

        let data = await response.json();

        document.querySelector("#cityName").textContent = data.city;
        document.querySelector("#cityLatitude").textContent = data.latitude;
        document.querySelector("#cityLongitude").textContent = data.longitude;


    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

let statesDisplayed = false;
let countiesDisplayed = false;

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

async function userNameCheck() {
    let username = document.querySelector("#username").value;
    try {
        let nameUrl = "https://csumb.space/api/usernamesAPI.php?username=" + username;
        let response = await fetch(nameUrl);
        if(!response.ok) {
            alert("Error accessing API endpoint (username already exists)");
        }
        let data = await response.json();
        if (!data.available) {
            document.querySelector("#usernameMessage").textContent = "Username is not available";
            document.querySelector("#usernameMessage").style.color = "red";
        }
        else {
            document.querySelector("#usernameMessage").textContent = "";
        }
    }
    catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

let passwordSuggested = false;

async function suggestPassword() {
    try {
        if (passwordSuggested) return;

        let url = "https://csumb.space/api/suggestedPassword.php?length=8";
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error accessing API endpoint");
        }

        let data = await response.json();

        let pElement = document.createElement("p");
        pElement.textContent = data.password;
        document.querySelector("#suggestedPassword").append(pElement);
        
        passwordSuggested = true;
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

        for (let countie of data){
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

function checkPasswordLength() {
    let currentPassword = document.querySelector(".password").value;

    if (currentPassword.length < 6) {
        let pElement = document.createElement("p");
        pElement.textContent = "Password too short (Must be at least 6 characters long)!";
        pElement.style.color = "red";
        document.querySelector("#suggestedPassword").append(pElement);
    } else {
        document.querySelector("#suggestedPassword").textContent = "";
    }
}
