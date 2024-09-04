import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

export default function EditWalletComponent({ walletID }) {
  let userdata = JSON.parse(localStorage.getItem("userData"));
  let [wallets, setWallets] = useState([]); // To fetch all wallets of user.
  let [editForm, setEditForm] = useState(true); // for edit any wallet.
  let handleModalClose = () => {
    setEditForm(false);
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

  let handleEdit = () => {
    axios
      .get(`https://localhost:7242/api/Users/showWallet/${walletID}`)
      .then((response) => response.data)
      .then((finalresult) => {
        console.log(finalresult);
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

  let [editFormdata, setEditformdata] = useState({
    walletID: "",
    userID: "",
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
      type: editFormdata.type,
      initialBalance: editFormdata.initialBalance,
    };
    let checkWalletFilter = wallets.filter(
      (v) =>
        v.type === editFormdata.type && v.walletID !== editFormdata.walletID
    );
    if (checkWalletFilter.length === 1) {
      toast.error("This Type Of Wallet Is Already Exists.");
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
                userID: userdata.userId,
                walletID: "",
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

  useEffect(() => {
    fetchWallets();
    handleEdit();
  }, []);

  return (
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
            label="UserID*"
            variant="outlined"
            name="userId"
            value={editFormdata.userID}
            required
            sx={{ input: { color: "#fff" }, label: { color: "#ccc" } }}
          />
          <TextField
            label="WalletID*"
            variant="outlined"
            name="walletID"
            value={editFormdata.walletID}
            required
            sx={{ input: { color: "#fff" }, label: { color: "#ccc" } }}
          />
          <TextField
            label="Wallet Type*"
            variant="outlined"
            name="type"
            value={editFormdata.type}
            onChange={getEditvalue}
            required
            sx={{ input: { color: "#fff" }, label: { color: "#ccc" } }}
          />
          <TextField
            label="Initial Balance*"
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
  );
}
