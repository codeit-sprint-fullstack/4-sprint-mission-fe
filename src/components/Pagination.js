<<<<<<< HEAD
import { useState, useEffect } from 'react';
import './Pagination.css';
=======
import { useState, useEffect } from "react";
import "../styles/Pagination.css";
>>>>>>> 0f1a9c4 (refactor: sprint5 코멘트 반영)


export function Pagination({ onPageChange }) {
    const [pageNum, setPageNum] = useState(1);

    const handlePageChange = (e) => {
        const newPage = parseInt(e.target.innerText);
        setPageNum(newPage);
        onPageChange(newPage);
    }

    return (
        <div className="pagination">
            {[1,2,3,4,5].map((i) => (
                <button key={i} onClick={handlePageChange}>{i}</button>
            ))}
        </div>
    );
}

export default Pagination;