import React from 'react';
import UserGreeting from './UserGreetings';
import RealTimeClock from './RealTimeClock';

function Header({ onLogout }) {
    return (
        <>
            <div>
                <UserGreeting />
                <RealTimeClock />
            </div>
            <div className="logout" onClick={onLogout}>Logout</div>
            <hr />

        </>)
}


export default Header;