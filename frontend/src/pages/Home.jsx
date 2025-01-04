import React, { useEffect, useState } from "react";
import backgroundImage1 from "../assets/backgroundImage1.png";
import backgroundImage7 from "../assets/backgroundImage7.jpeg";
import pattern9 from "../assets/pattern9.png";
import backgroundImage6 from "../assets/backgroundImage6.jpg";
import { AxiosRequest } from "../AxiosRequest/AxiosRequest";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail } from "../redux/emailSlice";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { setDataProduct } from "../redux/productSlice";

const HomeCard = ({ name, image, category, price, product, description }) => {
  const [quantity, setQuantity] = useState(1);
  const email = useSelector(selectEmail);

  const handleAddToCart = async () => {
    try {
      const res = await AxiosRequest.post("/api/cart/add-to-cart", {
        userEmail: email,
        products: [
          {
            product: { _id: product._id },
            quantity,
          },
        ],
      });
      console.log("Product added to cart:", res.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <Card className="h-[90%]">
      <CardHeader shadow={false} floated={false} className="h-3/5">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between  w-full">
          <Typography color="blue-gray" className="font-medium w-[70%]">
            <h3>{name}</h3>
            <p className="text-gray-400">{category}</p>
          </Typography>
          <Typography color="blue-gray" className="font-medium ">
            <p className=" w-full">PKR {price}</p>
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          <p>{description}</p>
        </Typography>
        <div className="mt-4 flex items-center">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-20 p-1 border rounded"
            min="1"
          />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          onClick={handleAddToCart}
          fullWidth={true}
          className=" text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 bg-red-200"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

const Home = () => {
  const [currentBackground, setCurrentBackground] = useState(backgroundImage7);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(productList);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await AxiosRequest.get("/product");
        const resData = res.data;
        dispatch(setDataProduct(resData));
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setCurrentBackground(backgroundImage1);
      } else {
        setCurrentBackground(backgroundImage7);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(productList);
    } else {
      setFilteredProducts(
        productList.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, productList]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  function CheckIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-3 w-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    );
  }

  return (
    <div className="h-[100vh] ">
      <div
        className="w-full h-full relative flex -mt-16 justify-between p-10 pt-20 space-x-4 "
        id="mainHome"
        style={{
          backgroundImage: `url(${pattern9})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "0.9",
          transition: "background-image 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className=" w-[70%] rounded-2xl "
          id="left"
          style={{
            backgroundImage: `url(${currentBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: "0.9",
            transition: "background-image 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <h1 className="text-6xl font-bold mt-24 ml-10 backdrop-blur-lg bg-white/50 w-80 rounded-lg text-center">
            Poultry<span className="text-red-700">Pal</span>
          </h1>
          <p className="mt-7 text-xl w-[50%]  ml-4 md:ml-20 backdrop-blur-lg bg-white/50 rounded-lg">
            Simplify your poultry operation. Streamline tasks and gain insights
            with our easy-to-use Poultry Farm Management System!
          </p>
          <Button color="red" className="mt-2 md:mt-6 ml-3 md:ml-24">
            color red
          </Button>
        </div>
        <div
          className="w-[15%]  flex flex-col justify-between space-y-5"
          id="mid"
        >
          <div className="h-1/2 ">
            <figure className="relative h-full w-full">
              <img
                className="h-full w-full rounded-2xl object-cover object-center"
                src={backgroundImage6}
                alt="nature"
              />
              <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white/10 pb-3 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Sara Lamalo
                  </Typography>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className=" h-1/2 hover:shadow-2xl border-t-2 border-red-500">
            <Card className="w-full h-full ">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  UI/UX Review Check
                </Typography>
                <Typography>
                  walk and near to &quot;Naviglio&quot; where you can enjoy the
                  main night life in Barcelona.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button>Read More</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="w-[15%]" id="right">
          <Card
            color="gray"
            variant="gradient"
            className="w-full max-w-[20rem] p-4 h-full"
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
            >
              <Typography
                variant="small"
                color="white"
                className="font-normal uppercase"
              >
                standard
              </Typography>
              <Typography
                variant="h1"
                color="white"
                className="mt-6 flex justify-center gap-1 text-7xl font-normal"
              >
                <span className="mt-2 text-4xl">$</span>29{" "}
                <span className="self-end text-4xl">/mo</span>
              </Typography>
            </CardHeader>
            <CardBody className="p-0">
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    5 team members
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    200+ components
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    40+ built-in pages
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    1 year free updates
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    Life time technical support
                  </Typography>
                </li>
              </ul>
            </CardBody>
            <CardFooter className="mt-12 p-0">
              <Button
                size="lg"
                color="white"
                className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                ripple={false}
                fullWidth={true}
              >
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>



      {/* ++++++++++++++Products+++++++++++ */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8 mt-20"
        id="filter"
      >
        <button
          onClick={() => handleCategoryFilter("all")}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === "all"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleCategoryFilter("Live Birds and Chicks")}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === "Live Birds and Chicks"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Live Birds and Chicks
        </button>
        <button
          onClick={() => handleCategoryFilter("Fresh and Specialty Eggs")}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === "Fresh and Specialty Eggs"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Fresh and Specialty Eggs
        </button>
        <button
          onClick={() => handleCategoryFilter("Feeds")}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === "Feeds"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Feeds
        </button>
        <button
          onClick={() => handleCategoryFilter("Housing and Equipments")}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === "Housing and Equipments"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Housing and Equipments
        </button>
        <button
          onClick={() => handleCategoryFilter("Beddings")}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === "Beddings"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Beddings
        </button>
        <button
          onClick={() =>
            handleCategoryFilter("Cleaning and Maintenance Supplies")
          }
          className={`px-4 py-2 rounded-md ${
            selectedCategory === "Cleaning and Maintenance Supplies"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Cleaning and Maintenance Supplies
        </button>
        <button
          onClick={() => handleCategoryFilter("Supplements")}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === "Supplements"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Supplements
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 p-8">
        {" "}
        {!loading && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <HomeCard
              key={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              category={product.category}
              product={product}
              description={product.description}
            />
          ))
        ) : (
          <p>No products to display.</p>
        )}{" "}
      </div>
    </div>
  );
};

export default Home;
