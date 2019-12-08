import React from 'react';

class ProjectBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeProject: '',
            tasks: []
        }
    }

    render() {
        return(
            <p>This is the 'Project Board' Component</p>
        );
    }
}

export default ProjectBoard;