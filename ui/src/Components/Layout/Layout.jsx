import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const router = useNavigate();
  useEffect(() => {
    const userId = sessionStorage.getItem("authToken");
    console.log(userId);
    if (!userId) {
      router("/login");
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // height: "100vh",
          // maxWidth: "100vw",
        }}
      >
        <Header />
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Sidebar />
          <Box
            component="main"
            sx={{ flexGrow: 1, ml: "215px", backgroundColor: "#14172B" }}
          >
            {" "}
            {/* Adjust ml and mt based on sidebar width and header height */}
            <div>{children}</div>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};
export default Layout;
