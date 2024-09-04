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
  Typography,
  Box,
  Container,
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import EditTransactionWalletComponent from "./EditTransactionWalletComponent";

export default function TransactionCard({ tableHeight = "100%" }) {
  let userdata = JSON.parse(localStorage.getItem("userData"));
  let [transectionList, setTransectionList] = useState([]);
  let [showEditTransectionComponent, setShowEditTransectionComponent] =
    useState(false);
  let [editTransactionIDContainer, setEditTransactionIDContainer] = useState(0);

  let editComponent = (transactionID) => {
    setShowEditTransectionComponent(!showEditTransectionComponent);
    setEditTransactionIDContainer(transactionID);
  };

  let fetchTransections = () => {
    try {
      let userId = userdata.userId;
      axios
        .get(`https://localhost:7242/api/Users/showTransectionsList/${userId}`)
        .then((response1) => response1.data)
        .then((finalresponse2) => {
          console.log(finalresponse2);
          if (finalresponse2.statusCode === 200) {
            setTransectionList(finalresponse2.listTransections);
            console.log(transectionList);
          } else if (finalresponse2.statusCode === 100) {
            toast.info("No Transection Is Created");
            setTransectionList([]);
          }
        });
    } catch (error) {
      toast.error("Error fetching transections data:", error);
      setTransectionList([]);
    }
  };

  useEffect(() => {
    fetchTransections();
  }, []);

  return (
    <>
      {/* Add New Transection Model */}
      {showEditTransectionComponent && (
        <EditTransactionWalletComponent
          transactionID={editTransactionIDContainer}
        />
      )}

      <Card
        className="transectionCard"
        sx={{ backgroundColor: "#1a1a2e", borderRadius: 1, color: "#fff" }}
      >
        <CardHeader title="Transaction History" />
        <CardContent>
          <TableContainer
            sx={{ maxHeight: tableHeight }}
            component={Paper}
            className="tableWrapper"
          >
            <Table style={{ backgroundColor: "#1a1a2e", borderRadius: "2px" }}>
              <TableHead
                className="headProperty"
                style={{ backgroundColor: "#1a1a2e" }}
              >
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>Category</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Date</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Wallet Name</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Description</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Amount</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Transection Type</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Edit</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transectionList.map((transaction, index) => (
                  <TableRow className="tr" key={index}>
                    <TableCell sx={{ color: "#fff" }}>
                      {transaction.categoryType}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {transaction.transactionDate}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {transaction.walletType}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {transaction.description}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {transaction.amount}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {transaction.transactionType}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                      }}
                    >
                      <Button
                        sx={{
                          alignItems: "center",
                          justifyContent: "start",
                        }}
                        onClick={() => editComponent(transaction.transactionID)}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                      }}
                    >
                      <Button
                        sx={{
                          color: "red",
                          right: 2,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
}
