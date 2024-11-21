//PW 패스워드 가리기/가리지 않기
document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.querySelector('.login_section input[name="password"]');
    const eyeOpenPassword = document.getElementById('eye_open_password');
    const eyeClosePassword = document.getElementById('eye_close_password');

    eyeClosePassword.addEventListener('click', function () {
        passwordInput.type = 'text';
        eyeClosePassword.style.display = 'none';
        eyeOpenPassword.style.display = 'block';
    });

    eyeOpenPassword.addEventListener('click', function () {
        passwordInput.type = 'password';
        eyeOpenPassword.style.display = 'none';
        eyeClosePassword.style.display = 'block';
    });

    const passwordCheckInput = document.querySelector('.login_section input[name="password_check"]');
    const eyeOpenConfirm = document.getElementById('eye_open_confirm');
    const eyeCloseConfirm = document.getElementById('eye_close_confirm');

    eyeCloseConfirm.addEventListener('click', function () {
        passwordCheckInput.type = 'text';
        eyeCloseConfirm.style.display = 'none';
        eyeOpenConfirm.style.display = 'block';
    });

    eyeOpenConfirm.addEventListener('click', function () {
        passwordCheckInput.type = 'password';
        eyeOpenConfirm.style.display = 'none';
        eyeCloseConfirm.style.display = 'block';
    });
});

function EmailCheck(e) {
    const inputElement = e.target;

    if (inputElement.value === "") {
        inputElement.style.border = '2px solid red';
        emailError.style.display = 'block';

    } else {
        inputElement.style.border = 'none';
    }
}

function PwCheck(e) {
    const inputElement = e.target;

    if (inputElement.value === "") {
        inputElement.style.border = '2px solid red';
        pwError.style.display = 'block';

    } else {
        inputElement.style.border = 'none';
    }
}

const emailInput = document.getElementById("email");
const emailError = document.getElementById("email_error");

const pwInput = document.getElementById('password');
const pwError = document.getElementById('pw_error')

emailInput.addEventListener('focusin', function () {
    emailInput.style.border = '';
    emailError.style.display = 'none';
});

emailInput.addEventListener('focusout', EmailCheck);

pwInput.addEventListener('focusin', function () {
    pwInput.style.border = '';
    pwError.style.display = 'none';
});

pwInput.addEventListener('focusout', PwCheck);
