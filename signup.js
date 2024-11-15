const form = document.querySelector("form");
const email = document.getElementById("user_email");
const emailError = document.getElementById("user_email_error");
const nickname = document.getElementById("user_nickname");
const password = document.getElementById("password");
const passwordError = document.getElementById("password_error");
const passwordConfirm = document.getElementById("password-c");
const passwordConfirmError = document.getElementById("password_confirm_error");
const loginButton = document.querySelector("form button");


function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("toggle-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.src = "./resources/eye_closed.png"; // 비밀번호가 보일 때 아이콘 변경
        toggleIcon.alt = "Hide Password";
    } else {
        passwordInput.type = "password";
        toggleIcon.src = "./resources/eye_open.png"; // 비밀번호가 숨겨질 때 아이콘 변경
        toggleIcon.alt = "Show Password";
    }
}

function togglePasswordVisibility_c() {
    const passwordInput = document.getElementById("password-c");
    const toggleIcon = document.getElementById("toggle-password-c");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.src = "./resources/eye_closed.png"; // 비밀번호가 보일 때 아이콘 변경
        toggleIcon.alt = "Hide Password";
    } else {
        passwordInput.type = "password";
        toggleIcon.src = "./resources/eye_open.png"; // 비밀번호가 숨겨질 때 아이콘 변경
        toggleIcon.alt = "Show Password";
    }
}


function validateLogin() {
    if(!email.validity.valid || !nickname.validity.valid || !password.validity.valid || !passwordConfirm.validity.valid) {
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

    if (!passwordConfirm.validity.valueMissing) {
        showPasswordConfirmError();
    }
});

password.addEventListener("input", validateLogin);

function showPasswordConfirmError() {
    if (password.value !== passwordConfirm.value) {
        passwordConfirmError.classList.add("error-message");
        passwordConfirm.classList.add("error");
        passwordConfirm.setCustomValidity("비밀번호가 일치하지 않습니다.");
        passwordConfirmError.textContent = passwordConfirm.validationMessage;
    } else {
        passwordConfirmError.textContent = "";
        passwordConfirm.classList.remove("error");
        passwordConfirm.setCustomValidity("");
        validateLogin();
    }
}

passwordConfirm.addEventListener("blur",showPasswordConfirmError);

passwordConfirm.addEventListener("input", validateLogin);


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const user = USER_DATA.find((user) => user.email == email.value);

    if(user === undefined) {
        alert("가입 성공!");
        window.location.href = "/login.html";
    } else {
        // 같은 아이디가 있음
        alert("사용 중인 이메일입니다.");
    }
});