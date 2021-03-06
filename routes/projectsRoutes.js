const router = require('express').Router();

// Project model
const Project = require('../models/projectModel');

// Route:       GET/projects
// Description: List all projects (MongoDB collection)
router.route('/').get((req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Route:       GET/projects/:id
// Description: Get specific project
router.route('/:id').get((req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(400).json(`Error: ${err}`));
});


// Route:       POST/projects/add
// Description: Create a new project
router.route('/add').post((req, res) => {
    const newProject = new Project({
        name: req.body.name,
        description: req.body.description
    })

    newProject.save()
        .then(() => res.json('Project Created Successfully'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Route        UPDATE/projects/update/:id
// Description  Update an existing project
router.route('/update/:id').post((req, res) => {
    Project.findByIdAndUpdate(req.params.id).then(project => {
        project.name = req.body.name;
        project.description = req.body.description;
        project.statuses = req.body.statuses;

        project.save()
            .then(() => res.json('Project updated'))
            .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Route:       /DELETE/projects/delete/:id
// Description: Find a project by _id, and delete.
router.route('/delete/:id').delete((req, res) => {
    Project.findByIdAndDelete(req.params.id)
        .then(() => res.json('Project Deleted'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});


module.exports = router;