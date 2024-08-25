import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
} from "@mui/material";
import "./UserProfile.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export default function SampleProfile() {
  const transactions = [
    { category: "Grocery Store", amount: "$50.00", date: "12/08/2024" },
    { category: "Online Subscription", amount: "$15.00", date: "11/08/2024" },
  ];

  const activities = [
    { description: "Added a new payment method", date: "12/08/2024" },
    { description: "Changed account password", date: "11/08/2024" },
  ];

  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <Container maxWidth="lg" sx={{ mt: "45px" }}>
      <Box
        sx={{
          flexGrow: 1,
          pl: 3,
          pr: 3,
          backgroundColor: "#14172B",
          color: "#fff",
          paddingBottom: "20px",
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
              Profile
            </Typography>
            <small style={{ marginTop: "-5px" }}>
              Welcome To E-Cash Finance Management
            </small>
          </Box>
          <Typography variant="subtitle1" gutterBottom>
            Home <KeyboardDoubleArrowRightIcon /> Profile
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {/* Profile Header */}
          <Grid item xs={12}>
            <Card
              className="mycard"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#1F2130",
                color: "#fff",
                padding: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box display={"flex"} alignItems={"center"}>
                <Avatar
                  sx={{ width: 100, height: 100, marginRight: "20px" }}
                  src="profile-pic-url.jpg"
                />
                <Box>
                  <Typography variant="h4">
                    {userData.firstName} {userData.lastName}
                  </Typography>
                  <Typography variant="body1" color="#fff">
                    {userData.email}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Button variant="contained" sx={{ marginTop: "10px" }}>
                  Edit Profile
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* Wallet Overview */}
          <Grid item xs={12} md={6}>
            <Card
              className="mycard"
              sx={{
                backgroundColor: "#1F2130",
                color: "#fff",
                padding: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6">Wallet Balance</Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  $1,234.56
                </Typography>
                <Divider
                  sx={{ margin: "20px 0px", backgroundColor: "white" }}
                />
                <Typography variant="h6">Recent Transactions</Typography>
                <List>
                  {transactions.map((transaction, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${transaction.category} - ${transaction.amount}`}
                        secondary={transaction.date}
                        secondaryTypographyProps={{
                          style: { color: "gray", fontFamily: "serif" },
                        }}
                        style={{ color: "#ffffff" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* User Activity Overview */}
          <Grid item xs={12} md={6}>
            <Card
              className="mycard"
              sx={{
                height: "374.81px",
                backgroundColor: "#1F2130",
                color: "#fff",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6">User Activity</Typography>
                <Divider
                  sx={{ margin: "10px 0px", backgroundColor: "white" }}
                />
                <List>
                  {activities.map((activity, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={activity.description}
                        secondary={activity.date}
                        secondaryTypographyProps={{
                          style: { color: "gray", fontFamily: "serif" },
                        }}
                        style={{ color: "#ffffff" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Settings */}
          <Grid item xs={12} md={6}>
            <Card
              className="mycard"
              sx={{
                backgroundColor: "#1F2130",
                color: "#fff",
                padding: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6">Settings</Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Button
                    variant="outlined"
                    sx={{ marginTop: "10px", display: "block" }}
                  >
                    Security Settings
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ marginTop: "10px", display: "block" }}
                  >
                    Payment Methods
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Support */}
          <Grid item xs={12} md={6}>
            <Card
              className="mycard"
              sx={{
                backgroundColor: "#1F2130",
                color: "#fff",
                padding: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6">Support</Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Button variant="outlined" sx={{ marginTop: "10px" }}>
                    Help Center
                  </Button>
                  <Button variant="outlined" sx={{ marginTop: "10px" }}>
                    FeedBack
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
