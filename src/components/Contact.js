import React from 'react'

import '../assets/styles/Contact.css';

const Contact = () => {

    return (
        <div>
            <h5>Contact</h5>
            <div className="list-of-contacts">
                {/* Insert map here */}
                <div>
                    <button className="list-btn">BAE Hawaii</button>
                    <button className="list-btn">BAE Austin</button>
                    <button className="list-btn">OPOTEK</button>
                </div>
            </div>
        </div>
    )
}

export default Contact
