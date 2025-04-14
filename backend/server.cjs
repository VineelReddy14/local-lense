const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const usersFilePath = './users.json';

app.use(cors());
app.use(bodyParser.json());

// Ensure users.json exists
if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, JSON.stringify([]));
}

// POST route to save new user
app.post('/signup', (req, res) => {
  const newUser = req.body;
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  res.status(200).json({ message: 'User saved successfully!' });
});

// GET route (optional - view users)
app.get('/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});