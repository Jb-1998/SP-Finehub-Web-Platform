import React, {useContext} from 'react';
import {Router} from '@reach/router';
import Profile, {Home, SignIn, SignUp} from '../pages';
import { UserContext } from "../providers/UserProvider";
import { Redirect } from 'react-router';

const RouterScreen = () => {
    const user = useContext(UserContext);

    return (
        user ?
        <Home />
        :
        <Router>
            <SignIn path="/"/>
            <SignUp path="/signUp"/>
            <Profile path="/NewPage"/>
        </Router>
    )
}

export default RouterScreen;
