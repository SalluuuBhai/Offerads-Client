import React from "react";
import img01 from "../../assets/img01.jpg";
import logo01 from "../../assets/logo01.png";
import logo02 from "../../assets/logo02.png";
import logo03 from "../../assets/logo03.png";
import logo04 from "../../assets/logo04.png";
import logo05 from "../../assets/logo05.png";
import logo06 from "../../assets/logo06.png";
import logo07 from "../../assets/logo07.png";
import logo08 from "../../assets/logo08.png";
import logo09 from "../../assets/logo09.png";
import "./LandingPage.css";
import BasicExample from "../navbar/Navbar";
import CollapsibleExample from "../navbar/Navbar1";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";

const logos = [logo01, logo02, logo03, logo04, logo05, logo06, logo07, logo08];

const currentYear = new Date().getFullYear();

const LandingPage = () => {
  return (
    <>
      <BasicExample />
      {/* <CollapsibleExample /> */}

      <div className="bg-image">
        <img src={img01} className="img-fluid" alt="Sample" />
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="row">
              <div className="col-xs-12 text-left">
                <h1 className="text-uppercase text-white mb-0">
                  It looks like it's
                </h1>
                <h1 className="text-uppercase mb-0" style={{ color: "#38E54D" }}>
                  been furnished
                </h1>
                <h1 className="text-uppercase text-white mb-0">
                  by discount
                </h1>
                <h1 className="text-uppercase text-white mb-0">
                  stores.
                </h1>
                <MDBBtn
                  className="m-2"
                  tag={Link}
                  outline
                  size="lg"
                  to="/login"
                  style={{ color: "white", borderColor: "white" }}
                >
                  Login
                </MDBBtn>
                <MDBBtn
                  className="m-2"
                  tag={Link}
                  outline
                  size="lg"
                  to="/register"
                  style={{ color: "white", borderColor: "white" }}
                  e
                >
                  Register
                </MDBBtn>
              </div>
            </div>
            {/* <p className='text-white mb-0' style={{ fontSize: '24px' }}>Can you see me?</p> */}
          </div>
        </div>
      </div>

      <section className="store-sec bg-grey pad-top-lg pad-bottom-lg">
        <div className="container-fluid">
          <div className="row" style={{ margin: "20px 10px" }}>
            <h3>
              More Than{" "}
              <span className="clr" style={{ color: "red" }}>
                3000+ Stores
              </span>{" "}
              In One Place!
            </h3>
            <p>Search your favourite store &amp; get many deals</p>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <ul className="list-unstyled store-logo d-flex flex-wrap">
                {logos.map((logo, index) => (
                  <li
                    key={index}
                    className="flex-fill p-2"
                    style={{ border: "1px solid grey", width: "150px" }}
                  >
                    <img
                      src={logo}
                      alt={`LOGO ${index + 1}`}
                      className="img-fluid"
                      style={{ maxWidth: "100%" }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <MDBFooter
        className="text-center text-white"
        style={{ backgroundColor: "#0a4275" }}
      >
        <MDBContainer className="p-4 pb-0">
          <section className="">
            <p className="d-flex justify-content-center align-items-center">
              <span className="me-3">Register for free</span>
              <Link to="/register">
                {" "}
                {/* Use Link for navigation */}
                <MDBBtn type="button" outline color="light" rounded>
                  Register
                </MDBBtn>
              </Link>
            </p>
          </section>
        </MDBContainer>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © {currentYear} Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            offerads
          </a>
        </div>
      </MDBFooter>
    </>
  );
};

export default LandingPage;
