document.addEventListener("DOMContentLoaded" , function(){
    let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    document.getElementById("userName").textContent = user.name;
    document.getElementById("userEmail").textContent = user.email_id;
    document.getElementById("userNumber").textContent = "+91 " + user.mobile_number;
    document.getElementById("userDOB").textContent = user.dob;
    document.getElementById("userAddress").textContent = user.address;
})