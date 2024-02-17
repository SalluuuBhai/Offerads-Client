import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  Container,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import offerads from "../assets/Offerads.png";
import { IoIosAlert } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../api/api";
const apiBaseUrl = baseURL;

const ResendVerificationEmail = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email is provided
    if (!email) {
      // alert("Please fill in all the required fields.");
      toast.error("Please fill in all the required fields.");
      // setShowAlert(true);
    } else {
      let payload = { email };
      try {
        let res = await axios.post(
          `${apiBaseUrl}/users/resend-verification-email`,
          payload
        );
        // console.log(res);
        localStorage.setItem("resetToken", res.data.token);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
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
                <h1 className="heading">Send Verfication</h1>
                <Form className="container-lg my-4" overflow-auto>
                  <h5
                    className="text-muted"
                    style={{ margin: "0px 0px 5px 0px" }}
                  >
                    Your Email is Not Verified !.
                  </h5>
                  <h5
                    className="text-muted"
                    style={{ margin: "5px 0px 5px 0px" }}
                  >
                    Please Enter your Registered Email for Verify.
                  </h5>
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
                  <p className="text-muted" style={{ margin: "20px" }}>
                    We'll send you a link to Verify your Email.
                  </p>

                  <Button
                    variant="primary"
                    className="button"
                    type="submit"
                    disabled={!isValidEmail}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>

                <div className="text-center mt-3">
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

export default ResendVerificationEmail;
