import React, { useState } from "react";
import "./LoginComponent.css";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import SignUpComponent from "./SignUpComponent";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function LoginComponent() {
  let [loginFormData, setloginFormData] = useState({
    email: "",
    password: "",
  });
  let getvalue = (event) => {
    let oldData = { ...loginFormData };
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setloginFormData(oldData);
  };
  let handleSubmit = (event) => {
    event.preventDefault();
    let currentUserFormData = {
      email: loginFormData.email,
      password: loginFormData.password,
    };
    axios
      .post("https://localhost:7242/api/Users/login", currentUserFormData)
      .then((response) => response.data)
      .then((finalresponse) => {
        if (finalresponse.statusCode === 200) {
          console.log(finalresponse.user);
          localStorage.setItem("userData", JSON.stringify(finalresponse.user));
          sessionStorage.setItem("authToken", finalresponse.token);
          router("/"); // redirect to the dashboard page
        }
        if (finalresponse.statusCode === 100) {
          toast.error(finalresponse.statusMessage);
        }
      });
  };
  const router = useNavigate();
  const handleSignUpClick = (eve) => {
    eve.preventDefault();
    console.log("function called");
    router("/signup"); // Redirect to the signup page
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
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
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
              <Link href="#" onClick={handleSignUpClick} variant="body2">
                Don't have an account? Sign up
              </Link>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
