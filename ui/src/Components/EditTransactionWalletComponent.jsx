import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

export default function EditTransactionWalletComponent({ transactionID }) {
  let userdata = JSON.parse(localStorage.getItem("userData"));
  let [wallets, setWallets] = useState([]); // To fetch all wallets of user.
  // let [transections , setTransections] = useState([]);
  let fetchWallets = () => {
    try {
      let userId = userdata.userId;
      axios
        .get(`https://localhost:7242/api/Users/showWalletsList/${userId}`)
        .then((response1) => response1.data)
        .then((finalresponse2) => {
          if (finalresponse2.statusCode === 200) {
            setWallets(finalresponse2.listWallets);
            console.log(wallets);
            // findTotalBalance(finalresponse2);
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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  let [editTransectionForm, seteditTransectionForm] = useState(true); // To open or close the transection model
  let transType = ["Debit", "Credit"];
  let categoryList = [
    "Grocery",
    "Bills",
    "Transportation",
    "Education",
    "Entertainment",
    "Clothes",
    "InvestMent",
    "Personal",
  ];
  let [transectionData, setTransectionData] = useState({
    userID: 0,
    walletID: 0,
    walletType: "",
    currentBalance: 0,
    transactionType: "",
    categoryType: "",
    description: "",
    amount: 0,
  });
  console.log(transectionData);

  let getTransvalue = (event) => {
    let oldData = { ...transectionData };
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setTransectionData(oldData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "wallettype") {
      setTransectionData((prevData) => ({
        ...prevData, // Keep previous state values
        walletID: value.walletID,
        userID: value.userID,
        walletType: value.walletType,
        currentBalance: value.currentBalance,
      }));
    } else if (name === "transectionType") {
      setTransectionData((prevData) => ({
        ...prevData, // Keep previous state values
        transactionType: value.transactionType,
      }));
    } else if (name === "category") {
      setTransectionData((prevData) => ({
        ...prevData, // Keep previous state values
        categoryType: value.categoryType,
      }));
    }
  };

  let handleTransectionModel = () => {
    seteditTransectionForm(false);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5,
        width: 75,
        backgroundColor: "#14172B",
        color: "#14172B",
      },
    },
  };

  let handleEdit = () => {
    axios
      .get(`https://localhost:7242/api/Users/showTransection/${transactionID}`)
      .then((response) => response.data)
      .then((finalresult) => {
        if (finalresult.statusCode === 200) {
          localStorage.setItem(
            "TransectionData",
            JSON.stringify(finalresult.transections)
          );
          let transectionData = JSON.parse(
            localStorage.getItem("TransectionData")
          );
          setTransectionData(transectionData);
        } else if (finalresult.statusCode == 100) {
          console.log(finalresult.statusMessage);
        }
      });
  };

  let handleUpdateTransection = (event) => {
    let currenteditTransectionFormData = {
      transactionID: transactionID,
      userID: transectionData.userID,
      walletID: transectionData.walletID,
      walletType: transectionData.walletType,
      currentBalance: transectionData.currentBalance,
      transactionType: transectionData.transactionType,
      categoryType: transectionData.categoryType,
      description: transectionData.description,
      amount: transectionData.amount,
    };
    try {
      axios
        .post(
          "https://localhost:7242/api/Users/editTransection",
          currenteditTransectionFormData
        )
        .then((myresponse) => myresponse.data)
        .then((finalresponse4) => {
          if (finalresponse4.statusCode === 200) {
            toast.success(finalresponse4.statusMessage);
            setTransectionData({
              userID: 0,
              walletID: 0,
              walletType: "",
              currentBalance: 0,
              transactionType: "",
              categoryType: "",
              description: "",
              amount: 0,
            });
          } else {
            toast.error(finalresponse4.statusMessage);
          }
        });
    } catch (error) {
      toast.error("Unexpected API response format:", error);
    }
  };

  useEffect(() => {
    fetchWallets();
    handleEdit();
  }, []);

  return (
    <Modal open={editTransectionForm} onClose={handleTransectionModel}>
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
          id="formfields"
          onSubmit={handleUpdateTransection}
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
              marginLeft: "21px",
            }}
          >
            <h4 style={{ color: "blue" }}>Edit Existing Transection</h4>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={handleTransectionModel}
            >
              <CloseIcon />
            </Button>
          </Box>

          <TextField
            label="UserId"
            InputLabelProps={{
              shrink: true, // Force the label to always be in the active (shrunk) state
              style: { color: "#2979ff" }, // Set the label color to blue
            }}
            variant="outlined"
            name="userId"
            value={transectionData.userID}
            fullWidth
            required
            sx={{
              input: { color: "#fff" },
              bgcolor: "transparent",
            }}
          />
          <TextField
            label="WalletID"
            InputLabelProps={{
              shrink: true, // Force the label to always be in the active (shrunk) state
              style: { color: "#2979ff" }, // Set the label color to blue
            }}
            variant="outlined"
            name="walletId"
            value={transectionData.walletID}
            fullWidth
            required
            sx={{
              input: { color: "#fff" },
              bgcolor: "transparent",
            }}
          />
          <TextField
            label="Current-Balance*"
            InputLabelProps={{
              shrink: true, // Force the label to always be in the active (shrunk) state
              style: { color: "#2979ff" }, // Set the label color to blue
            }}
            variant="outlined"
            name="currentBalance"
            value={transectionData.currentBalance}
            required
            fullWidth
            sx={{
              input: { color: "#fff" },
              bgcolor: "transparent",
            }}
          />
          <FormControl fullWidth variant="outlined" required>
            <InputLabel
              InputLabelProps={{
                shrink: true, // Force the label to always be in the active (shrunk) state
                style: { color: "#2979ff" }, // Set the label color to blue
              }}
              sx={{ color: "gray", fontWeight: 400 }}
              id="demo-multiple-chip-label"
            >
              Wallet Type
            </InputLabel>
            <Select
              name="wallettype"
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              value={transectionData.walletType} // Display the selected wallet type
              onChange={handleChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Wallet Type" />
              }
              sx={{
                "& .MuiSelect-icon": {
                  color: "white",
                },
                "& .MuiSelect-select": {
                  color: "#fff", // Change the selected text color
                },
                bgcolor: "transparent",
              }}
              renderValue={() => transectionData.walletType} // Ensure it shows the type in the field
              MenuProps={MenuProps}
            >
              {wallets.map((wallet) => (
                <MenuItem
                  sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    bgcolor: "white",
                    color: "#14172B", // Custom text color
                    "&:hover": {
                      backgroundColor: "gray", // Hover effect
                      color: "white",
                    },
                  }}
                  key={wallet.walletID}
                  value={{
                    walletID: wallet.walletID,
                    userID: wallet.userID,
                    walletType: wallet.type,
                    currentBalance: wallet.initialBalance,
                  }}
                >
                  {wallet.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" required>
            <InputLabel
              InputLabelProps={{
                shrink: true, // Force the label to always be in the active (shrunk) state
                style: { color: "#2979ff" }, // Set the label color to blue
              }}
              sx={{ color: "gray", fontWeight: 400 }}
              id="demo-multiple-chip-label"
            >
              Transection Type
            </InputLabel>
            <Select
              renderValue={() => transectionData.transactionType}
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              name="transectionType"
              value={transectionData.transactionType} // Display the selected wallet type
              onChange={handleChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Wallet Type" />
              }
              sx={{
                "& .MuiSelect-icon": {
                  color: "white",
                },
                "& .MuiSelect-select": {
                  color: "#fff", // Change the selected text color
                },
                bgcolor: "transparent",
              }}
              MenuProps={MenuProps}
            >
              {transType.map((wallet) => (
                <MenuItem
                  sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    bgcolor: "white",
                    color: "#14172B", // White text color
                    "&:hover": {
                      backgroundColor: "gray", // Hover effect
                      color: "white",
                    },
                  }}
                  key={wallet}
                  value={{ transactionType: wallet }} // Pass both walletID and type as value
                >
                  {wallet}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined" required>
            <InputLabel
              sx={{ color: "gray", fontWeight: 400 }}
              id="demo-multiple-chip-label"
            >
              Category
            </InputLabel>
            <Select
              renderValue={() => transectionData.categoryType}
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              name="category"
              value={transectionData.categoryType} // Display the selected wallet type
              onChange={handleChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Category" />
              }
              sx={{
                "& .MuiSelect-icon": {
                  color: "white",
                },
                "& .MuiSelect-select": {
                  color: "#fff", // Change the selected text color
                },
                bgcolor: "transparent",
              }}
              MenuProps={MenuProps}
            >
              {categoryList.map((category) => (
                <MenuItem
                  sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    bgcolor: "white",
                    color: "#14172B", // White text color
                    "&:hover": {
                      backgroundColor: "gray", // Hover effect
                      color: "white",
                    },
                  }}
                  key={category}
                  value={{ categoryType: category }} // Pass both walletID and type as value
                >
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* </Box> */}
          <TextField
            placeholder="Enter Description"
            label="Description"
            InputLabelProps={{
              shrink: true, // Force the label to always be in the active (shrunk) state
              style: { color: "#2979ff" }, // Set the label color to blue
            }}
            variant="outlined"
            value={transectionData.description}
            name="description"
            onChange={getTransvalue}
            required
            fullWidth
            sx={{
              input: { color: "#fff" },
              bgcolor: "transparent",
            }}
          />
          <TextField
            label="Amount*"
            InputLabelProps={{
              shrink: true, // Force the label to always be in the active (shrunk) state
              style: { color: "#2979ff" }, // Set the label color to blue
            }}
            variant="outlined"
            value={transectionData.amount}
            name="amount"
            onChange={getTransvalue}
            required
            fullWidth
            sx={{
              input: { color: "#fff" },
              bgcolor: "transparent",
            }}
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
  );
}
