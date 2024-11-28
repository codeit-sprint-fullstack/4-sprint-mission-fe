import { useState } from "react";
import "./DropDown.css";

export const DropDownMenu = ({ onSelect }) => {
  const MENU_TEXT = ["최신순", "좋아요순"];

  const handleClick = (e) => {
    if (e.target.textContent === "최신순") {
      onSelect("recent");
    } else {
      onSelect("favorite");
    }
  };

  return (
    <div className="dropdown-menu">
      {MENU_TEXT.map((item, i) => (
        <div className="dropdown-item" key={i} onClick={handleClick}>
          {item}
        </div>
      ))}
    </div>
  );
};

const DropDown = ({ onClick, value }) => {
  const [label, setLabel] = useState(value);
  const [isDropdownView, setDropdownView] = useState(false);
  const labelText =
    label === "recent"
      ? `최신순   ${isDropdownView ? "▲" : "▼"}`
      : `좋아요순  ${isDropdownView ? "▲" : "▼"}`;

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
