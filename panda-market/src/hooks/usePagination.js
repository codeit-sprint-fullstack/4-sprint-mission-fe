import { useState } from 'react';

const usePagination = ({ totalItems, itemsPerPage }) => {
  const [currentPage, setPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return {
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    setPage,
  };
};

export default usePagination;
