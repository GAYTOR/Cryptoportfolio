import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
