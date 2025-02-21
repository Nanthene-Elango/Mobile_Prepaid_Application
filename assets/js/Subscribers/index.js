let users;
document.addEventListener("DOMContentLoaded" , function(){
    fetch('../assets/data/users.json')
    .then(response => response.json())
        .then(user => {
            users = user;
        }); 
});

function validate(){
    let mobileNumber = document.getElementById("mobile").value;
    let isSubscriber = false;
    for (let user in users){
        users[user].mobile_number === mobileNumber;
        isSubscriber = true;
        break;
    }
    if (mobileNumber.length !== 10 || isNaN(mobileNumber) || !isSubscriber) {
        document.getElementById("error-number").textContent = "Enter a valid number!";
        return;
    }
    else {
        document.getElementById("error-number").textContent = "";
        sessionStorage.setItem("rechargeNumber" , mobileNumber);
        window.location.href = "./recharge.html"; 
    }
}
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show/hide button on scroll
window.onscroll = function () {
    let btn = document.getElementById("goTopBtn");
    if (document.documentElement.scrollTop > 600) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

let isLoggedIn = false; // Change this dynamically as per your logic

if (isLoggedIn) {
    document.getElementById("accountMenu").classList.remove("d-none");
}