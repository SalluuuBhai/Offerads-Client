import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import offerads from "../../assets/Offerads.png";
import qrcode from "../../assets/sample-qr.jpg";
import axios from "axios";
import { toast } from "react-toastify";

import ReactConfetti from "react-confetti";
import "./UserProfile.css";

import {baseURL} from "../../api/api"
const apiBaseUrl = baseURL 
const URL = "https://offerads.netlify.app"
const UserQRCode = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [img, setImg] = useState("");
  const [qrData, setQrData] = useState("");

  const userID = userData._id;
  console.log(userID);

  const token = location.state?.token || localStorage.getItem("Token");
  console.log(token);

  const getUserData = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/users/getuser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      // toast.success(response.data.message);
      setUserData(response.data.user);
    } catch (error) {
      // toast.error(error.response.data.message);
      // handleError(error);
    }
  };

  async function generateQR() {
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=150%C3%97150&data=${URL}/offerview/${userID}`;
      setImg(url);
      console.log(url);
      // const updatedUserData = {
      //   userQRCode:url, id:userID
      // }
      // toast.success("QR Code Generate Successful");
      // const response = await axios.put(
      //   "http://localhost:8000/users/update-profile",
      //   {userQRCode:url, id:userID}
      // );
      const response = await axios.put(
        `${apiBaseUrl}/users/update-profile`,
        { userQRCode:url, id: userID }
        
      );
      toast.success("QR Code Generate Successful");
    } catch (error) {
      console.log(error);
      // toast.error("QR Code Generate Error");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserData();
        // Call generateQR only if getUserData is successful
        await generateQR();
      } catch (error) {
        // Handle error if any
        console.error(error);
      }
    };

    fetchData();
  }, [userID]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUserData();
     
    }
  }, [token]);

  const handleDownloadQRCode = () => {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `qrcode/${userID}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <section className="h-100 gradient-custom-2 section">
        <div className="container py-5 h-100">
          <img
            src={offerads}
            alt="Generic placeholder image"
            className="img-fluid "
            style={{ width: "130px", marginBottom: "10px" }}
          />
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                      <h1 className="heading">QR Code</h1>
                      <h2 className="">{userData.shopName}</h2>
                      <p className="text-muted" style={{fontSize:"20px", fontWeight:"600", margin:"0", padding:"0"}}>{userData.shopLocation}</p>
                      <img
                        src={img}
                        alt="qr code"
                        className="img-fluid"
                        style={{
                          width: "300px",
                          border: "5px solid #2e6ca4",
                          borderRadius: "10px",
                          margin: "5px 0px",
                          padding: "5px",
                        }}
                      />
                      <p>Scan me</p>
                      <Button
                        variant="primary"
                        className="button"
                        onClick={handleDownloadQRCode}
                      >
                        Download QR Code
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserQRCode;


// router.put('/update-profile', async (req, res) => {
//   try {
//     // Assume you have some form of authentication to identify the user (e.g., JWT)
//     const userId = req.body.id;

//     // Find the user by ID
//     const existingUser = await UserModel.findById(userId);

//     if (existingUser) {
//       // Update user details
//       existingUser.shopName = req.body.shopName || existingUser.shopName;
//       existingUser.shopAddress = req.body.shopAddress || existingUser.shopAddress;
//       existingUser.shopLocation = req.body.shopLocation || existingUser.shopLocation;
//       existingUser.mobileNumber = req.body.mobileNumber || existingUser.mobileNumber;
//       existingUser.userQRCode = req.body.userQRCode || existingUser.userQRCode;
//       existingUser.profilePicture = req.body.profilePicture || existingUser.profilePicture
//       // Add other fields that you want to update

//       // Save the updated user
//       const updatedUser = await existingUser.save();

//       res.status(200).send({ message: 'User profile updated successfully.', user: updatedUser });
//     } else {
//       res.status(404).send({ message: 'User not found.' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Internal Server Error', error: error.message });
//   }
// });