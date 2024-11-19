// adobe 폰트를 위한 스크립트
(function (d) {
  var config = {
      kitId: "vyd2lmo",
      scriptTimeout: 3000,
      async: true,
    },
    h = d.documentElement,
    t = setTimeout(function () {
      h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
    }, config.scriptTimeout),
    tk = d.createElement("script"),
    f = false,
    s = d.getElementsByTagName("script")[0],
    a;
  h.className += " wf-loading";
  tk.src = "https://use.typekit.net/" + config.kitId + ".js";
  tk.async = true;
  tk.onload = tk.onreadystatechange = function () {
    a = this.readyState;
    if (f || (a && a != "complete" && a != "loaded")) return;
    f = true;
    clearTimeout(t);
    try {
      Typekit.load(config);
    } catch (e) {}
  };
  s.parentNode.insertBefore(tk, s);
})(document);
// ####################################
// code for login, sign up (start here)
// ####################################
// temporary user data set
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];
// login page eye Icon control
function pwShow() {
  const elem = document.getElementById("eyeChange");
  const passwordInput = document.getElementById("userPassword");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    elem.classList = "fa-regular fa-eye-slash";
  } else {
    passwordInput.type = "password";
    elem.classList = "fa-regular fa-eye";
  }
}
function pwCheckShow() {
  const elem = document.getElementById("eyeChangeCheck");
  const passwordInput = document.getElementById("userPasswordConfirm");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    elem.classList = "fa-regular fa-eye-slash";
  } else {
    passwordInput.type = "password";
    elem.classList = "fa-regular fa-eye";
  }
}
//login page email check

/*
MDN DOMContentLoaded event 
참조 (https://developer.mozilla.org/ko/docs/Web/API/Document/DOMContentLoaded_event)
*/
addEventListener("DOMContentLoaded", () => {
  document.getElementById('userEmail').addEventListener('focusout', validateEmail);
  document.getElementById('userNickname').addEventListener('focusout', validateNickname);
  document.getElementById('userPassword').addEventListener('focusout', validatePassword);
  document.getElementById('userPasswordConfirm').addEventListener('focusout', validatePasswordConfirm);
  document.getElementById('submitButton').addEventListener('click', handleSubmit);
});
// onDOMContentLoaded = () => {
//   document.getElementById('userEmail').addEventListener('focusout', validateEmail);
// };


function validateEmail() {
  const emailInput = document.getElementById('userEmail');
  let emailError = document.getElementById('errorEmail');

  // 에러 메시지 요소가 없으면 생성
  if (!emailError) {
    emailError = document.createElement('p');
    emailError.id = 'errorEmail';
    emailError.className = 'errorMessage';
    emailInput.insertAdjacentElement('afterend', emailError);
  }

  const emailValue = emailInput.value;

  emailError.innerText = ''; // 오류 메시지 초기화
  emailInput.classList.remove('error-border'); // 빨간 테두리 제거

  if (!emailValue) {
    // 값이 없을 때
    emailError.innerText = '이메일을 입력해주세요.';
    emailInput.classList.add('error-border');
  } else if (!validateEmailFormat(emailValue)) {
    // 이메일 형식이 맞지 않을 때
    emailError.innerText = '잘못된 이메일 형식입니다.';
    emailError.style.color = 'red';
    emailInput.classList.add('error-border');
  }
}
// 이메일 형식 검사 함수
function validateEmailFormat(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

// 닉네임 체크
// [문자열 정규식],{2~10자리}$/;
const nickLength = /^[a-zA-Z0-9._%+-]{4,16}$/;
function validateNickname(){
  const userNickname = document.getElementById('userNickname');
  let nicknameError = document.getElementById('errorNickname');
// 에러 메시지 요소가 없으면 생성
    if (!nicknameError) {
      nicknameError = document.createElement('p');
      nicknameError.id = 'errorNickname';
      nicknameError.className = 'errorMessage';
      userNickname.insertAdjacentElement('afterend', nicknameError);
    }
    // 닉네임 유효성 검사
    if (!validateNicknameFormat(userNickname.value)) {
      nicknameError.textContent = "닉네임은 영문,숫자조합 4~16자리여야 합니다.";
      nicknameError.style.color = 'red';
    } else {
      nicknameError.textContent = ""; // 에러 메시지 제거
    }
}
// 닉네임 형식 검사 함수
function validateNicknameFormat(nickname) {
  return nickLength.test(nickname);
}

// 닉네임 입력 시 검사 함수 호출
document.getElementById('userNickname').addEventListener('input', validateNickname);

// 비밀번호 유효성 검사
function validatePassword() {
  const passwordInput = document.getElementById('userPassword');
  let passwordError = document.getElementById('errorPassword');

  if (!passwordError) {
    passwordError = document.createElement('p');
    passwordError.id = 'errorPassword';
    passwordError.className = 'errorMessage';
    passwordInput.insertAdjacentElement('afterend', passwordError);
  }

  const passwordValue = passwordInput.value;
  passwordError.innerText = '';
  
  if (passwordValue.length < 8) {
    passwordError.innerText = '비밀번호는 최소 8자리여야 합니다.';
    passwordError.style.color = 'red';
    return false;
  }
  return true;
}

// 비밀번호 확인 검사
function validatePasswordConfirm() {
  const passwordInput = document.getElementById('userPassword').value;
  const passwordConfirmInput = document.getElementById('userPasswordConfirm');
  let passwordConfirmError = document.getElementById('errorPasswordConfirm');

  if (!passwordConfirmError) {
    passwordConfirmError = document.createElement('p');
    passwordConfirmError.id = 'errorPasswordConfirm';
    passwordConfirmError.className = 'errorMessage';
    passwordConfirmInput.insertAdjacentElement('afterend', passwordConfirmError);
  }

  passwordConfirmError.innerText = '';
  
  if (passwordConfirmInput.value !== passwordInput) {
    passwordConfirmError.innerText = '비밀번호가 일치하지 않습니다.';
    passwordConfirmError.style.color = 'red';
    return false;
  }
  return true;
}

// 최종 서브밋 검사
function handleSubmit(event) {
  event.preventDefault();

  const isEmailValid = validateEmail();
  const isNicknameValid = validateNickname();
  const isPasswordValid = validatePassword();
  const isPasswordConfirmValid = validatePasswordConfirm();

  if (isEmailValid && isNicknameValid && isPasswordValid && isPasswordConfirmValid) {
    // 모든 검사 통과 시 폼 제출
    document.getElementById('form').submit();
  } else {
    alert('모든 필드를 올바르게 입력해주세요.');
  }
}