import React from 'react';

import Subtask from './Subtask.js';

function SubtaskGenerator(props) {
    const { subtasksArr, commitSubtaskChange, statusesArr } = props;
    
    return(
        <div className='task-section'>
            <h3>Subtasks</h3>
            {
                subtasksArr.map((task, i) => {
                    return <Subtask index={i} key={i} task={task} commitSubtaskChange={commitSubtaskChange} statusesArr={statusesArr} />
                })
            }
        </div>
    );
}

export default SubtaskGenerator;