const email = document.getElementById("user_email");
const emailError = document.getElementById("user_email_error");
const password = document.getElementById("password");
const passwordError = document.getElementById("password_error");
const loginButton = document.querySelector("form button");

function validateLogin() {
    if(!email.validity.valid || !password.validity.valid) {
        loginButton.disabled = true;
    } else {
        loginButton.disabled = false;
    }
}

window.addEventListener("DOMContentLoaded", validateLogin);

function showEmailError() {
    emailError.classList.add("error-message");
    email.classList.add("error");

    if (email.validity.valueMissing) {
        emailError.textContent = "이메일을 입력해주세요.";
    } else if (email.validity.typeMismatch) {
        emailError.textContent = "잘못된 이메일 형식입니다.";
    }
}

email.addEventListener("blur", (event) => {
    if (email.validity.valid) {
        emailError.textContent = "";
        email.classList.remove("error");
        validateLogin();
    } else {
        showEmailError();
    }
});

email.addEventListener("input", validateLogin);

function showPasswordError() {
    passwordError.classList.add("error-message");
    password.classList.add("error");

    if (password.validity.valueMissing) {
        passwordError.textContent = "비밀번호를 입력해주세요.";
    } else if (password.validity.tooShort) {
        passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
    }
}

password.addEventListener("blur", (event) => {
    if (password.validity.valid) {
        passwordError.textContent = "";
        password.classList.remove("error");
        validateLogin();
    } else {
        showPasswordError();
    }
});

password.addEventListener("input", validateLogin);

