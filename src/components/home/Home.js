import React from 'react';
import Head from '../head/Head';
import Foot from '../foot/Foot';
import Contact from '../contact/Contact';
import Subject from '../subject/Subject';
import Meeting from '../meeting/Meeting';
import Notes from '../notes/Notes';
import './Home.css';

const Home = ({ userStatusForHeader, signInUser, signOutUser, userName, profilePicUrl }) => {
    return (
        <div className="App">
            <Head userStatusForHeader={userStatusForHeader} signInUser={signInUser} signOutUser={signOutUser} userName={userName} profilePicUrl={profilePicUrl}/>
            <div className="main container">
                <Contact/>
                <Subject/>
                <Meeting/>
                <Notes/>
            </div>
            <Foot/>
        </div>
    )
}

export default Home
