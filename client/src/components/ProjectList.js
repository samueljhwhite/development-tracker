import React from 'react';
import axios from 'axios';

import ProjectCardGenerator from './project-list/ProjectCardGenerator.js';

import '../styles/projectList.css';

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectsArr: [], //Array of projects (objects)
            addingNewProject: false,
            newProjectName: '',
            newProjectDescription: ''
        }
    }

    // Get list of all existing projects (array), and update component's state.
    componentDidMount() {
        axios.get('http://localhost:5000/projects')
            .then(res => {
                this.setState({ projectsArr: res.data })
            })
            .catch(err => console.log(err))
    }

    toggleAddNewProject = () => {
        this.setState({ addingNewProject: !this.state.addingNewProject })
    }

    captureNewProjectName = (e) => {
        this.setState({ newProjectName: e.target.value });
    }

    captureNewProjectDescription = (e) => {
        this.setState({ newProjectDescription: e.target.value });
    }

    // Take project info from state. Push to DB, and refresh window.
    pushNewProjectToDB = () => {
        const newProject = {
            name: this.state.newProjectName,
            description: this.state.newProjectDescription
        }

        axios.post('http://localhost:5000/projects/add', newProject).then(res => console.log(res));

        setTimeout(() => {
            window.location = '/'
        }, 1000);
    }

    // Delete the project and all related, assigned, task data.
    deleteProjectAndTaskData = (projectID) => {
        axios.delete(`http://localhost:5000/tasks/project/delete/${projectID}`).then(res => console.log(res));
        axios.delete(`http://localhost:5000/projects/delete/${projectID}`).then(res => console.log(res));

        setTimeout(() => {
            window.location ='/';
        }, 800);
    }

    // Pass array of projects through to ProjectCards generator; creates a container and Link (react-dom-router) for each project in DB.
    // Conditional rendering of New Project text fields.
    render() {
        const { projectsArr } = this.state;

        return(
            <div>
                <div className='directory-indication'>
                    devtracker > 
                </div>
                
                <ProjectCardGenerator projectsArr={ projectsArr } deleteProjectAndTaskData={this.deleteProjectAndTaskData}/>

                <div>
                    {
                        this.state.addingNewProject

                            ?

                        <div className='new-project-form'>
                            <div>
                                <span>Project Name:</span>
                                <textarea onChange={this.captureNewProjectName}></textarea>
                            </div>
                            <div>
                                <span>Project Description:</span>
                                <textarea onChange={this.captureNewProjectDescription}></textarea>
                            </div>
                            <div>
                                <button onClick={this.pushNewProjectToDB} >Add New Project</button>
                                <button onClick={this.toggleAddNewProject} >Cancel</button>
                            </div>
                        </div>

                            :

                        <button onClick={this.toggleAddNewProject}>Create New Project</button>
                    }
                </div>
            </div>
        );
    }
}

export default ProjectList;