import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SystemHomepage.css';
import Signup from './Signup.js';
import Signinbody from './Signinbody.js';

function SysHome () {
    const [visible, setVisible] = useState(false); 
    let navigate = useNavigate();

    // handles sign-in when the user clicks on the link in the webpage
    const handleLogIn = () => {
        navigate("/Signinbody");
    };

    // handles sign-up when the user clicks on the link in the webpage
    const handleSignUp = () => {
        navigate("/Signup");
    };

    // manage visibility of the scroll to top button
    const scrollVisible = () => { 
        const scrolled = document.documentElement.scrollTop; 
        if (scrolled > 200){ 
        setVisible(true) 
        }  
        else if (scrolled <= 200){ 
        setVisible(false) 
        } 
    }; 

    // behaviour of the scroll to top button
        const scrollToTop = () => {
            window.scrollTo ({ top: 0, behaviour: "smooth" });
        }; 
        
        window.addEventListener('scroll', scrollVisible); 

    
    return (
        <div className='home-container'>
            <div className="header-container">
                <h2 className="header-text">Welcome to the Event Attender Feedback System</h2>
            </div>

            <div>
                <img src="/images/summaryfeedback.png" alt="feedback" className="top-image" />
            </div>

            <div className="quote">
                <p><strong>Listen to your event attendees with ease</strong></p>
            </div>
            
            <div className="main">
                <div className="main one">
                <p style={{ float: "left" }} ><strong>For event organisers</strong><br/> 
                Collect constructive feedback from event attendees <br/>
                ...digitally.</p>
                <br/ >
                <img
                    src="/images/giphy.gif"
                    alt="summary"
                    className="mid-image right" 
                    width = "220"
                    height = "250"
                    style={{ float: "right", marginTop: "-70px", backgroundColor: "#fbeaeb" }}
                />
                </div>

                <div className="main two">
                    <br/ >
                    <img 
                        src="/images/feedbackcharts.png" 
                        alt="chart" 
                        className ="mid-image left" 
                        width="300" 
                        height="300"
                        style={{ float: "left", marginTop: "-10px" }}/>
                    <p style={{ float: "right" }}>View all your events in your account <br/> 
                    Add a new event, edit or delete<br/ > 
                    Create a new form <br/ > 
                    View a summary of the feedback <br/> 
                    <em><strong>All in one account!</strong></em></p> 
                    <br/ >
                </div>

                    <p style={{ textAlign: "left", fontSize: "23px", paddingLeft: "100px", lineHeight: "1.8"}} ><br/>Please <a href="#" onClick={handleLogIn}>log in</a> to continue.<br/> 
                    Don't have an account yet? <a href="#" onClick={handleSignUp}> Sign up</a>. Glad you could join us!</p> 
                    <p className="mini-text" style={{ textAlign: "left", paddingLeft: "100px", lineHeight: "1.8"}}><em>
                    Sign up using the email address provided by your organisation</em>
                    </p>
                    <br/>
                </div>        

            <div className="quote .bottom">
                <p><em>" There is no failure, only feedback" - Robert Allen</em></p>
            </div>

            <div>
                <button className="button-scroll" onClick={scrollToTop} style={{display: visible ? 'inline':'none'}} >
                    Scroll to Top</button> 
            </div>

            <div className="footer">
                <p><em>All rights reserved.</em></p>
                <p style={{ textAlign: "left" }}><em>Group_3_COMP7029</em></p>
            </div>
        </div >
         
    );
};

export default SysHome; 