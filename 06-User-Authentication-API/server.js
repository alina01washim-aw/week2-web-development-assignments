
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET;
const USERS_FILE = path.join(__dirname, 'users.json');

function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

// Check authentication token
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Access denied. Please log in.'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Invalid or expired token.'
      });
    }

    req.user = user;
    next();
  });
}

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'User Authentication API is running!' });
});

// Register a new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required.'
      });
    }

    if (typeof name !== 'string' ||
        typeof email !== 'string' ||
        typeof password !== 'string') {
      return res.status(400).json({
        message: 'All fields must be text.'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must contain at least 8 characters.'
      });
    }

    const users = readUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some(user => user.email === normalizedEmail)) {
      return res.status(409).json({
        message: 'An account with this email already exists.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword
    };

    users.push(newUser);
    saveUsers(users);

    const token = createToken(newUser);

    res.status(201).json({
      message: 'Registration successful!',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Log in an existing user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password ||
        typeof email !== 'string' ||
        typeof password !== 'string') {
      return res.status(400).json({
        message: 'Email and password are required.'
      });
    }

    const users = readUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const user = users.find(
      user => user.email === normalizedEmail
    );

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      });
    }

    const token = createToken(user);

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Protected profile route
app.get('/api/auth/profile', authenticateToken, (req, res) => {
  const users = readUsers();
  const user = users.find(item => item.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  res.json({
    message: 'Profile accessed successfully!',
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

// Unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

if (!JWT_SECRET) {
  console.error('JWT_SECRET is missing from the .env file.');
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
