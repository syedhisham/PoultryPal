
import { Button } from '@material-tailwind/react';
import React from 'react';

const blogPosts = [
  {
    title: "How to Choose the Right Breed of Chicken",
    summary: "An overview of different chicken breeds and their specific advantages.",
    date: "June 1, 2024",
    
    // image: "/images/breed-choice.jpg",
    author: {
      name: "By Sabrina Schirtzinger:",
      bio: " Extension Educator, Agriculture and Natural Resources",
      // photo: "/images/jane.jpg",
    },
    author2: {
      name: "By Tim McDermott:",
      bio: "Extension Educator, Agriculture and Natural Resources",
      // photo: "/images/jane.jpg",
    },
    url: "https://ohioline.osu.edu/factsheet/anr-60"
    // tags: ["chickens", "breeds", "farming"],
  },
  {
    title: "Best Practices for Raising Day-Old Chicks",
    summary: "Tips and tricks for ensuring the health and growth of day-old chicks.",
    date: "September 7, 2021",
    // image: "/images/chick-care.jpg",
    author: {
      name: "By Dalia Monterroso: ",
      bio: "The President of Chickenlandia",
      // photo: "/images/john.jpg",
    },
    author2: {
      name: "John Smith",
      bio: "Farm Specialist",
      // photo: "/images/john.jpg",
    },
    // tags: ["chicks", "care", "farming"],
    url: "https://welcometochickenlandia.com/blog/the-age-old-practice-of-cold-brooding-baby-chicks/"
  },
  // Add more blog posts as needed
];



const Blogs = () => {
  return (
    <section className="relative px-8 py-8 lg:py-16">
      <div className="container mx-auto text-center">
        <h5 className="mb-4 text-base lg:text-2xl text-blue-gray-700">Our Blog</h5>
        <h1 className="mb-4 text-3xl lg:text-5xl text-blue-gray-900">Latest Insights and Articles</h1>
        <p className="mb-10 font-normal text-lg lg:mb-20 mx-auto max-w-3xl text-gray-500">
          Stay updated with our latest news, tutorials, and insights on poultry farming and related products.
        </p>
      </div>
      
      {/* Blog Post List */}
      <div className="w-full py-8 bg-red-500">
        <div className="container mx-auto grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
          {blogPosts.map((post, index) => (
            <div key={index} className="text-left p-4 border rounded-lg shadow-lg bg-white">
              <h5 className="mb-2 text-xl font-semibold">
                <a href={post.url} target="_blank" rel="noopener noreferrer">{post.title}</a>
              </h5>
              <p className="mb-4 text-gray-500">{post.summary}</p>
              <p className="mb-4 text-sm text-gray-500">{post.date}</p>
              <div className="flex items-center mb-4">
                <div>
                  <p className="text-sm font-medium">{post.author.name} <span className="text-xs text-gray-500">{post.author.bio}</span></p>
                  <p className="text-sm font-medium">{post.author2.name} <span className="text-xs text-gray-500">{post.author2.bio}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="container mx-auto text-center mt-10">
        <h3 className="mb-4 text-2xl lg:text-3xl text-blue-gray-900">Get In Touch</h3>
        <p className="mb-4 text-gray-500">Feel free to reach out if you have any questions or comments about our blog.</p>
        <Button className="bg-red-500 text-white px-4 py-2 rounded-lg mb-2">Contact Us</Button>
      </div>
    </section>
  );
};

export default Blogs;