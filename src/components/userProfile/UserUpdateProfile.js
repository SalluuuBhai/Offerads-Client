import React, { useState, useEffect } from "react";
// import {
//   getStorage,
//   ref,
//   getDownloadURL,
//   uploadBytesResumable,
//   deleteObject,
// } from "firebase/storage";
// import { imageDB } from "../Firebase";
import { storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
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
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { BsShop } from "react-icons/bs";
import {
  MdAddBusiness,
  MdOutlineAddBusiness,
  MdOutlineAlternateEmail,
  MdPhoneIphone,
} from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { VscKey } from "react-icons/vsc";
import { TfiLocationPin } from "react-icons/tfi";
import { CiMobile3 } from "react-icons/ci";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosAlert } from "react-icons/io";
import { FaSmile } from "react-icons/fa";

import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import "../register/Register.css";
import { register } from "../../api/api";
import offerads from "../../assets/Offerads.png";
import axios from "axios";
import { toast } from "react-toastify";
import profile from "../../assets/profile-img.webp";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { BsQrCode } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { TiUser } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { MdBrowserUpdated } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiArrowGoBackFill } from "react-icons/ri";

// import firebase from 'firebase/app';
// import 'firebase/storage';

import "./UserProfile.css";

import { baseURL } from "../../api/api";
const apiBaseUrl = baseURL;

// const { createVerificationToken } = require("../../utils/tokenUtils");

