import React, { useState } from "react";
import "../styles/popup.css";

function Popup({ onClose, onAdd }) {
    const [name, setName] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [subject, setSubject] = useState("");
    const [marks, setMarks] = useState("");  
    const [subjectIndex, setSubjectIndex] = useState(0);  
    const [studentMarks, setStudentMarks] = useState([]);  
    
    const handleSubjectChange = (e) => setSubject(e.target.value);
    const handleMarksChange = (e) => setMarks(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!subject || !marks) {
            alert("Please fill in all fields.");
            return;
        }
        setStudentMarks([
            ...studentMarks,
            { subject, marks: parseFloat(marks) }
        ]);

        setSubject("");
        setMarks("");
        if (subjectIndex + 1 < 5) {
            setSubjectIndex(subjectIndex + 1);
        } else {
            onAdd({
                name,
                rollNo,
                marks: studentMarks.concat({ subject, marks: parseFloat(marks) }) 
            });
            setName("");
            setRollNo("");
            setSubject("");
            setMarks("");
            setSubjectIndex(0);  
            setStudentMarks([]);  

            onClose();  
        }
    };
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Add Student Marks</h2>
                <form onSubmit={handleSubmit}>
                    {subjectIndex === 0 && (
                        <>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Roll No"
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                            />
                        </>
                    )}
                    <input
                        type="text"
                        placeholder={`Subject ${subjectIndex + 1}`}
                        value={subject}
                        onChange={handleSubjectChange}
                    />
                    <input
                        type="number"
                        placeholder="Marks"
                        value={marks}
                        onChange={handleMarksChange}
                    />
                    <div>
                        <h3>Subjects and Marks</h3>
                        <ul>
                            {studentMarks.map((record, index) => (
                                <li key={index}>
                                    {record.subject}: {record.marks}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="popup-buttons">
                        <button type="submit">
                            {subjectIndex < 4 ? "Next Subject" : "Submit"}
                        </button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Popup;
