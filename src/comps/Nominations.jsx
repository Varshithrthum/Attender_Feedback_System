import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase_config";
import { getUserData } from "./globalFunctions";
import { collection, getDocs, query, doc, addDoc, setDoc, deleteDoc, orderBy, where, getDoc } from "firebase/firestore";
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
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nominations = () => {
    //Variables and its update functions.
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
    const handleShow = (e, name, email) => {
        setShow(true);
        setName(name);
        setEmail(email);
    }
    const handleShowMethod = (args, props, e) => {
        console.log('Hello', show)

    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    console.log('location', location);
    const { eventId } = location.state || {};;



    //Method to add and edit data
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
    //method for adding an event
    const handAddEvent = (EventName, EventLastName, EventAge, EventEmail, e) => {
        if (!EventName || !EventLastName || !EventAge || !EventEmail) {
            alert("Please enter all the details");
            return;
        }
        addEvents(EventName, EventLastName, EventAge, EventEmail)
    }
    //Method to delete an event
    const handleDeleteEvent = (id, e) => {
        if (window.confirm('Are you sure you wish to delete this person from the database?')) {
            delEvents(id)
        }

        return false
    }

    const handleUpdateEvent = (id, e) => {
        updateEvent(id, e)
    }

    // method to send e-mail
    const mailEvent = async (e, to, html) => {
        e.preventDefault();
        const eventName = location['state']['eventName'];
        const docRef = doc(db, "Forms", eventName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            var link = docSnap.data().Link
            console.log("Document data:", link);
        } else {
            console.log("No such document!");
        }
        const namenew = JSON.stringify(name);
        try {
            addDoc(collection(db, 'Mail'), {
                to: email,
                message: {
                    subject: 'Please complete the survey for the event',
                    html: `<html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Customer Survey Invitation</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                max-width: 600px;
                                margin: 20px auto;
                                padding: 20px;
                                background-color: #ffffff;
                                border: 1px solid #dddddd;
                                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                            }
                            .button {
                                display: block;
                                width: 200px;
                                padding: 10px;
                                margin: 20px auto;
                                background-color: #073763;
                                color: white;
                                text-align: center;
                                text-decoration: none;
                                font-weight: bold;
                                border-radius: 5px;
                            }
                            .button:hover {
                                background-color: #0056b3;
                            }
                            .footer {
                                text-align: center;
                                font-size: 12px;
                                color: #777;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Help Us Improve!</h1>
                            <p>Dear ,${namenew},</p>
                            <p>We are always striving to improve your experience and would love your feedback! Please take a few minutes to complete our survey. Your responses are invaluable to us.</p>
                            <a href="https://www.localhost3000.com${link}" class="button">Take the Survey</a>
                            <p>Thank you for your time and your trust in us. Your feedback helps us improve our service to you!</p>
                            <p class="footer">If you have any questions, feel free to contact us at any time.</p>
                        </div>
                    </body>
                    </html>`,
                }

            })
                .then((callback) => {
                    setShow(false);
                    setEventRefresh(Math.random())
                    toast.success('E-mail sent successfully', {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
                })
                .catch(err => console.log("there is an error", err));

        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }


    function Events(props) {
        const id = props.userdata.eventKey
        const eventName = props.userdata.eventName
        const eventLastName = props.userdata.eventLastName
        const eventAge = props.userdata.eventAge
        const eventEmail = props.userdata.eventEmail

        return (
            <div className="event" style={{ height: "130px" }} key={id}>
                <div className="text-container1">
                    <h2 className="text_11">{eventName} {eventLastName}</h2>
                    <p className="text_21">Age: {eventAge}</p>
                    <p className="text_21">Email: {eventEmail}</p>
                </div>

                <div className="">
                    <button className="button1" key="del_{id}" data-key={id}
                        onClick={(e) => handleDeleteEvent(e.target.getAttribute('data-key'), e)}>Delete
                    </button>
                    <button className="button1" key="edit_{id}" data-key={id}
                        onClick={(e) => handleClickOverlay(id, props, e)}>Edit
                    </button>
                    <button className="button1" onClick={(e) => handleShow(e, eventName + ' ' + eventLastName, eventEmail)}>Send Email
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
    // Delete the entry 
    const delEvents = (id) => {
        try {
            deleteDoc(doc(db, "Nominees", id))
                .then((callback) => {
                    console.log(callback)
                    setEventRefresh(Math.random())
                    toast.success('Entry deleted successfully', {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });

                })
                .catch(err => console.log("there is an error", err));


        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    // Add the event code
    const addEvents = (eventName, eventLastName, eventAge, eventEmail) => {
        try {
            addDoc(collection(db, "Nominees"), {
                first_name: eventName,
                last_name: eventLastName,
                age: eventAge,
                org_id: userId.uid,
                email_id: eventEmail,
                person_timestamp: firebase.firestore.Timestamp.now()
            })
                .then((callback) => {
                    console.log(callback)
                    toast.success('Entry added successfully', {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
                    setEventRefresh(Math.random())

                })
                .catch(err => console.log("there is an error", err));

            setIsMyAddOverlay(!ismyAddOverlay);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    //Update the event method
    const updateEvent = () => {
        try {

            setDoc(doc(db, "Nominees", thisDocId), {
                first_name: thisEventName,
                last_name: thisEventLastName,
                age: thisEventAge,
                email_id: thisEventEmail,
            }, { merge: true })
                .then((callback) => {
                    toast.success('Entry updated successfully', {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
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
            try {
                setEvents([])
                const collection_ref = collection(db, 'Nominees',)
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
                <br /><br />
            </div>
        )
    }

    return (
        <>
            <Navbarafter />
            <h2 className="text-center">Nomination of people</h2>

            <GenerateEvents />
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Survey Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    Do you want to send the survey form for event to <b>{name}</b> at <b>{email}</b> ?
                    <form onSubmit={(e) => mailEvent(e, 'hello', 'there')}>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="button1" onClick={(e) => mailEvent(e, 'hello', 'there')}>
                        Send Email
                    </button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* No need for a separate button for submitting the form */}
                </Modal.Footer>
            </Modal>
        </>
    );


};

export default Nominations;