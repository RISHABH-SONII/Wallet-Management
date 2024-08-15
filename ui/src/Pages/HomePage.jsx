import React from 'react'
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChartBar, faChartLine, faCircleInfo, faCog, faHome, faSearch, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import Header from '../Common/Header';

export default function HomePage() {
    return (
        <div>
            <Header/>
            <h1>Home Page</h1>
        </div>
    )
}
