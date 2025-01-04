import React from 'react';
import Footer from '../components/Footer';
import BroilerChick from "../assets/EcommerceImages/BroilerChick.jpg"
import Layinghens from "../assets/EcommerceImages/Layinghens.jpg"
import OrganicEggs from "../assets/EcommerceImages/OrganicEggs.jpg"
import Layerchicks from "../assets/EcommerceImages/Layerchicks.jpg"
import BrownEggs from "../assets/EcommerceImages/BrownEggs.jpg"
import StandardWhiteEggs from "../assets/EcommerceImages/StandardWhiteEggs.jpg"

const Gallery = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Explore Our World</h2>
          <p className="mt-4 text-gray-600">
            Discover our extensive selection of high-quality poultry products through detailed images.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={BroilerChick}
              alt="Broiler Chicks"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">Broiler Chicks</h3>
              <p className="mt-4 text-gray-600">
                See firsthand the superior health and vitality of our broiler chicks.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={Layerchicks}
              alt="Layer Chicks"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">Layer Chicks</h3>
              <p className="mt-4 text-gray-600">
                Discover our high-quality layer chicks for your poultry needs.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={Layinghens}
              alt="Laying Hens"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">Laying Hens</h3>
              <p className="mt-4 text-gray-600">
                Explore our diverse selection of healthy and productive laying hens.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={StandardWhiteEggs}
              alt="StandardWhiteEggs"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">Standard White Eggs</h3>
              <p className="mt-4 text-gray-600">
              Explore our selection of high-quality standard white eggs.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={OrganicEggs}
              alt="OrganicEggs"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">Organic Eggs</h3>
              <p className="mt-4 text-gray-600">
              Discover our premium organic eggs, raised with the highest standards.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={BrownEggs}
              alt="BrownEggs"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">Brown Eggs</h3>
              <p className="mt-4 text-gray-600">
              Explore our selection of nutritious and flavorful brown eggs.
              </p>
            </div>
          </div>
          
        </div>
      </div>
{/* ++++++++++++++++++++++Customer Success Stories+++++++++++++ */}
      <h2 className="text-4xl font-bold text-gray-900  sm:mb-2 md:mb-4 lg:mb-4 sm:mt-10 md:mt-16 lg:mt-16 text-center">Customer Success Stories</h2>
      <div className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">

          
          <div className="p-6 flex flex-col justify-center">
            
            <h2 className="text-xl font-bold text-gray-900">Transforming a Small Backyard into a Thriving Poultry Haven</h2>
            <p className="mt-4 text-gray-600">
            <span className='font-bold text-xl'>John's Backyard Poultry Farm: <br /></span>

<p className='sm:mt-2 md:mt-4 lg:mt-4'> <span className='font-bold'>Background:</span> John, a retired teacher from Lahore, turned his small backyard into a productive poultry farm with no prior experience.</p>
<p className='sm:mt-2 md:mt-4 lg:mt-4'><span className='font-bold'>Journey:</span> He purchased broiler and layer chicks, along with starter feed, portable chicken pens, and nesting boxes from us. Following our guidelines, he set up a safe and comfortable environment for his birds.</p>
<p className='sm:mt-2 md:mt-4 lg:mt-4'><span className='font-bold'>Results:</span> John's broiler chickens reached market size quickly, and his laying hens produced a steady supply of eggs, increasing production by 20% with our layer feed. He now enjoys a steady income from selling eggs and chickens.</p>
<p className='sm:mt-2 md:mt-4 lg:mt-4'><span className='font-bold'>Testimonial:</span> "Thanks to the high-quality chicks and feeds, my backyard has become a productive poultry farm. I couldn't have done it without your support!"</p>
            </p>
          </div>
          <div className="bg-gray-100 p-6 flex justify-center items-center">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Customer Success"
              className="w-full h-[70%] object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-gray-100 p-6 flex justify-center items-center">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Customer Success"
              className="w-full h-[70%] object-cover rounded-lg"
            />
          </div>
          
          <div className="p-6 flex flex-col justify-center">
            
            <h2 className="text-xl font-bold text-gray-900">Scaling Up with Sustainable Practices</h2>
            <p className="mt-4 text-gray-600">
            <span className='font-bold text-xl'>Sara's Organic Poultry Farm:</span>

<p className='sm:mt-2 md:mt-4 lg:mt-4'><span className='font-bold'>Background:</span> Sara, an entrepreneur from Islamabad, established an organic poultry farm to provide high-quality, organic poultry products to her community.</p>
<p className='sm:mt-2 md:mt-4 lg:mt-4'><span className='font-bold'>Journey:</span> She started with our organic feed and layer chicks, using our probiotics and vitamins to enhance flock health. She also maintained a clean environment with our straw and wood shavings.</p>
<p className='sm:mt-2 md:mt-4 lg:mt-4'><span className='font-bold'>Results:</span> Sara's farm became known for premium organic eggs and meat. Her hens exhibited excellent health, and she maintained a zero-disease outbreak record, reducing costs and boosting profits.</p>
<p className='sm:mt-2 md:mt-4 lg:mt-4'><span className='font-bold'>Testimonial:</span> "Your products have been integral to my organic poultry farm's success. My birds are healthy and productive, and I am proud to offer top-notch organic poultry products.</p>
            </p>
          </div>
          
        </div>
      </div>
      {/* +++++++++++++++++++++++++++++++Events and Workshops+++++++++++++ */}
      <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-900  sm:mb-2 md:mb-4 lg:mb-4 sm:mt-10 md:mt-16 lg:mt-16 ">Events and Workshops</h2>
      <p className="mt-4 text-gray-600">
              
              View snapshots from our various training sessions and community events.
            </p>
            </div>
      <div className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden sm:mb-10 md:mb-16 lg:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-6">
            <h1 className='font-bold text-xl'>Poultry Farming 101 Workshop</h1>
            <p className='sm:mt-2 md:mt-4 lg:mt-4'><span className='font-bold'>Description:</span> Our Poultry Farming 101 Workshop is designed for aspiring poultry farmers. This hands-on training program covers the essentials of poultry care, including housing, feeding, health management, and breeding techniques. Participants get practical experience and expert insights to help them start and manage their own poultry farms effectively.</p>
            <p> <span className='font-bold'>Highlight:</span> Participants praised the interactive sessions and comprehensive knowledge provided. Many left with the confidence to start their own poultry ventures, and we captured the enthusiasm and learning moments in our gallery.</p>
          </div>


          <div className="bg-gray-100 p-6">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Events and Workshops"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-6">
            <h1 className='font-bold text-xl'>Advanced Poultry Health Management Seminar</h1>
            <p className='sm:mt-2 md:mt-4 lg:mt-4'><span className='font-bold'>Description:</span> The Advanced Poultry Health Management Seminar focuses on disease prevention, biosecurity measures, and advanced health management techniques. Led by industry experts, this seminar provides in-depth knowledge on maintaining a healthy flock and maximizing productivity.</p>
            <p className='sm:mt-2 md:mt-4 lg:mt-4'><span className='font-bold'>Highlight:</span> Attendees appreciated the detailed presentations and real-world case studies. Our gallery showcases the engaged audience, expert speakers, and collaborative discussions that took place, highlighting our commitment to fostering advanced poultry farming practices.</p>
          </div>
          <div className="bg-gray-100 p-6">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Events and Workshops"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          
        </div>
      </div>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Gallery;
