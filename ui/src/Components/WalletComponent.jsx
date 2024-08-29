import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
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
import CloseIcon from "@mui/icons-material/Close";
import "./WalletComponent.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function WalletComponent() {
  let userdata = JSON.parse(localStorage.getItem("userData"));
  let [wallets, setWallets] = useState([]); // To fetch all wallets of user.
  let [warning, setWarning] = useState(false); // To show the warning when click to delete the wallet.
  let [confirmDelete, setConfirmDelete] = useState(false); // Confirmation taken by user to delete the wallet.
  let [openForm, setOpenForm] = useState(false); // for add new wallet.
  let [editForm, setEditForm] = useState(false); // for edit any wallet.

  // calculates the toatal amount by the prided response listitems
  let [totalBalance, setTotalBalance] = useState(0);
  let findTotalBalance = (finalresponse) => {
    console.log(finalresponse);
    let TotalBalance = finalresponse.listWallets
      .map((wallet) => wallet.initialBalance)
      .reduce((total, current) => total + current, 0);
    setTotalBalance(TotalBalance);
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

  let handleDelete = (walletID) => {
    if (!confirmDelete) {
      setWarning(true);
      return;
    }

    const deleteWallet = async () => {
      setConfirmDelete(false);
      try {
        const response = await axios.post(
          `https://localhost:7242/api/Users/deleteWallet/${walletID}`
        );
        const finalresponse = response.data;

        if (finalresponse.statusCode === 200) {
          setWallets(wallets.filter((wallet) => wallet.walletID !== walletID));
          toast.success(`Wallet with ID ${walletID} deleted successfully.`);
        } else {
          toast.error("Unexpected API response format.");
          setWallets([]);
        }
      } catch (error) {
        toast.error("Error deleting wallet:", error.message);
        setWallets([]);
      }
    };

    deleteWallet();
  };

  // To close the warning message and set to delete the wallet and calling handle delete function.
  let deleteTrue = () => {
    setConfirmDelete(true);
    setWarning(false);
    if (confirmDelete === true) {
      handleDelete();
    }
  };

  let handleAdd = () => {
    setOpenForm(!openForm);
  };

  // To create the new wallet
  let [formdata, setformdata] = useState({
    userId: userdata.userId,
    name: "",
    type: "",
    initialBalance: "",
  });

  let getvalue = (event) => {
    let oldData = { ...formdata };
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setformdata(oldData);
  };

  let handleSubmit = (event) => {
    let currentWalletFormData = {
      userId: formdata.userId,
      name: formdata.name,
      type: formdata.type,
      initialBalance: formdata.initialBalance,
    };
    let checkWalletFilter = wallets.filter((v) => v.name === formdata.name);
    if (checkWalletFilter.length === 1) {
      toast.error("This Named Wallet Is Already Exists.");
    } else {
      try {
        axios
          .post(
            "https://localhost:7242/api/Users/addWallet",
            currentWalletFormData
          )
          .then((response) => response.data)
          .then((finalresponse1) => {
            if (finalresponse1.statusCode === 200) {
              toast.success("New Wallet Added Succesfully");
              setformdata({
                userId: userdata.userId,
                name: "",
                type: "",
                initialBalance: "",
              });
            } else {
              toast.error(
                "Error fetching wallet data:",
                finalresponse1.statusMessage
              );
            }
          });
      } catch (error) {
        toast.error("Unexpected API response format:", error);
      }
    }
  };

  let handleEdit = (walletId) => {
    setEditForm(!editForm);
    axios
      .get(`https://localhost:7242/api/Users/showWallet/${walletId}`)
      .then((response) => response.data)
      .then((finalresult) => {
        if (finalresult.statusCode === 200) {
          localStorage.setItem(
            "WalletData",
            JSON.stringify(finalresult.wallet)
          );
          let walletData = JSON.parse(localStorage.getItem("WalletData"));
          setEditformdata(walletData);
        } else if (finalresult.statusCode == 100) {
          console.log(finalresult.statusMessage);
        }
      });
  };

  // To edit the existing data
  let [editFormdata, setEditformdata] = useState({
    userID: "",
    name: "",
    type: "",
    initialBalance: "",
  });
  let getEditvalue = (event) => {
    let oldData = { ...editFormdata };
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setEditformdata(oldData);
  };

  let handleSubmitEditForm = (event) => {
    event.preventDefault();
    let walletData = JSON.parse(localStorage.getItem("WalletData"));
    let currentWalletFormData = {
      walletId: walletData.walletID,
      userId: editFormdata.userID,
      name: editFormdata.name,
      type: editFormdata.type,
      initialBalance: editFormdata.initialBalance,
    };
    let checkWalletFilter = wallets.filter((v) => v.name === editFormdata.name);
    if (checkWalletFilter.length === 1) {
      toast.error("This Named Wallet Is Already Exists.");
    } else {
      try {
        axios
          .post(
            "https://localhost:7242/api/Users/editWallet",
            currentWalletFormData
          )
          .then((response) => response.data)
          .then((finalresponse1) => {
            if (finalresponse1.statusCode === 200) {
              toast.success("Wallet Detailss Updated Succesfully");
              setEditformdata({
                userId: userdata.userId,
                name: "",
                type: "",
                initialBalance: "",
              });
              localStorage.removeItem("WalletData");
            } else {
              toast.error(
                "Error while updating wallet data:",
                finalresponse1.statusMessage
              );
            }
          });
      } catch (error) {
        toast.error("Unexpected API response format:", error);
      }
    }
  };

  let handleModalClose = () => {
    setEditForm(false);
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const notifications = [
    { date: "2024-08-25", message: "Your balance has increased by 2%" },
    { date: "2024-08-24", message: "Monthly report is available" },
    // Add more notifications as needed
  ];

  return (
    <Box>
      {/* only open when warnign is set to be true */}
      <Box
        sx={{
          width: "85%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          marginLeft: "100px",
        }}
      >
        {warning && (
          <Alert
            sx={{
              marginTop: "20px",
              width: "100%",
              alignitems: "center",
              justifyContent: "center",
              fontWeight: 900,
              textAlign: "center",
              color: "red",
              backgroundColor: "black",
            }}
            variant="outlined"
            severity="warning"
            action={
              <div>
                <Button
                  style={{ color: "lightgreen" }}
                  onClick={deleteTrue}
                  color="inherit"
                  size="small"
                >
                  Ok
                </Button>
                <Button
                  style={{ color: "orange" }}
                  onClick={() => setWarning(false)}
                  color="inherit"
                  size="small"
                >
                  UNDO
                </Button>
              </div>
            }
          >
            If you delete the wallet, the related data will be lost.
          </Alert>
        )}
      </Box>

      <Modal open={openForm} onClose={handleAdd}>
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
                Add New Wallet
              </h4>
              <Button style={{ marginLeft: "10px" }} onClick={handleAdd}>
                <CloseIcon />
              </Button>
            </Box>
            <TextField
              label="UserId*"
              variant="outlined"
              name="userId"
              value={formdata.userId}
              required
              sx={{ input: { color: "#fff" }, label: { color: "#ccc" } }}
            />
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={formdata.name}
              onChange={getvalue}
              required
              sx={{ input: { color: "#fff" }, label: { color: "#ccc" } }}
            />
            <TextField
              label="Wallet Type"
              variant="outlined"
              name="type"
              value={formdata.type}
              onChange={getvalue}
              required
              sx={{ input: { color: "#fff" }, label: { color: "#ccc" } }}
            />
            <TextField
              label="Initial-Balance*"
              variant="outlined"
              name="initialBalance"
              value={formdata.initialBalance}
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
              Add
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal open={editForm} onClose={handleModalClose}>
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
            onSubmit={handleSubmitEditForm}
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
                width: "300px",
                display: "flex",
                alignItems: "center",
                marginLeft: "105px",
              }}
            >
              <h4 style={{ marginRight: "5px", color: "blue" }}>
                Edit Wallet Details
              </h4>
              <Button style={{ marginLeft: "25px" }} onClick={handleModalClose}>
                <CloseIcon />
              </Button>
            </Box>
            <TextField
              placeholder="UserID*"
              variant="outlined"
              name="userId"
              value={editFormdata.userID}
              required
              sx={{ input: { color: "#fff" }, label: { color: "#ccc" } }}
            />
            <TextField
              placeholder="Wallet Name*"
              variant="outlined"
              name="name"
              value={editFormdata.name}
              onChange={getEditvalue}
              required
              sx={{ input: { color: "#fff" }, label: { color: "#ccc" } }}
            />
            <TextField
              placeholder="Wallet Type*"
              variant="outlined"
              name="type"
              value={editFormdata.type}
              onChange={getEditvalue}
              required
              sx={{ input: { color: "#fff" }, label: { color: "#ccc" } }}
            />
            <TextField
              placeholder="Initial Balance*"
              variant="outlined"
              name="initialBalance"
              value={editFormdata.initialBalance}
              onChange={getEditvalue}
              required
              sx={{ input: { color: "#fff" }, label: { color: "#ccc" } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Update
            </Button>
          </form>
        </Box>
      </Modal>
      <ToastContainer />
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
                Wallets
              </Typography>
              <small style={{ marginTop: "-5px" }}>
                Welcome To E-Cash Finance Management
              </small>
            </Box>
            <Typography variant="subtitle1" gutterBottom>
              Home <KeyboardDoubleArrowRightIcon /> Wallets
            </Typography>
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
                      onClick={() => handleEdit(wallet.walletID)}
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
                      onClick={() => handleDelete(wallet.walletID)}
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
                onClick={handleAdd}
              >
                <AddIcon />
                Add new wallet
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
                {/* Income*/}
                <Grid item xs={12} md={5.8}>
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
                        variant="h4"
                        component="div"
                        sx={{ fontWeight: "bold", margin: "10px 0" }}
                      >
                        $ {totalBalance}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#21ce99",
                        }}
                      >
                        <TrendingUpIcon />
                        <Typography sx={{ fontSize: 14, marginLeft: "4px" }}>
                          2.47 % Last month $24,478
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Expanse */}
                <Grid item xs={12} md={5.8}>
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
                        Monthly Expenses
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{ fontWeight: "bold", margin: "10px 0" }}
                      >
                        $432568
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#21ce99",
                        }}
                      >
                        <TrendingUpIcon />
                        <Typography sx={{ fontSize: 14, marginLeft: "4px" }}>
                          2.47 % Last month $24,478
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Box>
              {/* Notification */}
              <Grid item xs={12} my={2.5}>
                <Card
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
                </Card>
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
