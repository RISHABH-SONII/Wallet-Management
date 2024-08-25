import React from "react";
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
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {
  const router = useNavigate();
  const handleSubmit = async (eve) => {
    eve.preventDefault();
    console.log(eve.target[0].value);
    console.log(eve.target[2].value);
    const res = await axios
      .post(
        "https://localhost:7242/api/Users/login",
        {
          password: eve.target[2].value,
          email: eve.target[0].value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "text/plain",
          },
        }
      )
      .then((e) => e);
    if (res.data.statusCode === 200) {
      localStorage.setItem("userData", JSON.stringify(res.data.user));
      sessionStorage.setItem("authToken", res.data.token);
      router("/");
    }
  };
  return (
    <Grid container style={{ minHeight: "100vh", backgroundColor: "#1b1a2f" }}>
      <Grid
        item
        xs={12}
        md={6}
        style={{
          backgroundImage: "url(your-image-url)",
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
          <img
            src="your-logo-url"
            alt="Logo"
            style={{ marginBottom: "20px" }}
          />
          <Typography variant="h4" gutterBottom>
            Welcome to Ekash
          </Typography>
          <Box mt={2}>{/* Add your social media icons here */}</Box>
          <Box mt={2}>
            <Typography variant="body2">
              Have an issue with 2-factor authentication?
            </Typography>
            <Link href="#" color="inherit" variant="body2">
              Privacy Policy
            </Link>
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
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              type="text"
              required
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Link href="#" variant="body2" style={{ float: "right" }}>
              Forgot Password?
            </Link>
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
              <Link href="#" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
