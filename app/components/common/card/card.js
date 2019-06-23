import React from 'react';

import './card.css';

const Card = ({
    children,
    className,
    ...props
}) => (
    <div {...props} className={`card ${className || ''}`}>{children}</div>
);

export default Card;
