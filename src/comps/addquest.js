import React, { useState, useEffect } from 'react';  // Import React and necessary hooks
import { firestore } from "../firebase_config";
import Navbarafter from "../Navbarafter";
import { collection, addDoc, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import './addquest.css';

const Question = () => {
    const [questions, setQuestions] = useState([{ id: Date.now(), question: '' }]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [questionResponses, setQuestionResponses] = useState({});
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [eventNames, setEventNames] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');

    useEffect(() => {
        const fetchEventNames = async () => {
            try {
                const eventNamesCollection = collection(firestore, 'Events');
                const querySnapshot = await getDocs(eventNamesCollection);
                const names = querySnapshot.docs.map(doc => doc.data().event_name);
                setEventNames(names);
            } catch (error) {
                console.error("Error fetching event names:", error);
            }
        };

        fetchEventNames();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const questionsRef = collection(firestore, 'questions');
          const eventDocRef = doc(questionsRef, selectedEvent);
  
          // Prepare an object to store all question data
          const questionsData = {};
  
          // Loop through each question in the state
          questions.forEach(question => {
              // Set the question text as the value for each question ID
              questionsData[question.id] = questionResponses[question.id] || '';
          });
  
          // Set the entire questions data object to Firestore
          await setDoc(eventDocRef, { questions: questionsData });
  
          // Set submission success state to true
          setSubmissionSuccess(true);
      } catch (error) {
          console.error("Error uploading responses:", error);
      }
  
      // Reset question responses state
      setQuestionResponses({});
  };
  
  

    const handleQuestionChange = (questionId, value) => {
        setQuestionResponses(prevState => ({
            ...prevState,
            [questionId]: value
        }));
    };

    const handleEventChange = (event) => {
        setSelectedEvent(event);
    };

    const handleAddQuestion = () => {
        setQuestions(prevQuestions => [...prevQuestions, { id: Date.now(), question: '' }]);
    };

    return (
        <div>
            <Navbarafter/>
            <div className="question-container">
                <h1 className="question-heading">Question Form</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="event">Select Event:</label>
                        <select id="event" onChange={(e) => handleEventChange(e.target.value)}>
                            <option value="">Select</option>
                            {eventNames.map((eventName, index) => (
                                <option key={index} value={eventName}>{eventName}</option>
                            ))}
                        </select>
                    </div>
                    {questions.map(question => (
                        <div key={question.id}>
                            <input
                                type="text"
                                placeholder="Add questions"
                                value={questionResponses[question.id] || ''}
                                onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddQuestion} style={{ backgroundColor: '#073763', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', marginTop: '10px' }}>Add New Question</button>
                    {!submissionSuccess && <button type="submit" className="submit-button">Submit</button>}
                    {submissionSuccess && <p className="success-message">Responses saved successfully!</p>}
                </form>
            </div>
        </div>
    );
};

export default Question;