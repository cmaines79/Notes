import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import '../assets/styles/Notes.css';

const Notes = ({ db, activeNote, getFireBaseNotesDoc, noteToggle, setNoteToggleToFalse, contacts, subjects, updateSubjects, firebaseNotes }) => {
    // TO-DO
        // New Note Button
        // get data from firebase to populate the contact table
        // get data from firebase to populate the subject table by customer
        // useEffect to set the document title with the subject? (on exit of input field?)


    // refs
    const meetingIdInputElement = useRef();
    const contactInputElement = useRef();
    const subjectInputElement = useRef();
    const dateInputElement = useRef();
    const ourTeamElement = useRef();
    const theirTeamElement = useRef();
    const notesElement = useRef();

    // vars
    const user = getAuth().currentUser.uid;
    let meetingIDNumber = 0;

    // states
    const [ourTeam, setOurTeam] = useState([]);
    const [theirTeam, setTheirTeam] = useState([]);

    // funcs
    const addToTeam = (e) => {
        e.preventDefault();
        const target = e.target.id;
        if (target === "our-team" || target === "our-team-member") {
            if(ourTeamElement.current.value === '') {
                alert("Please enter a name to contine...")
                ourTeamElement.current.focus();
            } else {
                setOurTeam([...ourTeam, ourTeamElement.current.value]);
                ourTeamElement.current.value = "";
                ourTeamElement.current.focus();
            }
        } else if (target === 'their-team' || target === "their-team-member") {
            if(theirTeamElement.current.value === '') {
                alert("Please enter a name to contine...")
                theirTeamElement.current.focus();
            } else {
                setTheirTeam([...theirTeam, theirTeamElement.current.value]);
                theirTeamElement.current.value = "";
                theirTeamElement.current.focus();
            }
        }
    }

    const deleteAttendee = (e) => {
        e.preventDefault();
        const team = (e.target.parentElement.parentElement.id);
        const target = e.target.parentElement.id;
        let a;

        if(team === 'our-team-members') {
            a = ourTeam.filter((attendee) => attendee !== target);
            setOurTeam(a)
        } else if(team === 'their-team-members') {
            a = theirTeam.filter((attendee) => attendee !== target);
            setTheirTeam(a)
        }
    }

    const inputOnEnter = (e) => {
        // to account for enter keypress after entering a value
        if(e.key === 'Enter') {
            e.preventDefault();
            addToTeam(e);
        }
    }

    const updateRecordCounter = (a) => {
        // updates the recordCounter doc in FireStore
        setDoc(doc(db, user, "recordCounter"), {
            recordCount: a,
        })
    }

    const getRecordCount = async() => {
        try {
            // setting docRef specifically to the recordCounter document
            const docRef = doc(db, user, "recordCounter");
            const docSnap = await getDoc(docRef);

            // adding one to the counter for this instance 
            const newRecordCount = docSnap.data().recordCount + 1;

            // updating the db with the new value.
            updateRecordCounter(newRecordCount);

            // returning the value needed
            return newRecordCount;
        } catch (e) {
            console.error(e);
        }
    }    

    const validateInputs = () => {
        const isContact = contactInputElement.current.value == "";
        const isSubject = subjectInputElement.current.value == "";
        const isDate = dateInputElement.current.value == "";
        const isOurTeam = ourTeamElement.current.value === [];
        const isTheirTeam = theirTeamElement.current.value === [];
        const isNotes = notesElement.current.value == "";
        
        if(isContact) {
            alert("Please enter a Contact");
            return false;
        } else if(isSubject) {
            alert("Please enter a Subject");
            return false;
        } else if(isDate) {
            alert("Please enter a Meeting  Date");
            return false;
        } else if(isOurTeam) {
            alert("Please enter attendees from our team");
            return false;
        } else if(isTheirTeam) {
            alert("Please enter attendees from their team");
            return false;
        } else if(isNotes) {
            alert("Please enter the Notes from this meeting");
            return false;
        } else {
            return true;
        }
    }

    const saveNotes = async(e) => {
        e.preventDefault();
        // onSave
            // clear attendee arrays

        // data validation 
        if(validateInputs()) {
            // see if this is a new note or an edit to an exisiting one
            meetingIdInputElement.current.value !== '' ? meetingIDNumber = meetingIdInputElement : meetingIDNumber = await getRecordCount();
            
            // create JSON formatted object
            const meetingNotes = {
                meetingId: meetingIDNumber,
                contact: contactInputElement.current.value,
                subject: subjectInputElement.current.value,
                meetingDate: dateInputElement.current.value,
                ourTeam: ourTeam,
                theirTeam: theirTeam,
                notes: notesElement.current.value,
            }

            // get the current firebaseNotes and add our new note to it.
            const newFirebaseNotes = firebaseNotes;
            firebaseNotes.push(meetingNotes);

            //  upload new firebaseNotes to firebase
            try{
                await setDoc(doc(db, user, "notes"), {
                   meetingNotes: newFirebaseNotes
                })

            } catch (e) {
                console.error(e);
            }

            // update our firebaseNote object
            getFireBaseNotesDoc();

            // clear the attendee arrays
            setOurTeam([]);
            setTheirTeam([]);
        }   
    }

    const populateActiveNote = () => {
        meetingIdInputElement.current.value = activeNote[0].meetingId;
        contactInputElement.current.value = activeNote[0].contact;
        subjectInputElement.current.value = activeNote[0].subject;
        dateInputElement.current.value = activeNote[0].meetingDate;
        notesElement.current.value = activeNote[0].notes;
        setOurTeam(activeNote[0].ourTeam);
        setTheirTeam(activeNote[0].theirTeam);
    }

    const createNewNote = () => {
        meetingIdInputElement.current.value = "";
        contactInputElement.current.value = "";
        subjectInputElement.current.value = "";
        dateInputElement.current.value = "";
        notesElement.current.value = "";
        setOurTeam([]);
        setTheirTeam([]);
    }

    const getSubjectList = (e) => {
        updateSubjects(e.target.value);
    }

    useEffect(() => {
        if(noteToggle === 1) {
            populateActiveNote();
            setNoteToggleToFalse();
        }
    },[noteToggle])

    useEffect(() => {
        document.title = "paperTrail";
    },[])

    return (
        <div className="notes">
            <div className="note-header">
                <h5>Meeting Notes</h5>
                <button onClick={createNewNote} >New Note</button>
            </div>
            <div className="note-content">
                <form action="">
                    {/* meeting info area */}
                    <div className="meeting-wraper">
                        <div className="meeting-info">
                        <input type="text" name="meetingId" id="meetingId" ref={meetingIdInputElement} />
                            <h5>Give me some details on the meeting</h5>
                                <label htmlFor="contact">Contact</label>
                                <input type="text" list="contact-list" id="contact" name="contact" ref={contactInputElement} onChange={getSubjectList}/>
                                <datalist id="contact-list">
                                    {contacts.map((contact) => {
                                        return (
                                            <option key={contact} >{contact}</option>
                                        )
                                    })}                                
                                </datalist>
                                <label htmlFor="subject">Subject</label>
                                <input type="text" list="subject-list" name="subject" id="subject" ref={subjectInputElement}/>
                                <datalist id="subject-list">
                                    {subjects.map((subject) => {
                                        return (
                                            <option key={subject}>{subject}</option>
                                        )
                                    })}                              
                                </datalist>
                                <label htmlFor="date">Meeting Date</label>
                                <input type="date" name="date" id="date" ref={dateInputElement} />
                        </div>
                        <div className="attendees">
                            <h5>Who attended this meeting?</h5>
                            <div className="attendee-lists">
                                <div className="our-attendees">
                                    <label htmlFor="our-team-member">Add a member from our Team</label>
                                    <div>
                                        <input type="text" name="our-team-member" id="our-team-member" ref={ourTeamElement} onKeyDown={(e) => inputOnEnter(e)}/>
                                        <button onClick={(e) => addToTeam(e)} id="our-team">Add Attendee</button>
                                    </div>
                                    <div className="team-members" id="our-team-members">
                                        {ourTeam.map((attendee) =>{
                                            return (
                                                <div key={attendee} id={attendee}><p>{attendee}</p><a href="/" onClick={(e) => deleteAttendee(e)}>X</a></div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="their-attendees">
                                    <label htmlFor="their-team-member">Add a member from our Team</label>
                                    <div>
                                        <input type="text" name="their-team-member" id="their-team-member" ref={theirTeamElement} onKeyDown={(e) => inputOnEnter(e)}/>
                                        <button onClick={(e) => addToTeam(e)} id="their-team">Add Attendee</button>
                                    </div>
                                    <div className="team-members" id="their-team-members">
                                        {theirTeam.map((attendee) =>{
                                                return (
                                                    <div key={attendee} id={attendee}><p>{attendee}</p><a href="/" onClick={(e) => deleteAttendee(e)}>X</a></div>
                                                )
                                            })} 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <textarea name="notes-in-detail" id="" cols="10" rows="15" ref={notesElement}></textarea>
                    </div>
                    <div>
                        <button onClick={(e) => saveNotes(e)}>Save</button>
                    </div>
                </form>
            </div>
                
                
                
        </div>
    )
}

export default Notes
