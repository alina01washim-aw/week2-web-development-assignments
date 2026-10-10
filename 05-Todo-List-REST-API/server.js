const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'To-Do List REST API is running!' });
});

// Task routes
app.use('/api/tasks', taskRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing from the .env file');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('\nServer startup failed:', error.message);

    if (error.reason && error.reason.servers) {
      error.reason.servers.forEach((server, address) => {
        console.log('\nServer:', address);
        console.log(
          'Connection error:',
          server.error?.message || 'No detailed error available'
        );
      });
    }

    process.exitCode = 1;
  }
}

startServer();

