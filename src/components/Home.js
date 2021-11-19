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
    // vars
    const user = getAuth().currentUser.uid;

    // states
    const [firebaseNotes, setFireBaseNotes] = useState([]);
    const [subjects, setSubjects] = useState([]);

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
    
    // effects
    useEffect(() => {
        // on mount get the data from firebase
        getFireBaseNotesDoc();
    },[]);

    return (
        <div className="App">
            <Head userStatusForHeader={userStatusForHeader} signInUser={signInUser} signOutUser={signOutUser} userName={userName} profilePicUrl={profilePicUrl}/>
            <div className="main container">
                <Contact firebaseNotes={firebaseNotes}/>
                <Subject />
                <Meeting />
                <Notes db={db} />
            </div>
            <Foot/>
        </div>
    )
}

export default Home
