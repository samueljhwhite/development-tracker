import React from 'react';

function StatusColumns(props){
    const { uniqueStatuses } = props;
    console.log(uniqueStatuses);

    return(
        <div>
            {
                uniqueStatuses.map((status, i) => {
                    return(
                        <div className='statusColumn' key={i}>
                        <h3>{status}</h3>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default StatusColumns;