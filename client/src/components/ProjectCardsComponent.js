import React from 'react';
import { Link } from 'react-router-dom';

// Recieves array of projects, and creates container & Link for each existing project.
function ProjectCards(props) {
    const { projectsArr } = props;

    return(
      <div>
        {
            projectsArr.map((project, i) => {
                return(
                      <Link to={'project/'+project._id} key={ i }>
                        <button className='projectSelector' id={ project._id }>
                          {project.name}
                        </button>
                      </Link>
                );
            })
        }
      </div>
    );
}

export default ProjectCards;