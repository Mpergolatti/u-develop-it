const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();


// Express Middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Test GET request to make sure the server is running.
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

// Default response for any other request (NOT FOUND)
app.use((req, res) => {
  res.status(404).end();
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});