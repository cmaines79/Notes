import React from 'react'
import './Notes.css'

const Notes = () => {
    return (
        <div className="notes">
            <h5>Meeting Notes</h5>
            <div className="note-content">
                <form action="">
                    {/* meeting info area */}
                    <div className="meeting-wraper">
                        <div className="meeting-info">
                            <h5>Give me some details on the meeting</h5>
                                <label htmlFor="contact">Contact</label>
                                <input type="text" list="contact-list" id="contact" name="contact"/>
                                <datalist id="contact-list">
                                    <option>Corning</option>
                                    <option>BAE</option>                                 
                                </datalist>
                                <label htmlFor="subject">Subject</label>
                                <input type="text" list="subject-list" name="subject" id="subject" />
                                <datalist id="subject-list">
                                    <option>Tactical laser</option>
                                    <option>DUSPEN</option>                                 
                                </datalist>
                                <label htmlFor="date">Meeting Date</label>
                                <input type="date" name="date" id="date" />
                        </div>
                        <div className="attendees">
                            <h5>Who attended this meeting?</h5>
                            <div className="attendee-lists">
                                <div className="our-attendees">
                                    <label htmlFor="our-team-member">Add a member from our Team</label>
                                    <div>
                                        <input type="text" name="our-team-member" id="our-team-member" />
                                        <button>Add Attendee</button>
                                    </div>
                                    <div className="team-members">
                                        <div><p>Cordell Maines</p><a href="/">X</a></div>
                                        <div><p>Roger Milson</p><a href="/">X</a></div>
                                        <div><p>Brandan Elsner</p><a href="/">X</a></div>
                                    </div>
                                </div>
                                <div className="their-attendees">
                                    <label htmlFor="their-team-member">Add a member from our Team</label>
                                    <div>
                                        <input type="text" name="their-team-member" id="their-team-member" />
                                        <button>Add Attendee</button>
                                    </div>
                                    <div className="team-members">
                                        <div><p>Riley Legare</p><a href="/">X</a></div>
                                        <div><p>Kelly Child</p><a href="/">X</a></div>
                                        <div><p>Kent Greer</p><a href="/">X</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* note contents */}
                        <textarea name="notes-in-detail" id="" cols="10" rows="15"></textarea>
                    </div>
                    <div>
                        <button>Save</button>
                    </div>
                </form>
            </div>
                
                
                
        </div>
    )
}

export default Notes
