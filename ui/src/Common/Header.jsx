import { faBell, faChartLine, faCog, faHome, faSearch, faUser, faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Dropdown, DropdownItem, Form} from 'react-bootstrap'
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    let [iconMenu,seticonMenu]=useState(false)
    console.log(iconMenu)
    return (
        <nav>
            <div class="nav-logo">
                <li className='navItems'> <Link className='link' to={"/"}> <img src='ecash.png' style={{left:"0px", width:"75px", height:"70px"}}/></Link></li>
            </div>
            <ul>
                
                <li className='navItems'> <Link className='link' to={"/"}> <FontAwesomeIcon icon={faHome}/><div>Home</div> </Link></li>
                <li className='navItems'> <Link className='link' to={"/userProfile"}> <FontAwesomeIcon icon={faUser}/><div>UserProfile</div> </Link></li>
                <li className='navItems'> <Link className='link' to={"/wallet"}><FontAwesomeIcon icon={faWallet}/><div>Wallet</div> </Link></li>
                <li className='navItems'> <Link className='link' to={"/analytics"}><FontAwesomeIcon icon={faChartLine}/><div>Analytics</div></Link></li>
                <li className='navItems'> <Link className='link' to={"/notification"}><FontAwesomeIcon icon={faBell}/><div>Notifications</div> </Link></li>
                <li className='navItems'> <Link className='link' to={"/settings"}><FontAwesomeIcon icon={faCog}/><div>Settings</div></Link></li>
            </ul>
        </nav>
      
    )
}