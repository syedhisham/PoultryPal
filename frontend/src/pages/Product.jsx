import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AxiosRequest } from "../AxiosRequest/AxiosRequest";
import { Button, Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react"; // Import Card components from Material Tailwind
import { HiPlus, HiMinus } from "react-icons/hi"; // Import icons for increment and decrement
import { useSelector } from "react-redux";
import { selectEmail } from "../redux/emailSlice";
import { selectToken } from "../redux/tokenSlice";
import { selectRole } from "../redux/roleSlice";

const Product = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const category = location.state?.category || "All";
const storedEmail = localStorage.getItem("email");
const email = useSelector(selectEmail) || storedEmail;
const storedToken = localStorage.getItem("token");
const token = useSelector(selectToken) || storedToken;
const role = useSelector(selectRole);
const isCustomer = role === 'Customer';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await AxiosRequest.get(`/api/products/product/${category}`);
        setProducts(response.data.map(product => ({ ...product, quantity: 1 }))); // Initialize quantity for each product
        console.log("This is price",products);
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  const handleAddToCart = async (product) => {
    try {
      // Validate product and email before making the request
      if (!product || !email) {
        console.error("Product or email not defined.");
        return;
      }

      // Make POST request to add product to cart
      const res = await AxiosRequest.post("/api/cart/add-to-cart", {
        userEmail: email,
        products: [
          {
            product: { _id: product._id },
            quantity: product.quantity, // Use the specific quantity of the product
          },
        ],
      });
      console.log("Product added to cart:", res.data);
      // Optionally show a success message or update UI
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // Handle error, show error message or log it
    }
  };

  const handleIncrement = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity += 1;
    setProducts(updatedProducts);
  };

  const handleDecrement = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
      setProducts(updatedProducts);
    }
  };

  return (
    <div>
      <header className="w-full bg-red-500 text-white py-6 mt-[2vh] mb-[4vh] shadow-md bg-opacity-90">
        <h1 className="text-5xl font-bold text-center">
          Products in Category: {category}
        </h1>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8 mx-auto max-w-8xl px-4 gap-10">
        {products.map((product, index) => (
          <Card key={product._id} className="min-h-screen">
            <CardHeader shadow={true} floated={false}  >
              <img
                className="w-full h-[40vh] object-cover"
                src={product.image}
                alt={product.name}
              />
            </CardHeader>
            <CardBody>
              <div className="mb-2 gap-3 flex flex-col items-center justify-between w-full">
                <h3 className="text-xl font-bold text-black">{product.name}</h3>
                <p className="text-black">{product.description}</p>
                <p className="mt-2 text-lg font-semibold text-black">
                  PKR {product.price} {product.category === 'Feed'? 'per 50 kgs' : product.category === 'Fresh and Specialty Eggs'?'per dozen':''}
                </p>
              </div>
            </CardBody>
            {(isCustomer && token) &&(
              <>
            <CardBody>
              <div className="flex items-center justify-center p-4">
                <button
                  className="p-2 rounded-full bg-red-200 text-white hover:bg-red-300 mr-2"
                  onClick={() => handleDecrement(index)}
                >
                  <HiMinus />
                </button>
                <span className="text-xl font-semibold">{product.quantity}</span>
                <button
                  className="p-2 rounded-full bg-red-200 text-white hover:bg-red-300 ml-2"
                  onClick={() => handleIncrement(index)}
                >
                  <HiPlus />
                </button>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                ripple={false}
                onClick={() => handleAddToCart(product)}
                fullWidth={true}
                className="text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 bg-red-200"
              >
                Add to Cart
              </Button>
            </CardFooter>
            </>
        )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Product;
