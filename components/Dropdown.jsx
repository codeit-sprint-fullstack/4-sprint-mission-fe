import { useState } from 'react';

export const DropDownMenu = ({ onSelect }) => {
  const MENU_ITEMS = [
    { text: '최신순', value: 'recent' },
    { text: '좋아요순', value: 'favorite' },
  ];

  const handleClick = (value) => () => {
    onSelect(value);
  };

  return (
    <div className="dropdown-menu">
      {MENU_ITEMS.map(({ text, value }) => (
        <div className="dropdown-item" key={value} onClick={handleClick(value)}>
          {text}
        </div>
      ))}
    </div>
  );
};

const DropDown = ({ onClick, value }) => {
  const [label, setLabel] = useState(value);
  const [isDropdownView, setDropdownView] = useState(false);
  const labelText =
    label === 'recent'
      ? `최신순   ${isDropdownView ? '▲' : '▼'}`
      : `좋아요순  ${isDropdownView ? '▲' : '▼'}`;

  const handleButtonClick = () => {
    setDropdownView(!isDropdownView);
  };

  /**
   * 포커스 아웃시 onBlur가 호출되었을 때 blur이벤트로 드롭다운 메뉴가 클릭되지 않는 문제 발생
   * - setTimeout으로 메뉴가 닫히는 것을 딜레이함으로써 해결
   */
  const handleBlur = () => {
    setTimeout(() => {
      setDropdownView(false);
    }, 100);
  };

  const handleMenuSelect = (order) => {
    onClick(order);
    setLabel(order);
    setDropdownView(!isDropdownView);
  };

  return (
    <div className="relative" onBlur={handleBlur}>
      <label onClick={handleButtonClick}>
        <button className="w-[130px] h-[42px] bg-white border rounded-lg">
          {labelText}
        </button>
      </label>
      {isDropdownView && <DropDownMenu onSelect={handleMenuSelect} />}
    </div>
  );
};

export default DropDown;
