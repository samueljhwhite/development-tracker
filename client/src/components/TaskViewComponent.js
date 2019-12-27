import React from 'react';
import axios from 'axios';

class TaskView extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            task: {}, // All queried task data (kept for reference).
            assignedProject: '',
            taskId: '',
            assignedTo: '',
            name: '',
            description: '',
            subtasks: [],
            tags: [],

            projectData: {} // All queried project data
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
                subtasks: req.data.subtasks,
                tags: req.data.tags
            });

            this.getProjectData();
        });
    }

    getProjectData = () => {
        axios.get(`http://localhost:5000/projects/${this.state.assignedProject}`).then(req => {
            this.setState({ projectData: req.data });
        });
    }

    render() {
        return(
            <div>
                <p>This is the Task View Component</p>

                <br></br>

                <p>Name: {this.state.name}</p>
                <p>Assigned To: {this.state.assignedTo}</p>
                <p>Assigned Project: {this.state.projectData.name}</p>
                <p>Description: {this.state.description}</p>
            </div>
        );
    }
}

export default TaskView;