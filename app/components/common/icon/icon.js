import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft,
    faCheck,
    faKey,
    faTimes,
    faUser,
    faUsers,
    faChevronUp,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faSearch,
    faEdit,
    faSort,
    faSortUp,
    faSortDown,
    faTasks,
    faBook,
    faWallet,
    faInfo,
} from '@fortawesome/free-solid-svg-icons';

import './icon.css';

const AvailableIcons = {
    faAngleLeft,
    faCheck,
    faUser,
    faKey,
    faTimes,
    faUsers,
    faChevronUp,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faSearch,
    faEdit,
    faSort,
    faSortUp,
    faSortDown,
    faTasks,
    faBook,
    faWallet,
    faInfo,
};

const Icon = ({
    name,
    className,
    ...props
}) => <FontAwesomeIcon icon={AvailableIcons[name]} className={`icon ${className}`} {...props} />;

Icon.defaultProps = {
    name: '',
    className: '',
};

export default Icon;
