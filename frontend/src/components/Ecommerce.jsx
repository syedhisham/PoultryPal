// import React, { useEffect, useState } from "react";
// import { useDispatch } from 'react-redux';
// import { updateCartCount } from '../compenents/Header/Header';

// const Ecommerce = () => {
//     const dispatch = useDispatch();
//     const handleAddToCart = () => {
//         dispatch(updateCartCount(1));
//       };
//   return (
//     <div className="container m-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
//         {/* Egg Card */}
//         <div className="bg-white shadow-lg rounded-lg">
//           <img
//             src="https://via.placeholder.com/300x200"
//             alt="Eggs"
//             className="rounded-t-lg w-full h-[200px] md:h-[250px] lg:h-[300px] object-cover"
//           />
//           <div className="p-6">
//             <h3 className="text-2xl font-bold mb-4">Fresh Eggs</h3>
//             <p className="mb-4 text-sm md:text-base lg:text-lg">
//               Buy our high-quality, farm-fresh eggs. Perfect for baking,
//               cooking, and breakfast.
//             </p>
//             <div className="flex justify-between items-center">
//               <p className="text-2xl font-bold">$4.99/dozen</p>
//               <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" id="btn1" onClick={handleAddToCart}>
//                 Add to Cart
//               </button>
//               <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Poultry Hen Card */}
//         <div className="bg-white shadow-lg rounded-lg">
//           <img
//             src="https://via.placeholder.com/300x200"
//             alt="Poultry Hens"
//             className="rounded-t-lg w-full h-[200px] md:h-[250px] lg:h-[300px] object-cover"
//           />
//           <div className="p-6">
//             <h3 className="text-2xl font-bold mb-4">Poultry Hens</h3>
//             <p className="mb-4 text-sm md:text-base lg:text-lg">
//               Adopt our healthy, free-range poultry hens for your farm or
//               backyard.
//             </p>
//             <div className="flex justify-between items-center">
//               <p className="text-2xl font-bold">$29.99 each</p>
//               <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" id="btn2">
//                 Add to Cart
//               </button>
//               <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Ecommerce;
