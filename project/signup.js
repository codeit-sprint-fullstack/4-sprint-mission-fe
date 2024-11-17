const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
]


// 비밀번호 암호화 해제/설정 버튼
let icons = document.querySelectorAll('.icon_eyes');
icons.forEach(icon => {
    icon.addEventListener('click',function () { 
        const input = icon.previousElementSibling;
        let type = input.getAttribute('type');
        if(type === 'password'){
            type ='text';
            icon.setAttribute('src','img/btn_visibility_on.png')
        }
        else{
            type='password';
            icon.setAttribute('src','img/btn_visibility_off.png')
        }
        input.setAttribute('type',type);
    })
});


// 변수들
let button = document.querySelector('#section1_button');
let inputbox = document.querySelectorAll('#section1 input');
const email_pattern =/^[a-zA-Z0-9]+@[a-zA-Z]+\.+[a-zA-Z]/;
const pw_pattern=/^.{8,}/;
let email_check =false;//형식이 올바른지 확인
let pw_check =false;//형식이 올바른지 확인
let pw_same_check = false;
let modal =document.querySelector('.modal');
let error_button = document.querySelector('#error_msg_button');





const make_alret_msg = (input,text)=>{
    let box = input.closest('.section1_box')
    if(!box.querySelector('.alert')){
        input.style.border =  '0.125rem solid red';
        let alert_msg = document.createElement('div');
        alert_msg.textContent = text;
        alert_msg.className = 'alert';
        box.append(alert_msg);
        
    }
    else{
        input.style.border =  '0.125rem solid red';
        box.querySelector('.alert').textContent = text;
    }
}


//입력 값이 올바른지 체크
inputbox.forEach(input=>{
    input.addEventListener('blur',function(){
        if(input.id === "section1_emailbox"){// 이메일인지 비밀번호인지 확인 -> 이메일이면
            if(input.value===''){ // 아무것도 입력 안하면
                make_alret_msg(input,'이메일을 입력해주세요.');
            }
            else if(!email_pattern.test(input.value)){
                make_alret_msg(input,'잘못된 이메일 형식입니다.');
            }
            else if(email_pattern.test(input.value)){
                if(input.parentElement.querySelector('.alert')) {
                    input.parentElement.querySelector('.alert').remove();
                }
                input.style.border =  'none';
            }
        }
        
        else if(input.id === "section1_pwbox"){// 이메일인지 비밀번호인지 확인 -> 비밀번호면
            if(input.value===''){ // 아무것도 입력 안하면
                make_alret_msg(input,'비밀번호를 입력해주세요.');

            }
            else if(!pw_pattern.test(input.value)){
                make_alret_msg(input,'비밀번호를 8자 이상 입력해주세요.');
            }
            else if(pw_pattern.test(input.value)){
                if(input.closest('.section1_box').querySelector('.alert')) {
                    input.closest('.section1_box').querySelector('.alert').remove();
                }
                input.style.border =  'none';
            }
        }
        else if(input.id === "section1_pwcheckbox"){// 비밀번호 확인
            const pw_input = document.querySelector('#section1_pwbox').value;
            if(pw_input !== input.value){
                make_alret_msg(input,'비밀번호가 일치하지 않습니다.');
            }
            else{
                if(input.closest('.section1_box').querySelector('.alert')) {
                    input.closest('.section1_box').querySelector('.alert').remove();
                }
                input.style.border =  'none';
            }
        }
    })
})

const check_input = () =>{
    
    if(pw_check === true && email_check === true && pw_same_check === true){
        button.style.backgroundColor ='#3692FF';
        button.disabled = false;
    }
    else{
        button.style.backgroundColor ='#9CA3AF';
        button.disabled = true;
    }
}

inputbox.forEach(input=>{
    input.addEventListener('input',()=>{
        console.log(input.value);
        if(input.id === "section1_emailbox"){
            if(email_pattern.test(input.value)){
                email_check=true;
            }
            else{
                email_check=false;
            }
        }
        
        else if(input.id === "section1_pwbox"){
            if(pw_pattern.test(input.value)){
                pw_check = true;
            }
            else{
                pw_check = false;
            }
        }
        else if(input.id === "section1_pwcheckbox"){
            const pw_input = document.querySelector('#section1_pwbox').value;
            if(input.value === pw_input){
                pw_same_check = true;
            }
            else{
                pw_same_check = false;
            }
        }
    })
    input.addEventListener('focus',()=>{
        input.style.border =  '0.125rem solid #3692FF';
    });

    input.addEventListener('input',check_input);

});

button.addEventListener('click',()=>{
    const email_input = document.querySelector('#section1_emailbox').value;
    const user_exist = USER_DATA.some(user => user.email === email_input);
    if(pw_check === true && email_check === true && pw_same_check === true){
        if(!user_exist){ // 존재 안하면?
            location.href = 'login.html';
        }
        else{
            modal.classList.remove('hidden');
        }
    }
});

error_button.addEventListener('click',()=>{
    modal.classList.add('hidden');
})