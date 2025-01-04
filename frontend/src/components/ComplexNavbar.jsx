import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import logo3 from "../assets/logo3.png";
import { useSelector } from "react-redux";
import { selectEmail } from "../redux/emailSlice";
import socket from '../utils/socket'; // Adjust the path to your `socket.js` file
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  Input,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { selectToken } from "../redux/tokenSlice";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import { selectRole } from "../redux/roleSlice";

export function ComplexNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const email = useSelector(selectEmail);
  const storedToken = localStorage.getItem('token');
const token = useSelector(selectToken) || storedToken;
const role = useSelector(selectRole);
console.log('Role',role);
  const isCustomer = role === 'Customer';
  
  const navListMenuItems = [
    {
      title: "Products",
      description: "Find the perfect solution for your needs.",
      icon: SquaresPlusIcon,
      route: '/product',
    },
    {
      title: "About Us",
      description: "Meet and learn about our dedication",
      icon: UserGroupIcon,
      route: '/about',
    },
    {
      title: "Blog",
      description: "Find the perfect solution for your needs.",
      icon: Bars4Icon,
      route: '/blogs',
    },
    {
      title: "Services",
      description: "Learn how we can help you achieve your goals.",
      icon: SunIcon,
      route: '/services',
    },
    {
      title: "FAQ'S",
      description: "Reach out to us for assistance or inquiries",
      icon: GlobeAmericasIcon,
      route: '/faqs',
    },
    {
      title: "Contact",
      description: "Find the perfect solution for your needs.",
      icon: PhoneIcon,
      route: '/contact',
    },
    {
      title: "News",
      description: "Read insightful articles, tips, and expert opinions.",
      icon: NewspaperIcon,
      route: '/news',
    },
    {
      title: "Special Offers",
      description: "Explore limited-time deals and bundles",
      icon: TagIcon,
      route: '/special-offers',
    },
  ];
  function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const navigate = useNavigate();
  
  
    const items = navListMenuItems;
  
    const handleMenuItemClick = (route) => {
      navigate(route);
    };
    const renderItems = items.map(
      ({ icon, title, description, route }, key) => (
        <MenuItem
          key={key}
          className="flex items-center gap-3 rounded-lg"
          onClick={() => handleMenuItemClick(route)}
        >
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      )
    );
  
    return (
      <React.Fragment>
        <Menu
          open={isMenuOpen}
          handler={setIsMenuOpen}
          offset={{ mainAxis: 20 }}
          placement="bottom"
          allowHover={true}
        >
          <MenuHandler>
            <Typography as="div" variant="small" className="font-medium">
              <ListItem
                className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
                selected={isMenuOpen || isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((cur) => !cur)}
              >
                Resources
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`hidden h-3 w-3 transition-transform lg:block ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`block h-3 w-3 transition-transform lg:hidden ${
                    isMobileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </ListItem>
            </Typography>
          </MenuHandler>
          <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
            <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
              {renderItems}
            </ul>
          </MenuList>
        </Menu>
        <div className="block lg:hidden">
          <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
        </div>
      </React.Fragment>
    );
  }
  
  function NavList() {
    return (
      <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          <Link to={"/"}>
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              Home
            </ListItem>
          </Link>
        </Typography>
        <NavListMenu />
        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          <Link to={"/contact"}>
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              Contact Us
            </ListItem>
          </Link>
        </Typography>
      </List>
    );
  }

  useEffect(() => {
    socket.emit('GET_CART', { userEmail: email });

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

    return () => {
      return () => {
        socket.off('CART_UPDATED');
        socket.off('CART_RESPONSE');
      };
    };
  }, [email,token]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    });
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);  

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setIsScrolled(true);
      // setNavbarWidth('max-w-screen-2xl');
    } else {
      setIsScrolled(false);
      // setNavbarWidth('max-w-screen-3xl');
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    
    <Navbar
      className={`${
        isScrolled ? "bg-white bg-opacity-50 shadow-xl" : "bg-white shadow-md"
      } ${
        isScrolled ? "max-w-screen-2xl h-16 flex flex-col justify-center" : "max-w-[90%] h-16 flex flex-col justify-center"
      } mx-auto p-2 transition-all duration-300 fixed z-50 top-0 left-0 right-0`}
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 flex justify-center items-center gap-2"
        >
          <a href="/">
            <img src={logo3} alt="" className="h-12" />
          </a>

          <p className="sm:text-sm md:text-[15px] lg:text-[15px]">PoultryPal</p>
          {/* <div className=" items-center gap-x-2 flex">
            <div className="relative flex sm:sm:w-[62%] md:min-w-[288px] lg:min-w-[288px] gap-2 md:w-max ">
              <Input
                type="search"
                placeholder="Search"
                containerProps={{
                  className:
                    "sm:sm:w-[90%] md:min-w-[288px] lg:min-w-[288px] sm:h-8 md:h-full lg:h-full",
                }}
                className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="!absolute left-3 sm:top-[10px] md:top-[13px] lg:top-[13px] ">
                <svg
                  width="13"
                  height="14"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                    fill="#CFD8DC"
                  />
                  <path
                    d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                    stroke="#CFD8DC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <Button
              size="md"
              className="rounded-md sm:h-8 md:h-full lg:h-full flex justify-center items-center sm:text-[11px] md:text-[12px] lg:text-[12px"
            >
              Search
            </Button>
          </div> */}
        </Typography>
        <div className="hidden xl:block">
          <NavList />
        </div>

        <div className="flex justify-center items-center space-x-4">
  <IconButton
    variant="text"
    color="blue-gray"
    className="xl:hidden"
    onClick={() => setOpenNav(!openNav)}
  >
    {openNav ? (
      <XMarkIcon className="h-6 w-6" strokeWidth={2} />
    ) : (
      <Bars3Icon className="h-6 w-6" strokeWidth={2} />
    )}
  </IconButton>
  <div className="hidden gap-2 lg:flex">
  {token ? null : (
<Button variant="contained" size="sm" onClick={handleLogin} className="bg-black text-white font-bold py-2 px-4 hover:shadow-black shadow-md rounded-lg">
Log In
</Button>
)
}
  </div>
  <div className="">
  {(isCustomer && token) &&(   
    <Link
      to="/cart"
      className="text-2xl relative text-white hover:text-red-700 transition-colors duration-200 ease-in-out cursor-pointer"
    >
      <FaCartPlus color="black" />
    {cartCount !==0 && (
      <div className="absolute -top-2 -right-3 text-white bg-red-500 m-0 p-0  w-[1.6vw] text-sm text-center rounded-full">
        {cartCount}
      </div>
    )}
    </Link>
  )}
  </div>
  {token ? (
  <div className="flex">
    <ProfileMenu />
  </div>
  ): null}
</div>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button variant="outlined" size="sm" color="blue-gray">
            Log In
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}

