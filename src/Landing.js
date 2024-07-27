import React from "react";
import "./Landing.css";

const Landing = () => {
  return (
    <div class="container_of_image">
        
        <div class="image_landing" id="slide1" data-active>

          <img src="https://cdn.glitch.global/07931069-62a9-4bd9-a047-47fd7905975d/antonio-janeski-CHVTt0aGbx0-unsplash.jpg?v=1712489680437" 
               alt="students_1" />
          <div class="container_landing">
            <h3>
              Thank you
            </h3>
            <p>
              Your feedback helps us to improve everyday
            </p>        
          </div>               
          <div class="landing_button_container">
            <a href="https://www.brookes.ac.uk/ecm/" class="landing_button">
              Learn More
            </a>
          </div>
        </div> 
       </div>
  );
};

export default Landing;