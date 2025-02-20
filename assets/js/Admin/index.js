document.getElementById("password-show").addEventListener("click", () => {
    let passwordInput = document.getElementById("password");
    let showButton = document.getElementById("password-show");
    let hideButton = document.getElementById("password-hide");

    if (passwordInput.type === "password" && passwordInput.value !== "") {
        passwordInput.type = "text";
        showButton.classList.add("d-none");
        hideButton.classList.remove("d-none");

    }
});
document.getElementById("password-hide").addEventListener("click", () => {
    let passwordInput = document.getElementById("password");
    let showButton = document.getElementById("password-show");
    let hideButton = document.getElementById("password-hide");

    if (passwordInput.type === "text") {
        passwordInput.type = "password";
        hideButton.classList.add("d-none");
        showButton.classList.remove("d-none");

    }
});