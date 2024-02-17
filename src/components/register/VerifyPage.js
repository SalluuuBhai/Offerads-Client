import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import offerads from "../../assets/Offerads.png";
import axios from "axios";
import ReactConfetti from 'react-confetti'

const VerifyPage = () => {
//   const { id } = useParams();
//   console.log(id);

//   const verify = async () => {
//     let payload = { id };
//     // await axios.post('http://localhost:8000/users/send-verification-email', payload);
//     let res = await axios.post(
//       `http://localhost:8000/users/send-verification-email`,
//       payload,
//       {
//         headers: { Authorization: `Bearer ${id}` },
//       }
//     );
//   };

//   useEffect(() => {
//     if (id !== undefined) {
//       verify();
//     }
//   }, [id]);

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
                <div className="text-center mt-3">
                  <h5 >Thank you for Registered in Offerads ❤️️❤️️❤️️</h5>
                  <p className="para">Email Verification Link has been Successfully send to your email..!</p>
                  <p className="para">Please open your email and verify the link.</p>

                  {/* <Link to="/login">Back to Login</Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifyPage;
