import React from "react";
import Home from "./pages/home/Home";
import Mail from "./pages/mail/Mail";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mail/*" element={<Mail />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
