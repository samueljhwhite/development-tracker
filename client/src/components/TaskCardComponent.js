import React from 'react';
import { Link } from 'react-router-dom';

class TaskCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { task } = this.props;

        return(
            <Link to={`/task/${task._id}`}> 
                <div className='taskCard'>
                    <p>{task.name}</p>
                    <p>{task.status}</p>
                    <p>{task.createdAt}</p>
                </div>
            </Link>
        );
    }
}

export default TaskCard;