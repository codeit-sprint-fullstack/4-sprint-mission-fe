import icX from '@/assets/images/ic-x.png';
import Image from 'next/image';

interface Props {
  tag: string;
  onClick?: (index: number) => void;
  index?: number;
}

function TagChip({ tag, onClick, index }: Props) {
  const handleClick = () => {
    if (!onClick || !index) return;
    onClick(index);
  };
  return (
    <div
      className={`${
        onClick ? 'cursor-pointer' : ''
      } inline-flex items-center bg-[#f3f4f6] py-[5px] px-4 rounded-full mr-2 mb-2 `}
      onClick={onClick ? handleClick : undefined}
    >
      <span className="text-[#1F2937]">{`#${tag}`}</span>
      {onClick && (
        <div className="shrink-0 ml-2 p-[6px] bg-[#9da3ae] rounded-full">
          <Image src={icX} alt="delete tag" className="w-2.5" />
        </div>
      )}
    </div>
  );
}

export default TagChip;
