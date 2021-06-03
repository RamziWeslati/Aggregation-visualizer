import React from 'react';
import PropTypes from 'prop-types';

/***
 * wrapper component to properly render expandable object in a table.
 * @props:
 *  - colNumber: number of columns that the expanded component should occupy
 *  - className: styling object
 */
const Collapsable = (props) => (
    <td colSpan={props.colNumber}>
        <div className={props.className}>
            {props.children}
        </div>
    </td>
)

Collapsable.propTypes = {
    colNumber: PropTypes.number.isRequired,
    className: PropTypes.object
};

Collapsable.defaultProps = {
    className: {}
};

export default Collapsable;