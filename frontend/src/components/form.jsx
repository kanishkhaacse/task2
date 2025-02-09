import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"; 
import "../styles/form.css";

function Form() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Disable button during login attempt
        
        console.log("Logging in with email:", email); // Log the email being sent
        
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", { // Updated to port 8080
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
        
            console.log("Response status:", response.status); // Log response status
        
            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error response data:", errorData); // Log the error message from the response
                setError(errorData.message || "Invalid email or password.");
            } else {
                const data = await response.json();
                console.log("Login successful:", data); // Log the successful login data
                // Store the email in localStorage after a successful login
                localStorage.setItem("userEmail", email);  // Store email in localStorage
    
                // Redirect to the marks page on successful login
                navigate("/marks");
            }
        } catch (err) {
            setError("Something went wrong, please try again.");
            console.error("Login error:", err); // Log the error if something goes wrong
        } finally {
            setIsLoading(false); // Re-enable the button
        }
    };
    

    return (
        <div className="form">
            <h2 className="form-title">LOGIN TO YOUR ACCOUNT</h2>
            <form onSubmit={handleLogin}>
                <div className="input-field">
                    <input
                        type="email"
                        placeholder="Enter Email.."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter Password.."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <Button
                    initialText={isLoading ? "Logging in..." : "LOGIN"}
                    onClick={handleLogin}
                    disabled={isLoading}
                />
            </form>
        </div>
    );
}

export default Form;
