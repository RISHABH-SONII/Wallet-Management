import { Alert, Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

export default function DeleteWalletComponent() {
  let userdata = JSON.parse(localStorage.getItem("userData"));
  let [wallets, setWallets] = useState([]); // To fetch all wallets of user.
  let [warning, setWarning] = useState(false); // To show the warning when click to delete the wallet.
  let [confirmDelete, setConfirmDelete] = useState(false); // Confirmation taken by user to delete the wallet.
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

  let deleteTrue = () => {
    setConfirmDelete(true);
    setWarning(false);
    if (confirmDelete === true) {
      handleDelete();
    }
  };

  useEffect(() => {
    fetchWallets();
    handleDelete();
  }, []);

  return (
    <>
      {warning && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "black",
            border: "0.1 px solid #000",
            boxShadow: 24,
            p: 2,
            borderRadius: 5,
            zIndex: 10,
          }}
        >
          <Alert
            sx={{
              width: "100%",
              alignitems: "start",
              justifyContent: "center",
              fontWeight: 900,
              textAlign: "center",
              color: "red",
              backgroundColor: "transparent",
            }}
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
        </Box>
      )}
    </>
  );
}
