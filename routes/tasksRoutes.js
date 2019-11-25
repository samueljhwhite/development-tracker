const router = require('express').Router();

// Task model
const Task = require('../models/taskModel');

// Route:       GET/tasks
// Description: Get all tasks (MongoDB Collection)
router.route('/').get((req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Route:       POST/tasks/add
// Description: Add a new task
router.route('/add').post((req, res) => {
    const newTask = new Task({
        name: req.body.name,
        assignedTo: req.body.assignedTo,
        description: req.body.description,
        status: req.body.status,
        tags: req.body.tags,
    });

    newTask.save()
        .then(() => res.json('Task Added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;