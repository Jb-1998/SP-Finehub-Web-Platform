import React, {useContext} from 'react';
import {Router} from '@reach/router';
import {Home, SignIn, SignUp, User} from '../pages'
import { UserContext } from "../providers/UserProvider";
import { Redirect } from 'react-router';

const RouterScreen = () => {
    const user = useContext(UserContext);
    
    return (
        user ?
        <Router>
            <User path="/"/>
            <Home path="/home"/>
        </Router>
        :
        <Router>            
            <SignIn path="/"/>
            <SignUp path="/"/>    
        </Router>
    )
}

export default RouterScreen;