import React from "react";
import "./displayname.css";

const Displayname = () => {
  return (
    <div className="name-container">
      <a className="name-text">
        Welcome
        <span id="result-name" />
        &nbsp;Carolina
      </a>
      <a className="name-text">
        &nbsp;
        <span id="result-surname" />
        Ruiz
      </a>
    </div>
  );
};

export default Displayname;
