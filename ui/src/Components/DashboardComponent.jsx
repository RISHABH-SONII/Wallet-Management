import React from 'react';
import { Grid, Typography, Box, Container } from '@mui/material';
import CardComponent from './CardComponent';
import ChartComponent from './ChartComponent';

export default function DashboardComponent() {
  return (
    <Container maxWidth="lg" sx={{ mt:'25px' }}>
    <Box sx={{ flexGrow: 1,pl:3,pr:3, backgroundColor: '#14172B', color: '#fff' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <CardComponent title="Total Balance" value="$432,568" subtitle="2.47% Last month $24,478" />
        </Grid>
        {/* Repeat for other cards */}
      </Grid>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <ChartComponent />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardComponent title="Monthly Expenses Breakdown" content="Breakdown here" />
        </Grid>
      </Grid>
    </Box>
    </Container>
  )
}