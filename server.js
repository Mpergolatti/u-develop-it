const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();


// Express Middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Connect to mySql Database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'weather**',
    database: 'election'
  },
  console.log('Connected to the election database.')
);

// Test GET request to make sure the server is running.
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

// Query the Database
db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});

// Default response for any other request (NOT FOUND)
app.use((req, res) => {
  res.status(404).end();
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});