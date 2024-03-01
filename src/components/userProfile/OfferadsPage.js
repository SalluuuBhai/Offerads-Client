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
import { MdLocationPin } from "react-icons/md";
import { HiBuildingStorefront } from "react-icons/hi2";
import { FaBell } from "react-icons/fa";

import { MdCall } from "react-icons/md";
import offerads from "../../assets/Offerads.png";
import loader from "../../assets/loader.gif";
import profile from "../../assets/profile-img.webp";
import like from "../../assets/like.png";
import offerimg from "../../assets/offerimg.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import ReactConfetti from "react-confetti";

import { baseURL } from "../../api/api";
import SubscribeAlert from "../alert/Subscribe";
// import Alert from "../alert/Alert";
const apiBaseUrl = baseURL;

const Offerads = () => {
  const { id } = useParams();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [offerData, setOfferData] = useState([]);
  const [liked, setLiked] = useState(false);
  const [visitCount, setVisitCount] = useState(0);
  const [img, setImg] = useState("");
  const [qrData, setQrData] = useState("");
  const [showSubscribeAlert, setShowSubscribeAlert] = useState(false);
  const [ipAddress, setIpAddress] = useState(null);

  const handleLikeClick = () => {
    setLiked(!liked);
    // You can also perform additional actions here, like updating the server with the like status.
  };

  const getDaysLeft = (validityDate) => {
    const currentDate = new Date();
    const offerValidityDate = new Date(validityDate);
    const timeDifference = offerValidityDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  };

  const getDaysLeftColor = (daysLeft) => {
    // You can customize the colors based on the number of days
    if (daysLeft > 7) {
      return "#65B741"; // Green if more than 7 days left
    } else if (daysLeft > 0) {
      return "#FFB534"; // Yellow if 1 to 7 days left
    } else {
      return "#EF4040"; // Red if the offer has expired
    }
  };

  const { pathname } = location;
  const userID = pathname.split("/")[2] || null;

  // console.log(userID);

  const getUserData = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/users/${userID}`);
      // console.log("User Data :", response);
      // toast.success(response.data.message);
      setUserData(response.data.user);
    } catch (error) {
      // toast.error(error.response.data.message);
      // console.error("Error:", error);
    }
  };
  const getOfferData = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/offers/showoffer/${userID}`
      );

      // console.log("Offer Data :", response);
      // toast.success(response.data.message);
      setOfferData(response.data.offersPosts);
      // setOfferData(response.data.offersPost);
      // console.log("Updated offerData:", offerData);
    } catch (error) {
      // toast.error(error.response.data.message);
      // handleError(error);
    }
  };
  useEffect(() => {
    getUserData().then(() => setLoading(false));
  }, [userID]);

  useEffect(() => {
    // console.log("userData:", userData);

    if (userData._id) {
      getOfferData().then(() => setLoading(false));
      // getProfilePicture();
      // getRecentAds();
    }
  }, [userData._id]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowSubscribeAlert(true);
      console.log("Timer elapsed, setting showSubscribeAlert to true");
    }, 10000);
  
    return () => {
      clearTimeout(timerId);
      console.log("Timer cleared");
    };
  }, []);
  
  const handleSubscribe = () =>{
    console.log("Subscribe clicked")
    
    setShowSubscribeAlert(true);
  }
  // useEffect(() => {
  //   // Your logic that depends on showSubscribeAlert
  //   console.log("showSubscribeAlert has changed:", showSubscribeAlert);
  //   if (showSubscribeAlert) {
  //     // Add your logic here
  //     setShowSubscribeAlert(true);
  //   }
  // }, [showSubscribeAlert]);

  // useEffect(() => {
  //   const fetchIpAddress = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:8000/customer/getIpAddress"
  //       );
  //       const data = await response.json();
  //       setIpAddress(data.ip);
  //     } catch (error) {
  //       console.error("Error fetching IP address:", error);
  //     }
  //   };

  //   fetchIpAddress();
  // }, []);

  return (
    <>
      {loading ? (
        // Display a preloader while the data is being fetched
        <div className="text-center">
          {/* <ReactConfetti /> */}
          <h2>Loading...</h2>
          <img
            src={loader}
            alt="preloader"
            className="img-fluid "
            style={{ width: "300px", marginBottom: "45%" }}
          />
        </div>
      ) : (
        <section className="h-100 gradient-custom-2 section">
          <div className="container py-5 h-100">
            <img
              src={offerads}
              alt="Generic placeholder image"
              className="img-fluid "
              style={{ width: "130px", marginBottom: "10px" }}
            />
            <div className="row d-flex justify-content-center align-items-center h-100">
              {showSubscribeAlert && (
                <SubscribeAlert title={userData.shopName} userId={userID} />
              )}

              <div className="col col-lg-9 col-xl-7" style={{ padding: "5px" }}>
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    // position: "fixed", top: 0, left: 0, right: 0
                  }}
                >
                  <h1 className="heading">Welcome</h1>
                  {/* User Details Section */}
                  <div
                    className="card"
                    style={{ marginBottom: "20px", backgroundColor: "#070F2B" }}
                  >
                    {userData ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            
                          }}
                        >
                          <img
                            src={
                              userData.profilePicture
                                ? userData.profilePicture
                                : profile
                            }
                            alt="Profile"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "50%",
                              marginRight: "7px",
                              border: "2px solid #F0F3FF",
                              margin: "5px",
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              justifyContent: "flex-start",
                              color: "white",
                              padding: "10px 1px",
                            }}
                          >
                            <h4
                              style={{
                                fontSize: "1.1rem",
                                // fontWeight: "bold",
                                margin: "2px 0px",
                                width:"100%",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {userData.shopName}
                            </h4>
                            <p style={{ margin: "2px 0" }}>
                              <HiBuildingStorefront /> {userData.shopAddress}
                            </p>
                            <p style={{ margin: "2px 0" }}>
                              <MdLocationPin /> {userData.shopLocation}
                            </p>
                            <p style={{ margin: "1px 0" }}>
                              <MdCall /> {userData.mobileNumber}
                            </p>
                            {/* Add more details as needed */}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            // flexDirection: "column",
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                            color: "white",
                            padding: "10px 10px 10px 0px",
                            cursor: "pointer",
                            // position:"fixed"
                            
                          }}
                          // onClick={() => {
                            
                          //   console.log("Clicked on the bell icon");
                          //   setShowSubscribeAlert(true);
                          // }}
                          onClick={handleSubscribe}
                        >
                          <FaBell
                            style={{ color: "white", fontSize: "24px" }}
                          />
                        </div>
                      </div>
                    ) : (
                      <p>Loading user details...</p>
                    )}
                  </div>

                  {/* Offer Data Section */}
                  <div style={{ textAlign: "center" }}>
                    {offerData &&
                    Array.isArray(offerData) &&
                    offerData.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          // color: "white",
                          // padding: "10px 5px",
                          alignItems: "center",
                          // marginBottom: "20px",
                          // backgroundColor: "green",
                        }}
                      >
                        {/* Map through offerData */}
                        {offerData
                          .slice()
                          .reverse()
                          .map((offer) => (
                            <div
                              key={offer._id}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "stretch", // Align items to stretch along the cross-axis
                                marginBottom: "20px",
                                // backgroundColor: "blue",
                                borderRadius: "10px",
                                // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                overflow: "hidden", // Hide overflowing content
                                width: "100%",
                              }}
                            >
                              <div
                                className="profile-bar"
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "flex-start",
                                  alignItems: "center",
                                  padding: "10px",
                                  // backgroundColor: "red",
                                  borderBottom: "1px solid #ddd",
                                }}
                              >
                                <img
                                  src={
                                    userData.profilePicture
                                      ? userData.profilePicture
                                      : profile
                                  }
                                  alt="Profile"
                                  style={{
                                    width: "70px",
                                    height: "70px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    marginRight: "12px",
                                    border: "2px solid #2e6ca4",
                                  }}
                                />
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <h4>{userData.shopName}</h4>
                                  <p
                                    style={{
                                      margin: 0,
                                      color: "#888",
                                      textAlign: "left",
                                    }}
                                  >
                                    {new Date(
                                      offer.createdAt
                                    ).toLocaleDateString("en-GB")}
                                  </p>
                                </div>
                              </div>
                              <div
                                style={{
                                  padding: "10px",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  opacity:
                                    getDaysLeft(offer.offerValidity) < 0
                                      ? "0.5"
                                      : "none",
                                }}
                              >
                                <h5
                                  style={{
                                    fontSize: "1.2rem",
                                    margin: 0,
                                    color: "#2e6ca4",
                                  }}
                                >
                                  {offer.offerTitle}
                                </h5>

                                <p
                                  style={{
                                    marginTop: "5px",
                                    marginBottom: 0,
                                    color: "#888",
                                  }}
                                >
                                  {offer.offerContent}
                                </p>
                              </div>
                              <a
                                href={offer.image}
                                download={`offer_${offer._id}`}
                              >
                                <img
                                  src={offer.image}
                                  alt="Offer"
                                  style={{
                                    width: "100%",
                                    maxHeight: "100%", // Set a maximum height for the offer image
                                    objectFit: "cover", // Maintain aspect ratio and cover the container
                                    cursor: "pointer",
                                    filter:
                                      getDaysLeft(offer.offerValidity) < 0
                                        ? "blur(5px)"
                                        : "none",
                                    border: " 1px solid #D7E4C0",
                                    // -webkit-filter:"blur(8px)"
                                  }}
                                />
                              </a>
                              <div
                                style={{
                                  padding: "10px",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                {/* <div>
                                  <button
                                    onClick={handleLikeClick}
                                    style={{
                                      backgroundColor: liked
                                        ? "#2e6ca4"
                                        : "#ccc",
                                      color: "#fff",
                                      padding: "5px 10px",
                                      border: "none",
                                      borderRadius: "5px",
                                      cursor: "pointer",
                                      width: "100px"
                                    }}
                                  >
                                    {liked ? "Liked" : "Like"}
                                  </button>
                                </div> */}
                                {/* <div>
                                  <button
                                    onClick={handleLikeClick}
                                    style={{
                                      backgroundColor: liked
                                        ? "#2e6ca4"
                                        : "#ccc",
                                      color: "#fff",
                                      padding: "5px 10px",
                                      border: "none",
                                      borderRadius: "5px",
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      width: "90px",
                                    }}
                                  >
                                    {liked ? (
                                      <>
                                        <img
                                          src={like}
                                          style={{
                                            width: "30px",
                                            margin: "1px",
                                            backgroundColor: "#2e6ca4",
                                          }}
                                        />
                                        Liked
                                      </>
                                    ) : (
                                      <>
                                        <img
                                          src={like}
                                          style={{
                                            width: "30px",
                                            margin: "1px",
                                          }}
                                        />
                                        Like
                                      </>
                                    )}
                                  </button>
                                </div> */}

                                <p
                                  style={{
                                    marginTop: "5px",
                                    marginBottom: 0,
                                    color: "#888",
                                  }}
                                >
                                  Validity:{" "}
                                  <span
                                    style={{
                                      backgroundColor: getDaysLeftColor(
                                        getDaysLeft(offer.offerValidity)
                                      ),
                                      padding: "2px 7px",
                                      borderRadius: "10px",
                                      color: "white",
                                      textDecoration:
                                        getDaysLeft(offer.offerValidity) < 0
                                          ? "line-through"
                                          : "none",
                                    }}
                                  >
                                    {getDaysLeft(offer.offerValidity) < 0
                                      ? ` Offer Expired on ${new Date(
                                          offer.offerValidity
                                        ).toLocaleDateString("en-GB")}`
                                      : getDaysLeft(offer.offerValidity) === 0
                                      ? "Expire Today"
                                      : `${new Date(
                                          offer.offerValidity
                                        ).toLocaleDateString(
                                          "en-GB"
                                        )} (${getDaysLeft(
                                          offer.offerValidity
                                        )} days left)`}
                                  </span>
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p>No offers Posted!</p>
                    )}
                  </div>

                  {/* <div>
                    <p>Client's IP Address is {ipAddress || "Loading..."}</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Offerads;
