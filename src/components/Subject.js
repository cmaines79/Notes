import React from 'react'
import '../assets/styles/Subject.css';

const Subject = ({ subjects,  updateMeetings }) => {
    const updateMeetingList = (e) => {
        updateMeetings(e.target.innerHTML);
    }

    return (
        <div>
            <h5>Subject</h5>
            <div className="list-of-subjects">
                {subjects.map((subject) => {
                    return (
                        <button key={subject} className="list-btn" onClick={updateMeetingList}>{subject}</button>
                    )
                })}
            </div>
        </div>
    )
}

export default Subject
