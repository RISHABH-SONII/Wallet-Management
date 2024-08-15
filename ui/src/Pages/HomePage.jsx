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

//         <div className='window'>
//             <div className="division1 ">
//                 <div className="logo">
//                     <img src='ecash.png' />
//                 </div>

//                 <div className="home-icon">
//                     <FontAwesomeIcon icon={faHome} />
//                     <div className='p'>Home</div>
//                 </div>

//                 <div className="user-icon">
//                     <FontAwesomeIcon icon={faUser} />
//                     <div className='p'>Profile</div>
//                 </div>


//                 <div className="wallet-icon">
//                     <FontAwesomeIcon icon={faWallet} />
//                     <div className='p'>Wallet</div>
//                 </div>

//                 <div className="bell-icon">
//                     <FontAwesomeIcon icon={faBell} />
//                     <div className='p'>Notifications</div>
//                 </div>

//                 <div className="chart-icon">
//                     <FontAwesomeIcon icon={faChartLine} />
//                     <div className='p'>Analytics</div>
//                 </div>

//                 <div className="settings-icon">
//                     <FontAwesomeIcon icon={faCog} />
//                     <div className='p'>Settings</div>
//                 </div>

//             </div>
//             <div className='division2'>
//                 <header>
//                     <div className='left-header'>
//                         <form>
//                             <input className='search-input' placeholder='Search here'></input>
//                             <button className='search-button'><FontAwesomeIcon icon={faSearch}/></button>
//                         </form>
//                     </div>

//                     <div className='right-header'>
//                         <div className='notification-icon'><FontAwesomeIcon icon={faBell}/></div>
//                         <div className='user-profile-icon'><FontAwesomeIcon icon={faUser}/></div>
//                     </div>
//                 </header>

//                 <div className='tittle'>
//                     <h4>Dashboard</h4>
//                 </div>

//                 <div className='body'>
//                     <Card className='boxproperty'>
//                         <CardBody>
//                             <CardTitle>
//                             Total Balance
//                             </CardTitle>
//                             <CardText>
//                             $ 432568
//                             </CardText>
//                         </CardBody>
//                     </Card>
//                     <Card className='boxproperty'>
//                         <CardBody>
//                             <CardTitle>
//                             Total Balance
//                             </CardTitle>
//                             <CardText>
//                             $ 432568
//                             </CardText>
//                         </CardBody>
//                     </Card>
//                     <Card className='boxproperty'>
//                         <CardBody>
//                             <CardTitle>
//                             Total Balance
//                             </CardTitle>
//                             <CardText>
//                             $ 432568
//                             </CardText>
//                         </CardBody>
//                     </Card>
//                     <Card className='boxproperty'>
//                         <CardBody>
//                             <CardTitle>
//                             Total Balance
//                             </CardTitle>
//                             <CardText>
//                             $ 432568
//                             </CardText>
//                         </CardBody>
//                     </Card>
                    
//                 </div>
//             </div>
//         </div>
//     )
// }