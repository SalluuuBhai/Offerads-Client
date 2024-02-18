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
import { IoIosAlert } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../../api/api";
import offerads from "../../assets/Offerads.png";

const apiBaseUrl = baseURL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please fill in all the required fields.");
    } else {
      setLoading(true);

      let payload = { email };
      try {
        let res = await axios.post(`${apiBaseUrl}/users/forgot-password`, payload);
        localStorage.setItem("resetToken", res.data.token);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
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
                <h1 className="heading">Forgot Password</h1>
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
                  <p className="text-muted" style={{ margin: "20px" }}>
                    We'll send you a link to reset your password.
                  </p>

                  <Button
                    variant="primary"
                    className="button"
                    type="submit"
                    disabled={!isValidEmail || loading}
                    onClick={handleSubmit}
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

export default ForgotPassword;
