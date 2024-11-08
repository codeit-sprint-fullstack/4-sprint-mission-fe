const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'lhs103725@gmail.com', password: "alsgus4321@" },
  { email: 'applepie421@naver.com', password: "dnflwlq951@" },
];

const emailInput = document.getElementById('email');
const nicknameInput = document.getElementById('nickname');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('passwordConfirm');
const signupButton = document.getElementById('signupButton');
const form = document.getElementById('signupForm');

// 이메일 유효성 검사 함수
function validateEmail() {
  const emailError = document.getElementById('emailError');
  const email = emailInput.value.trim();
  emailError.textContent = '';

  if (!email) {
    emailError.textContent = '이메일을 입력해주세요.';
    emailInput.style.borderColor = 'red';
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    emailError.textContent = '잘못된 이메일 형식입니다.';
    emailInput.style.borderColor = 'red';
    return false;
  }

  if (USER_DATA.some(user => user.email === email)) {
    emailError.textContent = '사용 중인 이메일입니다.';
    emailInput.style.borderColor = 'red';
    return false;

  } else {
  emailInput.style.borderColor = 'blue';
  return true;
  }
}

// 비밀번호 유효성 검사 함수
function validatePassword() {
  const passwordError = document.getElementById('passwordError');
  const password = passwordInput.value.trim();
  passwordError.textContent = '';

  if (!password) {
    passwordError.textContent = '비밀번호를 입력해주세요.';
    passwordInput.style.borderColor = 'red';
    return false;
  }

  if (password.length < 8) {
    passwordError.textContent = '비밀번호를 8자 이상 입력해주세요.';
    passwordInput.style.borderColor = 'red';
    return false;
  } else { 
  passwordInput.style.borderColor = 'blue';
  return true;
  }
}

// 비밀번호 확인 유효성 검사 함수
function validatePasswordConfirm() {
  const passwordConfirmError = document.getElementById('passwordConfirmError');
  const passwordConfirm = passwordConfirmInput.value.trim();
  passwordConfirmError.textContent = '';

  if (passwordConfirm !== passwordInput.value.trim()) {
    passwordConfirmError.textContent = '비밀번호가 일치하지 않습니다.';
    passwordConfirmInput.style.borderColor = 'red';
    return false;
  } else if (!passwordConfirmInput.value.trim()) {
    passwordConfirmInput.style.borderColor = ''
  } else {
  passwordConfirmInput.style.borderColor = 'blue';
  return true;
  }
}

// 폼 유효성 검사 함수
function validateForm() {
  const isFormValid = validateEmail() && validatePassword() && validatePasswordConfirm();
  signupButton.disabled = !isFormValid;
}

emailInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);
passwordConfirmInput.addEventListener('input', validateForm);

// 폼 제출 함수
function submitForm() {
  if (!validateForm()) {
    alert('회원가입이 완료되었습니다!');
    window.location.href = "/login";
    return true;
  } else if (USER_DATA.some(user => user.email === email)) {
    alert("이미 존재하는 이메일입니다!");
    return false;
  } else if (!emailPattern.test(email)) {
    alert("잘못된 형식의 이메일입니다!");
    return false;
  } else if (password.length < 8) {
    alert("비밀번호를 8자 이상 입력해주세요!");
    return false;
  } else if (!password) {
    alert("비밀번호를 입력해주세요!");
    return false;
  } else if (passwordConfirm !== passwordInput.value.trim()) {
    alert("비밀번호가 일치하지 않습니다!");
    return false;
  }
}

// form에 submit 이벤트 추가
form.addEventListener('submit', function(event) {
  event.preventDefault();
  submitForm();
});