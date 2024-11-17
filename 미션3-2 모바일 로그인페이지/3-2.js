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
