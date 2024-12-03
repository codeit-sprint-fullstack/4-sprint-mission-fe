import { useState, useEffect } from 'react';
import './Pagination.css';


export function Pagination({ onPageChange }) {
    const [pageNum, setPageNum] = useState(1);

    const handlePageChange = (e) => {
        const newPage = parseInt(e.target.innerText);
        setPageNum(newPage);
        onPageChange(newPage);
    }

    return (
        <div className="pagination">
            <button onClick={handlePageChange}>1</button>
            <button onClick={handlePageChange}>2</button>
            <button onClick={handlePageChange}>3</button>
            <button onClick={handlePageChange}>4</button>
            <button onClick={handlePageChange}>5</button>
        </div>
    );
}

export default Pagination;