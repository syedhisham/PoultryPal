import signUpImage1 from "../assets/signUpImage1.png";
import rightArrow from "../assets/rightArrow.png";
import React, { useState } from "react";
import loginSignupImage from "../assets/login-animation.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react"; // Import the Input component from Material Tailwind
// import './signUp.css';  // Import the CSS file
import { uploadImageToCloudinary } from "../utility/uploadImageToCloudinary";
import { AxiosRequest } from "../AxiosRequest/AxiosRequest";
import toast from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProfileImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      const imageUrl = await uploadImageToCloudinary(file);
      setData((preve) => {
        return {
          ...preve,
          image: imageUrl,
        };
      });
      console.log("Image URL", imageUrl);
    } catch (error) {
      console.error("Error uploading image to Cloudinary", error);
    }
  };


 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword, image } = data;
  
    // Validation logic
    if (!firstName || !email || !password || !confirmPassword || !image) {
      toast.error("All fields are required");
      return;
    }
  
    // Validate first and last name (should not start with a digit or special character)
    const nameRegex = /^[A-Za-z][A-Za-z0-9]*$/; // First character must be a letter, followed by letters or digits
    if (!nameRegex.test(firstName)) {
      toast.error("First name should not start with a digit or special character");
      return;
    }
  
    if (!nameRegex.test(lastName)) {
      toast.error("Last name should not start with a digit or special character");
      return;
    }
  
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
  
    // Form submission logic
    try {
      const response = await AxiosRequest.post("/api/user/signup", {
        firstName,
        lastName,
        email,
        password,
        image,
      });
  
      const dataRes = response.data;
      console.log(dataRes);
  
      if (response.status === 201) {
        toast.success(dataRes.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(error.response.data.message);
    }
  };
  

  return (
    <div className="p-3 md:p-4 flex mt-6 md:mt-10 font-mono">
      <div className="w-1/2">
        <img src={signUpImage1} alt="hen" className="ml-5 " />
        <div className="ml-20 mt-7">
          <h1 className="text-4xl font-serif font-bold">
            Poultry <span className="text-red-500">Pal</span>
          </h1>
          <p className="mt-2 ml-10 text-xl font-mono">
            Simplify your poultry operation. Streamline tasks and gain insights
            with our easy-to-use Poultry Farm Management System. Sign up today!
          </p>
        </div>
        <img src={rightArrow} alt="hen" className="w-10 h-10 mt-5 ml-40 " />
      </div>
      <div className="w-1/2 ">
        <div
          className="w-full max-w-md bg-white ml-20 drop-shadow-md flex items-center flex-col p-4  blur-red-circle border-2  shadow-2xl"
          id="1"
        >
          <form
            // action=""
            className="w-full py-3 flex flex-col space-y-6 mt-[2vh] "
            onSubmit={handleSubmit}
          >
            <div className="w-20 h-20 overflow-hidden drop-shadow-md rounded-full shadow-md relative m-auto ">
              <img
                src={data.image ? data.image : loginSignupImage}
                alt="loginSignupGif"
                className="w-full h-full"
              />

              <label htmlFor="profileImage">
                <div className="absolute bottom-0 h-1/3 bg-red-500 bg-opacity-50 text-white w-full text-center cursor-pointer transition-colors duration-300 ease-in-out hover:bg-red-700">
                  <p className="text-sm p-1">Upload</p>
                </div>
              </label>

              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleUploadProfileImage}
              />
            </div>

            <Input
              type={"text"}
              id="firstName"
              name="firstName"
              className="border-2 focus:bg-red-50 focus:ring-0 text-base sm:text-sm md:text-base lg:text-base"
              value={data.firstName}
              onChange={handleOnChange}
              label="First Name"
            />

            <Input
              type={"text"}
              id="lastName"
              name="lastName"
              className="border-2 focus:bg-red-50 focus:ring-0 text-base sm:text-sm md:text-base lg:text-base"
              value={data.lastName}
              onChange={handleOnChange}
              label="Last Name"
            />
            <Input
              type={"email"}
              id="email"
              name="email"
              className="border-2 focus:bg-red-50 focus:ring-0 text-base sm:text-sm md:text-base lg:text-base"
              value={data.email}
              onChange={handleOnChange}
              label="Email"
            />

            {/* <label htmlFor="password">Password</label> */}
            <div className="flex relative bg-slate-200 rounded">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="border-2 focus:bg-red-50 focus:ring-0 text-base sm:text-sm md:text-base lg:text-base"
                value={data.password}
                onChange={handleOnChange}
                label="Password"
              />
              <div className="absolute right-2 top-2">
                <span
                  className="flex text-xl cursor-pointer"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <BiShow /> : <BiHide />}
                </span>
              </div>
            </div>
            <div className="flex relative bg-slate-200 rounded">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="border-2 focus:bg-red-50 focus:ring-0 text-base sm:text-sm md:text-base lg:text-base"
                value={data.confirmPassword}
                onChange={handleOnChange}
                label="Confirm Password"
              />
              <div className="absolute right-2 top-2">
                <span
                  className="flex text-xl cursor-pointer"
                  onClick={handleShowConfirmPassword}
                >
                  {showConfirmPassword ? <BiShow /> : <BiHide />}
                </span>
              </div>
            </div>

            <button className="max-w-[120px] w-full bg-red-500 transition-colors duration-300 ease-in-out hover:bg-red-700 m-auto cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4" type="submit" onClick={handleSubmit}>
              Sign Up
            </button>
          </form>
          <p className="text-sm mt-1">
            Already have an account ?{" "}
            <Link
              to={"/login"}
              className="text-red-500 underline hover:text-red-700 transition-colors duration-200 ease-in-out"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
