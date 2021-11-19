import React from 'react';
import Head from './Head';
import Foot from './Foot';
import logo from '../assets/img/papertrail-2-logo.png';
import '../assets/styles/Welcome.css';

const Welcome = ({ userStatusForHeader, signInUser, signOutUser, userName, profilePicUrl }) => {   
    return (
        <div className="welcome-screen">
            <Head userStatusForHeader={userStatusForHeader} signInUser={signInUser} signOutUser={signOutUser} userName={userName} profilePicUrl={profilePicUrl}/>
            <div className="welcome-message">
                <h2>Welcome to <img src={logo} alt="" /></h2>
                <h3>PAPERTRAIL IS A WORLD-CLASS PROFESSIONAL NOTE TAKING APPLICATON</h3>
                <h2>To continue, sign-in with your Google account!</h2>
            </div>
            <Foot />
        </div>
    )
}

export default Welcome
