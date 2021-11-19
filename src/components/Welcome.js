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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dapibus tincidunt pellentesque. Phasellus blandit turpis at est sollicitudin, ut maximus mi tempus. Vivamus dapibus leo ac pharetra dapibus. Sed ultricies, turpis et scelerisque molestie, erat lacus imperdiet sem, non commodo erat augue quis ipsum. Proin turpis magna, consectetur vitae porttitor ut, porta non ipsum. Mauris ornare urna a mauris posuere, sed porta purus lacinia. Integer faucibus auctor urna, elementum malesuada dolor. Mauris iaculis elit et arcu egestas rhoncus. Etiam tortor ante, mattis vitae augue nec, blandit tempus ipsum. Vivamus dapibus ipsum id elit pretium, in pharetra orci pulvinar. Praesent sed ante non nisi congue egestas. Integer ultrices lobortis placerat. Pellentesque lobortis a dui nec venenatis.  Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce in feugiat purus, a aliquet mauris. Morbi fringilla metus cursus elit fringilla, eget porttitor tellus efficitur. Donec dignissim ut augue id fermentum. Pellentesque vitae dui velit. Nulla facilisi. Aenean non elit urna. Donec rutrum nisl nec viverra pharetra. Cras tristique felis magna, a euismod ipsum lobortis in. Duis eget ullamcorper metus, quis lacinia orci. Quisque in dignissim nulla, vitae eleifend augue. Sed quis tortor dui. Duis tristique lobortis faucibus.</p>
                <h2>To continue, sign-in with your Google account!</h2>
            </div>
            <Foot />
        </div>
    )
}

export default Welcome
