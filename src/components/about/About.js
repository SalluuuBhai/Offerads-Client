import React from 'react'
import BasicExample from '../navbar/Navbar'
import CollapsibleExample from "../navbar/Navbar1"
import Alert from '../alert/Alert'

const About = () => {
  return (
    <>
    {/* <CollapsibleExample /> */}
    <BasicExample />
    {/* <Alert /> */}
    <div>About us Will Update soon</div>
    </>
  )
}

export default About

// import React, { useState } from 'react';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
// import { FormControl } from 'react-bootstrap';

// const FileUploadWithCrop = () => {
//   const [file, setFile] = useState(null);
//   const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 });
//   const [imageRef, setImageRef] = useState(null);
//   const [croppedImageUrl, setCroppedImageUrl] = useState(null);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const selectedFile = e.target.files[0];
//       setFile(URL.createObjectURL(selectedFile));
//     }
//   };

//   const handleImageLoaded = (image) => {
//     setImageRef(image);
//   };

//   const handleCropChange = (newCrop) => {
//     setCrop(newCrop);
//   };

//   const handleCropComplete = (crop) => {
//     if (imageRef && crop.width && crop.height) {
//       const croppedImageUrl = getCroppedImg(imageRef, crop);
//       setCroppedImageUrl(croppedImageUrl);
//     }
//   };

//   const getCroppedImg = (image, crop) => {
//     const canvas = document.createElement('canvas');
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     canvas.width = crop.width;
//     canvas.height = crop.height;
//     const ctx = canvas.getContext('2d');

//     ctx.drawImage(
//       image,
//       crop.x * scaleX,
//       crop.y * scaleY,
//       crop.width * scaleX,
//       crop.height * scaleY,
//       0,
//       0,
//       crop.width,
//       crop.height
//     );

//     return canvas.toDataURL('image/jpeg');
//   };

//   return (
//     <div>
//       <FormControl
//         className="form-control"
//         type="file"
//         onChange={handleFileChange}
//       />

//       {file && (
//         <div>
//           <ReactCrop
//             src={file}
//             crop={crop}
//             onImageLoaded={handleImageLoaded}
//             onComplete={handleCropComplete}
//             onChange={handleCropChange}
//           />

//           {croppedImageUrl && (
//             <img
//               alt="Crop"
//               style={{ maxWidth: '100%' }}
//               src={croppedImageUrl}
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUploadWithCrop;

// import React, { useState } from 'react';
// import { DragDropContainer, DropTarget } from 'react-drag-drop-files';
// import { FileUploader } from 'react-drag-drop-files';


// const About = () => {
//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   const handleDrop = (files, event) => {
//     setUploadedFiles(files);
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Image Uploader</h2>
//       <FileUploader
//         onChange={handleDrop}
//         onError={(error) => console.error('Error:', error)}
//         accepts={['image/*']}
//         multiple
//         maxFileSize={10000000} // Adjust the maximum file size as needed
//         maxFiles={5} // Adjust the maximum number of files as needed
//         minFileSize={0}
//         clickable
//       >
//         <div className="drop-area">
//           <p>Drag and drop images here or click to select files</p>
//         </div>
//       </FileUploader>

//       {uploadedFiles.length > 0 && (
//         <div className="mt-3">
//           <h4>Uploaded Images:</h4>
//           <ul>
//             {uploadedFiles.map((file, index) => (
//               <li key={index}>{file.name}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default About;

// import React, { useState } from "react";
// import { FileUploader } from "react-drag-drop-files";

// const fileTypes = ["JPG", "PNG", "GIF"];

// function DragDrop() {
//   const [file, setFile] = useState(null);
//   const handleChange = (file) => {
//     setFile(file[0]);
//   };
//   return (
//     <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
//   );
// }

// export default DragDrop;
// import React, { useState } from 'react';
// import { FileUploader } from 'react-drag-drop-files';

// const fileTypes = ['image/jpeg', 'image/png', 'image/gif'];

// const About = () => {
//   const [file, setFile] = useState(null);

//   const handleChange = (files) => {
//     setFile(files[0]); // Assuming you want to handle only one file, change as needed
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Image Uploader (Drag and Drop)</h2>
//       <FileUploader
//         onChange={handleChange}
//         name="file"
//         types={fileTypes}
//         accepts={['.jpg', '.jpeg', '.png', '.gif']}
//         multiple={false}
//         maxFileSize={10 * 1024 * 1024} // 10 MB
//         minFileSize={0}
//         clickable
//       >
//         <div className="drop-area">
//           <p>Drag and drop an image here or click to select a file</p>
//         </div>
//       </FileUploader>

