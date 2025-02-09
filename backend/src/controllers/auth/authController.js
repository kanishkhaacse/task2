const db = require("../../config/db");  // Import the db connection pool

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required!" });
  }

  db.query('SELECT * FROM login WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Log the password comparison for debugging
    console.log("Database Password: ", results[0].password);
    console.log("Received Password: ", password);

    // Compare passwords directly (since you're not using bcrypt)
    if (results[0].password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the account is blocked
    if (results[0].can_login === 0) {
      return res.status(403).json({ message: "Account is blocked" });
    }

    // Successful login, set cookie
    res.cookie('user_id', results[0].id, {
      maxAge: 3600000, // 1 hour
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production (HTTPS)
    });

    return res.status(200).json({ message: "Login successful", user_id: results[0].id });
  });
};

module.exports = { loginUser };