const UpdateProfile = () => {
  const { id } = useParams();
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopLocation, setShopLocation] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isValidMobileNumber, setIsValidMobileNumber] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const [isLoading, setLoading] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({});

  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  const [img, setImg] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // file crop
  const [file, setFile] = useState(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 });
  const [imageRef, setImageRef] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  const userID = userData._id;
  // console.log(userID);
  const token = location.state?.token || localStorage.getItem("Token");
  // console.log(token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUserData();
    }
  }, [token]);

  const getUserData = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/users/getuser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // toast.success(response.data.message);
      setUserData(response.data.user);
    } catch (error) {
      // toast.error(error.response.data.message);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async (userId) => {
    try {
      setUploading(true);

      if (image) {
        const storageRef = ref(
          storage,
          `profileImages/${userData._id}_${userData.shopName}_${image.name}`
        );
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        setImageUrl(downloadURL);
        setImageUploaded(true);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("No image selected.");
      }

      setUploading(false);
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
      setUploading(false);
    }
  };

  const updateUserProfile = async () => {
    try {
      setLoading(true);

      const updatedUserData = {
        shopName,
        shopAddress,
        shopLocation,
        mobileNumber,
        email: userData.email, // Keep the email unchanged
        profilePicture: imageUrl, // Updated profile picture URL
      };
      console.log(shopName, shopAddress);
      const response = await axios.put(`${apiBaseUrl}/users/update-profile`, {
        updatedUserData,
        id: userID,
      });

      console.log("Update response:", response.data);
      console.log("imageUrl:", imageUrl);
      toast.success(response.data.message);
      setLoading(false);
      navigate(`/userprofile/${userData._id}`);
    } catch (error) {
      console.error(
        "Update error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Update failed");
      setLoading(false);
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
                <h1 className="heading">Edit Profile</h1>
                <Form className="container-lg " overflow-auto>
                  <div className="user-form">
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="icon">
                        <BsShop className="icons" />
                      </InputGroup.Text>
                      <FormControl
                        className="form-control"
                        type="text"
                        placeholder="Change your Shop Name"
                        defaultValue={userData.shopName}
                        onChange={(e) => setShopName(e.target.value)}
                      />
                    </InputGroup>
                  </div>

                  <div className="user-form">
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="icon">
                        <MdOutlineAddBusiness />{" "}
                      </InputGroup.Text>
                      <FormControl
                        className="form-control"
                        type="text"
                        placeholder="Change your Shop Address"
                        defaultValue={userData.shopAddress}
                        onChange={(e) => setShopAddress(e.target.value)}
                      />
                    </InputGroup>
                  </div>

                  <div className="user-form">
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="icon">
                        <TfiLocationPin />
                      </InputGroup.Text>
                      <FormControl
                        className="form-control"
                        type="text"
                        placeholder="Change your Shop Location"
                        defaultValue={userData.shopLocation}
                        onChange={(e) => setShopLocation(e.target.value)}
                      />
                    </InputGroup>
                  </div>

                  <div className="user-form">
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="icon">
                        <MdPhoneIphone />
                      </InputGroup.Text>
                      <InputGroup.Text className="icon">+91</InputGroup.Text>
                      <FormControl
                        className="form-control"
                        type="number"
                        placeholder="Change your Mobile Name"
                        defaultValue={userData.mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        // onChange={handleMobileNumberChange}
                        // onChange={(e) => {
                        //   const inputValue = e.target.value;
                        //   // Ensure the value is numeric and within the specified limit
                        //   if (
                        //     /^\d+$/.test(inputValue) &&
                        //     inputValue.length <= 10
                        //   ) {
                        //     setMobileNumber(inputValue);
                        //   }
                        // }}
                        maxLength={10}
                      />
                    </InputGroup>
                    {/* {!isValidMobileNumber && (
                    <div className="invalid-feedback">
                      Please enter a valid 10-digit mobile number.
                    </div>
                  )} */}
                  </div>

                  <div
                    className="user-form"
                    style={{ cursor: "not-allowed !important" }}
                  >
                    <InputGroup
                      className="mb-3"
                      style={{ cursor: "not-allowed !important" }}
                    >
                      <InputGroup.Text
                        className="icon"
                        // style={{ borderColor: isValidEmail ? "" : "red" }}
                      >
                        <MdOutlineAlternateEmail />{" "}
                      </InputGroup.Text>
                      <FormControl
                        style={{
                          cursor: "not-allowed !important",
                          backgroundColor: "none",
                        }}
                        // style={{ borderColor: isValidEmail ? "" : "red" }}
                        className="form-control inputEmail"
                        type="email"
                        placeholder="Change Your Email"
                        defaultValue={userData.email}
                        // onChange={handleEmailChange}
                        disabled
                      />
                    </InputGroup>
                    {/* {!isValidEmail && (
                      <div className="alert-container">
                        <IoIosAlert className="alert-icon" />
                        <p className="alert-msg" style={{ color: "red" }}>
                          Invalid email address
                        </p>
                      </div>
                    )} */}
                  </div>

                  {/* <div className="user-form">
                    <InputGroup className="mb-3">
                      <InputGroup.Text
                        className="icon"
                        style={{
                          borderColor: isValidPassword ? "" : "red",
                        }}
                      >
                        <VscKey />{" "}
                      </InputGroup.Text>
                      <FormControl
                        style={{
                          borderColor: isValidPassword ? "" : "red",
                        }}
                        className="form-control inputClass"
                        type={showPassword ? "text" : "password"}
                        placeholder="Change Your Password"
                        defaultValue={password}
                        onChange={handlePasswordChange}
                      />

                      <InputGroup.Text
                        className="icon"
                        onClick={toggleShowPassword}
                        style={{
                          cursor: "pointer",
                          borderColor: isValidPassword ? "" : "red",
                        }}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                    {!isValidPassword && (
                      <div className="alert-container">
                        <IoIosAlert className="alert-icon" />
                        <p className="alert-msg" style={{ color: "red" }}>
                          Password Week !
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="user-form">
                    <InputGroup className="mb-3">
                      <InputGroup.Text
                        className="icon"
                        style={{
                          borderColor: passwordMatch ? "" : "red",
                        }}
                      >
                        <VscKey />{" "}
                      </InputGroup.Text>
                      <FormControl
                        style={{
                          borderColor: passwordMatch ? "" : "red",
                        }}
                        className="form-control inputClass2"
                        type={showPassword2 ? "text" : "password"}
                        placeholder="Confirm Password"
                        defaultValue={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />

                      <InputGroup.Text
                        className="icon"
                        onClick={toggleShowPassword2}
                        style={{
                          cursor: "pointer",
                          borderColor: passwordMatch ? "" : "red",
                        }}
                      >
                        {showPassword2 ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                    {!passwordMatch && (
                      <div className="alert-container">
                        <IoIosAlert className="alert-icon" />
                        <p className="alert-msg" style={{ color: "red" }}>
                          Passwords do not match
                        </p>
                      </div>
                    )}
                  </div> */}

                  <div className="user-form">
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="icon">
                        <CgProfile />
                      </InputGroup.Text>
                      <FormControl
                        className="form-control"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <InputGroup.Text
                        className="icon"
                        style={{ cursor: "pointer" }}
                        onClick={!isUploading ? uploadImage : null}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <AiOutlineLoading3Quarters className="rotating-icon" />
                        ) : (
                          <MdBrowserUpdated
                            style={{ fontSize: "25px", cursor: "pointer" }}
                            onClick={!isLoading ? uploadImage : null}
                          />
                        )}
                        {isUploading ? "Uploading..." : "Upload"}
                      </InputGroup.Text>
                    </InputGroup>
                    {imageUploaded && (
                      <div className="alert-container">
                        <p className="alert-msg" style={{ color: "green" }}>
                          Profile Uploaded Successful
                        </p>
                        <FaSmile
                          style={{ color: "green", marginLeft: "5px" }}
                        />
                        {/* <img
                          src={imageUrl}
                          alt="Uploaded Profile"
                          className="uploaded-image"
                          style={{width:"30px"}}
                        /> */}
                      </div>
                    )}
                  </div>

                  <Button
                    variant="primary"
                    className="button"
                    style={{ margin: "20px 0px 20px 0px" }}
                    type="submit"
                    onClick={!isLoading ? updateUserProfile : null}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>{" "}
                        Updating...
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  <Link
                    style={{ fontSize: "15px", textDecoration: "underline" }}
                    to={`/userprofile/${userData._id}`}
                  >
                    <RiArrowGoBackFill style={{ fontSize: "20px" }} />{" "}
                    Back to Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateProfile;
