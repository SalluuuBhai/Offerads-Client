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
import { RiArrowGoBackFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import "./UserProfile.css";

import { baseURL } from "../../api/api";
const apiBaseUrl = baseURL;

const EditPost = () => {
  const [offerTitle, setOfferTitle] = useState("");
  const [offerContent, setOfferContent] = useState("");
  const [offerValidity, setOfferValidity] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({});
  const [offerData, setOfferData] = useState({});
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  const [img, setImg] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { pathname } = location;
  const offerFullID = pathname.split("/")[2] || null;
  const _id = offerFullID.split("-")[0];
  const offerID = offerFullID.split("-")[1];
  //   console.log(_id, offerID);

  const userID = userData._id;
  //   console.log(userID);
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
  const getOfferData = async (offerID) => {
    try {
      //   console.log(offerID);
      const response = await axios.get(
        `${apiBaseUrl}/offers/getoffer/${offerID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOfferData(response.data.offer);
      //   console.log(response.data.offer); // Log the offer data received
    } catch (error) {
      // Handle error, show toast, etc.
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    try {
      // Check if the image is uploaded before attempting to publish
      setLoading(true);
      const offerPostData = {
        offerTitle,
        offerContent,
        offerValidity,
        image: imageUrl,
      };

      // Make a PUT request to update the offer post
      const response = await axios.put(
        `${apiBaseUrl}/offers/offer-post-update/${offerID}`,
        { offerPostData }
      );

      toast.success("Post Updated Successfully!");
      navigate(`/userprofile/${userData._id}`);
    } catch (error) {
      // Handle error
      toast.error("Failed to Update post.");
    } finally {
      setLoading(false);
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
      getOfferData(offerID);
      getUserData();
    }
  }, [token, offerID]);

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
                <h1 className="heading">Edit Post</h1>

                <Form className="container-lg  offer_form">
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
                        defaultValue={offerData.offerTitle}
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
                        defaultValue={offerData.offerContent}
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
                        defaultValue={
                          offerData.offerValidity
                            ? new Date(offerData.offerValidity)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
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
                    <Form.Group
                      controlId="formImageUpload"
                      style={{ textAlign: "left" }}
                    >
                      <Form.Label>Offer Ads Image*</Form.Label>
                      <InputGroup className="mb-3">
                        {/* Display image inside the input field */}

                        <FormControl
                          className="form-control"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ border: "1px solid #2e6ca4" }}
                          defaultValue={offerData.image}
                        />
                        {!imageUploaded && (
                          <InputGroup.Text className="icon">
                            <img
                              src={offerData.image}
                              alt="Default Icon"
                              className="default-icon"
                              style={{
                                width: "30px",
                                overflow: "hidden",
                                height: "30px",
                                objectFit: "",
                              }}
                            />
                          </InputGroup.Text>
                        )}
                        <InputGroup.Text
                          className="icon"
                          style={{
                            cursor: "pointer",
                            border: "1px solid #2e6ca4",
                          }}
                          onClick={!isUploading ? uploadImage : null}
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <AiOutlineLoading3Quarters className="rotating-icon" />
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
                            Image Uploaded Successfully
                          </p>
                          <FaSmile
                            style={{ color: "green", marginLeft: "5px" }}
                          />
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
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>{" "}
                        Updating...
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  <Link
                    style={{ fontSize: "15px", textDecoration: "underline" }}
                    to={`/userprofile/${userData._id}`}
                  >
                    <RiArrowGoBackFill style={{ fontSize: "20px" }} /> Back to
                    Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditPost;
