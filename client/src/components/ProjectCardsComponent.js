import React from 'react';
import { Link } from 'react-router-dom';

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