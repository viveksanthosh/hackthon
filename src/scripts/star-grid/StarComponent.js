'use strict';

import React from 'react';
import StarGrid from './StarGrid';
import queryString from 'query-string';
const fields = ['Vivek', 'App'];

export default class Display extends React.Component {
    constructor(props) {
        super(props);
        let selectedFields = {};
        fields.forEach(field => {
            selectedFields[field] = 0;
        });
        this.state = {
            show: {
                "skip": true,
                "disableSkip": false,
                "chat": false
            },
            selected: selectedFields
        };
        this._onClick = this._onClick.bind(this);
    }

    _onClick(event) {
        let starName = event.target.id.split('-');
        this.state.selected[starName[1]] = parseInt(starName[0]);
        this.setState({selected: this.state.selected});
        let selectedKeys = Object.keys(this.state.selected);
        let length = selectedKeys.length, selected = 0, twoOrLess = 0;
        selectedKeys.map((key)=> {
            if (this.state.selected[key] !== 0) {
                selected++;
            }
            if (this.state.selected[key] <= 2) {
                twoOrLess++;
            }
        });
        if (selected === length) {
            this.state.show.skip = false;
            if (twoOrLess !== 0) {
                this.state.show.chat = true;
            }else{
                this.state.show.chat = false;
            }
        } else if (selected !== 0) {
            this.state.show.disableSkip = true;
        }

        this.setState({show:  this.state.show});
    }

    _createStarRow() {
        return fields.map(field => {
            return (<StarGrid key={field} _onClick={this._onClick} gridName={field}
                              selected={this.state.selected[field]}/>);

        });
    }

    render() {
        const parsed = queryString.parse(location.search);
        console.log(parsed);
        let show = this.state.show;
        let starRow = this._createStarRow();
        return (
            <div>
                <br/><br/><br/>

                <div style={{"marginLeft": "25%"}}>
                    {starRow}
                </div>
                <br/>

                <div style={{"textAlign": "center"}}>
                    {show.skip && <input type="button" disabled={show.disableSkip}style={{"fontSize": "20px"}} className="btn btn-primary"
                                         value="Skip"/>}
                    {!show.skip && <input type="button" style={{"fontSize": "20px"}} className="btn btn-primary"
                                         value="Submit"/>}
                    {(!show.skip&& show.chat) && <input type="button" style={{"fontSize": "20px"}} className="btn btn-success"
                                          value="Chat"/>}

                </div>
            </div>

        );
    }
}

