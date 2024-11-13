let emailInput = document.querySelector('#signup-email');
let passwordInput = document.querySelector('#signup-password');
let nicknameInput = document.querySelector('#signup-nickname')
let passwordRepeat = document.querySelector('#signup-password-repeat')

let loginButton = document.querySelector('.loginbutton'); //로그인버튼

let emailErrorMessage = document.querySelector('.none-email'); //이메일 입력 안했을때 에러 메세지
let emailFormatErrorMessage = document.querySelector('.fail-email'); //이메일 형식이 아닐때 에러메세지
let passwordErrorMessage = document.querySelector('.none-password'); //비밀번호 입력 안했을때 에러메세지
let passwordLengthErrorMessage = document.querySelector('.fail-password'); //비밀번호 8글자이하일때 에러메세지
let PasswordRepeatErrorMessage = document.querySelector('.mismatch-password hidden') //비밀번호 불일치 에러메세지

let loginButtonValid = document.getElementById('loginbutton'); //로그인 조건을 충족했을때 버튼 활성화

// 유효성검사

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return password.length >=8;
}

function ispasswordMatch (password1, password2) {
  return password1 === password2;
}

// 모든 입력 필드에 대한 유효성 검사 함수
function validateForm() {
  // 이메일 유효성 검사
  if (emailInput.value.trim() === '') {
      emailErrorMessage.classList.remove('hide');
      emailFormatErrorMessage.classList.add('hide');
  } else if (!validateEmail(emailInput.value)) {
      emailErrorMessage.classList.add('hide');
      emailFormatErrorMessage.classList.remove('hide');
  } else {
      emailErrorMessage.classList.add('hide');
      emailFormatErrorMessage.classList.add('hide');
  }

  // 비밀번호 유효성 검사
  if (passwordInput.value.trim() === '') {
      passwordErrorMessage.classList.remove('hide');
      passwordLengthErrorMessage.classList.add('hide');
  } else if (!validatePassword(passwordInput.value)) {
      passwordErrorMessage.classList.add('hide');
      passwordLengthErrorMessage.classList.remove('hide');
  } else {
      passwordErrorMessage.classList.add('hide');
      passwordLengthErrorMessage.classList.add('hide');
  }

  // 비밀번호 일치 여부 검사
  if (passwordRepeat.value.trim() !== '') {
      if (!ispasswordMatch(passwordInput.value, passwordRepeat.value)) {
        PasswordRepeatErrorMessage.classList.remove('hide');
      } else {
        PasswordRepeatErrorMessage.classList.add('hide');
      }
  }

  
  // 모든 입력 필드가 유효한 경우 로그인 버튼 활성화
  loginButton.disabled = !(
      emailInput.value.trim() !== '' &&
      validateEmail(emailInput.value) &&
      passwordInput.value.trim() !== '' &&
      validatePassword(passwordInput.value) &&
      ispasswordMatch(passwordInput.value, passwordRepeat.value)
  );
}

//유저 데이터

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
]


// 이벤트 리스너 설정
emailInput.addEventListener('blur', validateForm);
passwordInput.addEventListener('blur', validateForm);
passwordRepeat.addEventListener('blur', validateForm);



loginButton.addEventListener('click', () => {
  if (!validateForm()) {
      return; // 유효성 검사 실패 시 종료
  }

  const enteredEmail = emailInput.value;
  const enteredPassword = passwordInput.value;

  // USER_DATA 배열에서 일치하는 사용자 찾기
  const user = USER_DATA.find(user => user.email === enteredEmail && user.password === enteredPassword);

  if (!user) {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
  } else {
      // 로그인 성공 시 페이지 이동
      window.location.href = "items.html";
  }
});