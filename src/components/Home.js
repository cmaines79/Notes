// importing firebase and react methods
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';

// importing react components 
import React from 'react';
import Head from './Head';
import Foot from './Foot';
import Contact from './Contact';
import Subject from './Subject';
import Meeting from './Meeting';
import Notes from './Notes';

// sytles
import '../assets/styles/Home.css';

const Home = ({ userStatusForHeader, signInUser, signOutUser, userName, profilePicUrl, db }) => {
    // TO-DO:
        // do I want to create useEffects for contact, subject & meeting to clear the useStates?

    
    
    // vars
    const user = getAuth().currentUser.uid;

    // states
    const [firebaseNotes, setFireBaseNotes] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const [activeNote, setActiveNote] = useState([]);
    const [noteToggle, setNoteToggle] = useState(0);

    // supporting functions
    const getFireBaseNotesDoc = async() => {
        await getDoc(doc(db, user, "notes"))
        .then(snapshot => {
            // setContacts(snapshot.data().meetingNotes);
            const data = snapshot.data().meetingNotes;
            const notesFromFirebase = [];
            data.forEach((doc) => {
                notesFromFirebase.push(
                    {
                        contact: doc.contact,
                        subject: doc.subject,
                        meetingDate : doc.meetingDate,
                        meetingId: doc.meetingId,
                        notes: doc.notes,
                        ourTeam: doc.ourTeam,
                        theirTeam: doc.theirTeam,
                    }
                );
            })
            setFireBaseNotes(notesFromFirebase);
        })
    }

    const getContacts = () => {
        const tempArr = [];
        firebaseNotes.forEach((item) => {
            // remove duplicate values
            if(tempArr.includes(item.contact)) {

            } else {
                tempArr.push(item.contact);
            }
        })
        setContacts(tempArr);
    }

    const updateSubjects = (target) => {
        // filter the firebaseNotes by the contact
        let a = firebaseNotes.filter((item) => item.contact === target);
        
        // setSubjects from the filter
        const tempArr = [];
        a.forEach((item) => {
            // remove duplicate values
            if(tempArr.includes(item.subject)) {

            } else {
                tempArr.push(item.subject);
            }
        })
        setSubjects(tempArr);
    }

    const updateMeetings = (target) => {
        // filter the firebaseNotes by the subjects
        let a = firebaseNotes.filter((item) => item.subject === target);

        // setMeetings from the filter
        const tempArr = [];
        a.forEach((item) => {
            tempArr.push(
                {
                    meetingDate: item.meetingDate,
                    meetingId: item.meetingId,
                }
            );
        })
        setMeetings(tempArr);
    }

    const updateNotes = (target) => {
        // filter firebaseNotes by the id
        let a = firebaseNotes.filter((item) => item.meetingId == target);
        
        // setActiveNote
        setActiveNote(a);

        // toggle noteToggle to display the activeNote
        setNoteToggle(1);
    }

    const setNoteToggleToFalse = () => {
        setNoteToggle(0);
    }
    
    // effects
    useEffect(() => {
        // on mount get the data from firebase
        getFireBaseNotesDoc();
    },[]);

    useEffect(() => {
        getContacts();
    },[firebaseNotes])

    return (
        <div className="App">
            <Head userStatusForHeader={userStatusForHeader} signInUser={signInUser} signOutUser={signOutUser} userName={userName} profilePicUrl={profilePicUrl}/>
            <div className="main container">
                <Contact contacts={contacts} updateSubjects={updateSubjects}/>
                <Subject subjects={subjects} updateMeetings={updateMeetings}/>
                <Meeting meetings={meetings} updateNotes={updateNotes}/>
                <Notes db={db} getFireBaseNotesDoc={getFireBaseNotesDoc} updateSubjects={updateSubjects} contacts={contacts} subjects={subjects} setNoteToggleToFalse={setNoteToggleToFalse} activeNote={activeNote} noteToggle={noteToggle} firebaseNotes={firebaseNotes} />
            </div>
            <Foot/>
        </div>
    )
}

export default Home
