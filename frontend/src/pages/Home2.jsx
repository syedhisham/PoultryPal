
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Blogs from "./Blogs";
import { AxiosRequest } from "../AxiosRequest/AxiosRequest";
import Carousels from "../components/Carousel/Carousel";
import Footer from "../components/Footer";

const fixedBgImage = "https://img.freepik.com/free-photo/photorealistic-view-rooster-with-beak-feathers_23-2151569849.jpg?t=st=1717967590~exp=1717971190~hmac=fb39eb6731bc4c67b5fe64e3b51c7886b518f3606caeed43f9acb619121b936c&w=1380"; // Replace with your actual background image URL

const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await AxiosRequest.get("/api/products/product");
        const uniqueCategories = [...new Set(response.data.map(product => product.category))];
        setCategories(["All", ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  // Function to handle category click
  const handleCategoryClick = (category) => {
    navigate('/product', { state: { category } });
  };

  return (
    <div className="mulish">
      <div
        className="relative min-h-screen bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${fixedBgImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-opacity-75 font-Mono">
          <header className="w-full bg-red-500 text-white py-6 shadow-md bg-opacity-90">
            <h1 className="text-5xl font-bold text-center">
              PoultryPal
            </h1>
          </header>

          <main className="flex flex-col items-center mt-8 px-4 container mx-auto">
            <section className="text-center mb-[4vh]">
              <h2 className="text-3xl font-semibold text-gray-100 mb-[2vh]">
                Quality You Can Trust
              </h2>
              <p className="text-xl text-gray-200 max-w-2xl font-thin p-6">
                Welcome to Fresh Poultry Products, your number one source for the
                best poultry items. We're dedicated to providing you with the very
                best of our products, with an emphasis on quality, freshness, and
                customer service.
              </p>
            </section>
<div className="flex mb-[4vh]">
<Carousels/>
</div>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-[4vh]">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`bg-opacity-30 shadow-2xl rounded-2xl overflow-hidden transition-transform transform hover:scale-105 cursor-pointer w-8/9 ${category === "All" ? "bg-red-500" : "bg-white"}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white">
                      {category}
                    </h3>
                    {category === "All" ? (
                      <p className="mt-2 text-white font-thin">
                        Explore all our products and find what suits you best.
                      </p>
                    ) : (
                      <p className="mt-2 text-white font-thin">
                        Our {category.toLowerCase()} are sourced from the best farms ensuring
                        top quality and freshness.
                      </p>
                    )}

                  </div>
                </div>
              ))}
            </section>

            <section className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-100 mb-4 bg-red-300">
                Why Choose Us?
              </h2>
              <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 max-w-4xl font-thin">
                <div className="bg-red-100 bg-opacity-10 p-6 rounded-lg shadow-xl">
                  <h3 className="text-xl font-semibold text-red-500">
                    Quality Assurance
                  </h3>
                  <p className="mt-2 text-gray-300">
                    We adhere to the highest standards of quality to ensure that
                    our products are safe and healthy.
                  </p>
                </div>

                <div className="bg-red-100 bg-opacity-10 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-red-500">
                    Affordable Prices
                  </h3>
                  <p className="mt-2 text-gray-300">
                    We offer competitive pricing on all our products without
                    compromising on quality.
                  </p>
                </div>

                <div className="bg-red-100 bg-opacity-10 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-red-500">
                    Customer Satisfaction
                  </h3>
                  <p className="mt-2 text-gray-300">
                    Our customer service team is always ready to assist you with
                    your needs and queries.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      {/* Video Section */}
      <div className="mx-auto mt-28">
        <h1 className="text-center text-3xl mb-16">Insta Fusion</h1>
        {/* Video Elements in a Centered Flex Row */}
        <div className="overflow-x-auto p-4 px-5 sm:px-10 md:px-20">
          <div className="flex justify-center space-x-10">
            {/* Video 1 */}
            <div className="h-[20rem] w-[12rem] sm:h-[25rem] sm:w-[15rem] md:h-[35rem] md:w-[20rem] flex-shrink-0">
              <video
                src="https://videos.pexels.com/video-files/20745686/20745686-uhd_1440_2560_25fps.mp4"
                className="w-full h-full object-cover rounded-xl"
                autoPlay
                muted
                loop
                controls={false}
              ></video>
            </div>
            {/* Video 2 */}
            <div className="h-[20rem] w-[12rem] sm:h-[25rem] sm:w-[15rem] md:h-[35rem] md:w-[20rem] flex-shrink-0">
              <video
                src="https://videos.pexels.com/video-files/12012874/12012874-uhd_2560_1440_60fps.mp4"
                className="w-full h-full object-cover rounded-xl"
                autoPlay
                muted
                loop
                controls={false}
              ></video>
            </div>
            {/* Video 3 */}
            <div className="h-[20rem] w-[12rem] sm:h-[25rem] sm:w-[15rem] md:h-[35rem] md:w-[20rem] flex-shrink-0">
              <video
                src="https://videos.pexels.com/video-files/7781711/7781711-hd_1920_1080_30fps.mp4"
                className="w-full h-full object-cover rounded-xl"
                autoPlay
                muted
                loop
                controls={false}
              ></video>
            </div>
            {/* Video 4 */}
            <div className="h-[20rem] w-[12rem] sm:h-[25rem] sm:w-[15rem] md:h-[35rem] md:w-[20rem] flex-shrink-0">
              <video
                src="https://videos.pexels.com/video-files/5081529/5081529-uhd_2560_1440_30fps.mp4"
                className="w-full h-full object-cover rounded-xl"
                autoPlay
                muted
                loop
                controls={false}
              ></video>
            </div>
            {/* Video 5 */}
            <div className="h-[20rem] w-[12rem] sm:h-[25rem] sm:w-[15rem] md:h-[35rem] md:w-[20rem] flex-shrink-0">
              <video
                src="https://videos.pexels.com/video-files/6897897/6897897-uhd_2732_1440_30fps.mp4"
                className="w-full h-full object-cover rounded-xl"
                autoPlay
                muted
                loop
                controls={false}
              ></video>
            </div>
            {/* Video 6 */}
            {/* <div className="h-[20rem] w-[12rem] sm:h-[25rem] sm:w-[15rem] md:h-[35rem] md:w-[20rem] flex-shrink-0">
              <video
                src="https://videos.pexels.com/video-files/4911875/4911875-uhd_1440_2732_25fps.mp4"
                className="w-full h-full object-cover rounded-xl"
                autoPlay
                muted
                loop
                controls={false}
              ></video>
            </div> */}
          </div>
        </div>
      </div>

      <div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden mb-28 mt-60">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/19657150/19657150-hd_1920_1080_25fps.mp4"
          autoPlay
          loop
          muted
        ></video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-red-900 opacity-70"></div>

        {/* Text Content */}
        <h1 className="relative text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-white drop-shadow-lg">
          Quality Poultry, Fresh Eggs, and Healthy Birds. Directly from Our Farm
          to Your Doorstep
        </h1>
      </div>


      <section>
        <Blogs />
      </section>
      <Footer/>
      {/* <div
        className="relative min-h-screen bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url("https://img.freepik.com/free-photo/close-up-beautiful-chickens_23-2150741667.jpg?t=st=1717975477~exp=1717979077~hmac=b565860edb6dce4d8682530db095cf0db6e757cb79da27ae6d777f64f5459564&w=1060")` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div> */}
    </div>
  );
};

export default Home;
