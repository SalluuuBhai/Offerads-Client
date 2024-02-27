// Import necessary React and Bootstrap components
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { toast } from "react-toastify";
import offerads from "../../assets/Offerads.png";
import axios from "axios";
import { VscKey } from "react-icons/vsc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosAlert } from "react-icons/io";
import {
  Link,
  Navigate,
  useHistory,
  useNavigate,
  useParams,
} from "react-router-dom";
import "../register/Register.css";
import { resetPassword } from "../../api/api";
import { baseURL } from "../../api/api";
const apiBaseUrl = baseURL;
const ResetPassword = () => {
  // State to manage form input values

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false); 
  const { id } = useParams();
  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target.value)
    if (!password || !confirmPassword) {
      // alert("Please fill in all the required fields !");
      toast.error("Please fill in all the required fields.");
    } else {
      setLoading(true);
      // console.log(password);
      let payload = { password };
      let resetToken = localStorage.getItem("resetToken");
      // console.log(resetToken)
      try {
        let res = await axios.post(
          `${apiBaseUrl}/users/reset-password`,
          payload,
          {
            headers: { Authorization: `Bearer ${id}` },
          }
        );
        // console.log(res);
        toast.success(res.data.message);
        localStorage.removeItem("resetToken");
        navigate("/login");
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false); // Set loading to false when data loading is complete
      }
    }
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
                <h1 className="heading">Reset Password</h1>
                <Form className="container-lg " overflow-auto>
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
                          Password Weak !
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
                    onClick={handleSubmit}
                    disabled={!isValidPassword || !passwordMatch || loading} // Disable the button when loading is true
                    style={{ marginBottom: "25px" }}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>{" "}
                        Loading...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
