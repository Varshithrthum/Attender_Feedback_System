import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase_config";
import { getUserData } from "./globalFunctions";
import { collection, getDocs, query, doc, addDoc, setDoc, deleteDoc, orderBy, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Overlay } from "./Overlay";
import "react-datepicker/dist/react-datepicker.css";
import { People } from "./AddPeople";
import Displayname from "../Displayname";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Navbarafter from "../Navbarafter";


const Nominations = () => {
    const userId = getUserData("user")
    const [eventRefresh, setEventRefresh] = useState(0);
    const [myevents, setEvents] = useState([]);
    const [ismyAddOverlay, setIsMyAddOverlay] = useState(false)
    const [ismyUpdateOverlay, setismyUpdateOverlay] = useState(false)
    const navigate = useNavigate()
    const [thisDocId, setthisDocId] = useState('')
    const [thisEventName, setthisEventName] = useState('')
    const [thisEventLastName, setthisEventLastName] = useState('')
    const [thisEventAge, setthisEventAge] = useState('')
    const [thisEventEmail, setthisEventEmail] = useState('')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShowMethod = (args, props, e) => {
        console.log('Hello', show)
    }

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>


    const handleClickOverlay = (args, props, e) => {
        if (args === "add") {
            setIsMyAddOverlay(!ismyAddOverlay);
        } else {
            console.log('edit data', props.userdata)
            setthisEventName(props.userdata.eventName)
            setthisEventLastName(props.userdata.eventLastName)
            setthisEventAge(props.userdata.eventAge)
            setthisEventEmail(props.userdata.eventEmail)
            setthisDocId(args)
            setismyUpdateOverlay(!ismyUpdateOverlay)
        }

        return false
    }
    const handAddEvent = (EventName, EventLastName, EventAge, EventEmail, e) => {

        addEvents(EventName, EventLastName, EventAge, EventEmail)
    }

    const handleDeleteEvent = (id, e) => {
        if (window.confirm('Are you sure you wish to delete this person from the database?')) {
            delEvents(id)
        }

        return false
    }

    const handleUpdateEvent = (id, e) => {
        updateEvent(id, e)
    }

    function Events(props) {
        // console.log(props)
        const id = props.userdata.eventKey
        const eventName = props.userdata.eventName
        const eventLastName = props.userdata.eventLastName
        const eventAge = props.userdata.eventAge
        const eventEmail = props.userdata.eventEmail

        return (
            <div className="event" key={id}>
                <div className="text-container1">
                    <h2 className="text_11">{eventLastName}{eventName}</h2>
                    <p className="text_21">Age: {eventAge}</p>
                    <p className="text_21">Email: {eventEmail}</p>
                </div>

                <div className="eventLinks">
                    <button className="button1" key="del_{id}" data-key={id}
                        onClick={(e) => handleDeleteEvent(e.target.getAttribute('data-key'), e)}>Delete
                    </button>
                    <button className="button1" key="edit_{id}" data-key={id}
                        onClick={(e) => handleClickOverlay(id, props, e)}>Edit
                    </button>
                    <button className="button1" onClick={handleShow}>Send Email
                    </button>


                </div>

            </div>
        )
    }

    function AddNewEventsDiv(props) {
        const [newEventName, setNewEventName] = useState('')
        const [newEventLastName, setNewLastName] = useState('')
        const [newEventAge, setNewAge] = useState('')
        const [newEventEmail, setNewEmail] = useState('')



        const newName = (e) => setNewEventName(e)
        const newLastName = (e) => setNewLastName(e)
        const newAge = (e) => setNewAge(e)
        const newEmail = (e) => setNewEmail(e)

        return (
            <People
                newName={newName}
                eventName={newEventName}
                newLastName={newLastName}
                eventLastName={newEventLastName}
                newAge={newAge}
                eventAge={newEventAge}
                newEmail={newEmail}
                eventEmail={newEventEmail}
                handEvent={handAddEvent}
                buttonName="Add"

            />
        )
    }

    function UpdateEventsDiv() {
        const newName = (e) => setthisEventName(e)
        const newLastName = (e) => setthisEventLastName(e)
        const newAge = (e) => setthisEventAge(e)
        const newEmail = (e) => setthisEventEmail(e)


        return (
            <People
                newName={newName}
                eventName={thisEventName}
                newLastName={newLastName}
                eventLastName={thisEventLastName}
                newAge={newAge}
                eventAge={thisEventAge}
                newEmail={newEmail}
                eventEmail={thisEventEmail}
                handEvent={handleUpdateEvent}
                buttonName="Update"

            />
        )
    }

    const delEvents = (id) => {
        try {
            // console.log(eventName, eventDate, eventFbDuration,userId.uid)
            deleteDoc(doc(db, "nominees", id))
                .then((callback) => {
                    console.log(callback)
                    setEventRefresh(Math.random())

                })
                .catch(err => console.log("there is an error", err));


        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const addEvents = (eventName, eventLastName, eventAge, eventEmail) => {
        try {
            addDoc(collection(db, "nominees"), {
                first_name: eventName,
                last_name: eventLastName,
                age: eventAge,
                org_id: userId.uid,
                email_id: eventEmail,
                person_timestamp: firebase.firestore.Timestamp.now()
            })
                .then((callback) => {
                    console.log(callback)
                    alert('Done')
                    setEventRefresh(Math.random())

                })
                .catch(err => console.log("there is an error", err));

            setIsMyAddOverlay(!ismyAddOverlay);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const updateEvent = () => {
        try {

            setDoc(doc(db, "nominees", thisDocId), {
                first_name: thisEventName,
                last_name: thisEventLastName,
                age: thisEventAge,
                email_id: thisEventEmail,
            }, { merge: true })
                .then((callback) => {
                    console.log(callback)
                    setEventRefresh(Math.random())

                })
                .catch(err => console.log("there is an error", err));

            setismyUpdateOverlay(!ismyUpdateOverlay);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    useEffect(() => {
        (async function () {
            //console.log(userId.uid)
            try {
                setEvents([])
                const collection_ref = collection(db, 'nominees',)
                const getEventsSnapshot = await getDocs(
                    query(
                        collection_ref, where("org_id", "==", userId.uid)
                    )
                );

                getEventsSnapshot.forEach((doc) => {
                    setEvents(prevState => [...prevState, {
                        "eventKey": doc.id,
                        "eventName": doc.data().first_name,
                        "eventLastName": doc.data().last_name,
                        "eventAge": doc.data().age,
                        "eventEmail": doc.data().email_id
                    }]);
                })
            } catch (e) {
                console.error(e);
            }
        })();

    }, [eventRefresh]);


    const GenerateEvents = () => {
        // let eventNodes =

        return (
            <div className="orgevents">
                <Overlay isOpen={ismyAddOverlay} onClose={() => setIsMyAddOverlay(!ismyAddOverlay)} children={AddNewEventsDiv()}
                    title="Add People" />
                <Overlay isOpen={ismyUpdateOverlay} onClose={() => setismyUpdateOverlay(!ismyUpdateOverlay)} children={UpdateEventsDiv()}
                    title="Update People" />
                <div className="eventCont">
                    {
                        myevents.map(function (myevent) {
                            return (
                                <Events userdata={myevent} key={myevent.eventKey} />
                            )

                        })
                    }
                </div>
                <br /><br /><br />
                <button className="button1" key="add_{id}" onClick={(e) => handleClickOverlay("add", e)}> Add new people
                </button>

            </div>
        )
    }

    return (
       
        <>
        <Navbarafter/>
        <h2 className="text-center">Nomination of people</h2>
       
            <GenerateEvents />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Survey Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure that you want to send the survey to this person?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button className="button1" onClick={handleClose}>
                        Send
                    </button>
                </Modal.Footer>
            </Modal>

        </>
    );


};

export default Nominations;