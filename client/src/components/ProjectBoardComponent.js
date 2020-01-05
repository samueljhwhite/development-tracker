import React from 'react';
import axios from 'axios';

import '../styles/projectBoard.css';

import StatusColumns from './StatusColumnsComponent.js';

class ProjectBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeProject: '', // All queried project data (kept for reference)
            projectID: '', // String, converted to Mongo ObjID
            description: '', // Project description
            name: '', // Project name
            projectStatuses: [], // Arr of Objs (name & index)
            tasks: []
        }
    }

    // Calls to server to set state.
    componentDidMount() {
        const projectID = this.props.match.params.id;

        // Call server, query DB for project data & assign to component state.
        axios.get(`http://localhost:5000/projects/${projectID}`).then(res => {
            this.setState({
                activeProject: res.data,
                projectID: res.data._id,
                description: res.data.description,
                name: res.data.name,
                projectStatuses: res.data.statuses
            });
        })
        .catch(err => console.log(err));

        // Call server, query DB for all tasks assigned to project & update component state.
        axios.get(`http://localhost:5000/tasks/project/${projectID}`).then(res => {
            this.setState({ 
                tasks: res.data,
            })
        })
        .catch(err => console.log(err));
    }

    // Create column for each status of the project. Columns contain tasks based on asssignment.
    render() {
        const { tasks, projectStatuses, projectID } = this.state;

        return(
            <div>
                <p>This is the 'Project Board' Component</p>
                <p><strong>Active Project:</strong> {this.state.name}</p>
                <p><strong>Project Description:</strong> {this.state.description}</p>
                
                <StatusColumns 
                    tasks={tasks} 
                    projectStatuses={projectStatuses} 
                    projectID={ projectID } 
                />

            </div>
        );
    }
}

export default ProjectBoard;