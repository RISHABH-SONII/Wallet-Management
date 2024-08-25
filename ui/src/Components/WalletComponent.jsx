import { Box, Button, Card, CardContent, Container, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import axios from 'axios';

export default function WalletComponent() {

    const notifications = [
        { date: '2024-08-25', message: 'Your balance has increased by 2%' },
        { date: '2024-08-24', message: 'Monthly report is available' },
        // Add more notifications as needed
    ];

    let [wallets, setWallets] = useState([]);

    useEffect(() => {
        let fetchWallets = () => {
            try {
                const currentUserId = 1; // Replace with the actual logic to get current user ID
                axios.get(`https://localhost:7242/api/Users/showWalletsList`)
                    .then((response1) => response1.data)
                    .then((finalresponse2) => {
                        if (Array.isArray(finalresponse2.listWallets)) {
                            setWallets(finalresponse2.listWallets);
                            console.log(finalresponse2.listWallets)
                        } else {
                            console.error("Unexpected API response format:", finalresponse2.listWallets);
                            setWallets([]); // Ensure wallets is always an array
                        }
                    })
            } catch (error) {
                console.error("Error fetching wallet data:", error);
                setWallets([]); // Ensure wallets is always an array even in case of an error
            }
        };

        fetchWallets();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: '45px' }}>
            <Box sx={{ flexGrow: 1, pl: 3, pr: 3, backgroundColor: '#14172B', color: '#fff', paddingBottom: "20px" }}>
                <Box sx={{ pb: 5, color: "lightblue", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                        <Typography variant="h5" gutterBottom>
                            Wallets
                        </Typography>
                        <small style={{ marginTop: "-5px" }}>Welcome To E-Cash Finance Management</small>
                    </Box>
                    <Typography variant="subtitle1" gutterBottom>
                        Home <KeyboardDoubleArrowRightIcon /> Wallets
                    </Typography>
                </Box>
                <Grid container spacing={3}>
                    {/* Sidebar */}
                    <Grid item xs={12} md={3}>
                        {wallets.map((wallet) => (
                            <Card key={wallet.id} style={{ height: "146.99px", color: "#fff", backgroundColor: '#1a1a2e', marginBottom: '20px' }}>
                                <CardContent>
                                    <Box style={{ display: "flex", alignItems: "center" }}>
                                        <CreditCardIcon sx={{ color: "lightblue", marginTop: "-7px", marginRight: "10px" }} />
                                        <Typography variant="h5" gutterBottom>{wallet.type}</Typography>
                                    </Box>
                                    <Divider style={{ backgroundColor: 'white', marginTop: "0px", marginBottom: "20px" }} />
                                    <Typography variant="h6">${wallet.initialBalance}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                        <Button style={{ fontFamily: "serif", display: "flex", alignItems: "center", justifyContent: "space-around", color: '#fff', backgroundColor: '#1a1a2e', marginTop: '20px' }} fullWidth>
                            <Button variant="outlined"><AddIcon /></Button>
                            Add new wallet
                        </Button>
                    </Grid>

                    {/* Income & Expenses */}
                    <Grid item xs={12} md={4.5}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Card sx={{ backgroundColor: '#1a1a2e', color: '#fff', minWidth: 275, borderRadius: '8px', boxShadow: 'none' }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} gutterBottom>
                                            Total Balance
                                        </Typography>
                                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', margin: '10px 0' }}>
                                            $432568
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#21ce99' }}>
                                            <TrendingUpIcon />
                                            <Typography sx={{ fontSize: 14, marginLeft: '4px' }}>
                                                2.47 % Last month $24,478
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card sx={{ backgroundColor: '#1a1a2e', color: '#fff', minWidth: 275, borderRadius: '8px', boxShadow: 'none' }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} gutterBottom>
                                            Monthly Expenses
                                        </Typography>
                                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', margin: '10px 0' }}>
                                            $432568
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#21ce99' }}>
                                            <TrendingUpIcon />
                                            <Typography sx={{ fontSize: 14, marginLeft: '4px' }}>
                                                2.47 % Last month $24,478
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Notifications */}
                    <Grid item xs={12} md={4.5}>
                        <Card sx={{ backgroundColor: '#1a1a2e', color: '#fff', height: '300px', borderRadius: '8px', boxShadow: 'none', overflowY: 'auto' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} gutterBottom>
                                    Notifications
                                </Typography>
                                <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                                    <Table sx={{ minWidth: 250 }} aria-label="notifications table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ color: '#fff' }}>Date</TableCell>
                                                <TableCell sx={{ color: '#fff' }} align="right">Message</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {notifications.map((notification, index) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ color: '#fff' }} component="th" scope="row">
                                                        {notification.date}
                                                    </TableCell>
                                                    <TableCell sx={{ color: '#fff' }} align="right">{notification.message}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}


{/* <Card style={{ backgroundColor: '#1F2130', color:"#fff", marginBottom: '20px' }}>
    backgroundColor: wallet.isSelected ? '#3b3b3b' : '#1F2130'
                        <CardContent>
                            <Typography style={{display:"flex", alignItems:"center"}} variant="h5" gutterBottom><AccountBalanceIcon/>
                                <Box sx={{ml:2}}>City Bank</Box>
                            </Typography>
                            <Typography variant="h6">$221,478</Typography>
                        </CardContent>
                    </Card>
                    <Card style={{ backgroundColor: '#1F2130', color:"#fff", marginBottom: '20px' }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom><CreditCardIcon /> Debit Card</Typography>
                            <Typography variant="h6">$221,478</Typography>
                        </CardContent>
                    </Card>
                    
                    <Card style={{ backgroundColor: '#1F2130', color:"#fff", marginBottom: '20px' }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom><CreditCardIcon/> Visa Card</Typography>
                            <Typography variant="h6">$221,478</Typography>
                        </CardContent>
                    </Card> */}