/* 패스워드 보이기/숨기기 toggle 기능 */

// 눈동자 아이콘 요소들 선택
export const eyes = document.querySelectorAll(".eyes");
let hidePassword = true;

// 이벤트 핸들러

export function togglePwVisibility(e) {
  const imgSrc = e.target.getAttribute("src");
  hidePassword = !hidePassword;

  // 아이콘과 'input type' toggle 하기
  if (hidePassword) {
    e.target.setAttribute("src", "/img/eye-disable.png");
    e.target.parentElement.firstElementChild.setAttribute("type", "password");
  } else {
    e.target.setAttribute("src", "/img/eye.png");
    e.target.parentElement.firstElementChild.removeAttribute("type");
  }
}
