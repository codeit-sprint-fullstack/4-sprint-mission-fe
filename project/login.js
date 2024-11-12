


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


// 버튼 색깔 활성화
let button = document.querySelector('#section1_button');
let inputbox = document.querySelectorAll('#section1 input')
function checkinput(){
    let check =true;
    inputbox.forEach(input => {
        if(input.value === ''){
            check=false
        }
    });
    if(check === true){
        button.style.backgroundColor ='#3692FF';
    }
    else{
        button.style.backgroundColor ='#9CA3AF';
    }
}
inputbox.forEach(input=>{
    input.addEventListener('input',checkinput);
});
