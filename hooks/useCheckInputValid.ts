import { ChangeEventHandler, FocusEventHandler, useState } from 'react';

function useCheckInputValid(validation: (value: string) => boolean) {
  const [inputValue, setInputValue] = useState<string>('');
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isBeforeTouch, setIsBeforeTouch] = useState<boolean>(true);

  const inputValueValid = validation(inputValue);
  /**
   * 유효성 체크를 위한 변수
   * - 입력폼 최초 클릭전에는 유효성 체크를 하지 않아야 하므로 true(그래야 에러메시지가 출력되지 않는다)
   * - 그러나 이럴 경우 페이지 최초 로딩 시 모든 값의 valid가 true가 되며 '등록' 버튼도 활성화되는 문제 발생
   * - 이를 막기 위해 RegistrationForm.js의 useEffect에서 isBeforeTouch를 활용하여 이중으로 체크
   */
  const isValid = isBeforeTouch ? true : isTouched && inputValueValid;

  const handleChange: ChangeEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    setIsBeforeTouch(false);
    setIsTouched(true);
    setInputValue(value);
  };
  const handleBlur: FocusEventHandler = () => {
    setIsBeforeTouch(false);
    setIsTouched(true);
  };
  // const handleReset = () => {
  //   setInputValue('');
  // };

  return {
    inputValue,
    isValid,
    isBeforeTouch,
    setInputValue,
    handleBlur,
    handleChange,
    // handleReset,
  };
}
export default useCheckInputValid;
