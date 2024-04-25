//Importing necessary libraries and Components
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, doc, setDoc, getDoc, where, query, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase_config';
import './Feedback.css';

const FeedbackForm = () => {
    // React router hooks
    const navigate = useNavigate();
    const location = useLocation();
    
    // Extracting query parameters
    const queryParams = new URLSearchParams(location.search);
    const questionsParam = queryParams.get('questions');
    const selectedEventParam = queryParams.get('selectedEvent');
    const questions = questionsParam ? JSON.parse(decodeURIComponent(questionsParam)) : [];
    const selectedEvent = selectedEventParam ? decodeURIComponent(selectedEventParam) : '';

    // States
    const [responses, setResponses] = useState({});
    const [email, setEmail] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [expirationDate, setExpirationDate] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false); // State for anonymous responses

    // Function to parse Firestore timestamp to Date object
    const parseDateFromFirestoreTimestamp = (timestamp) => {
        const { seconds, nanoseconds } = timestamp;
        const milliseconds = seconds * 1000 + nanoseconds / 1000000;
        return new Date(milliseconds);
    };

    useEffect(() => {
        const fetchEventExpiration = async () => {
            try {
                if (!selectedEvent) return;

                const eventsCollectionRef = collection(firestore, 'Events');
                const q = query(eventsCollectionRef, where('event_name', '==', selectedEvent));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    const eventData = doc.data();
                    if (eventData && eventData.event_fb_duration) {
                        const eventExpiryDate = parseDateFromFirestoreTimestamp(eventData.event_fb_duration);
                        const currentDate = new Date();
                        setExpirationDate(eventExpiryDate);
                        console.log("Current Date:", currentDate);
                        console.log("Expiration Date:", eventExpiryDate);
                    }
                });
            } catch (error) {
                console.error('Error fetching event expiration:', error);
            }
        };

        fetchEventExpiration();
    }, [selectedEvent]);

    useEffect(() => {
        localStorage.setItem('responses', JSON.stringify(responses));
    }, [responses]);

    // Function to handle changes in responses
    const handleChange = (question, value) => {
        setResponses(prevState => ({
            ...prevState,
            [question]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!selectedEvent) {
                console.error('No event selected.');
                return;
            }

            if (!isAnonymous && !email) { // Check if not anonymous and email not provided
                setEmailError('Please enter your email.');
                return;
            } else {
                setEmailError('');
            }

            if (expirationDate && new Date() > expirationDate) {
                console.error('Feedback submission period has expired.');
                return;
            }

            const data = {
                event: selectedEvent,
                responses
            };

            let docRef;
            if (isAnonymous) { // If anonymous, generate a new document ID
                const responseRef = collection(firestore, 'Responses');
                docRef = doc(responseRef); // Automatically generate a document ID
            } else {
                const responseRef = collection(firestore, 'Responses');
                docRef = doc(responseRef, email); // Use email as the document ID
                data.email = email; // Include email in data
            }

            await setDoc(docRef, data);

            setResponses({});
            setEmail('');
            setShowSuccessMessage(true);
            navigate('/landingpage');
        } catch (error) {
            console.error('Error uploading response:', error);
        }
    };

    // Function to toggle anonymous responses
    const toggleAnonymous = () => {
        setIsAnonymous(prevState => !prevState);
        setEmail(''); // Clear email field when adding anonymous
    };

    return (
        <div className="container">
            <h1 className="header"> Feedback Form for {selectedEvent}</h1>
            {expirationDate && new Date() <= expirationDate && (
                <>
                    <div className="anonymous-toggle">
                        <label htmlFor="anonymousCheckbox">Make my responses anonymous:</label>
                        <input
                            id="anonymousCheckbox"
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={toggleAnonymous}
                        />
                    </div>
                    {!isAnonymous && (
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input emailInput"
                        />
                    )}
                    {emailError && <p className="error-message">{emailError}</p>}
                    <div className="questions">
                        <h2 style={{ textAlign: 'center' }}>Questions</h2>
                        <form onSubmit={handleSubmit}>
                            {questions && questions.map((question, index) => (
                                <div key={index} className="question-item">
                                    <p className="questionText">{question.question}</p>
                                    <div className="options-container radioOptions">
                                        {['Agree', 'Strongly Agree', 'Neutral', 'Disagree', 'Strongly Disagree'].map((option, idx) => (
                                            <label key={idx} className="option-label radioLabel">
                                                <input
                                                    type="radio"
                                                    name={`response_${index}`}
                                                    value={option}
                                                    checked={responses[question.question] === option}
                                                    onChange={() => handleChange(question.question, option)}
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button type="submit" className="submitButton">Submit</button>
                        </form>
                    </div>
                </>
            )}
            {showSuccessMessage && (
                <div className="success-message">
                    Responses saved successfully!
                </div>
            )}
        </div>
    );
}

export default FeedbackForm;
