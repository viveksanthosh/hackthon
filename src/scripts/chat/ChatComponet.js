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
            message: "",
            nextQuestion: {}
        };
        this._onChatSubmit = this._onChatSubmit.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        getCall('http://localhost:8000/history').then((data)=> {
            console.log(data.body)
            this.setState({nextQuestion: data.body.nextQuestion});
            this.setState({chat: data.body.conversation});
        })
    }

    _onChatSubmit() {
        postCall("http://localhost:8000/conversation", {
            "message": this.state.message,
            "questionNumber": this.state.nextQuestion
        }).then((response)=> {
            this.setState({nextQuestion: response.body.nextQuestion});
            this.setState({chat: response.body.conversation});
        })

    }

    _onChange(event) {
        this.state.message = event.target.value;
        this.setState({message: this.state.message});
    }

    render() {
        console.log(this.state.nextQuestion)
        return (
            <div className="container">
                <br/><br/><br/><br/>
                <table
                    style={{"width": "40%","border": "1px solid black", "marginLeft":"650px","background-color":"white", "box-shadow": "10px 10px 5px #f1f1f1"}}
                    className="table">
                    <thead>
                    <tr>
                        <th style={{"textAlign": "center", "background-color":"black", "color":"white"}}>Feedback Chat</th>
                    </tr>
                    </thead>
                    <tbody style={{"background-color":"#333333", "color":"white"}}>
                    {this.state.chat.map((chat, index) => {

                        return (
                            <tr style={{"textAlign": chatAlign[(index%2)] }}>
                                <td>{chat}</td>
                            </tr>);
                    })}

                    </tbody>
                </table>
                <div style={{"marginLeft": "64%", "width": "68%"}}>
                    <input onChange={this._onChange} style={{ "width": "40%"}} className="form-control"/>
                    <br/>
                    <input type="button" onClick={this._onChatSubmit} style={{ "marginLeft": "17%"}}
                           className="btn-primary" value="Send"/>

                </div>
            </div>
        );
    }
}

