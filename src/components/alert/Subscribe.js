import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import Modal from "react-modal";
import { IoCloseSharp } from "react-icons/io5";
import "./AlertBox.css";
import ReactConfetti from "react-confetti";
import axios from "axios";

import { baseURL } from "../../api/api";
const apiBaseUrl = baseURL;

Modal.setAppElement('#root');

const SubscribeAlert = ({ title }) => {
  const location = useLocation();
  const { pathname } = location;
  const userID = pathname.split("/")[2] || null;

  const [showModal, setShowModal] = useState(true);
  const [userName, setUserName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const [subscriptionMessage2, setSubscriptionMessage2] = useState("");
  const [showDiv1, setShowDiv1] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Clear email error if validation passes
    setEmailError("");

    if (userName && mobileNumber && email) {
      const customerData = {
        userID,
        userName: userName,
        mobileNumber: mobileNumber,
        email: email,
        shopName: title,
      };
      try {
        const response = await axios.post(
          `${apiBaseUrl}/customer/customerdetails`,
          customerData
        );
      
        if (response && response.status === 201) {
          setShowDiv1(true);
          setSubscriptionMessage(response.data.message);
        } else {
          setSubscriptionMessage(response ? response.data.message : "Unknown error");
        }
      } catch (error) {
        setSubscriptionMessage(error.response ? error.response.data.message : "Unknown error");
      }
    }

    setUserName("");
    setMobileNumber("");
    setSubmitted(true);
  };

  const isFormValid = () => {
    return userName.trim() !== "" && mobileNumber.trim() !== "";
  };

  const closeModal = () => {
    // Add any additional cleanup logic here
    setShowModal(false);
  };

  return (
    <div className="subscribe-alert-container">
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Subscription Form"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "400px",
            width: "100%",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            backgroundColor: "#F6F5F5",
            minHeight: "350px",
          },
        }}
      >
        <button className="close-button" onClick={closeModal}>
          <IoCloseSharp />
        </button>
        {submitted ? (
          showDiv1 ? (
            <div>
              <ReactConfetti style={{ width: "380px", height: "400px" }} />
              <h5 className="heading" style={{ margin: "15px 0px" }}>
                Thank you for subscribing!
              </h5>
              <p>
                Your subscription is confirmed. You will receive updates from{" "}
                {title}'s offers.
              </p>
              <p>{subscriptionMessage}</p>
            </div>
          ) : (
            <>
            <p style={{marginTop:"25%"}}>{subscriptionMessage}</p>
            <p>in {title}'s offers.</p>
            <p>Thank You...</p>
            </>
          )
        ) : (
          <>
            <h5 style={{ margin: "15px 0px" }}>
              Subscribe to <br />
              {title}'s <br />
              Offers
            </h5>
            <Form className="container-lg">
              <div className="user-form">
                <InputGroup className="mb-3">
                  <FormControl
                    className="form-control"
                    type="text"
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </InputGroup>
              </div>

              <div className="user-form">
                <InputGroup className="mb-3">
                  <FormControl
                    className="form-control"
                    type="number"
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
                </InputGroup>
              </div>

              <div className="user-form">
                <InputGroup className="mb-3">
                  <FormControl
                    className="form-control"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    isInvalid={!!emailError}
                    required
                  />
                  <FormControl.Feedback type="invalid">
                    {emailError}
                  </FormControl.Feedback>
                </InputGroup>
              </div>

              <Button
                variant="primary"
                className="button"
                type="submit"
                style={{ backgroundColor: "#0C359E", marginTop: "5px" }}
                onClick={handleSubscribe}
                disabled={!isFormValid() || !!emailError}
              >
                Subscribe
              </Button>
            </Form>
          </>
        )}
      </Modal>
    </div>
  );
};

export default SubscribeAlert;
