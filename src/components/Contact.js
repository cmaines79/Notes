import React from 'react'

import '../assets/styles/Contact.css';

const Contact = ({ contacts, updateSubjects }) => {

    const getSubjectList = (e) => {
        updateSubjects(e.target.innerHTML);
    }

    return (
        <div>
            <h5>Contact</h5>
            <div className="list-of-contacts">
                <div>
                    {contacts.map((contact) => {
                        return (
                            <button key={contact} className="list-btn" onClick={getSubjectList}>{contact}</button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Contact
