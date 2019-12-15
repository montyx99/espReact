import React from 'react'
import { Link } from 'react-router-dom'
import UIkit from 'uikit'

// import './header.scss'

const Header = () => {
    return(
        <div className="Header">
            <nav className="uk-navbar-container" uk-navbar="offset: 1">
                <div className="uk-navbar-left">
                    <ul className="uk-navbar-nav">
                        <li><Link to='/' className="uk-logo uk-navbar-item">ESPReact</Link></li>
                    </ul>
                </div>
                <div className="uk-navbar-right">
                    <ul className="uk-navbar-nav">
                        <li>
                            <a href="#">Parent</a>
                            <div className="uk-navbar-dropdown">
                                <ul className="uk-nav uk-navbar-dropdown-nav">
                                    <li className="uk-active"><a href="#">Active</a></li>
                                    <li><a href="#">Item</a></li>
                                    <li><a href="#">Item</a></li>
                                </ul>
                            </div>
                        </li>
                        <li><Link to='/config'>Config</Link></li>
                    </ul>
                </div>
            </nav>
        </div>)
}

export default Header