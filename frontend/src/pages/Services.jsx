import React from 'react';
import { Button, Typography } from "@material-tailwind/react";

const servicesData = [
  {
    title: "Service One",
    description: "Brief description of Service One.",
    icon: "service1-icon.svg",
    details: "More details about Service One.",
  },
  {
    title: "Service Two",
    description: "Brief description of Service Two.",
    icon: "service2-icon.svg",
    details: "More details about Service Two.",
  },
  // Add more services as needed
];

const testimonials = [
  {
    name: "Customer One",
    feedback: "Service was excellent and met all our expectations.",
  },
  {
    name: "Customer Two",
    feedback: "Highly professional and reliable service.",
  },
  // Add more testimonials as needed
];

const faqs = [
  {
    question: "What is the process for Service One?",
    answer: "The process for Service One involves...",
  },
  {
    question: "How do I get a quote for Service Two?",
    answer: "To get a quote for Service Two, you can...",
  },
  // Add more FAQs as needed
];

const Services = () => {
  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="container mx-auto text-center">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-4 !text-base lg:!text-2xl"
        >
          Our Services
        </Typography>
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 !text-3xl lg:!text-5xl"
        >
          What We Offer
        </Typography>
        <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500">
          Explore the wide range of services we offer to help you achieve your goals.
        </Typography>
        
        {/* Service List */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start mb-10">
          {servicesData.map((service, index) => (
            <div key={index} className="text-left p-4 border rounded-lg shadow-lg">
              <img src={`/icons/${service.icon}`} alt={service.title} className="mb-4 w-16 h-16 mx-auto" />
              <Typography variant="h5" className="mb-2">{service.title}</Typography>
              <Typography className="mb-4 !text-gray-500">{service.description}</Typography>
              <Button variant="outlined" className="max-w-fit mx-auto">
                Learn More
              </Button>
            </div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="mb-10">
          <Typography variant="h3" color="blue-gray" className="mb-4">
            What Our Clients Say
          </Typography>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-left p-4 border rounded-lg shadow-lg mb-4">
              <Typography variant="h6">{testimonial.name}</Typography>
              <Typography className="!text-gray-500">{testimonial.feedback}</Typography>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="mb-10">
          <Typography variant="h3" color="blue-gray" className="mb-4">
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <div key={index} className="text-left p-4 border rounded-lg shadow-lg mb-4">
              <Typography variant="h6">{faq.question}</Typography>
              <Typography className="!text-gray-500">{faq.answer}</Typography>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mb-10">
          <Typography variant="h3" color="blue-gray" className="mb-4">
            Get In Touch
          </Typography>
          <Typography className="!text-gray-500 mb-4">Feel free to reach out to us for more information about our services.</Typography>
          <Button variant="filled" color="gray" className="mb-2">
            Contact Us
          </Button>
        </div>

        {/* Service Portfolio */}
        <div className="mb-10">
          <Typography variant="h3" color="blue-gray" className="mb-4">
            Our Portfolio
          </Typography>
          <Typography className="!text-gray-500 mb-4">Check out some of the projects we've completed for our clients.</Typography>
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
            {/* Portfolio items (replace with actual content) */}
            <div className="text-left p-4 border rounded-lg shadow-lg">
              <img src="/path/to/portfolio-image1.jpg" alt="Portfolio Item 1" className="mb-4 w-full h-auto" />
              <Typography variant="h5" className="mb-2">Project One</Typography>
              <Typography className="!text-gray-500">Description of Project One.</Typography>
            </div>
            <div className="text-left p-4 border rounded-lg shadow-lg">
              <img src="/path/to/portfolio-image2.jpg" alt="Portfolio Item 2" className="mb-4 w-full h-auto" />
              <Typography variant="h5" className="mb-2">Project Two</Typography>
              <Typography className="!text-gray-500">Description of Project Two.</Typography>
            </div>
            {/* Add more portfolio items as needed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
