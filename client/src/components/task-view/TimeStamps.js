import React from 'react';

function TimeStamps(props) {
    const { createdAt, updatedAt } = props;

    return(
        <div className='task-section-flex'>
            <div className='flex-child'>
                <p><strong>Created: </strong>{createdAt.substring(0, 10)}</p>
            </div>
            <div className='flex-child'>
                <p><strong>Updated: </strong> {updatedAt.substring(0, 10)}</p>
            </div>
        </div>
    );
}

export default TimeStamps;