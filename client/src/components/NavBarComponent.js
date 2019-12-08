import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return(
        <div className='navbar'>
            <Link to='/'>
                <h2>DevTracker</h2>
            </Link>    
        </div>
    );
}

export default NavBar;