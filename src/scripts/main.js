import React from 'react';
import ReactDOM from 'react-dom';
import StarComponent from './star-grid/StarComponent';
import ChatComponent from './chat/ChatComponet.js';
import {Router, Route} from 'react-router';

let Routes = (
    <Router>
        <Route path="rating" component={StarComponent} />
        <Route path="chat" component={ChatComponent} />
    </Router>
)
ReactDOM.render(Routes, document.getElementById('app'));