const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];
const email = document.querySelector("#email");
const email_status = document.querySelector("#이메일상태")
const password_status = document.querySelector("#패스워드상태")
const password = document.querySelector("#password");
const login = document.querySelector(".로그인버튼>input");

let gEmail = "", gPassword = "";
/*-------------------------------------
 이메일 
--------------------------------------*/
email.addEventListener("keydown", () =>
{
    email_status.textContent = "";
    email.setAttribute("class", "이메일-정상");
    console.log('----------')
});
email.addEventListener("click", () =>
{
    email_status.textContent = "";
    email.setAttribute("class", "이메일-정상");
    console.log('----------')
});
email.addEventListener("change", ({ target }) =>
{
    for (let info of USER_DATA)
    {
        if (info.email == target.value)
        {
            gEmail = info.email;

            login.setAttribute("class", "로그인버튼-비활성");
            email_status.textContent = "";

            return 0;
        }
    }
    email_status.textContent = "잘못된 이메일 형식입니다.";
    email.setAttribute("class", "이메일-오류");
    login.setAttribute("class", "로그인버튼-비활성");
});
/*-------------------------------------
 패스워드
--------------------------------------*/
password.addEventListener("keydown", () =>
{
    password_status.textContent = "";
    password.setAttribute("class", "패스워드-정상");
    console.log('----------')
});
password.addEventListener("click", () =>
{
    password_status.textContent = "";
    password.setAttribute("class", "패스워드-정상");
    console.log('----------')
});
password.addEventListener("change", ({ target }) =>
{
    for (let info of USER_DATA)
    {
        if (info.password == target.value)
        {
            if (gEmail != "")
            {
                gPassword = info.password;
                login.setAttribute("class", "로그인버튼-활성");
                password_status.textContent = "";
                return 1;
            }
            gEmail = ""; gPassword = "";
            password_status.textContent = "";
            break;
        }
    }
    password_status.textContent = "비밀번호를 8자 이상 입력해주세요";
    password.setAttribute("class", "패스워드-오류");

    login.setAttribute("class", "로그인버튼-비활성");


});

login.addEventListener("click", ({ target }) =>
{
    let my_email = "", my_password = "";
    for (let info of USER_DATA)
    {
        if (info.email == email.value)
        {
            my_email = info.email;
            break;
        }
    }
    for (let info of USER_DATA)
    {
        if (info.password == password.value)
        {
            my_password = info.password;
            break;
        }
    }

    login.setAttribute("class", "로그인버튼-비활성")
    if (my_email == "") { alert("비밀번호가 일치하지 않습니다."); return 0; }
    if (my_password == "") { alert("비밀번호가 일치하지 않습니다."); return 0; }
    window.location.href = `${location.protocol}//${location.host}/items`;
});

