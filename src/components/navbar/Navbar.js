import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../navbar/Navbar.css";
import Offeradslogo from "../../assets/Offerads-logo.webp";
// import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
  return (
    <Navbar expand="lg" className="navbar-1 navbar  text-dark" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #2e6ca4" }}>
      <Container>
        {/* <Navbar.Brand className='nav-title'>Offerads</Navbar.Brand> */}
        <img
          src={Offeradslogo}
          to="/"
          alt="Offerads Logo"
          className="img-fluid "
          style={{ width: "180px" }}
        />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="nav-grps justify-content-around"
          style={{ color: "#2e6ca4" }}
        >
          <Nav
            className="nav-links justify-content-around"
            style={{ color: "#2e6ca4" }}
          >
            <Link to="/" className="home">
              Home
            </Link>
          </Nav>
          <Nav
            className="nav-links justify-content-around"
            style={{ color: "#2e6ca4" }}
          >
            <Link to="/offers" className="offers">
              Offers
            </Link>
          </Nav>
          <Nav className="nav-links justify-content-around">
            <Link to="/about" className="about">
              About
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="nav-grps justify-content-around"
        >
          <Nav className="nav-links justify-content-around">
            <Link to="/login" variant="outline-danger" className="login">
              Login
            </Link>
          </Nav>
          <Nav className="nav-links justify-content-around">
            <Link to="/register" variant="danger" className="register ">
              Register
            </Link>
          </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default BasicExample;
