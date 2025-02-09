import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Marks() {
    const [subject1, setSubject1] = useState(0);
    const [subject2, setSubject2] = useState(0);
    const [subject3, setSubject3] = useState(0);
    const [subject4, setSubject4] = useState(0);
    const [subject5, setSubject5] = useState(0);
    const [marks, setMarks] = useState([]);
    const navigate = useNavigate();

    // Fetch marks associated with the logged-in user
    const fetchMarks = async () => {
        const email = localStorage.getItem("userEmail"); // Get email from localStorage
        if (!email) {
            navigate("/login"); // Redirect to login if no email is found
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/api/marks/fetchmarks?email=${email}`);
            const data = await res.json();

            if (res.ok && data.results) {
                setMarks(data.results);
            } else {
                console.error("No marks found for this user.");
            }
        } catch (error) {
            console.error("Error fetching marks:", error);
        }
    };

    useEffect(() => {
        fetchMarks();
    }, []);

    // Handle marks submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem("userEmail");

        if (!email) {
            navigate("/login");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/marks/addmarks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    subject1,
                    subject2,
                    subject3,
                    subject4,
                    subject5,
                }),
            });

            const data = await res.json();
            console.log("Submit Response:", data);

            if (res.ok) {
                setSubject1(0);
                setSubject2(0);
                setSubject3(0);
                setSubject4(0);
                setSubject5(0);
                fetchMarks(); // Fetch marks again after submission

                // Redirect to the dashboard after submitting marks
                navigate("/dashboard"); // This line was missing before
            } else {
                console.error("Failed to submit marks");
            }
        } catch (error) {
            console.error("Error submitting marks:", error);
        }
    };

    return (
        <div>
            <h3>Enter marks</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Enter mark 1"
                    onChange={(e) => setSubject1(parseInt(e.target.value) || 0)}
                    value={subject1}
                />
                <input
                    type="number"
                    placeholder="Enter mark 2"
                    onChange={(e) => setSubject2(parseInt(e.target.value) || 0)}
                    value={subject2}
                />
                <input
                    type="number"
                    placeholder="Enter mark 3"
                    onChange={(e) => setSubject3(parseInt(e.target.value) || 0)}
                    value={subject3}
                />
                <input
                    type="number"
                    placeholder="Enter mark 4"
                    onChange={(e) => setSubject4(parseInt(e.target.value) || 0)}
                    value={subject4}
                />
                <input
                    type="number"
                    placeholder="Enter mark 5"
                    onChange={(e) => setSubject5(parseInt(e.target.value) || 0)}
                    value={subject5}
                />
                <button type="submit">Submit</button>
            </form>

            <h3>Marks Submitted:</h3>
            {marks.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Subject 1</th>
                            <th>Subject 2</th>
                            <th>Subject 3</th>
                            <th>Subject 4</th>
                            <th>Subject 5</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marks.map((mark, index) => (
                            <tr key={index}>
                                <td>{mark.student_1}</td>
                                <td>{mark.student_2}</td>
                                <td>{mark.student_3}</td>
                                <td>{mark.student_4}</td>
                                <td>{mark.student_5}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No marks available</p>
            )}
        </div>
    );
}

export default Marks;
