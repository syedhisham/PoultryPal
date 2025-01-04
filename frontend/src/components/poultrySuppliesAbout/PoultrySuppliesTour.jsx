import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';

const PoultrySuppliesTour = () => {
  return (
    <div className="bg-white py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Fade duration={1000} triggerOnce>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Welcome to Your Premier Source for Poultry and Supplies
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At <span className='text-red-500 text-xl font-bold'>PoultryPal</span>, we are dedicated to providing top-quality poultry products and supplies to meet all your needs. Whether you are a commercial farmer, a backyard enthusiast, or a breeder, our comprehensive range of products ensures that you have everything you need for successful and sustainable poultry management.
            </p>
          </div>
        </Fade>

        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20">
          <Slide direction="up" duration={1000} triggerOnce>
            <div className="flex flex-col items-start gap-x-8 gap-y-10 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <h3 className="text-2xl font-bold tracking-tight  text-gray-900">
                  Why Choose Us?
                </h3>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Expertly Selected Live Birds and Chicks
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Our selection of live birds and chicks includes broiler chicks, layer chicks, laying hens, and more, each bred and raised to meet the highest standards of quality and health. We offer a variety of options to suit different needs, from meat production to egg-laying.
                </p>
              </div>
              <div className="w-full sm:w-1/2">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  Premium Feeds and Supplements
                </h3>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  We provide a wide range of feeds, including starter, grower, layer, and organic feeds, all formulated to support the optimal growth and productivity of your flock. Our supplements, including vitamins, minerals, and probiotics, ensure your birds remain healthy and perform at their best.
                </p>
              </div>
            </div>
          </Slide>

          <Slide direction="up" duration={1000} triggerOnce delay={400}>
            <div className="flex flex-col items-start gap-x-8 gap-y-10 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  Essential Housing and Equipment
                </h3>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  From portable chicken pens to automatic feeders and waterers, our housing and equipment solutions are designed to enhance the comfort and efficiency of your poultry management. We also offer essential tools for egg incubation, brooding, and providing warmth to young chicks.
                </p>
              </div>
              <div className="w-full sm:w-1/2">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  Comprehensive Cleaning and Maintenance Supplies
                </h3>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Maintaining a clean and healthy environment for your flock is crucial. Our range of cleaning tools, bedding materials, and maintenance supplies ensures your coop remains hygienic and your birds stay healthy.
                </p>
              </div>
            </div>
          </Slide>

          <Slide direction="up" duration={1000} triggerOnce delay={800}>
            <div className="flex flex-col items-start gap-x-8 gap-y-10 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  Fresh and Specialty Eggs
                </h3>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  We offer a variety of eggs, including standard white eggs, brown eggs, organic eggs, and fertile eggs. Our eggs are sourced from well-cared-for hens, ensuring superior taste and quality.
                </p>
              </div>
              <div className="w-full sm:w-1/2">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  Exotic Chickens
                </h3>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  For those looking to add unique and beautiful birds to their flock, our selection of exotic chickens, such as Silkie, Polish, and Ayam Cemani, provides options that are both visually striking and friendly in nature.
                </p>
              </div>
            </div>
          </Slide>

          <Slide direction="up" duration={1000} triggerOnce delay={1200}>
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                Our Commitment to Quality
              </h3>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Health and Safety: We prioritize the health and safety of our birds, ensuring they are raised in optimal conditions and provided with the best nutrition and care.
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Customer Satisfaction: Your satisfaction is our top priority. We are committed to providing excellent customer service and support to help you achieve success in your poultry endeavors.
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Sustainability: We are dedicated to sustainable practices, offering organic and environmentally friendly products that support the health of your birds and the planet.
              </p>
            </div>
          </Slide>

          <Slide direction="up" duration={1000} triggerOnce delay={1600}>
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                Explore Our Range
              </h3>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Browse through our comprehensive product categories to find everything you need for your poultry operations. From live birds and premium feeds to essential equipment and cleaning supplies, [Your Website Name] is your one-stop-shop for all things poultry.
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Join our community of satisfied customers and experience the difference of quality products and exceptional service. Visit [Your Website URL] today and take the first step towards a successful and thriving poultry operation.
              </p>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default PoultrySuppliesTour;
