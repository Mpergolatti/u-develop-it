const express = require('express');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');

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

// Get all candidates
app.get('/api/candidates', (req, res) => {
  const sql =  `SELECT * FROM candidates`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get a single candidate
app.get('/api/candidates/:id', (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message});
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Delete a single candidate
app.delete('/api/candidates/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Create a candidate
app.post('/api/candidates', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?, ?, ?)`;

  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message});
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Default response for any other request (NOT FOUND)
app.use((req, res) => {
  res.status(404).end();
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

