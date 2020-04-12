import React from 'react';
import { Link } from 'react-router-dom';

import GoToIcon from '../../assets/icons/go-to.svg';
import Confirm from '../../assets/icons/confirm.svg';
import Cancel from '../../assets/icons/cancel.svg';

class ProjectCard extends React.Component {
    constructor(props) {
        super(props); // Props - 1. Project object. 2. Function:deleteProjectAndTaskData
        this.state = {
            editingName: false,
            editingDescription: false,
            newNameValue: this.props.projectObj.name,
            newDescriptionValue: this.props.projectObj.description
        };
    }

    toggleEditName = () => {
        this.setState({ editingName: !this.state.editingName });
    }

    toggleEditDescription = () => {
        this.setState({ editingDescription: !this.state.editingDescription });
    }

    captureNameChange = (e) => {
        this.setState({ newNameValue: e.target.value });
    }

    captureDescriptionChange = (e) => {
        this.setState({ newDescriptionValue: e.target.value });
    }

    updateProjectName = () => {
        const { projectObj, updateProjectData } = this.props;

        const updatedProjectObj = {
            _id: projectObj._id,
            statuses: projectObj.statuses,
            name: this.state.newNameValue,
            description: projectObj.description,
        }
        
       updateProjectData(updatedProjectObj) // Declared at ProjectList
    }

    updateProjectDescription = () => {
        const { projectObj, updateProjectData } = this.props;

        const updatedProjectObj = {
            _id: projectObj._id,
            statuses: projectObj.statuses,
            name: projectObj.name,
            description: this.state.newDescriptionValue,
        }
        
       updateProjectData(updatedProjectObj) // Declared at ProjectList
    }

    deleteProjectAndTasks = () => {
        const { deleteProjectAndTaskData, projectObj } = this.props;
        const confirmationString = prompt('WARNING: This will permanantly delete this project, and all associated tasks. \n \n Type the name of this project to confirm deletion (case sensitive).');
        
        if (confirmationString === projectObj.name) {
            deleteProjectAndTaskData(projectObj._id); // Declared at ProjectList
        } else {
            alert('Incorrect project name.')
        }
    }

    render() {
        const { projectObj } = this.props;

        return(
            <div className='project-card'>
                <div className='detail'>
                    {
                        this.state.editingName 
                                ? 
                            <div className='editing'>
                                <textarea onChange={this.captureNameChange} defaultValue={projectObj.name}></textarea>
                                <img onClick={this.updateProjectName} height='20px' width='20px' src={Confirm}></img>
                                <img onClick={this.toggleEditName} height='19px' width='19px' src={Cancel}></img>
                            </div>
                                : 
                            <h1 onClick={this.toggleEditName}>{projectObj.name}</h1>
                        
                    }
                    {
                        this.state.editingDescription 
                                ? 
                            <div className='editing'>
                                <textarea onChange={this.captureDescriptionChange} defaultValue={projectObj.description}></textarea> 
                                <img onClick={this.updateProjectDescription} height='20px' width='20px' src={Confirm}></img>
                                <img onClick={this.toggleEditDescription} height='19px' width='19px' src={Cancel}></img>
                            </div>
                                : 
                            <p onClick={this.toggleEditDescription}>{projectObj.description}</p>
                    }
                    
                    <button onClick={this.deleteProjectAndTasks} >Delete </button>

                </div>

                <div className='go-to'>
                    <Link to={'project/'+projectObj._id}>   <img src={GoToIcon}></img>    </Link>
                </div>

            </div>
        );
    }

}

export default ProjectCard;