import React, { useState, useEffect } from "react";
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
import { storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { forgotPassword } from "../../api/api";
import offerads from "../../assets/Offerads.png";
import { IoIosAlert } from "react-icons/io";
import { FaSmile } from "react-icons/fa";
import { MdBrowserUpdated } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import "./UserProfile.css";

import {baseURL} from "../../api/api"
const apiBaseUrl = baseURL 

const AddPost = () => {
  const [offerTitle, setOfferTitle] = useState("");
  const [offerContent, setOfferContent] = useState("");
  const [offerValidity, setOfferValidity] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({});

  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  const [img, setImg] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const userID = userData._id;
  // console.log(userID);
  const token = location.state?.token || localStorage.getItem("Token");
  // console.log(token);

  const getUserData = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/users/getuser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response);
      // toast.success(response.data.message);
      setUserData(response.data.user);
    } catch (error) {
      // toast.error(error.response.data.message);
      // handleError(error);
    }
  };
  const getOfferData = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/users/getuser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response);
      // toast.success(response.data.message);
      setUserData(response.data.user);
    } catch (error) {
      // toast.error(error.response.data.message);
      // handleError(error);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (offerTitle && offerContent && offerValidity) {
      try {
        // Check if the image is uploaded before attempting to publish
        if (!imageUploaded) {
          toast.error("Please upload an image before publishing.");
          return;
        }
  
        const offerPostData = {
          offerTitle,
          offerContent,
          offerValidity,
          image: imageUrl,
          userID,
        };
        // console.log(offerPostData)
  
        const response = await axios.post(
          `${apiBaseUrl}/offers/offerpost`,
          offerPostData
        );
  
        toast.success("Post published successfully!");
        navigate(`/userprofile/${userData._id}`);
      } catch (error) {
        // console.error("Error:", error);
        toast.error("Failed to publish post.");
      }
    } else {
      toast.error("Please fill in all the required fields.");
    }

    
  };



  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async (userId) => {
    try {
      setUploading(true);

      if (image) {
        const storageRef = ref(
          storage,
          `addsImages/${userData._id}_${userData.shopName}_${image.name}`
        );
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        setImageUrl(downloadURL);
        setImageUploaded(true);
        toast.success("Image uploaded successfully!");
        
      } else {
        toast.error("No image selected.");
      }

      setUploading(false);
    } catch (error) {
      // console.error(error);
      toast.error("Image upload failed");
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUserData();
      

    }
  }, [token]);

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
                <h1 className="heading">Add Post</h1>

                <Form
                  className="container-lg  offer_form"
                >
                  <div className="offer-form">
                    <Form.Group
                      controlId="formOfferTitle"
                      style={{ textAlign: "left" }}
                    >
                      <Form.Label>Offer Title*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Add Post Title"
                        name="offerTitle"
                        value={offerTitle}
                         onChange={(e) => setOfferTitle(e.target.value)}
                        style={{ border: " 1px solid #2e6ca4" }}
                      />
                    </Form.Group>
                  </div>

                  <div className="offer-form">
                    <Form.Group
                      controlId="formOfferContent"
                      style={{ textAlign: "left" }}
                    >
                      <Form.Label>Offer Description*</Form.Label>
                      <Form.Control
                        type="text"
                        as="textarea"
                        rows={3}
                        placeholder="Write Your Offer Description..."
                        name="offerContent"
                        value={offerContent}
                        onChange={(e) => setOfferContent(e.target.value)}
                        style={{ border: " 1px solid #2e6ca4" }}
                      />
                    </Form.Group>
                  </div>

                  <div className="offer-form">
                    <Form.Group
                      controlId="formOfferValidity"
                      style={{ textAlign: "left" }}
                    >
                      <Form.Label>Offer Valid to*</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Write tour Content..."
                        name="offerValidity"
                        value={offerValidity}
                        onChange={(e) => setOfferValidity(e.target.value)}
                        style={{ border: " 1px solid #2e6ca4" }}
                      />
                    </Form.Group>
                  </div>

                  {/* <div className="offer-form">
                    <Form.Group
                      controlId="formImageUpload"
                      style={{ textAlign: "left" }}
                    >
                      <Form.Label>Offer Ads Image*</Form.Label>
                      <FormControl
                        className="form-control"
                        type="file"
                        onChange={handleChange}
                        style={{ border: " 1px solid #2e6ca4" }}
                      />
                    </Form.Group>
                  </div> */}

                  <div className="offer-form">
                    <Form.Group controlId="formImageUpload" style={{ textAlign: "left" }}>
                      <Form.Label>Offer Ads Image*</Form.Label>
                      <InputGroup className="mb-3">
                        <FormControl
                          className="form-control"
                          type="file"
                          onChange={handleFileChange}
                          style={{ border: "1px solid #2e6ca4" }}
                          // style={{ border: isUploading ? "1px solid #2e6ca4" : (imageUploaded ? "1px solid green" : "1px solid red") }}

                        />
                        <InputGroup.Text
                          className="icon"
                          style={{ cursor: "pointer", border: "1px solid #2e6ca4" }}
                          onClick={!isUploading ? uploadImage : null}
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <AiOutlineLoading3Quarters 
                            className="rotating-icon" />
                          ) : (
                            <MdBrowserUpdated
                              style={{ fontSize: "25px", cursor: "pointer" }}
                              onClick={!isUploading ? uploadImage : null}
                            />
                          )}
                          {isUploading ? "Uploading..." : "Upload"}
                        </InputGroup.Text>
                      </InputGroup>
                      {/* Additional UI for showing success message */}
                      {imageUploaded && (
                      <div className="alert-container">
                        <p className="alert-msg" style={{ color: "green" }}>
                          Image Uploaded Successful
                        </p>
                        <FaSmile
                          style={{ color: "green", marginLeft: "5px" }}
                        />
                        {/* <img
                          src={imageUrl}
                          alt="Uploaded Profile"
                          className="uploaded-image"
                          style={{width:"30px"}}
                        /> */}
                      </div>
                    )}
                    </Form.Group>
                  </div>
                 

                  <Button
                    variant="primary"
                    className="button"
                    style={{ margin: "20px 0px 20px 0px" }}
                    type="submit"
                    onClick={!isLoading ? handlePublish : null}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Publish"}
                  </Button>

                  {/* <Button
                    variant="primary"
                    className="button"
                    style={{ margin: "20px 0px 20px 0px" }}
                    type="submit"
                    onClick={!isLoading ? handleUpdate : null}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Update"}
                  </Button> */}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddPost;
