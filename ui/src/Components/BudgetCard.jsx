import { faBus, faGraduationCap, faLeaf, faPaw, faTshirt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Card, ProgressBar } from 'react-bootstrap'
import './BudgetCard.css';

export default function   
() {
  return (
    <div className='budgetCarddiv'>
        <Card className="budgetCard">
            <Card.Body>
              <Card.Title className='title'>Monthly Budgets</Card.Title>
              <div className="listWrapper">
              <div className="budget-item">
                <FontAwesomeIcon icon={faLeaf} className="icon" />
                <span>Grocery Stores</span>
                <ProgressBar className='progressBar' now={75} max={100} label="75/100" />
              </div>

              <div className="budget-item">
                <FontAwesomeIcon icon={faBus} className="icon" />
                <span>Transportation</span>
                <ProgressBar className='progressBar' now={25} max={100} label="25/100" />
              </div>

              <div className="budget-item">
                <FontAwesomeIcon icon={faPaw} className="icon" />
                <span>Pets</span>
                <ProgressBar className='progressBar' now={50} max={100} label="50/100" />
              </div>
              <div className="budget-item">
                <FontAwesomeIcon icon={faGraduationCap} className="icon" />
                <span>Education</span>
                <ProgressBar className='progressBar' now={45} max={100} label="45/100" />
              </div>
              <div className="budget-item">
                <FontAwesomeIcon icon={faTshirt} className="icon" />
                <span>Clothes</span>
                <ProgressBar className='progressBar' now={35} max={100} label="35/100" />
              </div>
              <div className="budget-item">
                <FontAwesomeIcon icon={faLeaf} className="icon" />
                <span>Grocery Stores</span>
                <ProgressBar className='progressBar' now={75} max={100} label="75/100" />
              </div>

              <div className="budget-item">
                <FontAwesomeIcon icon={faBus} className="icon" />
                <span>Transportation</span>
                <ProgressBar className='progressBar' now={25} max={100} label="25/100" />
              </div>

              <div className="budget-item">
                <FontAwesomeIcon icon={faPaw} className="icon" />
                <span>Pets</span>
                <ProgressBar className='progressBar' now={50} max={100} label="50/100" />
              </div>
              <div className="budget-item">
                <FontAwesomeIcon icon={faGraduationCap} className="icon" />
                <span>Education</span>
                <ProgressBar className='progressBar' now={45} max={100} label="45/100" />
              </div>
              <div className="budget-item">
                <FontAwesomeIcon icon={faTshirt} className="icon" />
                <span>Clothes</span>
                <ProgressBar className='progressBar' now={35} max={100} label="35/100" />
              </div>
              </div>
            </Card.Body>
          </Card>
    </div>
  )
}
