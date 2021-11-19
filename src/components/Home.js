import React from 'react';
import Head from './Head';
import Foot from './Foot';
import Contact from './Contact';
import Subject from './Subject';
import Meeting from './Meeting';
import Notes from './Notes';
import '../assets/styles/Home.css';

const Home = ({ userStatusForHeader, signInUser, signOutUser, userName, profilePicUrl, db }) => {
    return (
        <div className="App">
            <Head userStatusForHeader={userStatusForHeader} signInUser={signInUser} signOutUser={signOutUser} userName={userName} profilePicUrl={profilePicUrl}/>
            <div className="main container">
                <Contact />
                <Subject/>
                <Meeting/>
                <Notes db={db}/>
            </div>
            <Foot/>
        </div>
    )
}

export default Home
