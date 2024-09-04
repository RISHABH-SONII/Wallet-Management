import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
export default function AddWalletComponent() {
  let userdata = JSON.parse(localStorage.getItem("userData"));
  let [wallets, setWallets] = useState([]); // To fetch all wallets of user.
  let [openForm, setOpenForm] = useState(true); // for add new wallet.
  let handleAdd = () => {
    setOpenForm(false);
  };
  let [formdata, setformdata] = useState({
    userId: userdata.userId,
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
      type: formdata.type,
      initialBalance: formdata.initialBalance,
    };
    let checkWalletFilter = wallets.filter((v) => v.type === formdata.type);
    if (checkWalletFilter.length === 1) {
      toast.error("This Type Of Wallet Is Already Exists.");
    } else {
      try {
        axios
          .post(
            "https://localhost:7242/api/Users/addWallet",
            currentWalletFormData
          )
          .then((response) => response.data)
          .then((finalresponse1) => {
            console.log(finalresponse1);
            if (finalresponse1.statusCode === 200) {
              toast.success("New Wallet Added Succesfully");
              setformdata({
                userId: userdata.userId,
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

  let fetchWallets = () => {
    try {
      let userId = userdata.userId;
      axios
        .get(`https://localhost:7242/api/Users/showWalletsList/${userId}`)
        .then((response1) => response1.data)
        .then((finalresponse2) => {
          if (finalresponse2.statusCode === 200) {
            setWallets(finalresponse2.listWallets);
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

  useEffect(() => {
    fetchWallets();
  }, []);

  return (
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
  );
}
