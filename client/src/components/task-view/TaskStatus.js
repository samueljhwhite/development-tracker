import React from 'react';

class TaskStatus extends React.Component {
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
        
        const { taskStatus, statusesArr, onChangeStatus } = this.props;
        
        if (this.state.editing === false) {
            return(
                <div className='flex-child' onClick={this.toggleEditing} >
                    <p><strong>Status: </strong> {taskStatus}</p>
                </div>
            );
        } else {
            return(
                <div className='flex-child'>
                    <p>
                    Status: 
                    <select onChange={onChangeStatus} defaultValue={taskStatus}>
                        {
                            statusesArr.map((status, i) => {
                                return(
                                    <option key={i}>{status.name}</option>
                                );
                            })
                        }
                    </select>
                    </p>
                </div>
            );
        }
    }
}

export default TaskStatus;