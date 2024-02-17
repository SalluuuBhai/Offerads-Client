import React from 'react'
import BasicExample from '../navbar/Navbar'
import CollapsibleExample from "../navbar/Navbar1"
import Alert from '../alert/Alert'

const Offers = () => {
  return (
    <>
    <CollapsibleExample />
    {/* <BasicExample /> */}
    <Alert title="Offer Closed Soon" message="Hurry Up"  />
    <div>Offers Will Update soon</div>
    </>
  )
}

export default Offers

// import React, { useState } from "react";
// import { Form, Button, InputGroup, FormControl, Alert } from "react-bootstrap";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import { AiOutlineUser } from "react-icons/ai";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { login } from '../../api/api';

// const Offers = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isValidEmail, setIsValidEmail] = useState(true);
//   const [isValidPassword, setIsValidPassword] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       // If email or password is not filled, show the alert
//       setShowAlert(true);
//     } else {
//       try {
//         const loginData = {
//           email,
//           password,
//         };

//         const response = await login(loginData);

//         if (response.message === "Login Successful!") {
//           // Successful login
//           console.log("Login successful!");
//           setShowAlert(false); // Hide any previous alert
//           // Add any additional logic, such as redirecting the user or updating the UI
//         } else {
//           // Handle other status codes or error responses
//           console.error("Login failed:", response.data.message);
//           alert("Login failed. Please check your credentials and try again.");
//         }
//       } catch (error) {
//         // Handle network errors or other exceptions
//         console.error("Login error:", error.message);
//         alert("An error occurred during login. Please try again.");
//       }
//     }
//   };

//   const handleEmailChange = (event) => {
//     const newEmail = event.target.value;
//     setEmail(newEmail);

//     // Simple email validation using regular expression
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setIsValidEmail(emailRegex.test(newEmail));
//   };

//   const handlePasswordChange = (event) => {
//     const newPassword = event.target.value;
//     setPassword(newPassword);

//     // Password validation criteria
//     const hasUpperCase = /[A-Z]/.test(newPassword);
//     const hasLowerCase = /[a-z]/.test(newPassword);
//     const hasDigit = /\d/.test(newPassword);
//     const isLengthValid = newPassword.length >= 8;

//     // Check if all criteria are met
//     setIsValidPassword(hasUpperCase && hasLowerCase && hasDigit && isLengthValid);
//   };

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <>
//       <div className="container-sm">
//         <h1 className="heading">Login</h1>
//         {showAlert && (
//           <Alert
//             className="alert"
//             variant="danger"
//             onClose={() => setShowAlert(false)}
//             dismissible
//           >
//             Please fill in all the required fields.
//           </Alert>
//         )}
//         <Form className="container-lg my-4">
//           <InputGroup className="mb-3">
//             <InputGroup.Text className="icon">
//               <AiOutlineUser />
//             </InputGroup.Text>
//             <FormControl
//               className="form-control"
//               type="email"
//               placeholder="User Email"
//               value={email}
//               onChange={handleEmailChange}
//             />
//           </InputGroup>
//           {!isValidEmail && (
//             <p style={{ color: "red" }}>Invalid email address</p>
//           )}

//           <InputGroup className="mb-3">
//             <InputGroup.Text className="icon">
//               <RiLockPasswordLine />
//             </InputGroup.Text>
//             <FormControl
//               className="form-control"
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter Your Password"
//               value={password}
//               onChange={handlePasswordChange}
//             />

//             <InputGroup.Text
//               className="icon"
//               onClick={toggleShowPassword}
//               style={{ cursor: "pointer" }}
//             >
//               {showPassword ? (
//                 <AiOutlineEyeInvisible />
//               ) : (
//                 <AiOutlineEye />
//               )}
//             </InputGroup.Text>
//           </InputGroup>
//           {!isValidPassword && (
//             <p style={{ color: "red" }}>
//               Password must have at least 8 characters, including one uppercase
//               letter, one lowercase letter, and one digit.
//             </p>
//           )}

//           <Button
//             className="btn btn-primary btn-block"
//             variant="primary"
//             type="submit"
//             onClick={handleLogin}
//             disabled={!isValidEmail || !isValidPassword}
//           >
//             Log In
//           </Button>
//         </Form>

//         <div className="text-center mt-3">
//           <Link to="/reset">Forget Password</Link>

//           <p className="para">
//             Don't have an account? <Link to="/register">Register</Link>
//           </p>
//           <Link to="/">Back to Home</Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Offers;
