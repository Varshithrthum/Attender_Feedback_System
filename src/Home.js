import React from "react";
import "./home.css";
import Displayname from "./Displayname";
import { Events } from "./Events";

const Home = () => {
  return (
    <div>
      <Displayname />
      <Events />
    </div>
  );
};

export default Home;
