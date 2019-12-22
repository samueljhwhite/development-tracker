import React from 'react';
import axios from 'axios';

import StatusColumns from './StatusColumnsComponent.js';
import TaskCard from './TaskCardComponent.js';

class ProjectBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeProject: '',
            tasks: [],
            uniqueStatuses: []
        }
    }

    // Call server, query DB for project-specific tasks.
    componentDidMount() {
        // Take selected project from URL params.
        // Will be used to filter DB & update to component's state. 
        const projectID = this.props.match.params.id;

        // Get request to server - all tasks filtered by project ObjectId ('assignedProject' in DB)
        axios.get(`http://localhost:5000/tasks/project/${projectID}`)
        .then(res => {
            
            // Filter all statuses, return array of unqiue values.
            const uniqueStatuses = this.getUniqueStatuses(res.data);
            
            // Update component's state with Task info & Arr of unique statuses
            this.setState({ 
                tasks: res.data,
                activeProject: projectID,
                uniqueStatuses: uniqueStatuses
            })
        })
        .catch(err => console.log(err))
    }

    // Take server response Arr, create set of unique 'status' values - then pushed to component state. 
    // Used for Status columns. 
    getUniqueStatuses = (projectTasks) => {
       const uniqueStatuses = [...new Set(projectTasks.map(task => task.status))];
       return uniqueStatuses;
    }

    // Create container for each unique value in the 'status' field of current project.
    // Returns columns populated with TaskCards.
    render() {
        const { uniqueStatuses, tasks } = this.state;
        console.log(this.state.tasks);

        return(
            <div>
                <p>This is the 'Project Board' Component</p>
                <StatusColumns uniqueStatuses={uniqueStatuses} tasks={tasks} />
            </div>
        );
    }
}

export default ProjectBoard;