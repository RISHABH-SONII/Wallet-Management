import React from "react";
import { Grid, Typography, Box, Container } from "@mui/material";
import CardComponent from "./CardComponent";
import ChartComponent from "./ChartComponent";
import BudgetCard from "./BudgetCard";
import IncomeExpensesCard from "./IncomeExpanseCard";
import TransactionCard from "./TransectionCard";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export default function DashboardComponent() {
  let TotalBalance = JSON.parse(localStorage.getItem("TotalWalletBalance"));
  let TotalIncome = JSON.parse(localStorage.getItem("TotalIncome"));
  let TotalExpanse = JSON.parse(localStorage.getItem("TotalExpanse"));
  return (
    <Container sx={{ mt: "45px" }}>
      <Box
        sx={{
          flexGrow: 1,
          pl: 3,
          pr: 3,
          backgroundColor: "#14172B",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            pb: 5,
            color: "lightblue",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Dashboard
            </Typography>
            <small style={{ marginTop: "-5px" }}>
              Welcome To E-Cash Finance Management
            </small>
          </Box>
          <Typography variant="subtitle1" gutterBottom>
            Home <KeyboardDoubleArrowRightIcon /> Dashboard
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CardComponent
              title="Total Balance"
              value={`$ ${TotalBalance}`}
              subtitle="Last Updated"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardComponent
              title="Total Income"
              value={`$ ${TotalIncome}`}
              subtitle="Last Updated"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardComponent
              title="Total Expanse"
              value={`$ ${TotalExpanse}`}
              subtitle="Last Updated"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <ChartComponent />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={4}>
            <BudgetCard />
          </Grid>
          <Grid item xs={12} md={8}>
            <IncomeExpensesCard />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 3, mb: 3 }}>
          <Grid item xs={12}>
            <TransactionCard tableHeight="500px" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
