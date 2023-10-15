const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// Database configuration
const db = mysql.createPool({
  connectionLimit: 10,
  host: '192.168.245.11',
  user: 'root',
  password: ' ',
  database: 'prem', // Your new database name
});

app.use(express.json());

// Define a route to fetch data from the database
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM `shreyu`';

  db.query(query, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// Define a route to insert data into the database
app.post('/api/data', (req, res) => {
  const { name, email, password } = req.body;

  // Server-side validation
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  // Email validation using a regular expression
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  if (!email || !email.match(emailRegex)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Password validation (8 characters, at least 1 uppercase, 1 lowercase, 1 numeric)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!password || !password.match(passwordRegex)) {
    return res.status(400).json({ error: 'Invalid password format' });
  }

  const query = 'INSERT INTO `shreyu` (name, email, password) VALUES (?, ?, ?)';

  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Data inserted successfully' });
    }
  });
});

// Define a route to update data in the database
app.put('/api/data/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  // Server-side validation
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  // Email validation using a regular expression
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  if (!email || !email.match(emailRegex)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Password validation (8 characters, at least 1 uppercase, 1 lowercase, 1 numeric)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!password || !password.match(passwordRegex)) {
    return res.status(400).json({ error: 'Invalid password format' });
  }

  const query = 'UPDATE `shreyu` SET name = ?, email = ?, password = ? WHERE id = ?';

  db.query(query, [name, email, password, id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Data updated successfully' });
    }
  });
});

// Define a route to delete data from the database
app.delete('/api/data/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM `shreyu` WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Data deleted successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
