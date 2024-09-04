import React, { useEffect, useState } from "react";
import "./TransectionCard.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

export default function NotificationsComponent({ tableHeight = "100%" }) {
  let userdata = JSON.parse(localStorage.getItem("userData"));
  let [notificationsList, setNotificationsList] = useState([]);

  let fetchNotifications = () => {
    try {
      let userId = userdata.userId;
      axios
        .get(`https://localhost:7242/api/Users/notifications/${userId}`)
        .then((response1) => response1.data)
        .then((finalresponse2) => {
          if (finalresponse2.statusCode === 200) {
            setNotificationsList(finalresponse2.notificationsList);
            localStorage.setItem(
              "NotificationsList",
              JSON.stringify(finalresponse2.notificationsList)
            );
          } else if (finalresponse2.statusCode === 100) {
            toast.info("No Notifications Is Found");
            setNotificationsList([]);
          }
        });
    } catch (error) {
      toast.error("Error fetching transections data:", error);
      setNotificationsList([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <Card
        className="notificationsCard"
        sx={{
          backgroundColor: "#1a1a2e",
          borderRadius: 1,
          color: "#fff",
        }}
      >
        <CardHeader title="Notifications History" />
        <CardContent>
          <TableContainer
            sx={{ maxHeight: tableHeight }}
            component={Paper}
            className="tableWrapper"
          >
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Table
                style={{ backgroundColor: "#1a1a2e", borderRadius: "2px" }}
              >
                <TableHead
                  className="headProperty"
                  style={{ backgroundColor: "#1a1a2e" }}
                >
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>Date</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Message</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notificationsList.map((notification, index) => (
                    <TableRow className="tr" key={index}>
                      <TableCell sx={{ color: "#fff" }}>
                        {notification.createdAt}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {notification.message}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
}
