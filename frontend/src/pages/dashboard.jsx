import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";

function Dashboard() {
    const [marks, setMarks] = useState([]);
    const [email, setEmail] = useState(""); // State for storing email

    // Fetching the email from localStorage when the component mounts
    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            // If no email is found in localStorage, redirect to login
            window.location.href = "/login";
        }
    }, []);

    // Fetch marks data for the user
    const fetchMarks = async () => {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            window.location.href = "/login"; // If user is not logged in, redirect
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/api/marks/fetchmarks?email=${userEmail}`);
            const data = await res.json();
            console.log("Fetched marks data:", data);  // Debugging the fetched data

            if (res.ok && data.results) {
                setMarks(data.results); // Setting marks fetched from API
            } else {
                console.error("No marks found for this user.");
            }
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    // Fetch marks when email is available
    useEffect(() => {
        if (email) {
            fetchMarks();
        }
    }, [email]);

    return (
        <div className="dashboard">
            <h2>Welcome, {email}</h2> {/* Displaying the welcome message with email */}
            
            {marks.length === 0 ? (
                <p>No marks found for this user.</p>
            ) : (
                <div className="marks-table">
                    <h3>Student Marks</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Student 1</th>
                                <th>Student 2</th>
                                <th>Student 3</th>
                                <th>Student 4</th>
                                <th>Student 5</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marks.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.student_1}</td>
                                    <td>{record.student_2}</td>
                                    <td>{record.student_3}</td>
                                    <td>{record.student_4}</td>
                                    <td>{record.student_5}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
