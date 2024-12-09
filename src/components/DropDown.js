import React, { useState } from "react";
import "../styles/DropDown.css";
import DropdownToggle from "./DropdownToggle"; 
import DropdownContent from "./DropdownContent";

function DropDown({ options = [], onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div className="dropdown">
            <DropdownToggle 
                onToggle={toggleDropdown}
                selectedOption={selectedOption}
            />
            <DropdownContent 
                isOpen={isOpen}
                options={options}
                handleOptionClick={handleOptionClick}
            />
        </div>
    );
}

export default DropDown;
