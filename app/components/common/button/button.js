import React from 'react';
import { Strings } from 'helpers';
import './button.css';

const Button = ({
    style,
    size,
    color,
    text,
    ...props
}) => (
    <button
        {...props}
        className={`button ${color ? `button-${color}` : ''} ${size ? `button-${size}` : ''} ${style ? `button-${style}` : ''}`}
    >
        {Strings[text] ? Strings[text] : text}
    </button>
);

export default Button;
