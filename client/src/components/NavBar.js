import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/logo.svg';
import GitHubIcon from '../assets/icons/icon-github.svg';

function NavBar() {
    return(
        <div className='navbar'>
            <Link to='/'>
                <img src={Logo} height='25px' width='100px' alt='Home'></img>
            </Link>
            <a href='https://www.github.com/samueljhwhite/development-tracker'>
                <img src={GitHubIcon} height='32px' width='32px' alt='GitHub Repository'></img>
            </a>  
        </div>
    );
}

export default NavBar;