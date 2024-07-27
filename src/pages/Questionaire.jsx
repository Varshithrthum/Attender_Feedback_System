// Importing Libraries and other Components
import React, { useState, useEffect } from 'react';
import { collection, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase_config';
import Navbarafter from "../Navbarafter";
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Question = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [error, setError] = useState(null);
    const [responses, setResponses] = useState({});
    const [email, setEmail] = useState('');
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Function to save form URL to Firestore
    const saveFormUrl = async (eventName, url) => {
        try {
            const formsRef = collection(firestore, 'Forms');
            await setDoc(doc(formsRef, eventName), { Link: url });
        } catch (error) {
            console.error('Error saving form URL:', error);
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoadingEvents(true);
                setError(null);
                const eventsCollection = collection(firestore, 'questions');
                const querySnapshot = await getDocs(eventsCollection);
                const eventNames = querySnapshot.docs.map(doc => doc.id);
                setEvents(eventNames);
                setLoadingEvents(false);
            } catch (error) {       
                setError(error);
                setLoadingEvents(false);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const fetchQuestionsForEvent = async (eventName) => {
            try {
                setLoadingQuestions(true);
                setError(null);
                const eventDocRef = doc(collection(firestore, 'questions'), eventName);
                const eventDocSnapshot = await getDoc(eventDocRef);

                if (eventDocSnapshot.exists()) {
                    const eventData = eventDocSnapshot.data();
                    const questionsData = Object.entries(eventData.questions || {}).map(([key, value]) => ({ id: key, question: value }));
                    setQuestions(questionsData);
                } else {
                    console.log('No questions found for the selected event.');
                    setQuestions([]);
                }

                setLoadingQuestions(false);
            } catch (error) {
                setError(error);
                setLoadingQuestions(false);
            }
        };

        if (selectedEvent) {
            fetchQuestionsForEvent(selectedEvent);
        }
    }, [selectedEvent]);

    const handleEventChange = (event) => {
        setSelectedEvent(event);
    };

    const handleChange = (question, value) => {
        setResponses(prevState => ({
            ...prevState,
            [question.question]: value
        }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            // Ensure that a selected event is available
            if (!selectedEvent) {
                console.error('No event selected.');
                return;
            }

            // Ensure that an email is provided
            if (!email) {
                console.error('No email provided.');
                return;
            }

            // Include email in the responses data
            const data = {
                event: selectedEvent,
                responses
            };

            // Define the reference to the Responses collection
            const responseRef = collection(firestore, 'Responses');

            // Add a new document to the Responses collection with the email as its ID
            await setDoc(doc(responseRef, email), data);

            // Reset responses and set submission success state
            setResponses({});
            setSubmissionSuccess(true);
            setShowModal(true);
        } catch (error) {
            console.error("Error uploading response:", error);
        }
    };

    const navigate = useNavigate(); // Use useHistory

    const navigateToFeedbackForm = () => {
        // Base URL
        const baseUrl = 'http://localhost:3000/';
    
        // URL of the feedback form route
        const formUrl = 'feedbackform';
    
        // Encode the questions array and selectedEvent parameter
        const encodedQuestions = encodeURIComponent(JSON.stringify(questions));
        const encodedSelectedEvent = encodeURIComponent(selectedEvent);
    
        // Construct the query string with encoded parameters
        const queryString = `?questions=${encodedQuestions}&selectedEvent=${encodedSelectedEvent}`;
    
        // Combine the base URL, form URL, and query string
        const newTabUrl = baseUrl + formUrl + queryString;
    
        // Open in a new tab
        window.open(newTabUrl, '_blank');
    
        // Save the generated URL in the Forms collection
        saveFormUrl(selectedEvent, newTabUrl);
    };
    
    

    const handleCloseModal = () => {
        setShowModal(false);
        setSubmissionSuccess(false);
    };

    return (
        <div>
            <Navbarafter />
            <div className="container">
                <h1 className="header">Select Event</h1>
                <div className="select-container">
                    <select onChange={(e) => handleEventChange(e.target.value)} className="select">
                        <option value="">Select</option>
                        {events.map((eventName, index) => (
                            <option key={index} value={eventName}>{eventName}</option>
                        ))}
                    </select>
                </div>

                {loadingEvents && <p className="loading">Loading Events...</p>}
                {loadingQuestions && <p className="loading">Loading Questions...</p>}
                {error && <p className="error">Error: {error.message}</p>}

                <div className="questions">
                    <h2>Questions</h2>
                    <div className="email-input">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                        />
                    </div>
                    <form>
                    {questions.map((question, index) => (
    <div key={index} className="question-item">
        <p className="questionText">{question.question}</p>
        <div className="radioOptions">
            {['Agree', 'Strongly Agree', 'Neutral', 'Disagree', 'Strongly Disagree'].map((option, idx) => (
                <label key={idx} className="radioLabel">
                    <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={responses[question.question] === option}
                        onChange={() => handleChange(question, option)}
                        className="radioInput"
                    />
                    {option}
                </label>
            ))}
        </div>
    </div>
))}


                        <button type="submit" onClick={handleSubmit} className="submitButton">Submit</button>
                    </form>
                </div>

                {/* Button to navigate to the FeedbackForm component */}
                <button onClick={navigateToFeedbackForm} className="createFormButton">Create Feedback Form</button>

                {/* Dialog box */}
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                            <p>Responses saved successfully!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Question;
