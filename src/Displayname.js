import React from "react";
import "./displayname.css";

const Displayname = (props) => {
  return (
    <div className="name-container">
      <a className="name-text">
        Welcome
        <span id="result-name" />
        &nbsp;{props.firstName}
      </a>
      <a className="name-text">
        &nbsp;
        <span id="result-surname" />
        {props.lastName}
      </a>
    </div>
  );
};

export default Displayname;
