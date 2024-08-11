import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarChart, faBell, faCog, faHome, faPersonBooth, faPersonRifle, faSearch, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons/faPerson';
import { faAffiliatetheme } from '@fortawesome/free-brands-svg-icons';
import './HomePage.css';

export default function HomePage() {
    return (
        <div>

            <div className="gridContainer">
                <div className="menuBar">
                    <img src='\ecash.png' style={{ marginTop: 20 }} width={50} />
                    <ul>
                        <li>
                            <FontAwesomeIcon icon={faHome} size='lg' border transform="shrink-6" />
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faWallet} size='lg' border transform="shrink-6" />
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faUser} size='lg' border transform="shrink-6" />
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faBell} size='lg' border transform="shrink-6" />
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCog} size='lg' border transform="shrink-6" />
                        </li>
                    </ul>
                </div>

                <div className="dashboardContainer">
                    <div className="header">
                        <div className="header-left">
                            <form className="searchGrid">
                                <div className='col-1 '>
                                    <input type="text" placeholder="Search Here" style={{ background: "transparent" }} />
                                </div>
                                <div className='col-2'>
                                    <FontAwesomeIcon icon={faSearch} />
                                </div>
                            </form>
                        </div>
                        <div className="header-right">

                        </div>
                    </div>

                    <div className="mainContent">
                        <h2>Dashboard</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
