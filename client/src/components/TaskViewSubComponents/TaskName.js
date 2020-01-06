import React from 'react';

class TaskName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }

    toggleEditing = () => {
        this.setState({ editing: !this.state.editing });
    }

    render() {
        
        const { taskName, projectName, onChangeTaskName } = this.props;
        
        if (this.state.editing === false) {
            return(
                <div className='flex-child'>
                    <span onClick={this.toggleEditing}>{taskName}</span>
                    <p>part of {projectName}</p>
                </div>
            );
        } else {
            return(
                    <div className='flex-child'>
                        <textarea 
                            placeholder='Enter task name' 
                            defaultValue={taskName} 
                            onChange={onChangeTaskName} 
                        ></textarea>
                        <p>part of {projectName}</p>
                    </div>
            );
        }
    }
}

export default TaskName;