import React, { useState } from "react";
import "./SignUpComponent.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function SignUpComponent() {
  let [signUpFormData, setsignUpFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  let getvalue = (event) => {
    let oldData = { ...signUpFormData };
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setsignUpFormData(oldData);
  };
  let handleSubmit = (event) => {
    event.preventDefault();
    let currentUserFormData = {
      firstName: signUpFormData.firstName,
      lastName: signUpFormData.lastName,
      email: signUpFormData.email,
      password: signUpFormData.password,
    };
    console.log(currentUserFormData);
    axios
      .post(
        "https://localhost:7242/api/Users/registration",
        currentUserFormData
      )
      .then((response) => response.data)
      .then((finalresponse) => {
        if (finalresponse.statusCode === 200) {
          router("/login"); // redirect to the dashboard page
        }
        if (finalresponse.statusCode === 100) {
          toast.error(finalresponse.statusMessage);
        }
      });
  };
  const router = useNavigate();
  const handleLoginClick = (eve) => {
    eve.preventDefault();
    console.log("function called");
    router("/login"); // Redirect to the signup page
  };

  return (
    <Grid container style={{ minHeight: "100vh", backgroundColor: "#1b1a2f" }}>
      <ToastContainer />
      <Grid
        item
        xs={12}
        md={6}
        style={{
          backgroundImage: "url()",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          color="white"
          p={4}
        >
          <Box className="appLogo" sx={{ marginBottom: "20px" }}>
            <img
              src="logo1.png"
              alt="Logo"
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                boxShadow: "0px 0px 10px 2px lightblue",
              }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: "serif",
              fontStyle: "oblique",
              color: "lightblue",
            }}
            variant="h4"
            gutterBottom
          >
            Welcome To E-Cash Wallet Management
          </Typography>
          <Box mt={2}>{/* Add your social media icons here */}</Box>
          <Box mt={2}>
            <Typography
              sx={{
                fontFamily: "serif",
                marginTop: "-35px",
                color: "lightblue",
              }}
              variant="body2"
            >
              A small approach to manage the wallets
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        style={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box p={4} width="80%">
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="firstName"
              label="FirstName"
              type="text"
              required
              onChange={getvalue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="lastName"
              label="LastName"
              type="text"
              required
              onChange={getvalue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="email"
              label="Email"
              type="email"
              required
              onChange={getvalue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              type="text"
              required
              onChange={getvalue}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Sign In
            </Button>
            <Box mt={2} textAlign="center">
              <Link href="#" onClick={handleLoginClick} variant="body2">
                Have an account? Login
              </Link>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
