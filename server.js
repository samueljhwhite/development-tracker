const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// ENV vars in env file
require('dotenv').config();

// Create server and port
const app = express();
const port = process.env.PORT || 5000;

// Middlewear - cors & parse JSON
app.use(cors());
app.use(express.json());

// Connect to DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Use routes
const projectsRouter = require('./routes/projectsRoutes');
const tasksRouter = require('./routes/tasksRoutes');
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);

// Config Heroku - forward front-end.
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// server listen on port var
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});