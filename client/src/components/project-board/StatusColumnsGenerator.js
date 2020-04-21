import React from 'react';
import axios from 'axios';

import StatusColumn from './StatusColumn.js';
import NewColumnIcon from '../../assets/icons/new-column.svg';

class StatusColumnsGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            addingNewColumn: false,
            newStatus: 'untitled column'
        };
    }

    // Enable text area, or, check for duplicate column names, and then submit value of new text area in DB.
    manageNewColumnCreation = () => {
        if (this.state.addingNewColumn === false) {
            this.setState({ addingNewColumn: true });
        } else {
            const { projectStatuses, projectID, projectName, projectDescription } = this.props;
            
            const newStatus = { name: this.state.newStatus, index: projectStatuses.length };

            if (projectStatuses.some(obj => obj.name === newStatus.name)) {

                alert('Duplicate column name. Please enter a unique name for this column.')

            } else {
                const newStatuses = projectStatuses;
                newStatuses.push(newStatus);
    
    
                const updatedProjectData = {
                    name: projectName,
                    description: projectDescription,
                    statuses: newStatuses
                } 
                
                this.updateDB(projectID, updatedProjectData);
            }
        }
    }

    deleteStatusColumnFromDB = (deleteStatusNameString) => { // Called at StatusColumn
        const { projectID, projectName,  projectDescription, projectStatuses } = this.props; // Project data

        // Take existing statuses, find status to delete based on name string, create new array and push to DB.
        const existingStatuses = projectStatuses;
        const ArrIndex = existingStatuses.findIndex(obj => obj.name === deleteStatusNameString)
        const updatedStatusesArr = existingStatuses.slice(0, ArrIndex).concat(existingStatuses.slice(ArrIndex + 1));

        const updatedProjectData = {
            name: projectName, 
            description: projectDescription,
            statuses: updatedStatusesArr
        }

        this.updateDB(projectID, updatedProjectData);

        setTimeout(() => {
            window.location = `/project/${projectID}`;
        }, 800);
    }

    updateDB = (projectID, projectData, oldStatus, newStatus) => {
        // Update status name in DB
        axios.post(`https://aqueous-garden-71653.herokuapp.com/projects/update/${projectID}`, projectData).then(res => console.log(res));

        // Change tasks status value across all associated tasks in DB
        axios.post(`https://aqueous-garden-71653.herokuapp.com/tasks/project/${projectID}/status/${oldStatus}/${newStatus}`).then(res => console.log(res));

        setTimeout(() => {
            window.location = `/project/${projectID}`
        }, 800);
    }

        // Called at StatusColumn, handles renaming of StatusColumns and associated tasks.
    commitColumnNameChange = (updatedName, oldStatus) => {
        const { projectStatuses, projectName, projectDescription, projectID } = this.props;

        const updatedStatuses = projectStatuses;
        const oldArrIndex = updatedStatuses.findIndex(obj => obj.name === oldStatus);
        updatedStatuses[oldArrIndex].name = updatedName;

        const updatedProjectData = {
            name: projectName,
            description: projectDescription,
            statuses: updatedStatuses
        }

        this.updateDB(projectID, updatedProjectData, oldStatus, updatedName);
    }

    updateNewStatus = (e) => {
        this.setState({ newStatus: e.target.value });
    }

    render() {
        const { projectStatuses, projectID, projectName, projectDescription, editTasksArrOnDrop, orderedTasks } = this.props;

        return(
            <div className='projectBoard'>
                {
                    // Loop through project statuses.
                    projectStatuses.map((projectStatus, i) => {
                        return( 
                            <StatusColumn 
                                key={i} 
                                columnStatus={projectStatus} 
                                projectID={projectID} 
                                projectName={projectName} 
                                projectDescription={projectDescription} 
                                commitColumnNameChange={this.commitColumnNameChange} 
                                deleteStatusColumnFromDB={this.deleteStatusColumnFromDB} 
                                editTasksArrOnDrop = {editTasksArrOnDrop} 
                                orderedTasks= { orderedTasks }
                            /> 
                        )
                    })
                }
                <div className='add-column'>
                    {
                        this.state.addingNewColumn
                            ?
                        <textarea onChange={this.updateNewStatus} defaultValue='Enter name & submit'></textarea>
                            :
                        null
                    }
                    <img onClick={this.manageNewColumnCreation} height='25px' src={NewColumnIcon} alt='create new status column'></img>
                </div>
            </div>
        );
    }
}

export default StatusColumnsGenerator;