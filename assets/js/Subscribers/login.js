let generatedOTP;
let timer;
let user;
let isUser = false;

function isSubscriber(mobileNumber) {
    fetch("../assets/data/users.json")
        .then(response => response.json())
        .then(users => {
            user = users.find(u => u.mobile_number === mobileNumber);
            if (user) {
                document.getElementById("error-number").style.display = "none";
                isUser = true;
            }
        });
}

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
})

function sendOTP() {

    let mobileNumber = document.getElementById("mobile").value;
    isSubscriber(mobileNumber);
    if (mobileNumber.length !== 10 || isNaN(mobileNumber) || !isUser) {
        document.getElementById("error-number").style.display = "block";
        document.getElementById("error-number").textContent = "Enter a valid number!";
        return;
    }
    else {
        document.getElementById("error-number").style.display = "none"
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000);
    // alert("Your OTP is: " + generatedOTP);
    let toast = document.getElementById("toast");
    toast.innerHTML = "Your OTP: " + generatedOTP;
    toast.classList.add("show");

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);

    document.getElementById("otpSection").style.display = "block";
    document.getElementById("sendOtpBtn").disabled = true;
    document.getElementById("resendBtn").disabled = true;
    startTimer();
}

function verifyOTP() {

    let enteredOTP = document.getElementById("otp").value;
    if (enteredOTP == generatedOTP) {
        document.getElementById("error-otp").style.display = "none";
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
        checkLoginStatus();
        let redirectURL = sessionStorage.getItem("redirectAfterLogin"); 
        sessionStorage.removeItem("redirectAfterLogin");
        Swal.fire({
            icon: 'success',
            title: 'OTP Verified',
            text: 'You have successfully logged in!',
            confirmButtonText: 'OK',
            confirmButtonColor: 'navy'

        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = redirectURL;
            }
        });
    } else {
        document.getElementById("error-otp").style.display = "block";
        document.getElementById("error-otp").textContent = "Invalid OTP!";
        return;
    }
}

function startTimer() {
    let timeLeft = 30;
    document.getElementById("timer").innerText = "OTP expires in " + timeLeft + "s";
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = "OTP expires in " + timeLeft + "s";
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("timer").innerText = "OTP expired. Request a new one.";
            document.getElementById("resendBtn").disabled = false;
        }
    }, 1000);
}
function checkLoginStatus() {
    let user = sessionStorage.getItem("loggedInUser");
    let loginBtn = document.getElementById("loginBtn");
    let accountBtn = document.getElementById("accountMenu");

    if (user) {
        if (loginBtn) loginBtn.style.display = "none";
        if (accountBtn) accountBtn.style.display = "block";
    } else {
        if (loginBtn) loginBtn.style.display = "block";
        if (accountBtn) accountBtn.style.display = "none";
    }
}