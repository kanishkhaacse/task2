import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Marks from "../pages/marks"; 
function RouterNavigator() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} /> 
                <Route path="/marks" element={<Marks />} /> 
            </Routes>
        </Router>
    );
}

export default RouterNavigator;
