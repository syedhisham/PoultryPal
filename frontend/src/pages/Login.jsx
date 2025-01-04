import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "../redux/emailSlice";
import loginSignupImage from "../assets/login-animation.gif";
import signUpImage1 from "../assets/signUpImage1.png";
import rightArrow from "../assets/rightArrow.png";
import { Input } from "@material-tailwind/react";
import { BiShow, BiHide } from "react-icons/bi";
import { jwtDecode } from "jwt-decode";
import { Checkbox } from "@material-tailwind/react";
import toast from 'react-hot-toast';
import { AxiosRequest } from "../AxiosRequest/AxiosRequest";
import { setTokenAction } from "../redux/tokenSlice";
import { setRole } from '../redux/roleSlice'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state);
  console.log(userData);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail && savedPassword) {
      setData({
        email: savedEmail,
        password: savedPassword,
      });
      setRememberMe(true);
    }
  }, []);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRememberMe = () => {
    setRememberMe((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data; // Make sure 'data' is defined and contains email and password
    if (email && password) {
      try {
        const response = await AxiosRequest.post('/api/user/login',
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );
  
        if (response.status === 200) {
  
          if (rememberMe) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
          } else {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
          }
  
          toast.success(response.data.message, {
            id: 'logged-in-successfully'
          });
          dispatch(setEmail(email));
          dispatch(setTokenAction(response.data.token));
          const role = response.data.role;
          dispatch(setRole(role));
          if(role === 'Customer'){
          navigate("/"); 
          }else if(role === 'Admin'){
            navigate("/add-employee");
          }else{
            navigate("/add-feed");
          }
        } 
      } catch (error) {
        console.error("Error during login:", error);
        toast.error(error.response.data.message);
        // toast.error("An error occurred while logging in");
      }
    } else {
      toast.error("All the fields are required");
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const userInfo = jwtDecode(token);
    console.log("Google login success:", userInfo);
    dispatch(setEmail(userInfo.email));
    navigate("/");
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login error:", error);
    alert("An error occurred while logging in with Google");
  };

  return (
    
    <div className="p-3 md:p-4 flex font-mono">
      <div className="w-1/2 ">
        <img src={signUpImage1} alt="hen" className="ml-5" />
        <div className="ml-20 mt-7">
          <h1 className="text-4xl font-serif font-bold">
            Poultry <span className="text-red-500">Pal</span>
          </h1>
          <p className="mt-2 ml-10 text-xl font-mono">
            Simplify your poultry operation. Streamline tasks and gain insights
            with our easy-to-use Poultry Farm Management System. Sign up today!
          </p>
        </div>
        <img src={rightArrow} alt="hen" className="w-10 h-10 mt-5 ml-40" />
      </div>
      <div className="w-1/2 ">
        <div className="w-full max-w-md bg-white ml-10 mt-20 drop-shadow-md flex items-center flex-col p-4 border-2">
          <div className="w-20 overflow-hidden drop-shadow-md rounded-full shadow-md">
            <img
              src={loginSignupImage}
              alt="loginSignupGif"
              className="w-full"
            />
          </div>
          <form
            action=""
            className="w-full py-3 flex flex-col space-y-6 mt-[2vh]"
            onSubmit={handleSubmit}
          >
            <Input
              type="email"
              id="email"
              name="email"
              className="border-2 focus:bg-red-50 focus:ring-0 text-base sm:text-sm md:text-base lg:text-base"
              value={data.email}
              onChange={handleOnChange}
              label="Email"
            />
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
            <div className="flex items-center justify-end">
            <p className="text-sm mt-1">
            Forgot your password?{" "}
            <Link
              to={"/forgot-password"}
              className="text-red-500 underline hover:text-red-700 transition-colors duration-200 ease-in-out"
            >
              Reset it here
            </Link>
          </p>
          </div>
            <div className="flex items-center">
            <Checkbox color="red"  value={rememberMe} defaultChecked onChange={handleRememberMe} id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <button className="max-w-[120px] w-full bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out m-auto cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
              Sign In
            </button>
          </form>
          <div>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              useOneTap
            />
          </div>
          <p className="text-sm mt-1">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-red-500 underline hover:text-red-700 transition-colors duration-200 ease-in-out"
            >
              Sign Up
            </Link>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
