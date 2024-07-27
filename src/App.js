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
import Question from './comps/addquest'
import Nominations from './comps/Nominations'
import SysHome from './SystemHomepage'
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Routes>
            <Route path="/" element={<Navbarbefore />} />
            <Route path="/Signin" element={<Navbarbefore />} />
            <Route path="/Signup" element={<Navbarbefore />} />
            <Route path="/home/*" element={<Navbarafter />} />
            <Route path="/question/*" element={<Navbarafter />} />
            <Route path="/Report" element={<Navbarafter />} />
            <Route path="/Chart" element={<Navbarafter />} />
          </Routes>
        </header>
        <Routes>
          <Route path="/" element={<SysHome /> } />
          <Route path="/Signin" element={<Signinbody />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/home" element={<OrgEvents />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/nominate" element={<Nominations />} />
          <Route path="/report" element={<Report />} />
          <Route path="/chart" element={<ChartComponent />} />
          <Route path="/Questionaire" element={<Questioning />} />
          <Route path="/feedbackform" element={<FeedbackForm />} />
          <Route path="/landingpage" element={<Landing />} /> 
          <Route path="/addquest" element={<Question />} />
          <Route path="/home/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
