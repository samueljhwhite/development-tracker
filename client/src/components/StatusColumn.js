import React from 'react';

import TaskCard from './TaskCardComponent.js';
import AddTaskCard from './AddTaskCardComponent.js';

class StatusColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnStatus: this.props.columnStatus, //Obj: name & index
            projectID: this.props.projectID,
            projectName: this.props.projectName,
            projectDescription: this.props.projectDescription,
            isEditing: false,
            updatedStatusName: ''
        };
    }

    toggleEditing = () => {
        this.setState({ isEditing: !this.state.isEditing });
    }

    captureNameChange = (e) => {
        this.setState({ updatedStatusName: e.target.value });
    }

    commitNameChange = () => {
        const { commitColumnNameChange } = this.props
        const updatedStatusName = this.state.updatedStatusName;
        const statusIndex = this.state.columnStatus.index;

        commitColumnNameChange(statusIndex, updatedStatusName);
    }

    render() {
        const { tasks } = this.props;
        return (
            <div className='statusColumn'>
                
                { 
                    this.state.isEditing
                        ?
                    <div>
                        <textarea defaultValue={this.state.columnStatus.name} onChange={this.captureNameChange}></textarea>
                        <button onClick={this.commitNameChange}>Rename</button>
                        <button onClick={this.toggleEditing}>Cancel</button>
                    </div>
                        :
                    <h3 onClick={this.toggleEditing}>{this.state.columnStatus.name}</h3>
                }

                {
                    // loop through task statuses & assign matches.
                    tasks.map((task, i) => {
                        if (task.status === this.state.columnStatus.name) {
                            return <TaskCard task={task} key={i} />
                        } else {
                            return null;
                        }
                    })
                }
                <AddTaskCard projectID={this.state.projectID} columnStatus={this.state.columnStatus}/>
            </div>
        );
    }
}

export default StatusColumn;