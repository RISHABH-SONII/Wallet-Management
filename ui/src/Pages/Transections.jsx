import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import TransactionCard from "../Components/TransectionCard";
import "./Transections.css";
import { Box, Button } from "@mui/material";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddTransectionWalletComponent from "../Components/AddTransectionWalletComponent";

export default function Transections() {
  const [showAddTransectionComponent, setShowAddTransectionComponent] =
    useState(false);
  let addTransectionComponent = () => {
    setShowAddTransectionComponent(!showAddTransectionComponent);
  };
  return (
    <Layout>
      <Box sx={{ vh: "100%" }}>
        <TransactionCard tableHeight="100%" />
        <Button
          variant="outlined"
          style={{
            fontFamily: "serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "Center",
            color: "#fff",
            backgroundColor: "#1a1a2e",
            marginTop: "20px",
            marginBottom: "20px",
            gap: "10px",
          }}
          fullWidth
          onClick={addTransectionComponent}
        >
          <AddBusinessIcon />
          Add a new transection
        </Button>
        {showAddTransectionComponent && <AddTransectionWalletComponent />}
      </Box>
    </Layout>
  );
}
