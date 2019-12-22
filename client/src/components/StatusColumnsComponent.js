import React from 'react';

import TaskCard from './TaskCardComponent.js';

function StatusColumns(props){
    
    const { uniqueStatuses, tasks } = props;

    //Loop through unique statuses and create a column for each.
    // On column creation, check all tasks for matching status value, and populate with individual tasks.
    return(
        <div>
            {
                uniqueStatuses.map((status, i) => {
                    return(
                        <div className='statusColumn' key={i} id={status}>
                        <h3>{status}</h3>

                        {
                            tasks.map(task => {
                                if (task.status === status) {
                                    return <TaskCard task={task} />
                                }
                            })
                        }

                        </div>
                    );
                })
            }
        </div>
    );
}

export default StatusColumns;