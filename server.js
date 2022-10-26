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
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

// Get a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//     console.log(row);
// });

// Delete a single candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//     console.log(result);
// });

// Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//   VALUES(?, ?, ?, ?)`;

// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//     console.log(result);
// });

// Default response for any other request (NOT FOUND)
app.use((req, res) => {
  res.status(404).end();
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});