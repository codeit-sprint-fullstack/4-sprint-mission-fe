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
