import React from 'react'
import '../assets/styles/Meeting.css';

const Meeting = ({ meetings, updateNotes }) => {
    const updateNoteContent = (e) => {
        updateNotes(e.target.id);
    }

    return (
        <div>
            <h5>Meeting</h5>
            <div className="list-of-meetings">
                {meetings.map((meeting) => {
                    return (
                        <button key={meeting.meetingId} id={meeting.meetingId} className="list-btn" onClick={updateNoteContent} >{meeting.meetingDate}</button>
                    )
                })}
            </div>
        </div>
    )
}

export default Meeting
