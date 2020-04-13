import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import TaskName from './task-view/TaskName.js';
import TaskStatus from './task-view/TaskStatus.js';
import Tags from './task-view/Tags.js';
import Description from './task-view/Description.js';
import SubtaskGenerator from './task-view/SubtaskGenerator.js'
import TimeStamps from './task-view/TimeStamps.js';
import UnsavedChanges from './task-view/UnsavedChanges.js';

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
            projectNameString: '',
            projectStauses: [],
            existingProjectTags: [],
            hasBeenEdited: false,
            newTagValue: '',
        };
    }

    // Call server, set component state with Task data; then query project & task (tag) data.
    componentDidMount() {
        const taskId = this.props.match.params.id;

        axios.get(`http://localhost:5000/tasks/${taskId}`).then(res => {
            this.setState({
                task: res.data, // Can be removed later
                assignedProject: res.data.assignedProject,
                taskId: res.data._id,
                assignedTo: res.data.assignedTo, //Can be removed later
                name: res.data.name,
                description: res.data.description,
                status: res.data.status,
                subtasks: res.data.subtasks,
                tags: res.data.tags,
                createdAt: res.data.createdAt,
                updatedAt: res.data.updatedAt
            });

            this.getProjectData();
            this.getExistingTagData();
        });
    }

    // Get needed project data for child components. 
    getProjectData = () => {
        axios.get(`http://localhost:5000/projects/${this.state.assignedProject}`).then(res => {
            this.setState({ 
                projectData: res.data, // Can likely be removed later
                projectStauses: res.data.statuses,
                projectNameString: res.data.name
             });

        });
    }

    // Call DB for project tasks. Loop and collate all .tags array items, then filter for unique values and assign to component state.
    getExistingTagData = () => {
        axios.get(`http://localhost:5000/tasks/project/${this.state.assignedProject}`).then(res => {
            const allArrItems = []

            res.data.forEach(taskObj => {
                const tagsArr = taskObj.tags;
                    
                tagsArr.forEach(tag => {
                    allArrItems.push(tag);
                });
            });
                
            const uniqueTags = [...new Set(allArrItems)];
            this.setState({
                existingProjectTags: uniqueTags
            })
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

    captureNewTagValue = (e) => {
        this.setState({
            newTagValue: e.target.value
        });
    }

    addNewTag = () => {
        const newTag = this.state.newTagValue;
        const existingTagsArr = this.state.tags;
        const newTagsArr = existingTagsArr.push(newTag);
        this.setState({
            tags: newTagsArr
        });
        this.pushChangesToDatabase();
    }

    onChangeDescription = (e) => {
        this.setState({ description: e.target.value });
        this.registerEdit();
    }

    commitSubtaskChange = (arrIndex, newObj) => {
        const subtasksArr = this.state.subtasks;
        subtasksArr.splice(arrIndex, 1, newObj);
        
        this.setState({ subtasks: subtasksArr });
        this.pushChangesToDatabase();
    }

    saveNewSubtaskToDB = (newSubtaskObj) => {
        const subtasksArr = this.state.subtasks;
        subtasksArr.push(newSubtaskObj);

        this.setState({
            subtasks: subtasksArr
        });
        
        this.pushChangesToDatabase();
    }

    registerEdit = () => {
        if (this.state.hasBeenEdited === false) {
            this.setState({ hasBeenEdited: true });
        }
    }

    // Copy task data from state, update DB, and refresh window.
    pushChangesToDatabase = () => {
        const id = this.state.taskId;
        const updatedTask = {
            name: this.state.name,
            assignedTo: this.state.assignedTo,
            description: this.state.description,
            status: this.state.status,
            tags: this.state.tags,
            subtasks: this.state.subtasks,
        }
        axios.post(`http://localhost:5000/tasks/update/${id}`, updatedTask).then(res => console.log(res.data));

        setTimeout(() => {
            window.location = `/task/${id}`;
        }, 1000);
    }

    render() {
        const tagsArr = this.state.tags;
        const subtasksArr = this.state.subtasks;
        const taskDescription = this.state.description;
        
        const lowerCaseProjectName = this.state.projectNameString.toLowerCase();
        const lowerCaseDescription = this.state.name.toLowerCase();

        return(
            <div className='task-view'>
                <div className='directory-indication'>
                    devtracker > <em> <Link to={`/project/${this.state.assignedProject}`}> {lowerCaseProjectName} </Link> </em> > {lowerCaseDescription}
                </div>
                
                <div className='task-view-content'>
                    <div className='task-header'>
                        <TaskName taskName={this.state.name} projectName={this.state.projectData.name} onChangeTaskName={this.onChangeTaskName} />
                        <UnsavedChanges hasBeenEdited={this.state.hasBeenEdited} pushChangesToDatabase={this.pushChangesToDatabase} />
                        <TaskStatus taskStatus={this.state.status} statusesArr={this.state.projectStauses} onChangeStatus={this.onChangeStatus} />
                    </div>

                    <div className='task-header'>
                        <Tags tagsArr={tagsArr} existingProjectTags={this.state.existingProjectTags} captureNewTagValue={this.captureNewTagValue} addNewTag={this.addNewTag} />
                    </div>

                    <Description taskDescription={taskDescription} onChangeDescription={this.onChangeDescription} pushChangesToDatabase={this.pushChangesToDatabase} />
                    <SubtaskGenerator subtasksArr={subtasksArr} commitSubtaskChange={this.commitSubtaskChange} statusesArr={this.state.projectStauses} saveNewSubtaskToDB={this.saveNewSubtaskToDB} />
                    <TimeStamps createdAt={this.state.createdAt} updatedAt={this.state.updatedAt} />
                </div>
            </div>
        );
    }
}

export default TaskView;