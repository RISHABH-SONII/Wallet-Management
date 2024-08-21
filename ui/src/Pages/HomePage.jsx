import React from 'react'
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faArrowDown, faArrowUp, faBell, faChartBar, faChartLine, faCircleInfo, faCog, faHome, faSearch, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Card, Form, InputGroup } from 'react-bootstrap';
import Header from '../Components/Layout/Header';
import Footer from '../Components/Layout/Footer';
import DashboardCard from '../Components/DashboardCard';
import TransactionCard from '../Components/TransectionCard';
import BudgetCard from '../Components/BudgetCard';
import Layout from '../Components/Layout/Layout';

export default function HomePage() {
    return (
        <Layout>
            <div className='bodydiv'>
                <div className='body-panel-1'>
                    <h4>Dashboard</h4>
                    <form className='formClass'>
                        <input className='formInput' type='text' placeholder='Search here...' />
                        <button className='formButton'><FontAwesomeIcon icon={faSearch} /></button>
                    </form>
                    <div className='pageName'>
                        <p>Home</p>
                        <p><FontAwesomeIcon icon={faAnglesRight}/></p>
                        <p>Dashboard</p>
                    </div>
                </div>

                <div className='body-panel-2'>

                    <DashboardCard
                        title="Total Balance"
                        amount="432568"
                        footerText="2.47% Last month $24,485"
                        footerIcon={<FontAwesomeIcon icon={faArrowUp} style={{ color: 'green' }} />}
                    />

                    <DashboardCard
                        title="Total Period Change"
                        amount="245860"
                        footerText="2.47% Last month $24,478"
                        footerIcon={<FontAwesomeIcon icon={faArrowUp} style={{ color: 'green' }} />}
                    />
                    <DashboardCard
                        title="Total Period Expenses"
                        amount="25.35"
                        footerText="2.47% Last month $24,478"
                        footerIcon={<FontAwesomeIcon icon={faArrowDown} style={{ color: 'red' }} />}
                    />
                    <DashboardCard
                        title="Total Period Income"
                        amount="22.56"
                        footerText="2.47% Last month $24,478"
                        footerIcon={<FontAwesomeIcon icon={faArrowUp} style={{ color: 'green' }} />}
                    />

                </div>

                <div className='body-panel-3'>
                    <BudgetCard/>
                    <TransactionCard/>
                </div>

                <div className='body-panel-4'>
                <Card>
            <Card.Body>
              <Card.Title>Monthly Income vs Expenses</Card.Title>
              {/* Replace with your chart component */}
              <div className="chart-placeholder">
                {/* Example of where your chart would go */}
                <p>Chart goes here</p>
              </div>
            </Card.Body>
          </Card>
                </div>
            </div>
        </Layout>
    )
}
