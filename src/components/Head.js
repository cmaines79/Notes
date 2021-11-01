import React from 'react'


const Head = () => {
    return (
        <div>
            {/* DO WE WANT TO CONTAIN THIS AT ALL? */}
            <div className="div-wrapper">
                <div className="logo">
                    {/* insert FIXED SIZED logo here */}
                </div>
                <div className="nav">
                    {/* nav goes here => do we create a separate nav componenet? */}
                    {/* the size of this element will be calculated based upon the .logo and .user */}
                </div>
                <div className="user-container">
                    {/* user login and info will go here => FIXED SIZE */}
                    {/* almost like sub-menu where the user can access their specific data-points */}
                    <div className="hidden" id="user-pic"></div>
                    <div className="hidden" id="user-name"></div>
                    <button className="hidden" id="sign-out">Sign Out</button>
                    <button className="hidden" id="sign-in">
                    <i className="material-icons">account_circle</i> Sign-in with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Head
