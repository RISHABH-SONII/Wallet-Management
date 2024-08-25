import React from 'react';
import './TransectionCard.css';
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const TransactionCard = () => {
  const transactions = [
    { category: 'Beauty', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
    { category: 'Bills & Fees', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
    { category: 'Car', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
    { category: 'Education', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
    { category: 'Entertainment', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
    { category: 'Beauty', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
    { category: 'Bills & Fees', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
    { category: 'Car', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
    { category: 'Education', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
    { category: 'Entertainment', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
  
  ];

  return (
    <Card className='transectionCard' sx={{ backgroundColor: '#1F2130', borderRadius: 1, color: '#fff' }}>
      <CardHeader title="Transaction History" /> 
      <CardContent>
        <TableContainer component={Paper} className='tableWrapper'>
          <Table style={{ backgroundColor: '#1F2130', borderRadius: "2px" }}>
            <TableHead className='headProperty'>
              <TableRow>
                <TableCell sx={{ color: '#fff' }}>Category</TableCell>
                <TableCell sx={{ color: '#fff' }}>Date</TableCell>
                <TableCell sx={{ color: '#fff' }}>Description</TableCell>
                <TableCell sx={{ color: '#fff' }}>Amount</TableCell>
                <TableCell sx={{ color: '#fff' }}>Currency</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow className='tr' key={index}>
                  <TableCell sx={{ color: '#fff' }}>{transaction.category}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{transaction.date}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{transaction.description}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{transaction.amount}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{transaction.currency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;


// import React from 'react';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
// } from '@mui/material';

// const TransactionCard = () => {
//   const transactions = [
//     { category: 'Beauty', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
//     { category: 'Bills & Fees', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
//     { category: 'Car', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
//     { category: 'Education', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
//     { category: 'Entertainment', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
//     { category: 'Beauty', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
//     { category: 'Bills & Fees', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
//     { category: 'Car', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
//     { category: 'Education', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
//     { category: 'Entertainment', date: '12.12.2023', description: 'Grocery Items and Beverage soft drinks', amount: '-32.20', currency: 'USD' },
//   ];

//   return (
//     <Card sx={{ backgroundColor: '#1F2130', borderRadius: 2, color: '#fff',height:"100%"}}>
//       <CardHeader title="Transaction History" />
//       <CardContent>
//         <TableContainer component={Paper}>
//           <Table sx={{ backgroundColor: '#1F2130', borderRadius: 2, color: '#fff',height:"100%"}}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Category</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Amount</TableCell>
//                 <TableCell>Currency</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {transactions.map((transaction, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{transaction.category}</TableCell>
//                   <TableCell>{transaction.date}</TableCell>
//                   <TableCell>{transaction.description}</TableCell>
//                   <TableCell>{transaction.amount}</TableCell>
//                   <TableCell>{transaction.currency}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default TransactionCard;


// // import React from "react";
// // import { Card, Table } from "react-bootstrap";
// // import './TransectionCard.css';
// // const TransactionCard = () => {
// //   const transactions = [
// //     { category: "Beauty", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
// //     { category: "Bills & Fees", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
// //     { category: "Car", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
// //     { category: "Education", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
// //     { category: "Entertainment", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
// //     { category: "Beauty", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
// //     { category: "Bills & Fees", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
// //     { category: "Car", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
// //     { category: "Education", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
// //     { category: "Entertainment", date: "12.12.2023", description: "Grocery Items and Beverage soft drinks", amount: "-32.20", currency: "USD" },
// //   ];

// //   return (
// //     <div className="transectionCard">
// //     <Card className="cardClass">
// //       <Card.Title className="transCardTitle">Transaction History</Card.Title>
// //       <div className="tableWrapper">
// //       <Table hover variant="dark" className="tablePropertys">
// //         <thead>
// //           <tr>
// //             <th>Category</th>
// //             <th>Date</th>
// //             <th>Description</th>
// //             <th>Amount</th>
// //             <th>Currency</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {transactions.map((transaction, index) => (
// //             <tr key={index}>
// //               <td>
// //                 {/* To Add The Category Images*/}
// //                 {transaction.category}
// //               </td>
// //               <td>{transaction.date}</td>
// //               <td>{transaction.description}</td>
// //               <td>{transaction.amount}</td>
// //               <td>{transaction.currency}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </Table>
// //       </div>
// //     </Card>
// //     </div>
// //   );
// // };

// // export default TransactionCard;
