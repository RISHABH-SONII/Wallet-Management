import React from 'react';
import { Card, CardBody, CardFooter, CardTitle, CardText } from 'react-bootstrap';
import './DashboardCard.css';

let DashboardCard = ({ title, amount, footerText, footerIcon }) => {
    return (
        <Card className='dashboard-card'>
            <CardBody>
                <CardTitle className='card-title'>
                    {title}
                </CardTitle>
                <CardText className='card-text'>
                    ${amount}
                </CardText>
            </CardBody>
            <CardFooter className='card-footer'>
                <div>{footerIcon}</div>
                <div>{footerText}</div>
            </CardFooter>
        </Card>
    );
}

export default DashboardCard;