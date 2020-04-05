import React from 'react';

function TimeStamps(props) {
    const { createdAt, updatedAt } = props;

    return(
        <div className='task-section-flex'>
            <div className='flex-child'>
                <p>{createdAt}</p>
            </div>
            <div className='flex-child'>
                <p>{updatedAt}</p>
            </div>
        </div>
    );
}

export default TimeStamps;