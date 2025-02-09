const db = require("../../config/db");

const fetchMarks = (req, res) => {
    const query = `SELECT * FROM marks`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Failed to fetch marks", err);
            return res.status(500).json({ message: "Failed to fetch marks" });
        }
        res.status(200).json({ results: result, message: "Fetched successfully" });
    });
};

module.exports = { fetchMarks };
