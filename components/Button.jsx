import color from '@/styles';

function Button({ children, sizeW, sizeH }) {
  return (
    <button
      className={`shrink-0 w-[${sizeW}px] h-[${sizeH}px] bg-[#3692FF] text-white rounded-lg hover:bg-[${color.mainColorDark}]`}
    >
      {children}
    </button>
  );
}

export default Button;
