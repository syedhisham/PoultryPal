// import React, { useState } from "react";
// import { Input } from "@material-tailwind/react";
// import { Textarea } from "@material-tailwind/react";
// import { Button } from "@material-tailwind/react";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { uploadImageToCloudinary } from "../utility/uploadImageToCloudinary";
// import { Toaster, toast } from "react-hot-toast";
// import { selectEmail } from "../redux/emailSlice";
// import { useSelector } from "react-redux";

// const NewProduct = () => {
//   const [data, setData] = useState({
//     name: "",
//     category: "",
//     image: "",
//     price: "",
//     description: "",
//   });
//   const email = useSelector(selectEmail);
//   const REACT_APP_ADMIN_EMAIL = 'syedhishamshah27@gmail.com';
//   const REACT_APP_ADMIN2_EMAIL = 'ranasaimali1234@gmail.com';
//   const isAdmin = email === REACT_APP_ADMIN_EMAIL || email === REACT_APP_ADMIN2_EMAIL;

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData((preve) => {
//       return {
//         ...preve,
//         [name]: value,
//       };
//     });
//   };
//   const handleUploadProfileImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) {
//       console.error("No file selected");
//       return;
//     }

//     try {
//       const imageUrl = await uploadImageToCloudinary(file);
//       setData((preve) => {
//         return {
//           ...preve,
//           image: imageUrl,
//         };
//       });
//       console.log("Image URL", imageUrl);
//     } catch (error) {
//       console.error("Error uploading image to Cloudinary", error);
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(data);

//     const { name, image, category, price } = data;
//     if (name && image && category && price) {
//       try {
//         const fetchData = await fetch(
//           `${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,
//           {
//             method: "POST",
//             headers: {
//               "content-type": "application/json",
//             },
//             body: JSON.stringify(data),
//           }
//         );

//         const fetchRes = await fetchData.json();
//         console.log(fetchRes);
//         toast.success("Product uploaded successfully!");
//         setData(() => {
//           return {
//             name: "",
//             category: "",
//             image: "",
//             price: "",
//             description: "",
//           };
//         });
//       } catch (error) {
//         console.error("Error uploading product:", error);
//         toast.error("Error uploading product");
//       }
//     } else {
//       toast.error("All fields are required");
//     }
//   };

//   if (!isAdmin) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//           <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
//           <p className="text-lg">
//             Access is only authorized for admin users. Please contact your administrator.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="full p-4">
//       <Toaster />
//       <form
//         className="container m-auto shadow-lg p-4 border-b-2 border-red-200"
//         onSubmit={handleSubmit}
//       >
//         <div className="container w-80 m-auto">
//           <div className="">
//             <Input
//               type={"text"}
//               id="name"
//               name="name"
//               className="focus:bg-red-50 text-base sm:text-sm md:text-base lg:text-base"
//               color="blue"
//               label="Name"
//               onChange={handleOnChange}
//               value={data.name}
//             />
//           </div>
//           <div className="mt-4">
//             <label htmlFor="category">Category</label>
//             <select
//               color="blue"
//               id="category"
//               name="category"
//               onChange={handleOnChange}
//               className="border-2 border-grey-200 h-11 rounded-lg w-80"
//               value={data.category}
//             >
//               <option value={"other"}>Select Category</option>
//               <option value={"Live Birds and Chicks"}>Live Birds and Chicks</option>
//               <option value={"Fresh and Specialty Eggs"}>Fresh and Specialty Eggs</option>
//               <option value={"Feeds"}>
//               Feeds
//               </option>
//               <option value={"Housing and Equipments"}>Housing and Equipments</option>
//               <option value={"Beddings"}>
//               Beddings
//               </option>
//               <option value={"Cleaning and Maintenance Supplies"}>
//               Cleaning and Maintenance Supplies
//               </option>
//               <option value={"Supplements"}>Supplements</option>
//             </select>
//           </div>
//           <div className="mt-4">
//             <label htmlFor="image" className="cursor-pointer">
//               Image
//               <div className="h-40 bg-red-100 hover:bg-red-200 rounded-lg flex justify-center items-center">
//                 {data.image ? (
//                   <img
//                     src={data.image}
//                     alt=""
//                     className="h-full w-full rounded-lg"
//                   />
//                 ) : (
//                   <span className="text-5xl">
//                     <IoCloudUploadOutline />
//                   </span>
//                 )}

//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleUploadProfileImage}
//                   className="hidden"
//                   id="image"
//                   name="image"
//                 />
//               </div>
//             </label>
//           </div>
//           <div className="mt-4">
//             <Input
//               type={"text"}
//               id="price"
//               name="price"
//               className="focus:bg-red-50 text-base sm:text-sm md:text-base lg:text-base"
//               color="blue"
//               label="Price"
//               onChange={handleOnChange}
//               value={data.price}
//             />
//           </div>
//           <div className="mt-4">
//             <Textarea
//               color="blue"
//               label="Description"
//               id="description"
//               name="description"
//               onChange={handleOnChange}
//               value={data.description}
//             />
//           </div>
//           <div className="mt-4 text-center">
//             <Button color="red" onClick={handleSubmit}>
//               Save
//             </Button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewProduct;

import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { uploadImageToCloudinary } from "../utility/uploadImageToCloudinary";
import { selectEmail } from "../redux/emailSlice";
import  toast  from "react-hot-toast";
import { useSelector } from "react-redux";
import { AxiosRequest } from "../AxiosRequest/AxiosRequest";

const NewProduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const email = useSelector(selectEmail);
  const REACT_APP_ADMIN_EMAIL = 'syedhishamshah27@gmail.com';
  const REACT_APP_ADMIN2_EMAIL = 'ranasaimali1234@gmail.com';
  const isAdmin = email === REACT_APP_ADMIN_EMAIL || email === REACT_APP_ADMIN2_EMAIL;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProfileImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      const imageUrl = await uploadImageToCloudinary(file);
      setData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
      console.log("Image URL", imageUrl);
    } catch (error) {
      console.error("Error uploading image to Cloudinary", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, category, image, price, description } = data;
    if (name && category && image && price && description) {
      try {
        const response = await AxiosRequest.post('/api/products/add',
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        toast.success("Product uploaded successfully!");
        setData({
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        });
      } catch (error) {
        console.error("Error uploading product:", error);
        toast.error("Error uploading product");
      }
    } else {
      toast.error("All fields are required");
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-lg">
            Access is only authorized for admin users. Please contact your administrator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="full p-4">
      <form
        className="container m-auto shadow-lg p-4 border-b-2 border-red-200"
        onSubmit={handleSubmit}
      >
        <div className="container w-80 m-auto">
          <div className="">
            <Input
              type={"text"}
              id="name"
              name="name"
              className="focus:bg-red-50 text-base sm:text-sm md:text-base lg:text-base"
              color="blue"
              label="Name"
              onChange={handleOnChange}
              value={data.name}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="category">Category</label>
            <select
              color="blue"
              id="category"
              name="category"
              onChange={handleOnChange}
              className="border-2 border-grey-200 h-11 rounded-lg w-80"
              value={data.category}
            >
              <option value={"other"}>Select Category</option>
              <option value={"Live Birds and Chicks"}>Live Birds and Chicks</option>
              <option value={"Fresh and Specialty Eggs"}>Fresh and Specialty Eggs</option>
              <option value={"Feeds"}>
              Feeds
              </option>
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="image" className="cursor-pointer">
              Image
              <div className="h-40 bg-red-100 hover:bg-red-200 rounded-lg flex justify-center items-center">
                {data.image ? (
                  <img
                    src={data.image}
                    alt=""
                    className="h-full w-full rounded-lg"
                  />
                ) : (
                  <span className="text-5xl">
                    <IoCloudUploadOutline />
                  </span>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadProfileImage}
                  className="hidden"
                  id="image"
                  name="image"
                />
              </div>
            </label>
          </div>
          <div className="mt-4">
            <Input
              type={"text"}
              id="price"
              name="price"
              className="focus:bg-red-50 text-base sm:text-sm md:text-base lg:text-base"
              color="blue"
              label="Price"
              onChange={handleOnChange}
              value={data.price}
            />
          </div>
          <div className="mt-4">
            <Textarea
              color="blue"
              label="Description"
              id="description"
              name="description"
              onChange={handleOnChange}
              value={data.description}
            />
          </div>
          <div className="mt-4 text-center">
            <Button color="red" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;

