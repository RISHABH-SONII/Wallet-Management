import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./WalletComponent.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddWalletComponent from "./AddWalletComponent";
import EditWalletComponent from "./EditWalletComponent";
import AddTransectionWalletComponent from "./AddTransectionWalletComponent";
import DeleteWalletComponent from "./DeleteWalletComponent";
import NotificationsComponent from "./NotificationsComponent";

export default function WalletComponent() {
  let userdata = JSON.parse(localStorage.getItem("userData"));
  let [wallets, setWallets] = useState([]); // To fetch all wallets of user.

  const [showAddComponent, setShowAddComponent] = useState(false);
  const [showEditComponent, setShowEditComponent] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [editWalletIDContainer, setEditWalletIDContainer] = useState(0);
  const [deleteWalletIDContainer, setDeleteWalletIDContainer] = useState(0);

  const [showAddTransectionComponent, setShowAddTransectionComponent] =
    useState(false);

  // calculates the toatal amount by the prided response listitems
  let [totalBalance, setTotalBalance] = useState(0);
  let findTotalBalance = (finalresponse) => {
    console.log(finalresponse);
    let TotalBalance = finalresponse.listWallets
      .map((wallet) => wallet.initialBalance)
      .reduce((total, current) => total + current, 0);
    setTotalBalance(TotalBalance);
    localStorage.setItem("TotalWalletBalance", JSON.stringify(TotalBalance));
  };

  let fetchWallets = () => {
    try {
      let userId = userdata.userId;
      axios
        .get(`https://localhost:7242/api/Users/showWalletsList/${userId}`)
        .then((response1) => response1.data)
        .then((finalresponse2) => {
          if (finalresponse2.statusCode === 200) {
            setWallets(finalresponse2.listWallets);
            findTotalBalance(finalresponse2);
          } else if (finalresponse2.statusCode === 100) {
            toast.info("No Wallets Is Created");
            setWallets([]);
          }
        });
    } catch (error) {
      toast.error("Error fetching wallet data:", error);
      setWallets([]);
    }
  };

  let [creditTransactionsList, setCreditTransactionsList] = useState([]);
  let [totalIncome, setTotalIncome] = useState(0);
  let findTotalIncome = (finalresponse2) => {
    let TotalIncome = finalresponse2.incomeList
      .map((income) => income.amount)
      .reduce((total, current) => total + current, 0);
    setTotalIncome(TotalIncome);
    localStorage.setItem("TotalIncome", JSON.stringify(TotalIncome));
  };
  let fetchCreditTransactions = () => {
    try {
      let userId = userdata.userId;
      axios
        .get(`https://localhost:7242/api/Users/income/${userId}`)
        .then((response1) => response1.data)
        .then((finalresponse2) => {
          console.log(finalresponse2);
          if (finalresponse2.statusCode === 200) {
            setCreditTransactionsList(finalresponse2.incomeList);
            findTotalIncome(finalresponse2);
          } else if (finalresponse2.statusCode === 100) {
            toast.info(finalresponse2.statusMessage);
            setCreditTransactionsList([]);
          }
        });
    } catch (error) {
      toast.error("Error fetching transections data:", error);
      setCreditTransactionsList([]);
    }
  };

  let [debitTransactionsList, setDebitTransactionsList] = useState([]);
  let [totalExpanse, setTotalExpanse] = useState(0);
  let findTotalExpanse = (finalresponse2) => {
    let TotalExpanse = finalresponse2.expanseList
      .map((expanse) => expanse.amount)
      .reduce((total, current) => total + current, 0);
    setTotalExpanse(TotalExpanse);
    localStorage.setItem("TotalExpanse", JSON.stringify(TotalExpanse));
  };

  let fetchDebitTransactions = () => {
    try {
      let userId = userdata.userId;
      axios
        .get(`https://localhost:7242/api/Users/expanse/${userId}`)
        .then((response1) => response1.data)
        .then((finalresponse2) => {
          console.log(finalresponse2);
          if (finalresponse2.statusCode === 200) {
            setDebitTransactionsList(finalresponse2.expanseList);
            findTotalExpanse(finalresponse2);
          } else if (finalresponse2.statusCode === 100) {
            toast.info(finalresponse2.statusMessage);
            setCreditTransactionsList([]);
          }
        });
    } catch (error) {
      toast.error("Error fetching transections data:", error);
      setCreditTransactionsList([]);
    }
  };

  let addNewWalletComponent = () => {
    setShowAddComponent(!showAddComponent); // Update state to show the component
  };

  let editComponent = (walletID) => {
    setShowEditComponent(!showEditComponent);
    setEditWalletIDContainer(walletID);
  };

  let deleteComponent = (walletID) => {
    setShowDeleteComponent(!showDeleteComponent);
    setDeleteWalletIDContainer(walletID);
  };

  let addNewTransectionComponent = () => {
    setShowAddTransectionComponent(!showAddTransectionComponent);
  };
  useEffect(() => {
    fetchWallets();
    fetchCreditTransactions();
    fetchDebitTransactions();
  }, []);

  const notifications = [
    { date: "2024-08-25", message: "Your balance has increased by 2%" },
    { date: "2024-08-24", message: "Monthly report is available" },
    // Add more notifications as needed
  ];

  return (
    <Box>
      {/* only open when warnign is set to be true */}

      {/* Add New Wallet Model */}
      {showAddComponent && <AddWalletComponent />}

      {/* Edit Wallet Model */}
      {showEditComponent && (
        <EditWalletComponent walletID={editWalletIDContainer} />
      )}

      {showDeleteComponent && (
        <DeleteWalletComponent walletID={setDeleteWalletIDContainer} />
      )}

      {/* Add New Transection Model */}
      {showAddTransectionComponent && <AddTransectionWalletComponent />}

      <ToastContainer />
      <Container maxWidth="lg" sx={{ mt: "45px" }}>
        <Box
          sx={{
            flexGrow: 1,
            pl: 3,
            pr: 3,
            backgroundColor: "#14172B",
            color: "#fff",
          }}
        >
          <Box
            sx={{
              pb: 0,
              color: "lightblue",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Wallets
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Home <KeyboardDoubleArrowRightIcon /> Wallets
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              pb: 5,
            }}
          >
            <small style={{ marginTop: "-5px" }}>
              Welcome To E-Cash Finance Management
            </small>
          </Box>
          <Grid container spacing={3}>
            {/* Sidebar */}
            <Grid item xs={12} md={3}>
              {wallets.map((wallet) => (
                <Card
                  key={wallet.walletID}
                  style={{
                    height: "146.99px",
                    color: "#fff",
                    backgroundColor: "#1a1a2e",
                    marginBottom: "20px",
                  }}
                >
                  <CardContent>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <CreditCardIcon
                        sx={{
                          color: "lightblue",
                          marginTop: "-7px",
                          marginRight: "10px",
                        }}
                      />
                      <Typography
                        style={{ fontFamily: "serif" }}
                        variant="h6"
                        gutterBottom
                      >
                        {wallet.type}
                      </Typography>
                    </Box>
                    <Divider
                      style={{
                        backgroundColor: "white",
                        marginTop: "0px",
                        marginBottom: "10px",
                      }}
                    />
                    <Typography variant="h6">
                      $ {wallet.initialBalance}
                    </Typography>
                  </CardContent>
                  <CardActions
                    style={{
                      marginTop: "-10px",
                      marginLeft: "150px",
                    }}
                  >
                    <Button
                      sx={{
                        minWidth: "30px",
                        fontSize: "10px",
                        padding: "2px 6px",
                        backgroundColor: "blue",
                        color: "white",
                      }}
                      size="small"
                      onClick={() => editComponent(wallet.walletID)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      sx={{
                        minWidth: "30px",
                        fontSize: "10px",
                        padding: "2px 6px",
                        backgroundColor: "red",
                        color: "white",
                      }}
                      size="small"
                      onClick={() => deleteComponent(wallet.walletID)}
                    >
                      <DeleteIcon />
                    </Button>
                  </CardActions>
                </Card>
              ))}
              <Button
                variant="outlined"
                style={{
                  fontFamily: "serif",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  color: "#fff",
                  backgroundColor: "#1a1a2e",
                  marginTop: "20px",
                }}
                fullWidth
                onClick={addNewWalletComponent}
              >
                <AddIcon />
                Add new wallet
              </Button>

              <Button
                variant="outlined"
                style={{
                  fontFamily: "serif",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  color: "#fff",
                  backgroundColor: "#1a1a2e",
                  marginTop: "20px",
                }}
                fullWidth
                onClick={addNewTransectionComponent}
              >
                <AddBusinessIcon />
                Add a new transection
              </Button>
            </Grid>

            <Grid item xs={12} md={9}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  gap: "20px",
                }}
              >
                {/* Total Balance*/}
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      backgroundColor: "#1a1a2e",
                      color: "#fff",
                      width: "100%",
                      borderRadius: "8px",
                      boxShadow: "none",
                    }}
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14, fontWeight: "bold" }}
                        gutterBottom
                      >
                        Total Balance
                      </Typography>

                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "bold", margin: "10px 0" }}
                      >
                        $ {totalBalance}
                      </Typography>

                      <Divider
                        style={{
                          backgroundColor: "white",
                          height: "0.5px",
                          marginTop: "0px",
                          marginBottom: "10px",
                        }}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#21ce99",
                        }}
                      >
                        <TrendingUpIcon />
                        <Typography sx={{ fontSize: 14, marginLeft: "4px" }}>
                          Last Updated
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Income*/}
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      backgroundColor: "#1a1a2e",
                      color: "#fff",
                      width: "100%",
                      borderRadius: "8px",
                      boxShadow: "none",
                    }}
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14, fontWeight: "bold" }}
                        gutterBottom
                      >
                        Total Income
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "bold", margin: "10px 0" }}
                      >
                        $ {totalIncome}
                      </Typography>

                      <Divider
                        style={{
                          backgroundColor: "white",
                          height: "0.5px",
                          marginTop: "0px",
                          marginBottom: "10px",
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "cornflowerblue",
                        }}
                      >
                        {/* 21ce99 */}
                        <TrendingUpIcon />
                        <Typography sx={{ fontSize: 14, marginLeft: "4px" }}>
                          Last Updated
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Expanse */}
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      backgroundColor: "#1a1a2e",
                      color: "#fff",
                      width: "100%",
                      borderRadius: "8px",
                      boxShadow: "none",
                    }}
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14, fontWeight: "bold" }}
                        gutterBottom
                      >
                        Total Expenses
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "bold", margin: "10px 0" }}
                      >
                        $ {totalExpanse}
                      </Typography>

                      <Divider
                        style={{
                          backgroundColor: "white",
                          height: "0.5px",
                          marginTop: "0px",
                          marginBottom: "10px",
                        }}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "red",
                        }}
                      >
                        <TrendingUpIcon />
                        <Typography sx={{ fontSize: 14, marginLeft: "4px" }}>
                          Last Updated
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Box>
              {/* Notification */}
              <Grid item xs={12} my={2.5}>
                <NotificationsComponent />
                {/* <Card
                  sx={{
                    backgroundColor: "#1a1a2e",
                    color: "#fff",
                    height: "313.98px",
                    borderRadius: "8px",
                    boxShadow: "none",
                    overflowY: "auto",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: "bold" }}
                      gutterBottom
                    >
                      Notifications
                    </Typography>
                    <TableContainer
                      component={Paper}
                      sx={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                      }}
                    >
                      <Table
                        sx={{ minWidth: 250 }}
                        aria-label="notifications table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ color: "#fff" }}>Date</TableCell>
                            <TableCell sx={{ color: "#fff" }} align="right">
                              Message
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {notifications.map((notification, index) => (
                            <TableRow key={index}>
                              <TableCell
                                sx={{ color: "#fff" }}
                                component="th"
                                scope="row"
                              >
                                {notification.date}
                              </TableCell>
                              <TableCell sx={{ color: "#fff" }} align="right">
                                {notification.message}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card> */}
              </Grid>
            </Grid>
          </Grid>
          {/* Notifications */}
        </Box>
      </Container>
    </Box>
  );
}
/* const notifications = [
  { date: "2024-08-25", message: "Your balance has increased by 2%" },
  { date: "2024-08-24", message: "Monthly report is available" },
  // Add more notifications as needed
];*/
