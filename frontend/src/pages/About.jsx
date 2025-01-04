import React from 'react'
// import Achievements from "../compenents/Achievements";
// import PoultrySuppliesTour from '../compenents/poultrySuppliesAbout/PoultrySuppliesTour';
import Footer from '../components/Footer';
import { Fade, Slide } from 'react-awesome-reveal';
import ceoImage from "../assets/ceoImage.jpeg"

const About = () => {
  return (
    
    <div>
      <section>
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
            <div className="bg-white py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Fade duration={1000} triggerOnce>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
          </div>
        </Fade>

        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20">
          <Slide direction="up" duration={1000} triggerOnce>
            <div className="flex flex-col items-start gap-x-8 gap-y-10 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <div className="relative">
                  <img
                  src={ceoImage}
                    // src="https://via.placeholder.com/400x400"
                    alt="Syed Hisham Shah"
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-0 left-0 bg-white px-4 py-2 rounded-b-lg">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900">
                    Syed Hisham Shah
                    </h3>
                    <p className="text-gray-600">CEO & Founder</p>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                Syed Hisham Shah - CEO & Founder
                </h3>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Background: With over 15 years of experience in the poultry industry, Ali Khan is a seasoned expert in poultry farming and management. He holds a degree in Agricultural Sciences and has worked extensively in both commercial and backyard poultry settings.
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Expertise: Ali's deep understanding of poultry nutrition, breeding, and health management has been instrumental in establishing our product line. His vision is to provide top-quality poultry products and exceptional customer service.
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Role: As CEO, Ali oversees the strategic direction of the company, ensuring that our products meet the highest standards of quality and innovation.
                </p>
              </div>
            </div>
          </Slide>

          <Slide direction="up" duration={1000} triggerOnce delay={400}>
            <div className="flex flex-col items-start gap-x-8 gap-y-10 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <div className="relative">
                  <img
                    src="https://via.placeholder.com/400x400"
                    alt="Sara Ahmed"
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-0 left-0 bg-white px-4 py-2 rounded-b-lg">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900">
                      Sheryar Iqbal
                    </h3>
                    <p className="text-gray-600">COO & Co-Founder</p>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                Sheryar Iqbal - COO & Co-Founder
                </h3>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Background: Sara Ahmed brings a wealth of knowledge in operations and logistics. With a degree in Business Management and over a decade of experience in supply chain management, she ensures that our products are delivered efficiently and on time.
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Expertise: Sara specializes in optimizing our supply chain processes and maintaining strong relationships with suppliers and customers. Her focus on operational excellence ensures that our customers receive reliable and timely service.
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Role: As COO, Sara manages the day-to-day operations of the company, from procurement to customer service, ensuring that everything runs smoothly and efficiently.
                </p>
              </div>
            </div>
          </Slide>

          <Slide direction="up" duration={1000} triggerOnce delay={800}>
            <div className="flex flex-col items-start gap-x-8 gap-y-10 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <div className="relative">
                  <img
                    src="https://via.placeholder.com/400x400"
                    alt="Zain Malik"
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-0 left-0 bg-white px-4 py-2 rounded-b-lg">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900">
                      Abdullah Amir
                    </h3>
                    <p className="text-gray-600">CMO & Co-Founder</p>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                Abdullah Amir - CMO & Co-Founder
                </h3>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Background: Zain Malik is a marketing guru with a passion for digital marketing and brand development. He holds a degree in Marketing and has over 12 years of experience in crafting successful marketing strategies for various industries.
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Expertise: Zain's expertise lies in creating engaging content, driving online traffic, and building a strong brand presence. His innovative marketing campaigns have significantly increased our reach and customer base.
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Role: As CMO, Zain leads our marketing efforts, focusing on digital marketing, social media engagement, and brand growth. He ensures that our brand message resonates with our audience and attracts new customers.
                </p>
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </div>
            {/* <Achievements /> */}
            <Footer />
          </section>
    </div>
  )
}

export default About
