import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import {
  AddTeam,
  Navigation,
  Home,
  ShowTeam,
  ShowProg,
} from "./components";

class App extends Component {
  render() {
    return (
      <Router>
        <Navigation />
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/AddTeam" element={<AddTeam />} />
           <Route path="/ShowTeam" element={<ShowTeam />} />
           <Route path="/ShowProg" element={<ShowProg />} />
         </Routes>
       </Router>

      // document.getElementById("root")
    );
  }
}


export default App;
