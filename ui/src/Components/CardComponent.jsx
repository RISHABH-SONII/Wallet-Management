import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function CardComponent({ title, value, subtitle }) {
  return (
    <Card sx={{ backgroundColor: '#1F2130', color: '#ffffff' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}
