import { HashRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div style={{ backgroundSize: "cover", minHeight: "100vh" }} className="bg-gradient bg-secondary bg-opacity-75 text-light d-flex flex-column">
      <nav className="navbar bg-dark border-bottom border-bottom-dark justify-content-center" data-bs-theme="dark" style={{ width: "100%" }}>
        <div className="">
          <p className="navbar-brand">
            <img
              src="/Cryptoportfolio/logo.avif"
              alt="Logo"
              width="50"
              height="40"
              className="d-inline-block align-text-top rounded-circle"
              style={{ marginRight: "1rem" }}
            />
            CryptoPortfolioTracker
          </p>
        </div>
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
