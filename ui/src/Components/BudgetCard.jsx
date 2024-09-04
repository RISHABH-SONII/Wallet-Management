import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Box,
} from "@mui/material";
import {
  Checkroom as CheckroomIcon,
  DirectionsCar,
  Pets,
  School,
  ShoppingBag,
} from "@mui/icons-material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SavingsIcon from "@mui/icons-material/Savings";
import ShopIcon from "@mui/icons-material/Shop";
import "./BudgetCard.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function BudgetCard() {
  let userdata = JSON.parse(localStorage.getItem("userData"));
  let [categoryList, setCategoryList] = useState([]);
  console.log(categoryList);
  let fetchCategory = () => {
    try {
      let userId = userdata.userId;
      axios
        .get(`https://localhost:7242/api/Users/category/${userId}`)
        .then((response1) => response1.data)
        .then((finalresponse2) => {
          console.log(finalresponse2);
          if (finalresponse2.statusCode === 200) {
            setCategoryList(finalresponse2.categoryList);
            console.log(categoryList);
          } else if (finalresponse2.statusCode === 100) {
            toast.info("No Category Is Found");
            setCategoryList([]);
          }
        });
    } catch (error) {
      toast.error("Error fetching transections data:", error);
      setCategoryList([]);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  let [FormattedBudgets, setFormattedBudgets] = useState([]);

  useEffect(() => {
    const formattedData = categoryList.map((item) => {
      let icon;
      let categoryColor;

      switch (item.categoryType) {
        case "Grocery":
          icon = <ShoppingBag />;
          categoryColor = "#4CAF50";
          break;
        case "Bills":
          icon = <AttachMoneyIcon />;
          categoryColor = "gray";
          break;
        case "Transportation":
          icon = <DirectionsCar />;
          categoryColor = "#03A9F4";
          break;
        case "Education":
          icon = <School />;
          categoryColor = "#673AB7";
          break;
        case "Entertainment":
          icon = <SportsEsportsIcon />;
          categoryColor = "#C40F35";
          break;
        case "Clothes":
          icon = <CheckroomIcon />;
          categoryColor = "#9C27B0";
          break;
        case "InvestMent":
          icon = <SavingsIcon />;
          categoryColor = "#ECD12D";
          break;
        case "Personal":
          icon = <ShopIcon />;
          categoryColor = "#53174D";
          break;
        default:
          icon = null;
          categoryColor = "gray";
      }

      return {
        name: item.categoryType,
        value: item.value,
        total: item.totalBudget,
        color: categoryColor,
        icon: icon,
      };
    });

    setFormattedBudgets(formattedData);
  }, [categoryList]);

  return (
    <Card
      className="budgetCard"
      sx={{
        backgroundColor: "#1a1a2e",
        borderRadius: 2,
        color: "#fff",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
          Monthly Budgets
        </Typography>
        <List className="listWrapper" style={{ marginLeft: "-10px" }}>
          {FormattedBudgets.map((budget, index) => (
            <ListItem key={index} sx={{ paddingY: 1 }}>
              <ListItemIcon sx={{ color: budget.color }}>
                {budget.icon}
              </ListItemIcon>
              <Box sx={{ flexGrow: 1 }} style={{ marginLeft: "-10px" }}>
                <ListItemText
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {budget.name}
                    </Typography>
                  }
                  secondary={
                    <Box
                      style={{
                        marginRight: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", marginRight: 1 }}
                      >
                        {budget.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#9E9E9E" }}>
                        / {budget.total}
                      </Typography>
                    </Box>
                  }
                />
                <Box mt={1} style={{ marginRight: "10px" }}>
                  <LinearProgress
                    variant="determinate"
                    value={(budget.value / budget.total) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: "#424242",
                      "& .MuiLinearProgress-barColorPrimary": {
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
