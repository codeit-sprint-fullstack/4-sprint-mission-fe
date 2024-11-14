const form = document.querySelector("form");

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputEmail = email.value;
    const inputPassword = password.value;

    //USER_DATA에 없거나, 이메일은 일치하지만 비밀번호가 틀린경우 -> '비밀번호가 일치하지 않습니다.'
    const user = USER_DATA.find((user) => user.email==inputEmail );

    if(user === undefined || user.password !== inputPassword) {
        alert("비밀번호가 일치하지 않습니다.");
    } else {
        alert("로그인 성공!");
        window.location.href = "/item";
    }
});