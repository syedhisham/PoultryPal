import React, { useState } from 'react';

const Faqs = () => {
  const [faqState, setFaqState] = useState({});

  const toggleAnswer = (question) => {
    setFaqState(prevState => ({
      ...prevState,
      [question]: !prevState[question]
    }));
  };

  return (
    <section className="px-8 py-8 lg:py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>

        {/* General FAQs */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">General</h3>
          <ul>
            <li className="mb-4 border border-gray-300 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg">
              <span
                className="cursor-pointer font-semibold transition duration-300 ease-in-out hover:text-blue-500"
                onClick={() => toggleAnswer('generalQ1')}
              >
                Q: What types of chickens do you sell?
              </span>
              <p
                className={`ml-4 text-gray-600 transition duration-300 ${
                  faqState.generalQ1 ? 'opacity-100 h-auto' : 'opacity-0 h-0'
                } overflow-hidden`}
              >
                A: We sell various breeds including broiler, layer, and specialty breed chicks, as well as adult chickens.
              </p>
            </li>
            <li className="mb-4 border border-gray-300 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg">
              <span
                className="cursor-pointer font-semibold transition duration-300 ease-in-out hover:text-blue-500"
                onClick={() => toggleAnswer('generalQ2')}
              >
                Q: Do you offer any guarantees on the health of the chickens?
              </span>
              <p
                className={`ml-4 text-gray-600 transition duration-300 ${
                  faqState.generalQ2 ? 'opacity-100 h-auto' : 'opacity-0 h-0'
                } overflow-hidden`}
              >
                A: Yes, we provide guarantees on the health of our chickens. Please refer to our terms and conditions for details.
              </p>
            </li>
            {/* Add more general FAQs as needed */}
          </ul>
        </div>

        {/* Add other FAQ categories similarly */}
        
      </div>
    </section>
  );
};

export default Faqs;
