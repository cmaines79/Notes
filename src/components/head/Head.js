// imports
import React from 'react'
import { useRef } from 'react';
import './Head.css';
import logo from '../../img/papertrail-2-logo.png';

const Head = ({ userStatusForHeader, signInUser, signOutUser, userName, profilePicUrl }) => {
    // setting refs - useRef must be used to capture DOM elements prior to rendering the elements
    const signInButtonElement = useRef();
    const signOutButtonElement = useRef();
    const userPicElement = useRef();
    const userNameElement = useRef();
    const userImageElement = useRef();

    // function to change the attributes of the header DOM elements
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

    } else if(userStatusForHeader === 0 && signInButtonElement.current !== undefined) {
        // hide user's profile and sign-out button
        userNameElement.current.setAttribute('hidden', 'true');
        userPicElement.current.setAttribute('hidden', 'true');
        signOutButtonElement.current.setAttribute('hidden', 'true');
        userImageElement.current.setAttribute('hidden', 'true');

        // show sign-in button 
        signInButtonElement.current.removeAttribute('hidden');
    }

    return (
        <header>
            {/* DO WE WANT TO CONTAIN THIS AT ALL? */}
            <div className="div-wrapper">
                <div className="logo">
                    {/* insert FIXED SIZED logo here */}
                    <img src={logo} alt="" />
                </div>
                <div className="nav">
                    {/* nav goes here => do we create a separate nav componenet? */}
                    {/* the size of this element will be calculated based upon the .logo and .user */}
                </div>
                <div className="user-container">
                    {/* user login and info will go here => FIXED SIZE */}
                    {/* almost like sub-menu where the user can access their specific data-points */}
                    <div hidden id="user-pic" ref={userPicElement}>
                        <img src={profilePicUrl} alt="User" ref={userImageElement} />
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
