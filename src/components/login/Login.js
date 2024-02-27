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
  Toast,
} from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAlert } from "react-icons/io";
import { VscKey } from "react-icons/vsc";
import {
  MdAddBusiness,
  MdOutlineAddBusiness,
  MdOutlineAlternateEmail,
  MdPhoneIphone,
} from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import "../login/Login.css";
import offerads from "../../assets/Offerads.png";
import { login } from "../../api/api";
import { toast } from "react-toastify";
import axios from "axios";
import {baseURL} from "../../api/api"

const apiBaseUrl = baseURL 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      // alert("Please fill in all the required fields.");
      toast.error("Please fill in all the required fields.");
    } else {
      try {
        setLoading(true);
        const loginData = { email, password };
        const res = await axios.post(`${apiBaseUrl}/users/login`, loginData);
        const { message, user, token } = res.data;
        if (user.verified) {
          toast.success(message);
          localStorage.setItem("Token", token);
          navigate(`/userprofile/${user.id}`);
          setLoading(false);
        } else {
          toast.error(
            "Email not verified. Please check your email for the verification link."
          );
          navigate("/resend-verification-email");
          setLoading(false);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        navigate("/login");
        setLoading(false);
        // console.error("Login error --:", error.message);
      }
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    // if (token) {
    //   localStorage.clear();
    // }
   
  }, []);

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
                <h1 className="heading">Login</h1>
                <Form className="container-lg my-4" overflow-auto>
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
                        className="icon "
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
                          Password Weak !
                        </p>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="primary"
                    className="button"
                    type="submit"
                    onClick={!isLoading ? handleLogin : null}
                    disabled={!isValidEmail || !isValidPassword || isLoading}
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
                      "Login"
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <Link to="/forgot-password">Forget Password</Link>

                  <p className="para">
                    Don't have an account? <Link to="/register">Register</Link>
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

export default Login;
