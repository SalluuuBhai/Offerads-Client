import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import offerads from "../assets/Offerads.png";
import axios from "axios";
import ReactConfetti from 'react-confetti'
import {baseURL} from "../api/api"
const apiBaseUrl = baseURL 

const VerificationEmail = () => {
  const { id } = useParams();
  console.log(id);

  const verify = async () => {
    let payload = { id };

    let res = await axios.post(
      `${apiBaseUrl}/users/send-verification-email`,
      payload,
      {
        headers: { Authorization: `Bearer ${id}` },
      }
    );
  };

  useEffect(() => {
    if (id !== undefined) {
      verify();
    }
  }, [id]);

  return (
    <>
      <section className="h-100 gradient-custom-2 section">
      <ReactConfetti />
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
                <div className="text-center mt-3">
                  <h1 className="heading">Email Verification Successful!</h1>
                  <p className="para">Your email has been successfully verified. 🎉🎉🎉</p>
                  <p className="para">Thank you for verifying your email!</p>

                  <Link to="/login">Back to Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerificationEmail;
