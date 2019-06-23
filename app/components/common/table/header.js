import React from 'react';
import { Icon } from 'components/common/index';

const Header = ({
    field,
    label,
    sortable,
    sort,
    onSort,
    ...props
}) => {
    const iconClassName = sort === `${field},desc` ? 'faChevronUp' : 'faChevronDown';
    const sortOpposite = sort === `${field},desc` ? `${field},asc` : `${field},desc`;
    return (
        <th {...props}>
            {label}
            {sortable && <Icon name={iconClassName} onClick={() => { onSort(sortOpposite); }} />}
        </th>
    );
};

export default Header;
