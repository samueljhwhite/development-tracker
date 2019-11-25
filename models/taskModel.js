const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    name: { type: String, required: true },
    assignedTo: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    description: { type: String, required: true },
    status: { type: String, default: '' },
    tags: { type: Array, default: [] },
    subtasks: { type: Array, default: [] }

})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;