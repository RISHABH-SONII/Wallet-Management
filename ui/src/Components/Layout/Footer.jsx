import React from 'react';
import { Box, Typography } from '@mui/material';
import { Facebook as FacebookIcon, Instagram as InstagramIcon, Twitter as TwitterIcon, LinkedIn as LinkedInIcon, GitHub as GitHubIcon } from '@mui/icons-material';

export default function Footer() {
    return (
        <Box sx={{ 
            borderTop:"3px solid white",
            position: "static", 
            textAlign: "center", 
            bgcolor: "#1F2130", 
            color: "white", 
            p: 3, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "end", 
            height: "64px" // Set the footer height to 64px
        }}>
            <Typography 
                variant='h5' 
                sx={{ 
                    marginLeft:"220px",
                    display: "flex", 
                    textAlign: "center", 
                    flexGrow: 1, 
                    fontSize: "1rem", 
                    "@media (max-width:600px)": { 
                        fontSize: '1rem' 
                    } 
                }}>
                &copy;   
                <div style={{ marginLeft: "5px",marginRight:"5px", color: "blue" }}>E-Cash</div>
                All Rights Reserved 2024
            </Typography>
            <Box sx={{
                "& svg": {
                    fontSize: "1.1rem",
                    cursor: 'pointer',
                    mr: 2
                },
                "& svg:hover": {
                    color: 'cornflowerblue',
                    transform: "translateX(5px)",
                    transition: "all 400ms"
                }
            }}>
                <FacebookIcon />
                <InstagramIcon />
                <TwitterIcon />
                <LinkedInIcon />
                <GitHubIcon />
            </Box>
        </Box>
    );
}

