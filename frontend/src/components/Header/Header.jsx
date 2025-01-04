import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaCartPlus } from "react-icons/fa";
import logo3 from "../../assets/logo3.png";
import { AxiosRequest } from "../../AxiosRequest/AxiosRequest";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, clearEmail } from "../../redux/emailSlice";
import { logoutRedux } from "../../redux/userSlice";
import { Button } from "@material-tailwind/react";
import io from "socket.io-client";
import { removeTokenAction, selectToken } from "../../redux/tokenSlice";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const userData = useSelector((state) => ({
    email: state.email.email,
    user: state.user.user,
  }));
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const REACT_APP_ADMIN_EMAIL ='syedhishamshah27@gmail.com';
  const REACT_APP_ADMIN2_EMAIL ='ranasaimali1234@gmail.com';
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  console.log('Admin 1', REACT_APP_ADMIN_EMAIL);
  console.log('Admin 2', REACT_APP_ADMIN2_EMAIL);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await AxiosRequest.get(`/users/${email}`);
        setUser(response.data);
        console.log('User email:', email);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    };

      fetchUser();    
  }, [email,token]);

  useEffect(() => {
    const socket = io('http://localhost:5000'); // Adjust the URL as necessary

    socket.on('connect', () => {
      console.log('Connected to socket.io server');
      
      // Fetch initial cart data
      socket.emit('GET_CART', { userEmail: email });
    });

    socket.on('CART_UPDATED', (data) => {
      const count = data.data.products.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    });

    socket.on('CART_RESPONSE', (response) => {
      if (response.status === 200) {
        const count = response.data.products.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(count);
      } else {
        console.error('Error fetching cart:', response.message);
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket.io server');
    });

    socket.on('error', (error) => {
      console.error('Socket.io error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [email]);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(clearEmail());
    dispatch(removeTokenAction());
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    dispatch(logoutRedux());
    setUser(null);
    navigate("/home");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-100">
      <header className="fixed shadow-md w-full px-2 md:px-4 z-50 bg-black font-mono font-semibold">
        <div className="flex items-center h-full justify-between">
          <Link to={""}>
            <div className="h-16 py-3 md:py-1">
              <div className="h-full flex items-center">
                <img src={logo3} alt="Logo" className="h-full ml-5" />
                <div className="text-white text-xl font-bold">
                  <p>
                    Poultry<span className="text-red-500 ">Pal</span>
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-1 md:gap-8">
            <nav className="flex gap-2 md:gap-12 text-base md:text-xl  text-white">
              <Link
                to={""}
                className="hover:text-red-700 transition-colors duration-200 ease-in-out"
              >
                Home
              </Link>
              <Link
                to={"gallery"}
                className="hover:text-red-700 transition-colors duration-200 ease-in-out"
              >
                Gallery
              </Link>
              <Link
                to={"about"}
                className="hover:text-red-700 transition-colors duration-200 ease-in-out"
              >
                About
              </Link>
              <Link
                to={"contact"}
                className="hover:text-red-700 transition-colors duration-200 ease-in-out"
              >
                Contact
              </Link>
              <Link
                to={"lorem"}
                className="hover:text-red-700 transition-colors duration-200 ease-in-out"
              >
                Lorem
              </Link>
            </nav>
            <Link to="/cart" className="text-2xl relative text-white hover:text-red-700 transition-colors duration-200 ease-in-out cursor-pointer">
              <FaCartPlus color="white"/>
              <div className="absolute -top-1 -right-2 text-white bg-red-500 m-0 p-0 h-4 w-4 text-sm text-center rounded-full">
                {cartCount}
              </div>
            </Link>
            <div className="text-white" onClick={handleShowMenu} id="user">
              {user ? (
                <img
                  src={user.image}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover mr-5 cursor-pointer"
                />
              ) : (
                <div className="text-lg border-2 border-solid border-white p-1 rounded-full cursor-pointer mr-5 hover:text-red-700 transition-colors duration-200 ease-in-out">
                  <FaUserAlt />
                </div>
              )}
              {showMenu && (
                <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                  <Button
                    className="whitespace-nowrap text-white"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="whitespace-nowrap text-white mt-2"
                  >
                    Logout
                  </Button>
                  {email === REACT_APP_ADMIN_EMAIL || email === REACT_APP_ADMIN2_EMAIL ? (
                    <Link
                      to={"NewProduct"}
                      className="hover:text-red-700 transition-colors duration-200 ease-in-out text-black bg-red-200 rounded-lg mt-2 "
                    >
                      New Product
                    </Link>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
