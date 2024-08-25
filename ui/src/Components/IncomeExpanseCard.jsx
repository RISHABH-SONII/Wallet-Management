import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, Typography } from '@mui/material';
import './IncomeExpanseCard.css';

// Register the required components with Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  datasets: [
    {
      label: 'Income',
      data: [3, 2, 2, 6, 4, 5, 7, 8, 5, 4],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    {
      label: 'Expenses',
      data: [2, 3, 4, 3, 5, 2, 6, 7, 8, 6],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Monthly Income vs Expenses',
    },
  },
};

function IncomeVsExpensesChart() {
  return (
    <Card className='incomeexpansecard' sx={{ bgcolor: '#1F2130', color: 'white', height: '100%' }}>
        <CardContent>
            <Typography variant="h6" gutterBottom>
                Monthly Income vs Expenses
            </Typography>
            <Bar data={data} options={options} />
        </CardContent>
    </Card>
  )
}
            

export default IncomeVsExpensesChart;
