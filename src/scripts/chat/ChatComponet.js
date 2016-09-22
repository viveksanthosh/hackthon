'use strict';

import React from 'react';
import postCall from '../action/PostCall';
import getCall from '../action/GenericGet';


const chatAlign = ["left", "right"];
export default class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: [],
            message: ""
        };
        this._onChatSubmit = this._onChatSubmit.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount(){
        getCall('http://localhost:8000/history').then((data)=>{
            this.setState({chat:data.body});
        })
    }

    _onChatSubmit() {
        postCall("http://localhost:8000/conversation", {
            "message": this.state.message
        }).then((response)=> {
           this.setState({chat: response.body});
        })

    }

    _onChange(event) {
        this.state.message = event.target.value;
        this.setState({message: this.state.message});
    }

    render() {
        console.log(this.state.message);
        return (
            <div className="container">
                <br/><br/><br/><br/>
                <table style={{"marginLeft": "35%", "width": "40%"}} className="table">
                    <thead>
                    <tr>
                        <th style={{"textAlign": "center"}}>Chat</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.chat.map((chat, index) => {

                        return (
                            <tr style={{"textAlign": chatAlign[(index%2)] }}>
                                <td>{chat}</td>
                            </tr>);
                    })}

                    </tbody>
                </table>
                <div style={{"marginLeft": "43%"}}>
                    <input onChange={this._onChange} style={{ "width": "40%"}} className="form-control"/>
                    <br/>
                    <input type="button" onClick={this._onChatSubmit} style={{ "marginLeft": "15%"}}
                           className="btn-primary" value="Send"/>

                </div>
            </div>
        );
    }
}

