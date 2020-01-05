import React from 'react';

import TaskCard from './TaskCardComponent.js';
import AddTaskCard from './AddTaskCardComponent.js';

function StatusColumns(props) {
    const { tasks, projectStatuses, projectID } = props;

    // Loop through all project statuses; create container for each.
    // On loop, populate container with TaskCard if task status and project status match. 

    return(
        <div className='projectBoard'>
            {
                // Loop through project statuses.
                projectStatuses.map((projectStatus, i) => {
                    return(
                        <div className='statusColumn' key={i} id={projectStatus.name}>
                            <h3>{projectStatus.name}</h3>
                            {
                                // loop through task statuses.
                                tasks.map((task, i) => {
                                    if (task.status === projectStatus.name) {
                                        return <TaskCard task={task} key={i} />
                                    } else {
                                        return null; // Added purely to remove a compiler error....
                                    }
                                })
                            }
                            <AddTaskCard projectID={projectID} columnStatus={projectStatus.name}/>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default StatusColumns;