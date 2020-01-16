import React from 'react';
import { Link } from 'react-router-dom';

class ProjectCard extends React.Component {
    constructor(props) {
        super(props); // Props - 1. Project object. 2. Function:deleteProjectAndTaskData
        this.state = {
            editingName: false,
            editingDescription: false,
        };
    }

    toggleEditName = () => {
        this.setState({ editingName: !this.state.editingName });
    }

    toggleEditDescription = () => {
        this.setState({ editingDescription: !this.state.editingDescription });
    }

    deleteProjectAndTasks = () => {
        const { deleteProjectAndTaskData, projectObj } = this.props;
        const confirmationString = prompt('WARNING: This will permanantly delete this project, and all associated tasks. \n \n Type the name of this project to confirm deletion (case sensitive).');
        
        if (confirmationString === projectObj.name) {
            deleteProjectAndTaskData(projectObj._id);
        } else {
            alert('Incorrect project name.')
        }
    }

    render() {
        const { projectObj } = this.props;

        return(
            <div className='project-card'>
                {
                    this.state.editingName ? <textarea defaultValue={projectObj.name}></textarea> : <h1 onClick={this.toggleEditName}>{projectObj.name}</h1>
                }
                {
                    this.state.editingDescription ? <textarea defaultValue={projectObj.description}></textarea> : <p onClick={this.toggleEditDescription}>{projectObj.description}</p>
                }
                <button>Edit</button>
                <button onClick={this.deleteProjectAndTasks} >Delete </button>
                <Link to={'project/'+projectObj._id}>   <button> >>>Go To Project</button>    </Link>
            </div>
        );
    }

}

export default ProjectCard;