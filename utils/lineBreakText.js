/**
 * textarea로 입력된 데이터(json)를 줄바꿈해서 보여주는 함수
 */
function lineBreakText(text) {
  const breakedText = text.split('\n').map((text, i) => {
    return (
      <span key={text + i}>
        {text}
        <br />
      </span>
    );
  });
  return breakedText;
}

export default lineBreakText;
