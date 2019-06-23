import React from 'react';

import './table.css';

const Table = ({
    className,
    headers,
    rows,
    ...props
}) => (
    <table className={`table${className ? ` ${className}` : ''}`} {...props}>
        <thead>
            <tr>
                {headers}
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
);

export default Table;
