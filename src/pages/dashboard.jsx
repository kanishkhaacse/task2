import React, { useState } from "react";
import Button from "../components/Button";
import Popup from "../components/popup";
import "../styles/dashboard.css";
function Dashboard() {
    const [records, setRecords] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showMarks, setShowMarks] = useState(false);

    const handleAddMarks = (newRecord) => {
        setRecords([...records, newRecord]);
        setShowPopup(false);  
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            {records.length === 0 ? <p>No records found.</p> : null}
            <Button initialText="Add Marks" onClick={() => setShowPopup(true)} />
            {showPopup && <Popup onClose={() => setShowPopup(false)} onAdd={handleAddMarks} />}
            {records.length > 0 && (
                <Button
                    initialText="View Marks"
                    onClick={() => setShowMarks(!showMarks)}
                />
            )}
            {showMarks && records.length > 0 && (
                <div className="marks-table">
                    <h3>Student Marks</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll No</th>
                                <th>Subject 1 - Marks</th>
                                <th>Subject 2 - Marks</th>
                                <th>Subject 3 - Marks</th>
                                <th>Subject 4 - Marks</th>
                                <th>Subject 5 - Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record, index) => {
                                const marksArray = record.marks || [];
                                const filledMarks = [...marksArray];
                                while (filledMarks.length < 5) {
                                    filledMarks.push({ subject: "", marks: "" });
                                }

                                return (
                                    <tr key={index}>
                                        <td>{record.name}</td>
                                        <td>{record.rollNo}</td>
                                        {filledMarks.map((mark, i) => (
                                            <td key={i}>
                                                {mark.subject && mark.marks
                                                    ? `${mark.subject} - ${mark.marks}`
                                                    : "Not Entered"}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
