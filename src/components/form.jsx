import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Button from "../components/Button"; 
import "../styles/form.css";

function Form() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleLogin = () => {
        if (email === "test@example.com" && password === "password123") {
            setError("");
            navigate("/dashboard"); 
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="form">
            <h2 className="form-title">LOGIN TO YOUR ACCOUNT</h2> 
            <div className="input-field">
                <input 
                    type="email" 
                    placeholder="Enter Email.." 
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Enter Password.." 
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            <Button initialText="LOGIN" onClick={handleLogin} />
        </div>
    );
}

export default Form;
