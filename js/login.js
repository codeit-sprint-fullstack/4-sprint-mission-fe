/* ------------------------------------------ */
/* 패스워드 보이기/숨기기 toggle 기능 */

// 눈동자 아이콘 요소들 선택
const eyes = document.querySelectorAll('.eyes');

// 이벤트 핸들러
function togglePwVisibility(e) {

  const imgSrc = e.target.getAttribute('src');

  // 아이콘과 'input type' toggle 하기
  if (imgSrc === "/img/eye_disable.png") {
    e.target.setAttribute("src", "/img/eye.png");
    e.target.parentElement.firstElementChild.removeAttribute('type');
  } else {
    e.target.setAttribute("src", "/img/eye_disable.png");
    e.target.parentElement.firstElementChild.setAttribute('type', "password");
  }
}

// 눈동자 아이콘에 이벤트 리스너 등록
for (let eye of eyes) {
  eye.addEventListener('click', togglePwVisibility);
}

/* ------------------------------------------ */
/* 이메일 비밀번호 유효성 체크 */

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
]

const form = document.querySelector('form');
const button = document.querySelectorAll('button')[1];
let inputEmailValue = '';
let inputPwValue = '';

let isEmailChecked = false;
let isPwChecked = false;
let isNickNameChecked = false;
let isPwConfirmChecked = false;

// 에러 메시지 만들기
function createMsgDiv(msgTxt) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add("error-msg");
  msgDiv.textContent = msgTxt;
  return msgDiv;
}

// 이메일 형식 체크
const PATTERN = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
function emailValidChk(email) {
  if (PATTERN.test(email) === false) { return false; }
  else { return true; }
}

// 유효성 체크 핸들러
function validCheck(e) {
  const { target } = e;
  const inputId = target.getAttribute('id'); // input 종류 받아오기
  const inputValue = target.value; // input 입력값

  // 에러 효과 적용
  function setErrStyle(msg) {
    target.after(createMsgDiv(msg));
    target.classList.add("error-input");
  }

  // 에러 효과 삭제
  function removeErrStyle() {
    const next = target.nextElementSibling;
    if (next && next.classList.contains("error-msg")) { // 에러 메시지가 있는 경우 삭제
      target.nextElementSibling.remove();
    }
    target.classList.remove("error-input"); // input 에러 스타일 삭제
  }

  // 버튼 활성화 및 이벤트 핸들링
  function activeBtn() {
    button.classList.add('active-button');
    button.addEventListener('click', checkUserData);
  }

  if (inputValue) { // 1. 값 입력 시
    if (inputId === 'email') { // 1-1. 이메일 입력의 경우
      if (emailValidChk(inputValue)) { // 1-1-1. 이메일이 유효하면
        removeErrStyle();
        inputEmailValue = inputValue;
        isEmailChecked = true;
      } else { // 1-1-2. 이메일이 유효하지 않으면
        removeErrStyle();
        setErrStyle("잘못된 이메일 형식입니다.");
        return false;
      }
    } else if (inputId === 'password') { // 1-2. 비밀번호 입력의 경우
      if (inputValue.length < 8) { // 1-2-1. 비밀번호가 8자리 미만이면
        removeErrStyle();
        setErrStyle("비밀번호를 8자 이상 입력해주세요.");
        return false;
      } else { // 1-2-2. 비밀번호가 8자리 이상이면
        removeErrStyle();
        inputPwValue = inputValue;
        isPwChecked = true;
      }
    } else if (inputId === 'password-confirm') { // 1-3. 비밀번호 확인의 경우
      if (inputPwValue !== inputValue) { // 1-3-1. 비밀번호가 일치하지 않으면
        removeErrStyle();
        setErrStyle("비밀번호가 일치하지 않습니다.");
        return false;
      } else { // 1-3-2. 비밀번호가 일치하면
        removeErrStyle();
        isPwConfirmChecked = true;
      }
    } else { // 1-4. 닉네임 입력의 경우
      if (inputValue) { // 1-4-1. 닉네임을 입력했으면
        removeErrStyle();
        isNickNameChecked = true;
      } else { // 1-4-2. 닉네임을 입력하지 않았으면
        setErrStyle("닉네임을 입력해주세요.");
        return false;
      }
    }

  } else { // 2. 값 미입력 시
    removeErrStyle(); // 기존 에러 메시지 제거
    if (!target.classList.contains('error-input') && target.getAttribute('type') !== 'button') { // 에러 메시지 중복 생성 방지
      const msg = (inputId === 'email')
        ? "이메일을 입력해주세요."
        : (inputId === 'nickname')
          ? "닉네임을 입력해주세요"
          : "비밀번호를 입력해주세요.";
      setErrStyle(msg);
    }
  }

  // 유효성 체크 완료 시 버튼 활성화
  if (button.className === 'login') { // 1. 로그인 버튼
    if (isEmailChecked && isPwChecked) {
      activeBtn();
    }
  } else { // 2. 회원가입 버튼
    if (isEmailChecked && isPwChecked && isPwConfirmChecked && isNickNameChecked) {
      activeBtn();
    }
  }
}

// 로그인/회원가입 버튼 클릭 시 데이터 체크 핸들러
function checkUserData(e) {
  const { target } = e;
  const modal = document.querySelector('.modal');
  const closeBtn = document.querySelector('.close-btn');

  // 모달 팝업, 닫기 버튼 이벤트 핸들링
  function popModal() {
    modal.classList.add('on');
    closeBtn.addEventListener('click', () => { modal.classList.remove('on'); });
  }

  if (target.classList.contains('login')) { // 1. 로그인
    let userExist = USER_DATA.some((el) => el.email === inputEmailValue && el.password === inputPwValue);
    if (userExist) {
      window.location.href = '/items';
    } else {
      popModal();
    }
  } else { // 2. 회원가입
    let emailExist = USER_DATA.some((el) => el.email === inputEmailValue);
    if (emailExist) {
      popModal();
    } else {
      window.location.href = '/login';
    }
  }
}

form.addEventListener('focusout', validCheck);

