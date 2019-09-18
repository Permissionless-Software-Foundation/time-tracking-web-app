/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import { Link , navigate} from 'gatsby'
import {  isLoggedIn , logout, ensureAdmin } from "../services/auth";

const Menu = (props) => (
    <nav id="menu">
        <div className="inner">
            {/* <ul className="links">
                <li><Link onClick={props.onToggleMenu} to="/">Home</Link></li>
                <li><Link onClick={props.onToggleMenu} to="/landing">Landing</Link></li>
                <li><Link onClick={props.onToggleMenu} to="/generic">Generic</Link></li>
                <li><Link onClick={props.onToggleMenu} to="/elements">Elements</Link></li>
                <li><Link onClick={props.onToggleMenu} to="/blog">Blog</Link></li>
            </ul> */}
            <ul className="actions vertical">
                {/* <li><Link to="/research" className="button special fit">Research</Link></li> */}
                <li>{!isLoggedIn() ? <Link to="/login" className="button  special fit">Log In</Link> :
                    <Link to="/" onClick={event => {
                        event.preventDefault();
                        logout(() => navigate(`/`));
                    }} className="button special fit">Log Out</Link>}</li>
                 {  ensureAdmin() && <li><Link onClick={props.onToggleMenu} className="button  fit" to='/editprojects'>Edit Projects</Link></li>}
                    <li><Link onClick={props.onToggleMenu} className="button  fit" to={isLoggedIn() ? '/logwork' :'/login'}>Log Work</Link></li>
                    <li><Link onClick={props.onToggleMenu} className="button  fit" to="/projects">View Projects</Link></li>
                    <li><Link onClick={props.onToggleMenu} className="button  fit" to="/reports">Work Reports</Link></li>
                    <li><Link onClick={props.onToggleMenu} className="button  fit" to={isLoggedIn() ? '/profile' :'/login'}>Profile</Link></li>
            </ul>
        </div>
        <a className="close" onClick={props.onToggleMenu} href="javascript:;">Close</a>
    </nav>
)

Menu.propTypes = {
    onToggleMenu: PropTypes.func
}

export default Menu