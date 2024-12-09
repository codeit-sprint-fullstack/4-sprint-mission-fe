const email = document.getElementById("user_email");
const emailError = document.getElementById("user_email_error");
const password = document.getElementById("password");
const passwordError = document.getElementById("password_error");
const loginButton = document.querySelector("form button");
const form = document.querySelector("form");
const closeButton = document.getElementById("dialog-close");
const loginErrorDialog = document.getElementById("login-error-dialog");



function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("toggle-password");

    // 현재 input의 type을 확인하고, type을 변경
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.src = "./resources/eye_open.png"; // 비밀번호가 보일 때 아이콘을 변경
        toggleIcon.alt = "Hide Password";
    } else {
        passwordInput.type = "password";
        toggleIcon.src = "./resources/eye_closed.png"; // 비밀번호가 숨겨질 때 아이콘을 변경
        toggleIcon.alt = "Show Password";
    }
}

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



form.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputEmail = email.value;
    const inputPassword = password.value;

    //USER_DATA에 없거나, 이메일은 일치하지만 비밀번호가 틀린경우 -> '비밀번호가 일치하지 않습니다.'
    const user = USER_DATA.find((user) => user.email==inputEmail );

    if(user === undefined || user.password !== inputPassword) {
        loginErrorDialog.showModal();
    } else {
        window.location.href = "/item";
    }
});


closeButton.addEventListener("click", () => {
    loginErrorDialog.close();
});
