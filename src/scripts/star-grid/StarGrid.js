import React from 'react';
import Star from './Star';

const StarGrid = props => {
    let stars = [1, 2, 3, 4, 5].map(number=> {
        let color, name;
        if (number <= props.selected) {
            color = "gold";
        }
        else {
            color = "red";
        }
        name = number + '-' + props.gridName;
        return (<Star key={name} _onClick={props._onClick} id={name} color={color}/>);
});
    return (
        <div className="row">
                 <span className="col-xs-2">
                    <label style={{"fontSize": "30px"}}>{props.gridName + ':'}</label>
                 </span>
            {stars}
        </div>

    );
};

export default StarGrid;

StarGrid.propTypes = {
    selected: React.PropTypes.number.isRequired,
    _onClick: React.PropTypes.func.isRequired,
    gridName: React.PropTypes.string.isRequired
};