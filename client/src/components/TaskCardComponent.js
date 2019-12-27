import React from 'react';

class TaskCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { task } = this.props;

        return(
            <div className='taskCard'>
                <p>{task.name}</p>
                <p>{task.status}</p>
                <p>{task.dateCreated}</p>
            </div>
        );
    }
}

export default TaskCard;