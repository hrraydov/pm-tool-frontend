import React from 'react';

import { Icon } from 'components/common/index';

import './pagination.css';

const Pagination = ({
    totalPages,
    currentPage,
    onPageClick,
}) => {
    let centerPages = [...new Array(totalPages)].map((a, i) => i + 1);
    let rightPages = [];
    let leftPages = [];
    if (centerPages.length > 5) {
        centerPages = centerPages.splice(currentPage - 2, 3);
        if (currentPage < 3) {
            centerPages = [1, 2, 3];
        }
        if (currentPage === 3) {
            centerPages = [1, 2, 3, 4];
        }
        if (currentPage > totalPages - 2) {
            centerPages = [totalPages - 2, totalPages - 1, totalPages];
        }
        if (currentPage === totalPages - 2) {
            centerPages = [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }
        if (centerPages[0] !== 1) {
            leftPages = [1];
        }
        if (centerPages[centerPages.length - 1] !== totalPages) {
            rightPages = [totalPages];
        }
    }
    return (
        <div className="pagination-wrapper">
            {currentPage !== 1 && <div className="item" onClick={() => onPageClick(currentPage - 1)}><Icon name="faChevronLeft" /></div>}
            {leftPages.length > 0 && leftPages.map(page => (
                <div className={`item ${currentPage === page ? 'active' : ''}`} key={page} onClick={() => onPageClick(page)}>{page}</div>
            ))}
            {leftPages.length > 0 && <div className="item disabled">...</div>}
            {centerPages.map(page => (
                <div className={`item ${currentPage === page ? 'active' : ''}`} key={page} onClick={() => onPageClick(page)}>{page}</div>
            ))}
            {rightPages.length > 0 && <div className="item disabled">...</div>}
            {rightPages.length > 0 && rightPages.map(page => (
                <div className={`item ${currentPage === page ? 'active' : ''}`} key={page} onClick={() => onPageClick(page)}>{page}</div>
            ))}
            {totalPages !== 0 && currentPage !== totalPages && <div className="item" onClick={() => onPageClick(currentPage + 1)}><Icon name="faChevronRight" /></div>}
        </div>
    );
};

export default Pagination;
