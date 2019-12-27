const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    statuses: {type: Array, default: [
        {
            name: 'New',
            index: 0
        },
        {
            name: 'In Progress',
            index: 1
        },
        {
            name: 'Completed',
            index: 2
        }
    ]}

});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;