document.addEventListener('DOMContentLoaded', function () {

    // eye open and close in signup/login pages
    const passwordInput = document.querySelector('.login_section input[name="password"]');
    const eyeOpenPassword = document.getElementById('eye_open_password');
    const eyeClosePassword = document.getElementById('eye_close_password');

    if (eyeClosePassword && eyeOpenPassword) { // Check if these elements exist
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
    }

    const passwordCheckInput = document.querySelector('.login_section input[name="password_check"]');
    const eyeOpenConfirm = document.getElementById('eye_open_confirm');
    const eyeCloseConfirm = document.getElementById('eye_close_confirm');

    if (eyeCloseConfirm && eyeOpenConfirm) { // Check if these elements exist
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
    }

    // validation part in signup/login pages

    const currentPath = window.location.pathname;
    const currentFileName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const fileNameWithoutExtension = currentFileName.replace('.html', '');

    const emailInput = document.getElementById("email");
    const emailEmptyError = document.getElementById("email_empty_error");
    const emailFormError = document.getElementById("email_form_error");

    const nameInput = document.getElementById("nickname");
    const nameEmptyError = document.getElementById("name_empty_error");
    const nameFormError = document.getElementById("name_form_error");

    const pwInput = document.getElementById('password');
    const pwEmptyError = document.getElementById('pw_empty_error');
    const pwFormError = document.getElementById('pw_form_error');

    const pwCheckInput = document.getElementById('password_check');
    const pwCheckEmptyError = document.getElementById('pw_check_empty_error');

    const loginBtn = document.getElementById('login_page_button');
    const signBtn = document.getElementById('signup_page_button');

    let emailInputValue = "";
    let pwInputValue = "";

    const USER_DATA = [
        { email: 'codeit1@codeit.com', password: "codeit101!" },
        { email: 'codeit2@codeit.com', password: "codeit202!" },
        { email: 'codeit3@codeit.com', password: "codeit303!" },
        { email: 'codeit4@codeit.com', password: "codeit404!" },
        { email: 'codeit5@codeit.com', password: "codeit505!" },
        { email: 'codeit6@codeit.com', password: "codeit606!" },
    ]



    function validateEmail(e) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(e);
    }

    function validatePW(password) {
        const minLength = 8;
        return password.length >= minLength;
    }

    function emailCheck(e) {
        const inputElement = e.target;

        if (inputElement.value === "") {
            inputElement.style.border = '2px solid red';
            emailEmptyError.style.display = 'block';
            return false;
        } else if (!validateEmail(inputElement.value)) {
            inputElement.style.border = '2px solid red';
            emailFormError.style.display = 'block';
            return false;
        } else {
            inputElement.style.border = 'none';
            emailFormError.style.display = 'none';
            emailEmptyError.style.display = 'none';

            emailInputValue = inputElement.value;
            return true;
        }
    }

    function nameCheck(e) {
        const inputElement = e.target;

        if (inputElement.value === "") {
            inputElement.style.border = '2px solid red';
            nameEmptyError.style.display = 'block';
            return false;
        } else if (inputElement.value.length < 2) {
            inputElement.style.border = '2px solid red';
            nameFormError.style.display = 'block';
            return false;
        } else {
            return true;
        }
    }

    function pwCheck(e) {
        const inputElement = e.target;

        const isPasswordField = inputElement.id === 'password';
        const isPasswordCheckField = inputElement.id === 'password_check';

        if (inputElement.value === "") {
            inputElement.style.border = '2px solid red';

            if (isPasswordField) {
                pwEmptyError.style.display = 'block';
            } else if (isPasswordCheckField) {
                pwCheckEmptyError.style.display = 'block';
            }
            return false;
        } else if (!validatePW(inputElement.value)) {
            inputElement.style.border = '2px solid red';
            pwFormError.style.display = 'block';
            return false;
        } else {
            inputElement.style.border = 'none';
            pwFormError.style.display = 'none';
            pwEmptyError.style.display = 'none';

            if (fileNameWithoutExtension === "signup") {
                if (pwInput.value.length !== pwCheckInput.value.length) {
                    inputElement.style.border = '2px solid red';
                    pwFormError.style.display = 'block';
                    return false;
                }
            }
            pwInputValue = inputElement.value;
            return true;
        }
    }

    function buttonEnable() {
        if (fileNameWithoutExtension === "login") {
            if (emailCheck({ target: emailInput }) && pwCheck({ target: pwInput })) {
                loginBtn.disabled = false;
            } else {
                loginBtn.disabled = true;
            }
        } else if (fileNameWithoutExtension === "signup") {
            if (emailCheck({ target: emailInput }) && pwCheck({ target: pwInput }) && nameCheck({ target: nameInput })) {
                signBtn.disabled = false;
            } else {
                signBtn.disabled = true;
            }
        } else {
            console.log("Unknown page type:", fileNameWithoutExtension);
        }
    }

    function validateLoginData() {
        for (const data of USER_DATA) {
            if (data.email === emailInputValue) {
                if (data.password === pwInputValue) {
                    return true;
                }
                alert("비밀번호가 일치하지 않습니다.")
                return false;
            }
        }
        alert("일치하는 이메일이 없습니다.")
        return false;
    }

    function checkExistEmail() {
        for (const data of USER_DATA) {
            if (data.email === emailInputValue) {
                alert("이미 사용중인 이메일입니다.");
                return false;
            }
        }
        return true;
    }



    emailInput.addEventListener('focusin', function () {
        emailInput.style.border = '';
        emailEmptyError.style.display = 'none';
        emailFormError.style.display = 'none';
    });

    emailInput.addEventListener('focusout', emailCheck);
    emailInput.addEventListener('input', buttonEnable);

    pwInput.addEventListener('focusin', function () {
        pwInput.style.border = '';
        pwEmptyError.style.display = 'none';
        pwFormError.style.display = 'none';
    });

    pwInput.addEventListener('focusout', pwCheck);
    pwInput.addEventListener('input', buttonEnable);

    if (pwCheckInput && pwCheckEmptyError) {
        pwCheckInput.addEventListener('focusin', function () {
            pwCheckInput.style.border = '';
            pwCheckEmptyError.style.display = 'none';
        });

        pwCheckInput.addEventListener('focusout', pwCheck);
        pwCheckInput.addEventListener('input', buttonEnable);
    }

    if (nameInput && nameEmptyError) {
        nameInput.addEventListener('focusin', function () {
            nameInput.style.border = '';
            nameEmptyError.style.display = 'none';
        });

        nameInput.addEventListener('focusout', nameCheck);
        nameInput.addEventListener('input', buttonEnable);
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', function () {
            if (!loginBtn.disabled) {
                if (validateLoginData()) {
                    window.location.href = 'items.html';
                }
            } else {
                console.log("Login button is disabled, cannot redirect.");
            }
        });
    }


    if (signBtn) {
        signBtn.addEventListener('click', function () {
            console.log(emailInputValue);
            if (!signBtn.disabled) {
                if (checkExistEmail()) {
                    window.location.href = 'login.html';
                }
            } else {
                console.log("Signup button is disabled, cannot redirect.");
            }
        });
    }
});
