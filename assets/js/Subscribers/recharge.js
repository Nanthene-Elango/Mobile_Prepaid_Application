document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    let rechargeInput = document.getElementById("rechargeNumber");

    if (rechargeInput && user && user.mobile_number) {
        rechargeInput.value = user.mobile_number;
    }
});