import React from "react";

function DropdownToggle({ onToggle, selectedOption }) {
    return (
        <button className="dropdown-button" onClick={onToggle}>
            {selectedOption || "최신순"} ▼
        </button>
    );
}

export default DropdownToggle;
