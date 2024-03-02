import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import offerads from "../../assets/Offerads.png";
import profile from "../../assets/profile-img.webp";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { BiSolidEditAlt } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { BsQrCode } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./UserProfile.css";
import { storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { baseURL } from "../../api/api";
const apiBaseUrl = baseURL;

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({});
  const [offerData, setOfferData] = useState([]);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [data, setData] = useState([]);
  const [recentAds, setRecentAds] = useState([]);
  // let token = localStorage.getItem("Token");
  const token = location.state?.token || localStorage.getItem("Token");
  // console.log(token);
  const userID = userData._id;
  // console.log(userID);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUserData();
      // getOfferData();
      // getProfilePicture();
      // getRecentAds();
    }
  }, [token]);

  useEffect(() => {
    // console.log("userData:", userData);

    if (userData._id) {
      getOfferData();
      // getProfilePicture();
      // getRecentAds();
    }
  }, [userData._id]);

  const getUserData = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/users/getuser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("User Data :", response);
      // toast.success(response.data.message);
      setUserData(response.data.user);
    } catch (error) {
      // toast.error(error.response.data.message);
      handleError(error);
    }
  };
  const getOfferData = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/offers/showoffer/${userID}`
      );

      console.log("Offer Data :", response);
      // toast.success(response.data.message);
      setOfferData(response.data.offersPosts);

      // console.log("Updated offerData:", offerData);
    } catch (error) {
      // toast.error(error.response.data.message);
      // handleError(error);
    }
  };
  const handleDeleteOffer = async (offerId, offer, getOfferData) => {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete this ${offer.offerTitle} offer?`
    );

    if (shouldDelete) {
      try {
        const response = await axios.delete(
          `${apiBaseUrl}/offers/deleteoffer/${offerId}`
        );
        toast.success(response.data.message);
        getOfferData();
      } catch (error) {
        toast.error(error.response.data.message);
        // console.error("Error deleting offer:", error);
      }
    }
  };

  const handleError = (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 400)
    ) {
      toast.error(error.response.data.message);
      logOut();
    } else {
      // console.error("Error:", error);
    }
  };

  const getDaysLeft = (offerValidity) => {
    const currentDate = new Date();
    const offerDate = new Date(offerValidity);
    const timeDifference = offerDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysLeft === 0) {
      return "Expire Today";
    } else if (daysLeft < 0) {
      return "Expired";
    } else {
      return `${daysLeft} days left`;
    }
  };

  const navigateToUserUpdatePage = () => {
    navigate(`/updateprofile/${id}`);
  };
  const navigateToAddPostPage = () => {
    navigate(`/addpost/${id}`);
  };
  const navigateToUserQRPage = () => {
    navigate(`/userQRCode/${id}`);
  };
  const navigateToUserOfferadsPage = () => {
    navigate(`/offerview/${id}`);
  };
  const navigateToEditPostPage = (offerID, _id) => {
    navigate(`/editpost/${_id}-${offerID}`);
  };

  const logOut = () => {
    const shouldLogout = window.confirm(`Are you sure you want to Logout ?`);
    if (shouldLogout) {
      localStorage.clear();
      toast.success("Logged out Successful");
      navigate("/login");
    }
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
                {/* <Button onClick={() => getUserData()}>Refresh</Button> */}

                <div
                  className="rounded-top text-white d-flex flex-row justify-content-around"
                  style={{
                    backgroundColor: "#070F2B",
                    height: "150px",
                    // justifyContent: "between",
                  }}
                >
                  <div
                    className="ms-3 mt-4 d-flex flex-column col-3"
                    style={{ width: "120px" }}
                  >
                    <img
                      src={
                        userData.profilePicture
                          ? userData.profilePicture
                          : profile
                      }
                      alt="Shop Image"
                      className="img-fluid  mt-4 mb-2"
                      style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "120px",
                        zIndex: 1,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #2e6ca4",
                        margin: "5px",
                      }}
                    />
                  </div>

                  <div
                    className=" d-flex flex-column  col-6"
                    style={{
                      marginTop: "70px",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      padding: "0px 0px 0px 0.5rem",
                    }}
                  >
                    <h5
                      className="text-left mb-0"
                      style={{
                        padding: "0px 0px 3px 5px",
                        justifyContent: "flex-start",
                        textAlign: "left",
                        color: "#EEF5FF",
                      }}
                    >
                      {userData.shopName}{" "}
                    </h5>
                    <p
                      className="text-left"
                      style={{
                        padding: "1px 0px 1px 5px",
                        justifyContent: "flex-start",
                        textAlign: "left",
                        margin: "0",
                        color: "#EEF5FF",
                      }}
                    >
                      {userData.shopAddress}{" "}
                    </p>
                    <p
                      className="text-left"
                      style={{
                        padding: "1px 0px 1px 5px",
                        justifyContent: "flex-start",
                        textAlign: "left",
                        color: "#EEF5FF",
                      }}
                    >
                      {userData.shopLocation}{" "}
                    </p>
                  </div>

                  <div
                    className="ml-auto p-3  d-flex flex-column col-2"
                    style={{ marginTop: "75px", cursor: "pointer" }}
                    onClick={navigateToUserUpdatePage}
                  >
                    <FaRegEdit style={{ fontSize: "24px" }} />
                  </div>
                </div>

                <div
                  className="p-3 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div
                    className=" text-black"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    {/* <div className="card-body " style={{backgroundColor:"blue", }}> */}
                    <div
                      className="d-flex justify-content-between align-items-center "
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="d-flex flex-column col-4">
                        <button
                          type="button"
                          className="btn rounded-btn btn-primary"
                          style={{
                            fontSize: "15px",
                            padding: "5px ",
                            cursor: "pointer",
                          }}
                          onClick={navigateToAddPostPage}
                          // data-mdb-ripple-color="dark"
                        >
                          <IoMdAdd />
                          Ad Post
                        </button>
                      </div>

                      {/* <div className="d-flex flex-column col-4">
                        <div className=" text-center">
                          <div
                            className="d-flex flex-row justify-content-center"
                            style={{ height: "30px" }}
                          >
                            <FaEye
                              style={{
                                fontSize: "24px",
                                margin: "5px 5px 0px 0px",
                              }}
                            />{" "}
                            <p
                              className="mb-1 h5"
                              style={{ padding: "5px", fontSize: "20px" }}
                            >
                              0
                            </p>
                          </div>

                          <div>
                            <p
                              className="small text-muted mb-0"
                              style={{ fontSize: "15px" }}
                            >
                              Ad Views
                            </p>
                          </div>
                        </div>
                      </div> */}

                      <div
                        className="d-flex flex-column col-5"
                        style={{ alignContent: "end" }}
                      >
                        <div
                          className=" text-center"
                          style={{ cursor: "pointer" }}
                          onClick={navigateToUserQRPage}
                        >
                          <div className="d-flex flex-row justify-content-center">
                            <BsQrCode style={{ fontSize: "30px" }} />
                          </div>
                          <div>
                            <p
                              className="small text-muted mb-0"
                              style={{ fontSize: "15px" }}
                            >
                              View QR
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* </div> */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p className="lead fw-normal mb-0">Recent Ads</p>
                      <p className="mb-0">
                        <a
                          onClick={navigateToUserOfferadsPage}
                          style={{ cursor: "pointer" }}
                          className="text-muted"
                        >
                          Show all Posts
                        </a>
                      </p>
                    </div>
                    <div
                      className="table-responsive"
                      style={{
                        maxHeight: "450px",
                        border: "3px solid #EEF5FF",
                        // overflow: "scroll",
                        // scrollbarColor: "red orange",
                        scrollbarWidth: "thin",
                      }}
                    >
                      <table className="table table-hover table-fluid" >
                        <thead>
                          <tr>
                            <th scope="col" style={{ color: "#2e6ca4", maxWidth:"30px", padding:"10px" }}>
                              ID
                            </th>
                            <th scope="col" style={{ color: "#2e6ca4", padding:"10px" }}>
                              Offer Name
                            </th>
                            <th scope="col" style={{ color: "#2e6ca4", padding:"10px" }}>
                              Validity
                            </th>
                            <th scope="col" style={{ color: "#2e6ca4", padding:"10px" }}>
                              Expire
                            </th>
                            <th scope="col" style={{ color: "#2e6ca4", padding:"10px" }}>
                              Edit
                            </th>
                            <th scope="col" style={{ color: "#2e6ca4", padding:"10px" }}>
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {offerData &&
                          Array.isArray(offerData) &&
                          offerData.length > 0 ? (
                            offerData.map((offer) => (
                              <tr style={{padding:"10px"}} key={offer._id}>
                                <th style={{padding:"10px"}} scope="row">{offer.offerID}</th>
                                <td style={{padding:"10px"}}>{offer.offerTitle}</td>
                                <td style={{padding:"10px"}}>
                                  {new Date(
                                    offer.offerValidity
                                  ).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                  })}
                                </td>

                                <td style={{padding:"10px"}}>{getDaysLeft(offer.offerValidity)}</td>

                                <td style={{padding:"10px"}}>
                                  <MdEdit
                                    style={{
                                      color: "#008080",
                                      fontSize: "24px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      navigateToEditPostPage(
                                        offer.offerID,
                                        offer._id
                                      )
                                    }
                                  />
                                </td>
                                <td style={{padding:"10px"}}>
                                  <MdDeleteForever
                                    style={{
                                      color: "#ff6f3c",
                                      fontSize: "24px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      handleDeleteOffer(
                                        offer.offerID,
                                        offer,
                                        getOfferData
                                      )
                                    }
                                  />
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" style={{ color: "#2e6ca4" }}>
                                No offers Posted !
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <Button
                      variant="primary"
                      className="button"
                      type="submit"
                      onClick={() => logOut()}
                    >
                      Log Out
                    </Button>
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

export default UserProfile;
