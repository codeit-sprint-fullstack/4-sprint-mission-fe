/* 패스워드 보이기/숨기기 toggle 기능 */

// 눈동자 아이콘 요소들 선택
const eyes=document.querySelectorAll('.eyes');

// 이벤트 핸들러
function togglePasswordVisibility(e){
  
  const imgSrc= e.target.getAttribute('src');

  // 아이콘과 'input type' toggle 하기
  if(imgSrc==="/img/eye_disable.png"){
    e.target.setAttribute("src", "/img/eye.png");
    e.target.parentElement.firstElementChild.removeAttribute('type');
  }else{
    e.target.setAttribute("src","/img/eye_disable.png");
    e.target.parentElement.firstElementChild.setAttribute('type',"password");
  }
}

// 눈동자 아이콘에 이벤트 리스너 등록
for(let eye of eyes){
  eye.addEventListener('click',togglePasswordVisibility);
}

