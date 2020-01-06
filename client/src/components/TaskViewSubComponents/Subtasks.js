import React from 'react';

class Subtasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
    }

    render() {
        
        const { subtasksArr } = this.props;

        return(
            <div className='task-section'>
                <span>Subtasks</span>
                {
                    subtasksArr.map((task, i) => {
                        return(
                            <div key={i} >
                                <input type='checkbox' id={task.name} name={task.name} />
                                <label htmlFor={task.name}> {task.name} </label>
                            </div>
                        );
                    })
                }
                <button>Add New Subtask</button>
            </div>
        );
    }
}

export default Subtasks;