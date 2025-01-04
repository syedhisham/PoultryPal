import { AxiosRequest } from "../AxiosRequest/AxiosRequest"; // Ensure this path is correct

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default"); // Replace with your upload preset
  formData.append("cloud_name", "dqlyxvgcc");

  try {
    const response = await AxiosRequest.post(
      `https://api.cloudinary.com/v1_1/dqlyxvgcc/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary", error);
    throw error;
  }
};

export { uploadImageToCloudinary };
