//Importing Libraries and other Components
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase_config';
import "./Report.css";

// Function to fetch data from Firestore
const fetchData = async (setEventData) => {
    try {
        const responseCollectionRef = collection(firestore, 'Responses');
        const querySnapshot = await getDocs(responseCollectionRef);
        const responseData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));
        setEventData(responseData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Report component
const Report = () => {
    const [eventData, setEventData] = useState([]); 
    const [selectedEvent, setSelectedEvent] = useState(''); 
    const [currentPage, setCurrentPage] = useState(1); 

    // Fetch data from Firestore when component mounts
    useEffect(() => {
        fetchData(setEventData);
    }, []);

    // Number of rows per page for pagination
    const rowsPerPage = 5;
    // Calculate index of last and first rows for current page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    // Filter responses based on selected event and pagination
    const currentRows = eventData.filter(item => item.data.event === selectedEvent).slice(indexOfFirstRow, indexOfLastRow);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(currentRows.length / rowsPerPage);

    // Function to handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to handle event selection
    const handleSelectEvent = (event) => {
        setSelectedEvent(event.target.value);
    };

    // Function to fetch data
    const handleFetchData = () => {
        fetchData(setEventData);
    };

    // Fetch unique event names from data
    const uniqueEventNames = [...new Set(eventData.map(response => response.data.event))];

    return (
        <div className="report-container">
            <h1>Responses Report</h1>
            {/* Dropdown to select event */}
            <div>
                <select value={selectedEvent} onChange={handleSelectEvent}>
                    <option value="">Select Event</option>
                    {uniqueEventNames.map(eventName => (
                        <option key={eventName} value={eventName}>{eventName}</option>
                    ))}
                </select>
                {/* Button to fetch data */}
                <button className="get-data-button" onClick={handleFetchData}>Get Data</button>
            </div>
            {/* Table to display responses */}
            <table className="report-table">
                <thead>
                    <tr>
                        <th>Email ID</th>
                        <th>Sl. No</th>
                        <th>Question</th>
                        <th>Response</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map over rows to display data */}
                    {currentRows.map((item, index) => {
                        let serialNumber = 0; // Reset the serial number for each document
                        return Object.entries(item.data.responses).map(([question, response], questionIndex) => (
                            <tr key={`${item.id}-${questionIndex}`} className="document-row">
                                {/* Display email ID */}
                                {questionIndex === 0 && <td rowSpan={Object.keys(item.data.responses).length}>{item.id}</td>}
                                {/* Display serial number, question, and response */}
                                <td>{++serialNumber}</td>
                                <td>{question}</td>
                                <td>{response}</td>
                            </tr>
                        ))
                    })}
                </tbody>
            </table>
            {/* Pagination buttons */}
            {totalPages > 1 && (
                <div className="pagination">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Report;
