import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import UserProfile from "./Pages/UserProfile";
import Wallet from "./Pages/Wallet";
import Analytics from "./Pages/Analytics";
import Notifications from "./Pages/Notifications";
import Settings from "./Pages/Settings";
import PageNotFound from "./Pages/Notifications";
import Support from "./Pages/Support";
import SampleProfile from "./Components/UserProfile";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

{
  /* <Layout>
        <h1>MyHeading</h1>
        </Layout>           Layout component is the wrapper container */
}

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
