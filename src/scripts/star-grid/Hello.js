import React from 'react';

const Component = props => (
    <h1>
        {props.message}
    </h1>
);

export default Component;

Component.propTypes = {
    message: React.PropTypes.string.isRequired
};