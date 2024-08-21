import React from "react";
import { Card, Table } from "react-bootstrap";
import './TransectionCard.css';
const TransactionCard = () => {
  const transactions = [
    { category: "Beauty", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
    { category: "Bills & Fees", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
    { category: "Car", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
    { category: "Education", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
    { category: "Entertainment", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
    { category: "Beauty", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
    { category: "Bills & Fees", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
    { category: "Car", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
    { category: "Education", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
    { category: "Entertainment", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
  ];

  return (
    <div className="transectionCard">
    <Card className="cardClass">
      <Card.Title className="transCardTitle">Transaction History</Card.Title>
      <div className="tableWrapper">
      <Table hover variant="dark" className="tablePropertys">
        <thead>
          <tr>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>
                {/* To Add The Category Images*/}
                {transaction.category}
              </td>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.currency}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </Card>
    </div>
  );
};

export default TransactionCard;
