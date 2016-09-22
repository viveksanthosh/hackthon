import React from 'react';

const Star = props => (
    <span id={props.id} onClick={props._onClick} className="col-xs-1">
        <p id={props.id} className="glyphicon glyphicon-star"
           style={{"fontSize": "40px", "color": props.color}}></p>
    </span>
);

export default Star;

Star.propTypes = {
    id: React.PropTypes.string.isRequired,
    color: React.PropTypes.string.isRequired,
    _onClick: React.PropTypes.func.isRequired
};