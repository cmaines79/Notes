// imports
import React from 'react'
import { useRef } from 'react';
import '../assets/styles/Head.css';
import logo from '../assets/img/papertrail-2-logo.png';
import { NavLink } from 'react-router-dom';

const Head = ({ userStatusForHeader, signInUser, signOutUser, userName, profilePicUrl }) => {
    // setting refs - useRef must be used to capture DOM elements prior to rendering the elements
    const signInButtonElement = useRef();
    const signOutButtonElement = useRef();
    const userPicElement = useRef();
    const userNameElement = useRef();
    const userImageElement = useRef();
    const modeButton = useRef();

    // function to change the attributes of the header DOM elements.  Using the signInButtonElement to determine if the DOM has been loaded or not in order for this logic to work correctly
    if(userStatusForHeader === 1 && signInButtonElement.current !== undefined) {
        // set user's profile name
        userNameElement.current.textContent = userName;

        //show user's profile and sign-out button
        userNameElement.current.removeAttribute('hidden');
        userPicElement.current.removeAttribute('hidden');
        signOutButtonElement.current.removeAttribute('hidden');
        userImageElement.current.removeAttribute('hidden');

        // hide the sign-in button
        signInButtonElement.current.setAttribute('hidden', 'true');
        signInButtonElement.current.style.display = 'none';

    } else if(userStatusForHeader === 0 && signInButtonElement.current !== undefined) {
        // hide user's profile and sign-out button
        userNameElement.current.setAttribute('hidden', 'true');
        userPicElement.current.setAttribute('hidden', 'true');
        signOutButtonElement.current.setAttribute('hidden', 'true');
        userImageElement.current.setAttribute('hidden', 'true');

        // show sign-in button 
        signInButtonElement.current.removeAttribute('hidden');
        signInButtonElement.current.style.display = 'flex';
    }

    const lightDarkModeToggle = () => {
        // change the label on the button
        modeButton.current.innerText === 'Light Mode' ? modeButton.current.innerText = "Dark Mode" : modeButton.current.innerText = "Light Mode";

        // apply global mode change
        document.documentElement.classList.toggle('dark-mode');

        // Antoher invert to ensure the items we don't changed aren't <-- this isn't working!!!
        // document.querySelector('invert').forEach((result) => {
        //     result.classList.toggle('invert');
        // })
    }

    return (
        <header>
            <div className="div-wrapper container">
                <div className="logo">
                    <NavLink exact to="/"><img src={logo} alt="logo" /></NavLink>
                </div>
                <div className="nav">
                    {/* nav goes here => do we create a separate nav componenet? */}
                    {/* the size of this element will be calculated based upon the .logo and .user */}
                    <button id='toggle-light-dark-mode' ref={modeButton} onClick={lightDarkModeToggle}>Light Mode</button>
                </div>
                <div className="user-container">
                    <div hidden id="user-pic" ref={userPicElement}>
                        <img className="" src={profilePicUrl} alt="User" ref={userImageElement} />
                    </div>
                    <div hidden id="user-name" ref={userNameElement}></div>
                    <button hidden id="sign-out" ref={signOutButtonElement} onClick={() => signOutUser()}>Sign Out</button>
                    <button id="sign-in" ref={signInButtonElement} onClick={() => signInUser()}>
                    <i className="material-icons">account_circle</i> Sign-in with Google
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Head
