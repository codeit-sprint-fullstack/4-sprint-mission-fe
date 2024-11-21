import { useState } from "react";
import "./DropDown.css";

export const DropDownMenu = ({ onSelect }) => {
  const MENU_TEXT = ["최신순", "좋아요순"];
  const handleClick = (e) => {
    const value = e.target.getAttribute("value");
    if (value === "최신순") {
      onSelect("recent");
    } else {
      onSelect("favoriet");
    }
  };
  return (
    <div className="dropdown-menu">
      {MENU_TEXT.map((item, i) => (
        <div
          className="dropdown-item"
          value={item}
          key={i}
          onClick={handleClick}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

const DropDown = ({ order = "recent" }) => {
  const [label, setLabel] = useState(order);
  const [isDropdownView, setDropdownView] = useState(false);
  const labelText =
    label === "recent"
      ? `최신순   ${isDropdownView ? "▲" : "▼"}`
      : `좋아요순  ${isDropdownView ? "▲" : "▼"}`;

  const handleClickContainer = () => {
    setDropdownView(!isDropdownView);
  };

  const handleBlurContainer = () => {
    setTimeout(() => {
      setDropdownView(false);
    }, 100);
  };

  return (
    <div className="dropdown" onBlur={handleBlurContainer}>
      <label onClick={handleClickContainer}>
        <button>{labelText}</button>
      </label>
      {isDropdownView && <DropDownMenu onSelect={setLabel} />}
    </div>
  );
};

export default DropDown;
