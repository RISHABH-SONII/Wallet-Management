import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText,Box, Divider } from '@mui/material';
import { Dashboard as DashboardIcon, AccountBalanceWallet as WalletIcon } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <Drawer variant="permanent" sx={{position:'fixed' ,height: '100vh', width: 240,[`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: '#1F2130' } }}>
      <List>

        <Link to={'/'} className='mylinks'><ListItem button style={{display:"flex",flexDirection:"row", marginTop:"-10px"}}>
          <ListItemIcon><img src='logo1.png' style={{borderRadius:"70px", left:0, width:"40px"}}/></ListItemIcon>
          <div style={{display:"flex",flexDirection:"column"}}>
          <ListItemText primary="E-Cash" primaryTypographyProps={{ style: { color: 'white', fontFamily:"sans-serif" } }} />
          <ListItemText secondary="Wallet Manaegement" secondaryTypographyProps={{ style: {marginTop:"-10px", color: 'ghostwhite',fontFamily:"serif" } }} style={{ color: '#ffffff' }} />
          </div>
        </ListItem></Link>

        <Divider style={{ backgroundColor: 'white', height: '3.5px', marginTop: "0px" , marginBottom:"20px" }} />


        <Link to={'/'} className='mylinks'><ListItem button>
        <ListItemIcon><DashboardIcon style={{marginLeft:"5px",color:"lightblue"}}/></ListItemIcon>
        <ListItemText primary="Dashboard" style={{color: '#ffffff'}}/>
        </ListItem></Link>

        <Link to={'/userProfile'} className='mylinks'><ListItem button>
        <ListItemIcon><PersonIcon style={{marginLeft:"5px",color:"lightblue"}}/></ListItemIcon>
        <ListItemText primary="Profile" style={{color: '#ffffff'}}/>
        </ListItem></Link>

        <Link to={'/wallet'} className='mylinks'><ListItem button>
        <ListItemIcon><WalletIcon style={{marginLeft:"5px",color:"lightblue"}}/></ListItemIcon>
        <ListItemText primary="Wallet" style={{color: '#ffffff'}}/>
        </ListItem></Link>
        
        <Link to={'/notification'} className='mylinks'><ListItem button>
        <ListItemIcon><NotificationsIcon style={{marginLeft:"5px",color:"lightblue"}}/></ListItemIcon>
        <ListItemText primary="Notifications" style={{color: '#ffffff'}}/>
        </ListItem></Link>

        <Link to={'/analytics'} className='mylinks'><ListItem button>
        <ListItemIcon><AnalyticsIcon style={{marginLeft:"5px",color:"lightblue"}}/></ListItemIcon>
        <ListItemText primary="Analytics" style={{color: '#ffffff'}}/>
        </ListItem></Link>

        <Link to={'/settings'} className='mylinks'><ListItem button>
        <ListItemIcon><SettingsIcon style={{marginLeft:"5px",color:"lightblue"}}/></ListItemIcon>
        <ListItemText primary="Settings" style={{color: '#ffffff'}}/>
        </ListItem></Link>

        <div style={{marginBottom:"0px"}}>
        <Link to={'/support'} className='mylinks'><ListItem button>
        <ListItemIcon><SupportAgentIcon style={{marginLeft:"5px",color:"lightblue"}}/></ListItemIcon>
        <ListItemText primary="Support" style={{color: '#ffffff'}}/>
        </ListItem></Link>
        </div>

        {/* Add more items as needed */}
      </List>
    </Drawer>
  )
}
{/* <Button style={{gap:"20px",width:"215px"}}>
                  
                  <div style={{display: "flex",flexDirection:"column"}}>
                  <h5 style={{marginTop:"10px",fontFamily:"serif"}}>E-Cash</h5>
                  <small style={{fontFamily:"serif",marginTop:"-10px"}}>Wallet Manaegement</small>
                  </div>
                  </Button> */}