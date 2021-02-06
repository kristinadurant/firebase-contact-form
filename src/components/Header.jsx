import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <header style={{borderBottom: '2px solid #999'}}>
            <div className="inner" style={{display: 'flex', justifyContent: 'space-between'}}>
                <Link to='/'>Home</Link>
                <Link to='/contact'>Contact</Link>
            </div>    
        </header>
    )
}

export default Header;
