import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import HomePage from './Pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Notifications from './Pages/Notifications';
import UserProfile from './Pages/UserProfile';
import Wallet from './Pages/Wallet';
import Settings from './Pages/Settings';


const root = ReactDOM.createRoot(document.getElementById('root'));
let allroutes=createBrowserRouter(
  [
    {
      path:"/",
      element:<HomePage/>
    },
    {
      path:"/userProfile",
      element:<UserProfile/>
    },
    {
      path:"/wallet",
      element:<Wallet/>
    },
    {
      path:"/notification",
      element:<Notifications/>
    },
    {
      path:"/settings",
      element:<Settings/>
    }
  ]
)
root.render(

  <React.StrictMode>
    <RouterProvider router={allroutes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
