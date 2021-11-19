import React from 'react'
import '../assets/styles/Meeting.css';

const Meeting = () => {
    return (
        <div>
            <h5>Meeting</h5>
            <div className="list-of-meetings">
                <button className="list-btn">Meeting 1</button>
                <button className="list-btn">Meeting 2</button>
                <button className="list-btn">Meeting 3</button>
            </div>
        </div>
    )
}

export default Meeting
