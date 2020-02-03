import React from 'react';
import { Link } from 'react-router-dom';

import GitHubIcon from '../assets/icons/icon-github.svg';

function NavBar() {
    return(
        <div className='navbar'>
            <Link to='/'>
                <h2>DevTracker</h2>
            </Link>
            <a href='https://www.github.com/samueljhwhite/development-tracker'>
                <img src={GitHubIcon} height='32px' width='32px'></img>
            </a>  
        </div>
    );
}

export default NavBar;