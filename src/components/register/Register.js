import React, { useState, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import "../register/Register.css";
import { register } from "../../api/api";
import offerads from "../../assets/Offerads.png";
import axios from "axios";
import { toast } from "react-toastify";
import profile from "../../assets/profile-img.webp";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { BsQrCode } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import {baseURL} from "../../api/api"

const apiBaseUrl = baseURL 
// const { createVerificationToken } = require("../../utils/tokenUtils");

const Register = () => {
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
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (
      email &&
      password &&
      mobileNumber &&
      shopName &&
      shopAddress &&
      shopLocation &&
      confirmPassword
    ) {
      // Check if both email and password are valid before performing signup logic
      if (isValidEmail && isValidPassword && passwordMatch) {
        // const verificationToken = createVerificationToken();
        setLoading(true);
        try {
          const registrationData = {
            shopName,
            shopAddress,
            shopLocation,
            mobileNumber,
            email,
            password,
            // verificationToken
          };
          await new Promise((resolve) => setTimeout(resolve, 2000));
          // Assuming register returns a promise
          const response = await axios.post(
            `${apiBaseUrl}/users/register`,
            registrationData
          );
          
          toast.success(response.data.message);
          localStorage.setItem("Token", response.data.token);
          navigate("/verifypage");

          // console.log("Message:", response);
          setLoading(false);
        } catch (error) {
          console.log("Registration error:", error.response.data.message);
          toast.error(error.response.data.message);
        }
      } else {
        console.log("Invalid email or password");
        toast.error("Invalid email or password");
      }
    } else {
      toast.error("Please fill in all the required fields.");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValidEmail(validateEmail(event.target.value));
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsValidPassword(validatePassword(event.target.value));
    setPasswordMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(password === event.target.value);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const isLengthValid = password.length >= 8;
    return hasUpperCase && hasLowerCase && hasDigit && isLengthValid;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
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
                <h1 className="heading">Register</h1>
                <Form className="container-lg " overflow-auto>
                  <div className="user-form">
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="icon">
                        <BsShop className="icons" />
                      </InputGroup.Text>
                      <FormControl
                        className="form-control"
                        type="text"
                        placeholder="Enter your Shop Name"
                        value={shopName}
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
                        placeholder="Enter your Shop Address"
                        value={shopAddress}
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
                        placeholder="Enter your Shop Location"
                        value={shopLocation}
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
                        placeholder="Enter your Mobile Name"
                        value={mobileNumber}
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

                  <div className="user-form">
                    <InputGroup className="mb-3">
                      <InputGroup.Text
                        className="icon"
                        style={{ borderColor: isValidEmail ? "" : "red" }}
                      >
                        <MdOutlineAlternateEmail />{" "}
                      </InputGroup.Text>
                      <FormControl
                        style={{ borderColor: isValidEmail ? "" : "red" }}
                        className="form-control inputEmail"
                        type="email"
                        placeholder="Enter Your Email ID"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </InputGroup>
                    {!isValidEmail && (
                      <div className="alert-container">
                        <IoIosAlert className="alert-icon" />
                        <p className="alert-msg" style={{ color: "red" }}>
                          Invalid email address
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="user-form">
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
                        placeholder="Enter Your Password"
                        value={password}
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
                        value={confirmPassword}
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
                  </div>

                  <Button
                    variant="primary"
                    className="button"
                    type="submit"
                    onClick={!isLoading ? handleSignup : null}
                    disabled={
                      !isValidEmail ||
                      !isValidPassword ||
                      !passwordMatch ||
                      isLoading
                    }
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>{" "}
                        Loading...
                      </>
                    ) : (
                      "Register"
                    )}
                  </Button>
                </Form>

                <div className="text-center bottom">
                  <p className="para">
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                  <Link to="/">Back to Home</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
