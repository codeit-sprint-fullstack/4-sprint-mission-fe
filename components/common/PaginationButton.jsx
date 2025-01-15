import arrowLeft from '@/assets/images/arrow-left.png';
import Image from 'next/image';

function PaginationButton({ arrowDirection, index, currentPage, onClick }) {
  const handleClick = () => {
    if (arrowDirection) {
      // 1. 화살표인 경우
      onClick(index);
    } else {
      // 2. 화살표가 아닌 경우(숫자인 경우)
      onClick(index);
    }
  };

  if (arrowDirection) {
    const arrowClassName = `w-10 h-10 bg-white border rounded-full flex justify-center items-center text-gray-500 font-semibold mr-1 cursor-pointer ${
      arrowDirection === 'previous' ? '' : 'transform rotate-180'
    }`;

    return (
      <div className={arrowClassName} onClick={handleClick}>
        <Image src={arrowLeft} alt={arrowDirection} className="w-4" />
      </div>
    );
  } else {
    const className =
      index === currentPage
        ? 'w-10 h-10 bg-[#3692FF] rounded-full flex justify-center items-center text-white font-semibold mr-1 cursor-pointer'
        : 'w-10 h-10 bg-white border rounded-full flex justify-center items-center text-gray-500 font-semibold mr-1 cursor-pointer';
    return (
      <div className={className} onClick={handleClick}>
        {index}
      </div>
    );
  }
}

export default PaginationButton;
