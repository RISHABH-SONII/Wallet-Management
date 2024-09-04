import React, { useState } from "react";
import {
  Typography,
  Box,
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
  Modal,
  TextField,
} from "@mui/material";
import "./UserProfile.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function SampleProfile() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  let [formdata, setformdata] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: userData.password,
    email: userData.email,
  });

  let getvalue = (event) => {
    let oldData = { ...formdata };
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setformdata(oldData);
  };
  let handleEditProfile = (event) => {
    event.preventDefault();
    setOpenForm(!openForm);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    let UpdatedFormData = {
      userID: userData.userId,
      firstName: formdata.firstName,
      lastName: formdata.lastName,
      password: formdata.password,
      email: formdata.email,
    };
    axios
      .post("https://localhost:7242/api/Users/editUser", UpdatedFormData)
      .then((response) => response.data)
      .then((finalresponse) => {
        if (finalresponse.statusCode === 200) {
          axios
            .post(
              `https://localhost:7242/api/Users/viewUser/${userData.userId}`
            )
            .then((responseTwo) => responseTwo.data)
            .then((finalresponseTwo) => {
              toast.success("User Profile Updated Successfully.");
              localStorage.setItem(
                "userData",
                JSON.stringify(finalresponseTwo.user)
              );
            });
        } else {
          toast.error(finalresponse.statusMessage);
        }
      });
  };

  const transactions = [
    { category: "Grocery Store", amount: "$50.00", date: "12/08/2024" },
    { category: "Online Subscription", amount: "$15.00", date: "11/08/2024" },
  ];

  const activities = [
    { description: "Added a new payment method", date: "12/08/2024" },
    { description: "Changed account password", date: "11/08/2024" },
  ];

  let [openForm, setOpenForm] = useState(false);
  return (
    <Container maxWidth="lg" sx={{ mt: "45px" }}>
      <ToastContainer />
      <Modal open={openForm} onClose={handleEditProfile}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "transparent",
            border: "0.1 px solid #000",
            boxShadow: 24,
            p: 2,
            borderRadius: 5,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              width: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              backgroundColor: "#14172B",
              padding: "20px",
              borderRadius: "25px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "90px",
              }}
            >
              <h4 style={{ marginRight: "10px", color: "blue" }}>
                Register Yourself
              </h4>
              <Button
                style={{ marginLeft: "10px" }}
                onClick={handleEditProfile}
              >
                <CloseIcon />
              </Button>
            </Box>
            <TextField
              placeholder="FirstName*"
              variant="outlined"
              name="firstName"
              value={formdata.firstName}
              onChange={getvalue}
              required
              sx={{ input: { color: "#fff" }, label: { color: "#ccc" } }}
            />
            <TextField
              placeholder="LastName*"
              variant="outlined"
              name="lastName"
              value={formdata.lastName}
              onChange={getvalue}
              required
              sx={{ input: { color: "#fff" }, label: { color: "#ccc" } }}
            />
            <TextField
              placeholder="Email*"
              variant="outlined"
              name="email"
              value={formdata.email}
              onChange={getvalue}
              required
              sx={{ input: { color: "#fff" }, label: { color: "#ccc" } }}
            />
            <TextField
              placeholder="Password*"
              variant="outlined"
              name="password"
              value={formdata.password}
              onChange={getvalue}
              required
              sx={{ input: { color: "#fff" }, label: { color: "#ccc" } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </form>
        </Box>
      </Modal>
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
                backgroundColor: "#1a1a2e",
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
                <Button
                  onClick={handleEditProfile}
                  variant="contained"
                  sx={{ marginTop: "10px" }}
                >
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
                backgroundColor: "#1a1a2e",
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
                backgroundColor: "#1a1a2e",
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
                backgroundColor: "#1a1a2e",
                color: "#fff",
                padding: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6">Settings</Typography>
                <Divider
                  sx={{ margin: "10px 0px", backgroundColor: "white" }}
                />
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Button
                    variant="outlined"
                    sx={{ marginTop: "20px", display: "block" }}
                  >
                    Security Settings
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ marginTop: "20px", display: "block" }}
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
                backgroundColor: "#1a1a2e",
                color: "#fff",
                padding: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6">Support</Typography>
                <Divider
                  sx={{ margin: "10px 0px", backgroundColor: "white" }}
                />
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Button variant="outlined" sx={{ marginTop: "20px" }}>
                    Help Center
                  </Button>
                  <Button variant="outlined" sx={{ marginTop: "20px" }}>
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
