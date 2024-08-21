import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <App/>                {/* <RouterProvider router={allroutes}/> */}
  </React.StrictMode>
);

reportWebVitals();


// let allroutes=createBrowserRouter(
//   [
//     {
//       path:"/",
//       element:<HomePage/>
//     },
//     {
//       path:"/userProfile",
//       element:<UserProfile/>
//     },
//     {
//       path:"/wallet",
//       element:<Wallet/>
//     },
//     {
//       path:"/analytics",
//       element:<Analytics/>
//     },
//     {
//       path:"/notification",
//       element:<Notifications/>
//     },
//     {
//       path:"/settings",
//       element:<Settings/>
//     }
//   ]
// )