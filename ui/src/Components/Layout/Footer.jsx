import { faCopy, faCopyright } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Footer.css';
import {Box, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
    return (
        <>
        <Box sx={{textAlign:"center", bgcolor:"#071435",color:"white",p:3,display:"flex",alignItems:"center",justifyContent:"end"}}>
            <Typography 
                variant='h5' 
                sx={{display:"flex",textAlign:"left",flexGrow: 1,fontSize:"1rem", "@media (max-width:600px)":{fontSize:'1rem'}}}>
                    All Rights Reserved &copy; 2024  
                        <div style={{marginLeft:"5px",color:"blue"}}>E-Cash</div>
            </Typography>
                        <Box sx={{
                                    "& svg":{fontSize:"1.1rem",
                                    cursor:'pointer'
                                    ,mr:2},
                                    "& svg:hover":{
                                        color:'cornflowerblue',
                                        transform:"translateX(5px)",
                                        transition:"all 400ms"
                                    }
                                }}><FacebookIcon/>
                            <InstagramIcon/>
                            <TwitterIcon/>
                            <LinkedInIcon/>
                            <GitHubIcon/>
                        </Box>
            
        </Box>
        </>
        // <div className='footerdiv'>
        //     <div className='copyrightdiv'><FontAwesomeIcon icon={faCopyright} style={{ fontSize: "15px" }} /> </div>
        //     <div className='iconsdiv'>
        //         <p><FontAwesomeIcon icon={faFacebook} /></p><p><FontAwesomeIcon icon={faInstagram} /></p><p><FontAwesomeIcon icon={faLinkedin} /></p><p><FontAwesomeIcon icon={faTwitter} /></p>
        //     </div>
        // </div>
    )
}
