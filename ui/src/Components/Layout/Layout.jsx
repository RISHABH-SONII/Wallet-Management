import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Box } from '@mui/material'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header/>
        <Box sx={{ display: 'flex', flexGrow: 1}}>
          <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, ml: '240px',mb:"2px",backgroundColor: '#14172B'}}> {/* Adjust ml and mt based on sidebar width and header height */}
            <div>{children}</div>
            </Box>
        </Box>
      <Footer/>
    </Box>
    </>
  )
}
export default Layout;