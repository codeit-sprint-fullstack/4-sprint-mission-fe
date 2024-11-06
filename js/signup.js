import { eyes, togglePwVisibility } from './toggle-password.js';
import { form, validCheck } from './chk-valid-login-signup.js';

/* 패스워드 보이기/숨기기 toggle 기능 */
for (let eye of eyes) {
  eye.addEventListener('click', togglePwVisibility);
}

/* 입력값 유효성 체크 */
form.addEventListener('focusout', validCheck);