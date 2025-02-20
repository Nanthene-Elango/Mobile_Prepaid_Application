document.getElementById("about-us").addEventListener("copy", () => {
    alert("Don't copy my content!!🤨");
})

function validate(){
    let mobileNumber = document.getElementById("mobile").value;
    if (mobileNumber.length !== 10 || isNaN(mobileNumber)) {
        // document.getElementById("error-number").style.display = "block";
        document.getElementById("error-number").textContent = "Enter a valid number!";
        return;
    }
    else {
        document.getElementById("error-number").textContent = "";
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