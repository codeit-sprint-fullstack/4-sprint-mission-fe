import { useState } from 'react';
import './DropDown.css';

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
    <div className="dropdown" onBlur={handleBlur}>
      <label onClick={handleButtonClick}>
        <button>{labelText}</button>
      </label>
      {isDropdownView && <DropDownMenu onSelect={handleMenuSelect} />}
    </div>
  );
};

export default DropDown;