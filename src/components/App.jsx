import React from 'react'
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Chat from './Chat/Chat';
import Login from './Login/Login';
import { User, UserContext } from '../contexts/UserContext';


export default function App() {
    return (
        <BrowserRouter>
        <UserContext>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/chat" component={Chat}/>
            </Switch>
        </UserContext>
        </BrowserRouter>
    )
}
