
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5002;
const JWT_SECRET = process.env.JWT_SECRET;
const NOTES_FILE = path.join(__dirname, 'notes.json');

function readNotes() {
  try {
    return JSON.parse(fs.readFileSync(NOTES_FILE, 'utf8'));
  } catch (error) {
    return [];
  }
}

function saveNotes(notes) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
}

// Verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Access denied. Please log in.'
    });
  }

  jwt.verify(token, JWT_SECRET, (error, user) => {
    if (error) {
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
  res.json({ message: 'Notes App API is running!' });
});

// All note routes require authentication
app.use('/api/notes', authenticateToken);

// Get all notes belonging to the logged-in user
app.get('/api/notes', (req, res) => {
  const notes = readNotes().filter(
    note => note.userId === req.user.id
  );

  res.json(notes);
});

// Create a note
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;

  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      message: 'A note title is required.'
    });
  }

  if (content !== undefined && typeof content !== 'string') {
    return res.status(400).json({
      message: 'Note content must be text.'
    });
  }

  const notes = readNotes();

  const newNote = {
    id: crypto.randomUUID(),
    userId: req.user.id,
    title: title.trim(),
    content: content || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  notes.push(newNote);
  saveNotes(notes);

  res.status(201).json({
    message: 'Note created successfully!',
    note: newNote
  });
});

// Get one note by ID
app.get('/api/notes/:id', (req, res) => {
  const note = readNotes().find(
    item => item.id === req.params.id &&
            item.userId === req.user.id
  );

  if (!note) {
    return res.status(404).json({
      message: 'Note not found.'
    });
  }

  res.json(note);
});

// Update a note
app.put('/api/notes/:id', (req, res) => {
  const notes = readNotes();

  const index = notes.findIndex(
    item => item.id === req.params.id &&
            item.userId === req.user.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: 'Note not found.'
    });
  }

  const { title, content } = req.body;

  if (title !== undefined &&
      (typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({
      message: 'Title must be non-empty text.'
    });
  }

  if (content !== undefined && typeof content !== 'string') {
    return res.status(400).json({
      message: 'Content must be text.'
    });
  }

  if (title !== undefined) {
    notes[index].title = title.trim();
  }

  if (content !== undefined) {
    notes[index].content = content;
  }

  notes[index].updatedAt = new Date().toISOString();

  saveNotes(notes);

  res.json({
    message: 'Note updated successfully!',
    note: notes[index]
  });
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
  const notes = readNotes();

  const index = notes.findIndex(
    item => item.id === req.params.id &&
            item.userId === req.user.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: 'Note not found.'
    });
  }

  const deletedNote = notes[index];
  notes.splice(index, 1);
  saveNotes(notes);

  res.json({
    message: 'Note deleted successfully!',
    note: deletedNote
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

if (!JWT_SECRET) {
  console.error('JWT_SECRET is missing from the .env file.');
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Notes API running at http://localhost:${PORT}`);
});
