import React from 'react';
import axios from 'axios';
import StatusColumn from './StatusColumn.js';

class StatusColumns extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            addingNewColumn: false,
            newStatus: 'untitled column'
        };
    }

    // Enable text area, or submit value of new text area.
    manageNewColumnCreation = () => {
        if (this.state.addingNewColumn === false) {
            this.setState({ addingNewColumn: true });
        } else {
            const { projectStatuses, projectID, projectName, projectDescription } = this.props;

            const newStatus = { name: this.state.newStatus, index: projectStatuses.length };
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

    updateDB = (projectID, projectData) => {
        axios.post(`http://localhost:5000/projects/update/${projectID}`, projectData).then(res => console.log(res));

        setTimeout(() => {
            window.location = `/project/${projectID}`
        }, 800);
    }

    commitColumnNameChange = (index, updatedName) => {
        const { projectStatuses, projectName, projectDescription, projectID } = this.props;

        const updatedStatuses = projectStatuses;
        updatedStatuses[index].name = updatedName;

        const updatedProjectData = {
            name: projectName,
            description: projectDescription,
            statuses: updatedStatuses
        }

        this.updateDB(projectID, updatedProjectData);
    }

    updateNewStatus = (e) => {
        this.setState({ newStatus: e.target.value });
    }

    render() {
        const { tasks, projectStatuses, projectID, projectName, projectDescription } = this.props;

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
                                tasks={tasks} 
                                commitColumnNameChange={this.commitColumnNameChange} 
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
                    <button onClick={this.manageNewColumnCreation}>+</button>
                </div>
            </div>
        );
    }
}

export default StatusColumns;