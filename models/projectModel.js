const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now }

});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;