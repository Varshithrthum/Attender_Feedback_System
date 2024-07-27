import React from "react";
import "./events.css";

export const Events = () => {
  return (
    <>
      <div className="container_11">
        <div className="text-container1">
          <h2 className="text_11">Artificial Intelligence Workshop</h2>
          <p className="text_21">Date: Saturday, 20th January 2024</p>
          <p className="text_21">Assistants: 32 students</p>
        </div>

        <div className="button-container1">
          <button className="button1">Edit</button>
          <button className="button1">Delete</button>
        </div>
      </div>
      <div className="container_11">
        <div className="text-container1">
          <h2 className="text_11">Technology and Engineering Fair</h2>
          <p className="text_21">Date: Wednesday, 14th February 2024</p>
          <p className="text_21">Assistants: 32 students</p>
        </div>

        <div className="button-container1">
          <button className="button1">Edit</button>
          <button className="button1">Delete</button>
        </div>
      </div>
      <div className="icon-containe1">
        <button className="button_11">&#43;</button>
        <p className="text_31">New event</p>
      </div>
    </>
  );
};
