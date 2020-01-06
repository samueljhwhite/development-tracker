import React from 'react';

class AssignedTo extends React.Component {
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
        const { taskAssignedTo } = this.props;
        
        return(
            <div className='flex-child'>
                <span>Assigned to: {taskAssignedTo}</span>
            </div>
        );
    }
}

export default AssignedTo;