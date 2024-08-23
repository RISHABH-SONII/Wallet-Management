import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Balance Trends',
        data: [150, 200, 180, 220, 240, 260],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
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
        text: 'Balance Trends',
      },
    },
  };

  return (
    <Card sx={{ backgroundColor: '#1F2130', color: '#ffffff' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Balance Trends
        </Typography>
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
}

export default ChartComponent;
