import React from 'react';
import jwt from "jsonwebtoken";
import AuthenticationContext from '../contexts/AuthenticationContext';


function UserGreeting() {
    return (
        <AuthenticationContext.Consumer>
            {
                ({ accessToken }) => <>Witaj {getUserEmail(accessToken)}</>
            }
        </AuthenticationContext.Consumer>)

}

export default UserGreeting;


function getUserEmail(accesToken) {
    const { email } = jwt.decode(accesToken);
    return email;
}