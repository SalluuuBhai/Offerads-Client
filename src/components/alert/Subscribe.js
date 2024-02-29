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

const SubscribeAlert = ({ title }) => {
  const location = useLocation();
  const { pathname } = location;
  const userID = pathname.split("/")[2] || null;

  const [showModal, setShowModal] = useState(true);
  const [userName, setUserName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const [subscriptionMessage2, setSubscriptionMessage2] = useState("");
  const [showDiv1, setShowDiv1] = useState(false);
  // const [showDiv2, setShowDiv2] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (userName && mobileNumber) {
      const customerData = {
        userID,
        userName: userName,
        mobileNumber: mobileNumber,
        shopName: title,
      };
      // console.log(customerData);
      try {
        const response = await axios.post(
          `${apiBaseUrl}/customer/customerdetails`,
          customerData
        );
      
        if (response && response.status === 201) {
          // Corrected: Use setShowDiv1 instead of showDiv1
          setShowDiv1(true);
          setSubscriptionMessage(response.data.message);
        } else {
          setSubscriptionMessage(response ? response.data.message : "Unknown error");
        }
      
        // Handle the response as needed
      } catch (error) {
        // showDiv2(true)
        // console.error("Error during subscription:", error);
        setSubscriptionMessage(error.response ? error.response.data.message : "Unknown error");
        // Handle errors here
      }
    }

    // Perform subscription logic here
    // You can send the data to your server or handle it as needed

    // For this example, we will just show a native alert
    // const message = `Thank you for subscribing!\nUser Name: ${userName}\nMobile Number: ${mobileNumber}`;
    // window.alert(message);

    // Clear input fields after alert
    setUserName("");
    setMobileNumber("");
    setSubmitted(true);
  };

  const isFormValid = () => {
    return userName.trim() !== "" && mobileNumber.trim() !== "";
  };

  return (
    <div className="subscribe-alert-container">
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
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
        <button className="close-button" onClick={() => setShowModal(false)}>
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
            <p style={{marginTop:"30%"}}>{subscriptionMessage}</p>
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
              <Button
                variant="primary"
                className="button"
                type="submit"
                style={{ backgroundColor: "#0C359E", marginTop: "5px" }}
                onClick={handleSubscribe}
                disabled={!isFormValid()}
              >
                Subscribe
              </Button>
            </Form>
            {/* <p>ID: {userID}</p> */}
          </>
        )}
      </Modal>
    </div>
  );
};

export default SubscribeAlert;
