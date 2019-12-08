import React from 'react';
import axios from 'axios';

import ProjectCards from './ProjectCardsComponent.js';

class ProjectList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projectsArr: ['Dummy Project', 'The Second Dummy', 'The 3rd, And Likely Final, Dummy Project']
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/projects')
        .then(res => {
            this.setState({ projectsArr: res.data })
        })
        .catch(err => console.log(err))
    }


    render() {
        const { projectsArr } = this.state;

        return(
            <div>
                <p>This is the 'Project List' Component</p>
                <ProjectCards projectsArr={ projectsArr } />
                <div className='projectSelector'>
                    <h2> + </h2>
                </div>
            </div>
        );
    }
}

export default ProjectList;


