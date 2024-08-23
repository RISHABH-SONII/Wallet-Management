import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Box } from '@mui/material';
import { Search as SearchIcon, Notifications as NotificationsIcon, AccountCircle } from '@mui/icons-material';

export default function Header() {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1F2130', mb:"2px"}}>
            <Toolbar sx={{ left: -10 }}>
                <Typography variant="button" noWrap component="div" sx={{ width: '240px' }}>
                    {/* Empty Typography for layout */}
                </Typography>
                <Box sx={{ paddingLeft: "6.2rem", width: "95%", display: "flex" }}>
                    <Box sx={{ padding: "0.15rem", borderRadius: '4px', backgroundColor: "#2E3047", marginRight: "315px" }}>
                        <InputBase placeholder="Search Here" inputProps={{ 'aria-label': 'search' }} sx={{ width: '680px' }} />
                        <IconButton>
                            <SearchIcon sx={{ color: '#fff' }} />
                        </IconButton>
                    </Box>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}


// import React from 'react';
// import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Container, Box, Button } from '@mui/material';
// import { Search as SearchIcon, Notifications as NotificationsIcon, AccountCircle } from '@mui/icons-material';

// export default function Header() {
//     return (
//             <AppBar position="static" sx={{backgroundColor: '#1F2130'}}>
//               <Toolbar sx={{left:-10}}>
//                 <Typography variant="button" noWrap component="div" style={{width: '240px'}}>
                    
//                 </Typography>
//                 {/* , backgroundColor: '#2E3047' */}
//                 {/* ,marginLeft:"87px", marginRight: '16px',width:"65rem" */}
//                 <div style={{paddingLeft:"6.2rem",width:"95%",display:"flex"}}>
//                 <div style={{padding:"0.15rem",borderRadius: '4px',backgroundColor:"#2E3047",marginRight:"315px" }}>
//                   <InputBase placeholder="Search Here"  inputProps={{ 'aria-label': 'search' }} style={{ width: '680px' }}  />
//                   <IconButton>
//                     <SearchIcon style={{ color: '#fff' }} />
//                   </IconButton>
//                 </div>
//                 <IconButton color="inherit">
//                   <Badge badgeContent={4} color="error">
//                     <NotificationsIcon />
//                   </Badge>
//                 </IconButton>
//                 <IconButton color="inherit">
//                   <AccountCircle />
//                 </IconButton>
//                 </div>
//               </Toolbar>
//             </AppBar>
//           );
// }


// import React from 'react';
// import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge } from '@mui/material';
// import { Search as SearchIcon, Notifications as NotificationsIcon, AccountCircle } from '@mui/icons-material';

// export default Header() {
//   return (
//     <AppBar position="static" sx={{ backgroundColor: '#1F2130' }}>
//       <Toolbar>
//         <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
//           Ekash Finance Management
//         </Typography>
//         <div style={{ position: 'relative', borderRadius: '4px', backgroundColor: '#2E3047', marginRight: '16px', padding: '0 16px' }}>
//           <InputBase placeholder="Search Here" inputProps={{ 'aria-label': 'search' }} />
//           <IconButton>
//             <SearchIcon style={{ color: '#fff' }} />
//           </IconButton>
//         </div>
//         <IconButton color="inherit">
//           <Badge badgeContent={4} color="error">
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//         <IconButton color="inherit">
//           <AccountCircle />
//         </IconButton>
//       </Toolbar>
//     </AppBar>
//   );
// }



// import { faBell, faChartLine, faCog, faHome, faSearch, faUser, faWallet } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import React, { useState } from 'react'
// import './Header.css';
// import { Link } from 'react-router-dom';
// import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// export default function Header() {
//     const [mobileOpen,setmobileOpen]=useState(false)

//     const handleDrawerToggle = () => {
//         setmobileOpen(!mobileOpen);
//     }
//     const drawer = ()=>(
//              <Box onClick={handleDrawerToggle} sx={{textAlign:"center", bgcolor:"#071435"}}>
//                 <Typography color={"goldenrod"} variant='h4' component='div' sx={{textAlign:"left",flexGrow: 1}}>
//                      <img src='ecash.png' style={{padding:"15px",left:"0px", width:"170px", height:"100px"}} alt="Logo"/>
//                      </Typography>
//                      <Divider style={{ backgroundColor: 'red', height: '5px', marginTop: "10px" }} />
//                     <ul className='mobile-navigation'>
//                         <li>
//                             <Link to={'/'}>Home</Link>
//                         </li>
//                         <li>
//                             <Link to={'/userProfile'}>Profile</Link>
//                         </li>
//                         <li>
//                             <Link to={'/wallet'}>Wallet</Link>
//                         </li>
//                         <li>
//                             <Link to={'/analytics'}>Analytics</Link>
//                         </li>
//                         <li>
//                             <Link to={'/notification'}>Notifications</Link>
//                         </li>
//                         <li>
//                             <Link to={'/settings'}>Settings</Link>
//                         </li>
//                     </ul>
//             </Box>
//     )


//     return (
//         <>
//         <Box>
//             <AppBar component={'nav'} sx={{bgcolor:"#071435"}}>
//                 <Toolbar>
//                     <IconButton 
//                         color='inherit' 
//                         aria-label='open drawer' 
//                         edge='start' 
//                         sx={{
//                             mr:2,
//                             display:{sm:"none"}
//                         }}
                        
//                         onClick={handleDrawerToggle}
//                         >
//                         <MenuIcon/>
//                     </IconButton>
//                 <Typography color={"goldenrod"} variant='h6' component='div' sx={{flexGrow: 1}}>
//                 <img src='ecash.png' style={{left:"0px", width:"75px"}}/>
//                 <small style={{fontFamily:"serif",fontSize:"1.15rem",color:'white',paddingLeft:"250px",color:"cornflowerblue"}}>Welcome To E-Cash Wallet Manangement System</small>
//                 </Typography>
//                 <Box className="navigation-box" sx={{display:{xs:'none',sm:'block'}}}>
//                     <ul className='navigation-menu'>
//                         <li>
//                             <Link to={'/'}>Home</Link>
//                         </li>
//                         <li>
//                             <Link to={'/userProfile'}>Profile</Link>
//                         </li>
//                         <li>
//                             <Link to={'/wallet'}>Wallet</Link>
//                         </li>
//                         <li>
//                             <Link to={'/analytics'}>Analytics</Link>
//                         </li>
//                         <li>
//                             <Link to={'/notification'}>Notifications</Link>
//                         </li>
//                         <li>
//                             <Link to={'/settings'}>Settings</Link>
//                         </li>
//                     </ul>
//                 </Box>
//                 </Toolbar>
//             </AppBar>
//             <Box component="nav" sx={{bgcolor:"#071435"}}>
//                 <Drawer 
//                     variant='temporary' 
//                     open={mobileOpen} 
//                     onClose={handleDrawerToggle} 
//                     sx={{display:{xs:'block',sm:'none'},
//                     "& .MuiDrawer-paper":{
//                         boxSizing:"border-box",
//                         width:"170px",
//                     }}}>
//                     {drawer()}
//                 </Drawer>
//             </Box>
//             <Toolbar/>
//         </Box>
//         </>
//     )
// }