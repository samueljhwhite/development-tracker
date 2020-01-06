import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// TaskView subcomponents
import TaskName from './TaskViewSubComponents/TaskName.js';
import TaskStatus from './TaskViewSubComponents/TaskStatus.js';
import AssignedTo from './TaskViewSubComponents/AssignedTo.js';
import Tags from './TaskViewSubComponents/Tags.js';
import Description from './TaskViewSubComponents/Description.js';
import Subtasks from './TaskViewSubComponents/Subtasks.js';
import TimeStamps from './TaskViewSubComponents/TimeStamps.js';
import UnsavedChanges from './TaskViewSubComponents/UnsavedChanges.js';

import '../styles/taskView.css';

class TaskView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            task: {}, // All queried task data (kept for reference).
            assignedProject: '',
            taskId: '',
            assignedTo: '',
            name: '',
            description: '',
            status: '',
            subtasks: [],
            tags: [],
            createdAt: '',
            updatedAt: '',

            projectData: {}, // All queried project data
            projectStauses: [],
            hasBeenEdited: false
        };
    }

    // Call server, set component state with Task data; then query project data.
    componentDidMount() {
        const taskId = this.props.match.params.id;

        axios.get(`http://localhost:5000/tasks/${taskId}`).then(req => {
            this.setState({
                task: req.data,
                assignedProject: req.data.assignedProject,
                taskId: req.data._id,
                assignedTo: req.data.assignedTo,
                name: req.data.name,
                description: req.data.description,
                status: req.data.status,
                subtasks: req.data.subtasks,
                tags: req.data.tags,
                createdAt: req.data.createdAt,
                updatedAt: req.data.updatedAt
            });

            this.getProjectData();
        });
    }

    getProjectData = () => {
        axios.get(`http://localhost:5000/projects/${this.state.assignedProject}`).then(req => {
            this.setState({ 
                projectData: req.data,
                projectStauses: req.data.statuses
             });
        });
    }

    onChangeTaskName = (e) => {
        this.setState({ name: e.target.value });
        this.registerEdit();
    }

    onChangeStatus = (e) => {
        this.setState({ status: e.target.value });
        this.registerEdit();
    }

    onChangeAssignedUser = () => {
        // NOT CURRENTLY USED
    }

    onChangeTags = () => {

    }

    onChangeDescription = (e) => {
        this.setState({ description: e.target.value });
        this.registerEdit();
    }

    onChangeSubtasks = () => {

    }

    registerEdit = () => {
        if (this.state.hasBeenEdited === false) {
            this.setState({ hasBeenEdited: true });
        }
    }

    // Copy task data from state, update DB, and refresh window.
    pushChangesToDatabase = (e) => {
        e.preventDefault();
        const id = this.state.taskId;
        
        const updatedTask = {
            name: this.state.name,
            assignedTo: this.state.assignedTo,
            description: this.state.description,
            status: this.state.status,
            tags: this.state.tags,
            subtasks: this.state.subtasks,
            // createdAt: this.state.dateCreated, props not necessary
        }
        axios.post(`http://localhost:5000/tasks/update/${id}`, updatedTask).then(res => console.log(res.data));

        window.location = `/task/${id}`;
    }

    render() {
        const tagsArr = this.state.tags;
        const subtasksArr = this.state.subtasks;
        const taskDescription = this.state.description;
        
        return(
            <div className='task-view'>
                
                <div className='return-to-project'>
                    <Link to={`/project/${this.state.assignedProject}`} > 
                        ᐸᐸ  '{this.state.projectData.name}' project board 
                    </Link>
                </div>
                
                <div className='task-view-content'>
                    <UnsavedChanges 
                        hasBeenEdited={this.state.hasBeenEdited} 
                        pushChangesToDatabase={this.pushChangesToDatabase} 
                    />
                    
                    <div className='task-header'>
                        <TaskName 
                            taskName={this.state.name} 
                            projectName={this.state.projectData.name} 
                            onChangeTaskName={this.onChangeTaskName} 
                        />
                        <TaskStatus 
                            taskStatus={this.state.status} 
                            statusesArr={this.state.projectStauses} 
                            onChangeStatus={this.onChangeStatus} 
                        />
                    </div>

                    <div className='task-section-flex'>
                        <AssignedTo 
                            taskAssignedTo={this.state.assignedTo} 
                        />
                        <Tags 
                            tagsArr={tagsArr}
                        />
                    </div>

                    <Description 
                        taskDescription={taskDescription} 
                        onChangeDescription={this.onChangeDescription} 
                        pushChangesToDatabase={this.pushChangesToDatabase} 
                    />

                    <Subtasks 
                        subtasksArr={subtasksArr} 
                    />

                    <TimeStamps 
                        createdAt={this.state.createdAt} 
                        updatedAt={this.state.updatedAt} 
                    />

                    <UnsavedChanges 
                        hasBeenEdited={this.state.hasBeenEdited} 
                        pushChangesToDatabase={this.pushChangesToDatabase} 
                    />
                </div>

            </div>
        );
    }
}

export default TaskView;