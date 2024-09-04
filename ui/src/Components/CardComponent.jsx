import React from "react";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import "./CardComponent.css";

export default function CardComponent({ title, value, subtitle }) {
  return (
    <Card
      className="balanceCard"
      sx={{ backgroundColor: "#1a1a2e", color: "#ffffff", borderRadius: "8px" }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          style={{ color: "cornflowerblue" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" component="div" style={{ color: "gray" }}>
          {value}
        </Typography>
        <Divider
          style={{
            backgroundColor: "white",
            height: "0.5px",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ color: "cornflowerblue" }}
        >
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}
