import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components/common/index';

import './sorting.css';

const Sorting = props => (
    <div className="sorting-container">
        {props.children}
        {
            props.order === 'asc' ? (
                <div className="sorting-icons"><Icon name="faChevronDown" onClick={() => { props.onSort(props.field, 'desc'); }} /></div>
            )
                : props.order === 'desc' ? (
                    <div className="sorting-icons"><Icon name="faChevronUp" onClick={() => { props.onSort(props.field, 'asc'); }} /></div>
                )
                    : (
                        <div className="sorting-icons">
                            <Icon name="faSort" onClick={() => { props.onSort(props.field, 'asc'); }} />
                        </div>
                    )
        }
    </div>
);

Sorting.propTypes = {
    field: PropTypes.string,
    order: PropTypes.string,
};

export default Sorting;
