import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon, LinearProgress, Box } from '@mui/material';
import { Checkroom as CheckroomIcon, DirectionsCar, Pets, School, ShoppingBag } from '@mui/icons-material';
import './BudgetCard.css';

export default function BudgetCard() {
  const budgets = [
    { name: 'Grocery Stores', value: 75, total: 100, color: '#4CAF50', icon: <ShoppingBag /> },
    { name: 'Transportation', value: 25, total: 100, color: '#03A9F4', icon: <DirectionsCar /> },
    { name: 'Pets', value: 50, total: 100, color: '#00BCD4', icon: <Pets /> },
    { name: 'Education', value: 45, total: 100, color: '#673AB7', icon: <School /> },
    { name: 'Clothes', value: 35, total: 100, color: '#9C27B0', icon: <CheckroomIcon/> },
  ];

  return (
    <Card className='budgetCard' sx={{ backgroundColor: '#1F2130', borderRadius: 2, color: '#fff',height:"100%" }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
          Monthly Budgets
        </Typography>
        <List className='listWrapper' style={{marginLeft: "-10px"}}>
          {budgets.map((budget, index) => (
            <ListItem key={index} sx={{ paddingY: 1 }}>
              <ListItemIcon sx={{ color: budget.color }}>
                {budget.icon}
              </ListItemIcon>
              <Box sx={{ flexGrow: 1 }} style={{marginLeft: "-10px"}}>
                <ListItemText style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {budget.name}
                    </Typography>
                  }
                  secondary={
                    <Box style={{marginRight: "10px", display:"flex", alignItems:"center"}} >
                      <Typography variant="body2" sx={{ fontWeight: 'bold', marginRight: 1 }}>
                        {budget.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
                        / {budget.total}
                      </Typography>
                    </Box>
                  }
                />
                <Box mt={1} style={{marginRight:"10px"}}>
                  <LinearProgress
                    variant="determinate"
                    value={(budget.value / budget.total) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: '#424242',
                      '& .MuiLinearProgress-barColorPrimary': {
                        backgroundColor: budget.color,
                      },
                    }}
                  />
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
