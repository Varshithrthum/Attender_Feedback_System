//Importing Libraries and other Components
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase_config';
import Chart from 'react-google-charts';
// Function to fetch data from Firestore
const fetchData = async (setEventData) => {
    try {
        const responseCollectionRef = collection(firestore, 'Responses');
        const querySnapshot = await getDocs(responseCollectionRef);
        const userData = querySnapshot.docs.map(doc => doc.data());
        setEventData(userData);
    } catch (error) {
        console.error("Error fetching data:", error);
        setEventData([]); // Set eventData to an empty array in case of error
    }
};
// ChartComponent functional component
const ChartComponent = () => {
    const [eventData, setEventData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [chartDataFormatted, setChartDataFormatted] = useState([]);
    const [colors, setColors] = useState({});

    useEffect(() => {
        fetchData(setEventData);
    }, []);
    //Handle selection
    const handleGetData = () => {
        try {
            if (!selectedEvent) {
                throw new Error('Please select an event.');
            }
            if (!selectedQuestion) {
                throw new Error('Please select a question.');
            }

            const filteredData = eventData.filter(response => response.event === selectedEvent);
            const chartData = [];
            const responses = filteredData.map(response => response.responses[selectedQuestion]);

            const responseCounts = responses.reduce((counts, response) => {
                counts[response] = (counts[response] || 0) + 1;
                return counts;
            }, {});

            const uniqueResponses = Object.keys(responseCounts);
            const responseColors = {};

            uniqueResponses.forEach((response, index) => {
                responseColors[response] = getRandomColor(index);
                chartData.push([response, responseCounts[response]]);
            });

            setColors(responseColors);

            const chartDataFormatted = [['Response', 'Count'], ...chartData];
            setChartDataFormatted(chartDataFormatted);
        } catch (error) {
            console.error("Error getting data:", error.message);
        }
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event.target.value);
    };

    const handleSelectQuestion = (event) => {
        setSelectedQuestion(event.target.value);
    };
    // To generate Random Color for Charts
    const getRandomColor = (index) => {
        const colors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395'];
        return colors[index % colors.length];
    };

    // Filter unique event names
    const uniqueEventNames = [...new Set(eventData.map(response => response.event))];

    // Filter questions based on the selected event
    const selectedEventData = eventData.find(response => response.event === selectedEvent);
    const questions = selectedEventData ? Object.keys(selectedEventData.responses) : [];

    return (
        <div>
            <h2>Chart</h2>
            <div>
                <select value={selectedEvent} onChange={handleSelectEvent}>
                    <option value="">Select Event</option>
                    {uniqueEventNames.filter(name => name).map(eventName => (
                        <option key={eventName} value={eventName}>{eventName}</option>
                    ))}
                </select>
                <select value={selectedQuestion} onChange={handleSelectQuestion}>
                    <option value="">Select Question</option>
                    {questions.map(question => (
                        <option key={question} value={question}>{question}</option>
                    ))}
                </select>
                {/* button styles */}
                <button
                    onClick={handleGetData}
                    style={{
                        backgroundColor: '#073763', 
                        border: 'none',
                        color: 'white',
                        padding: '10px 20px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 2px',
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}
                >
                    Get Data
                </button>
            </div>
            <div style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}>
                {/* Chart styles */}
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={chartDataFormatted}
                    options={{
                        title: 'Responses', 
                        hAxis: { title: 'Response' }, 
                        vAxis: { title: 'Count' },
                        colors: Object.values(colors),
                        legend: { position: 'top' },
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        </div>
    );
};

export default ChartComponent;
