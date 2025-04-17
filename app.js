// index.js
const express = require('express');
const app = express();

// Home route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Start server
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
