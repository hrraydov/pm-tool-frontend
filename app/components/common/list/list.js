import React from 'react';

import './list.css';

const List = ({ items, renderItem }) => (
    <div className="list">
        {(!items || items.length === 0) && (<div>No items</div>)}
        {items.map(item => (
            <div className="list-item" key={item.key}>
                {renderItem ? renderItem(item) : item.text}
            </div>
        ))}
    </div>
);

export default List;
