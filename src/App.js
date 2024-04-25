import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Signup";
import { Navbarbefore } from "./Navbarbefore";
import { Signinbody } from "./Signinbody";
import Home from "./Home";
import Layout from "./Layout";
import Navbarafter from "./Navbarafter";
import OrgEvents from "./comps/OrgEvents";
import ListNominationComponent from './comps/listNominations';
import Landing from './Landing'; 
import Report from "./Reports/Report";
import ChartComponent from "./Reports/charts";
import Questioning from "./pages/Questionaire";
import FeedbackForm from "./pages/FeedbackForm";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Routes>
            <Route path="/" element={<Navbarbefore />} />
            <Route path="/Signup" element={<Navbarbefore />} />
            <Route path="/home/*" element={<Navbarafter />} />
            <Route path="/question/*" element={<Navbarafter />} />
            <Route path="/Report" element={<Navbarafter />} />
            <Route path="/Chart" element={<Navbarafter />} />
          </Routes>
        </header>
        <Routes>
          <Route path="/" element={<Signinbody />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/home" element={<OrgEvents />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/nominate" element={<ListNominationComponent />} />
          
          <Route path="/report" element={<Report />} />
          <Route path="/chart" element={<ChartComponent />} />
          <Route path="/Questionaire" element={<Questioning />} />
          <Route path="/feedbackform" element={<FeedbackForm />} />
          <Route path="/landingpage" element={<Landing />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
