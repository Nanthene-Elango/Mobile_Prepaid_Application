let users;
document.addEventListener("DOMContentLoaded", function () {

    fetch('../assets/data/users.json')
    .then(response => response.json()) // Convert response to JSON
        .then(data => {
            users = data;
    })
    let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    let rechargeInput = document.getElementById("rechargeNumber");

    if (sessionStorage.getItem("rechargeNumber") !== null) {
        rechargeInput.value = sessionStorage.getItem("rechargeNumber");
    }
    else if (rechargeInput && user && user.mobile_number) {
        rechargeInput.value = user.mobile_number;
    }
    else {
        document.getElementById("saveBtn").classList.remove("d-none");
        document.getElementById("changeBtn").classList.add("d-none");
    }

    if (document.getElementById("rechargeNumber").value === "") {
        document.getElementById("saveBtn").classList.remove("d-none");
        document.getElementById("changeBtn").classList.add("d-none");
    }
    else {
        document.getElementById("saveBtn").classList.add("d-none");
        document.getElementById("changeBtn").classList.remove("d-none");
    }
});

let isUser;
function isSubscriber(mobileNumber) {
    for (let a in users){
        if (users[a].mobile_number === mobileNumber){
            isUser = true;
            return;
        }
    }
}

function validateNumber(number){
    
    isUser = false;
    isSubscriber(number);
    if (number.length !== 10 || isNaN(number) || !isUser) {
        document.getElementById("error-number").classList.remove("d-none")
        document.getElementById("error-number").textContent = "Enter a valid number!";
        return false;
    }
    else {
        document.getElementById("error-number").classList.add("d-none");
        return true;
    }
}
function saveNumber() {
    let number = document.getElementById("rechargeNumber").value;
    if(validateNumber(number)){
        sessionStorage.setItem("rechargeNumber" , number);
        console.log(sessionStorage.getItem("rechargeNumber"));
        document.getElementById("saveBtn").classList.add("d-none");
        document.getElementById("changeBtn").classList.remove("d-none");
    }
    else{
        document.getElementById("rechargeNumber").value = "";
    }
}

function changeNumber() {
    document.getElementById("rechargeNumber").value = "";
    document.getElementById("saveBtn").classList.remove("d-none");
    document.getElementById("changeBtn").classList.add("d-none");
    sessionStorage.removeItem("rechargeNumber");
}

function removePlan(){
    localStorage.removeItem("rechargePlan");
}