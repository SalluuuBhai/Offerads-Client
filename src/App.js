import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import LandingPage from "./components/landingPage/LandingPage";
import Register from "./components/register/Register";
import About from "./components/about/About";
import Offers from "./components/offers/Offers";
import Reset from "./components/resetPassword/ResetPassword";
import NoPage from "./components/noPage/NoPage";
import UserProfile from "./components/userProfile/UserProfile";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";
import VerificationEmail from "./components/VerifyEmail";
import ResendVerificationEmail from "./components/resendVerifyEmail";
import VerifyPage from "./components/register/VerifyPage";
import UserQRCode from "./components/userProfile/UserQRCode";
import Offerads from "./components/userProfile/OfferadsPage";
import UpdateProfile from "./components/userProfile/UserUpdateProfile";
import AddPost from "./components/userProfile/AddPost";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifypage" element={<VerifyPage />} />
          <Route path="/userprofile/:id" element={<UserProfile />} />
          <Route path="/updateprofile/:id" element={<UpdateProfile />} />
          <Route path="/addpost/:id" element={<AddPost />} />
          <Route path="/userQRCode/:id" element={<UserQRCode />} />
          <Route path="/offerview/:id" element={<Offerads />} />
          <Route path="/verify/:id" element={<VerificationEmail />} />
          <Route path="/resend-verification-email" element={<ResendVerificationEmail />} />
          
          



          <Route path="/*" element={<NoPage />} />
        </Routes>
          
      </Router>
    </div>
  );
}

export default App;