//       {file && (
//         <div className="mt-3">
//           <h4>Uploaded Image Preview:</h4>
//           <img
//             src={URL.createObjectURL(file)}
//             alt="Uploaded"
//             className="img-fluid"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default About;



// import React, { useState } from 'react';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
// import { FormControl } from 'react-bootstrap';

// const About = () => {
//   const [file, setFile] = useState(null);
//   const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 });
//   const [imageRef, setImageRef] = useState(null);
//   const [croppedImageUrl, setCroppedImageUrl] = useState(null);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const selectedFile = e.target.files[0];
//       setFile(URL.createObjectURL(selectedFile));
//     }
//   };

//   const handleImageLoaded = (image) => {
//     setImageRef(image);
//   };

//   const handleCropChange = (newCrop) => {
//     setCrop(newCrop);
//   };

//   const handleCropComplete = (crop) => {
//     if (imageRef && crop.width && crop.height) {
//       const croppedImageUrl = getCroppedImg(imageRef, crop);
//       setCroppedImageUrl(croppedImageUrl);
//     }
//   };

//   const getCroppedImg = (image, crop) => {
//     const canvas = document.createElement('canvas');
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     canvas.width = crop.width;
//     canvas.height = crop.height;
//     const ctx = canvas.getContext('2d');

//     ctx.drawImage(
//       image,
//       crop.x * scaleX,
//       crop.y * scaleY,
//       crop.width * scaleX,
//       crop.height * scaleY,
//       0,
//       0,
//       crop.width,
//       crop.height
//     );

//     return canvas.toDataURL('image/jpeg');
//   };

//   return (
//     <div>
//       <FormControl
//         className="form-control"
//         type="file"
//         onChange={handleFileChange}
//       />

//       {file && (
//         <div>
//           <ReactCrop
//             src={file}
//             crop={crop}
//             onImageLoaded={handleImageLoaded}
//             onComplete={handleCropComplete}
//             onChange={handleCropChange}
//           />

//           {croppedImageUrl && (
//             <img
//               alt="Crop"
//               style={{ maxWidth: '100%' }}
//               src={croppedImageUrl}
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default About


// import React from 'react';
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,
//   MDBIcon,
//   MDBCheckbox
// }
// from 'mdb-react-ui-kit';

// function About() {
//   return (
//     <MDBContainer fluid>

//       <MDBRow className='d-flex justify-content-center align-items-center h-100'>
//         <MDBCol col='12'>

//           <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
//             <MDBCardBody className='p-5 w-100 d-flex flex-column'>

//               <h2 className="fw-bold mb-2 text-center">Sign in</h2>
//               <p className="text-white-50 mb-3">Please enter your login and password!</p>

//               <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg"/>
//               <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg"/>

//               <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

//               <MDBBtn size='lg'>
//                 Login
//               </MDBBtn>

//               <hr className="my-4" />

//               <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
//                 <MDBIcon fab icon="google" className="mx-2"/>
//                 Sign in with google
//               </MDBBtn>

//               <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
//                 <MDBIcon fab icon="facebook-f" className="mx-2"/>
//                 Sign in with facebook
//               </MDBBtn>

//             </MDBCardBody>
//           </MDBCard>

//         </MDBCol>
//       </MDBRow>

//     </MDBContainer>
//   );
// }

// export default About;



// import React, { useState } from "react";
// import { Form, Button, InputGroup, FormControl, Alert } from "react-bootstrap";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import { AiOutlineUser } from "react-icons/ai";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { register } from '../../api/api';

// const About = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isValidEmail, setIsValidEmail] = useState(true);
//   const [isValidPassword, setIsValidPassword] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       // If email or password is not filled, show the alert
//       setShowAlert(true);
//     } else {
//       try {
//         const registrationData = {
//           email,
//           password,
//         };

//         const response = await register(registrationData);

//         if (response.message === "User Registration Successful!") {
//           // Successful registration
//           console.log("Registration successful!");
//           setShowAlert(false); // Hide any previous alert
//           alert("Registration Successful. Please verify in the registered Email");
//         } else {
//           // Handle other status codes or error responses
//           console.error("Registration failed:", response.data.message);
//           alert("Registration failed. User may already exist.");
//         }
//       } catch (error) {
//         // Handle network errors or other exceptions
//         console.error("Registration error:", error.message);
//         alert("An error occurred during registration. Please try again.");
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
//         <h1 className="heading">Register</h1>
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
//             className="btn  btn-primary btn-block"
//             variant="primary"
//             type="submit"
//             onClick={handleSignup}
//             disabled={!isValidEmail || !isValidPassword}
//           >
//             Register
//           </Button>
//         </Form>

//         <div className="text-center mt-3">
//           <p className="para">
//             Already have an account? <Link to="/login">Login</Link>
//           </p>
//           <Link to="/">Back to Home</Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default About;
