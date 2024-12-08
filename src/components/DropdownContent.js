import React from "react";

function DropdownContent({ isOpen, options, handleOptionClick }) {
    if (!isOpen) {
        return null;
    }

    if (options.length > 0) {
        return (
            <ul className="dropdown-menu">
                {options.map((option, index) => (
                    <li
                        key={index}
                        className="dropdown-item"
                        onClick={() => handleOptionClick(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        );
    }

    return <p className="dropdown-no-options">옵션이 없습니다.</p>;
}

export default DropdownContent;
