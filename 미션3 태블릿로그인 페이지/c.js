'use strict'
// let email = document.querySelector('#email1');
// email.addEventListener('keydown', (e) => {
//   if (e.key === 'Enter') {
//     alert('비밀번호를 입력해주세요.')
//  }});
// let password = document.querySelector('#password');

// password.addEventListener('keydown', function(r){
//   let pp = password.value;
//   if (pp.key === 'Enter'){
//     ((pp.length > 7 && pp.length <= 16) === false)
//     alert('비밀번호는 8~16자 입니다.')
  // btn.addEventListener('click', (e) => {
  //   if (!email.includes('@')) {
  // alert('이메일 형식이 잘못되었습니다.')
  // } else { 
  //   alert('비밀번호를 입력해주세요')
  // }})
/**조금 지저분해 보이지만 나중에 복습할겸 보려고 남겨둡니다  */

let btn = document.querySelector('#btn');
let emailo = document.querySelector('#email1');
let passwordo = document.querySelector('#password');

btn.addEventListener('click', () => {
  let email = emailo.value;
  let password = passwordo.value;
  console.log(email)
  console.log(password)
  if (email === '') {
    alert('이메일을 입력해 주세요.');
  } else if (!email.includes('@')){
    alert('이메일 형식이 올바르지 않습니다.')
  } else if ((password.length <= 8 && password.length <= 16) === true){
      alert('비밀번호는 8~16자 입니다.')
  } else {
    alert('로그인 성공!')
  }
  } 
    );


