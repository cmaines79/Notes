import React from 'react'
import './Foot.css';

const Foot = () => {
    return (
        <div className="footer">
            <div className="container footer-message">
                <p><span dangerouslySetInnerHTML={{"__html": "&copy;"}}/> 2021 Maines Industries for The Odin Project</p>
                <p>paperTrail logo belongs to <a href="https://freebiesupply.com/logos/papertrail-logo/">Freebie Supply</a></p>
            </div>
            
        </div>
    )
}

export default Foot
