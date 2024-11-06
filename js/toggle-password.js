/* 패스워드 보이기/숨기기 toggle 기능 */

// 눈동자 아이콘 요소들 선택
export const eyes = document.querySelectorAll('.eyes');

// 이벤트 핸들러
export function togglePwVisibility(e) {

  const imgSrc = e.target.getAttribute('src');

  // 아이콘과 'input type' toggle 하기
  if (imgSrc === "/img/eye-disable.png") {
    e.target.setAttribute("src", "/img/eye.png");
    e.target.parentElement.firstElementChild.removeAttribute('type');
  } else {
    e.target.setAttribute("src", "/img/eye-disable.png");
    e.target.parentElement.firstElementChild.setAttribute('type', "password");
  }
}