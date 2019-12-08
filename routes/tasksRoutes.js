const router = require('express').Router();

// Import mongoose to convert string to Mongo ObjectID (POST/tasks/add)
const mongoose = require('mongoose');

// Task model
const Task = require('../models/taskModel');

// Route:       GET/tasks
// Description: Get all tasks (MongoDB Collection)
router.route('/').get((req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Route:       GET/tasks/project/:assignedProjectId
// Description: Get all tasks from a given project
router.route('/project/:id').get((req, res) => {
    Task.find({ assignedProject: mongoose.Types.ObjectId(req.params.id) })
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json(`Error: ${err}`));
})

// Route:       POST/tasks/add
// Description: Add a new task
router.route('/add').post((req, res) => {
    const newTask = new Task({
        name: req.body.name,
        assignedProject: mongoose.Types.ObjectId(req.body.assignedProject),
        assignedTo: req.body.assignedTo,
        description: req.body.description,
        status: req.body.status,
        tags: req.body.tags,
        subtasks: req.body.subtasks
    });

    newTask.save()
        .then(() => res.json('Task Added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});


// Route:       DELETE/tasks/delete/:id
// Description: Delete a task
router.route('/delete/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise Deleted'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});


// Route        UPDATE/tasks/update/:id
// Description  Update an existing task
router.route('/update/:id').post((req, res) => {
    Task.findByIdAndUpdate(req.params.id).then(task => {
        task.name = req.body.name;
        task.assignedTo = req.body.assignedTo;
        task.description = req.body.description;
        task.status = req.body.status;
        task.tags = req.body.tags;
        task.subtasks = req.body.subtasks;
        task.dateCreated = req.body.dateCreated;
        task.lastUpdated = Date.now();

        task.save()
            .then(() => res.json('Task updated'))
            .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;