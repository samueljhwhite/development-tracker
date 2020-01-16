import React from 'react';

import ProjectCard from './ProjectCard.js';

// Recieves array of projects, and creates container & Link for each existing project.

class ProjectCardGenerator extends React.Component {
  constructor(props) {
    super(props); // Array of objects (projects)
    this.state = {};
  }

  render() {
    const { projectsArr, deleteProjectAndTaskData } = this.props;
    
    return(
      <div className='card-list'>
        {
            projectsArr.map((projectObj, i) => {
                return(
                  <ProjectCard key={i} projectObj={projectObj} deleteProjectAndTaskData={deleteProjectAndTaskData} />
                );
            })
        }
      </div>
    );
  }
}

export default ProjectCardGenerator;