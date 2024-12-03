import React, { useState } from 'react';
import './DropDown.css';

function DropDown({ options = [], onSelect }) { 
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
                {selectedOption || "최신순"} ▼
            </button>
            {isOpen && options.length > 0 ? (
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
            ) : (
                isOpen && <p className="dropdown-no-options">옵션이 없습니다.</p>
            )}
        </div>
    );
}

export default DropDown;
