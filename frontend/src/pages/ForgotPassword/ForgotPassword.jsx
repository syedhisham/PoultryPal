import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { AxiosRequest } from "../../AxiosRequest/AxiosRequest";
import PasswordResetDialog from "@/components/PasswordResetDialog/PasswordResetDialog"; // Import the dialog component

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const response = await AxiosRequest.post("/api/user/forgotPassword", { email });
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsDialogOpen(true); // Open the dialog when the email is successfully sent
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close the dialog when the user dismisses it
  };

  return (
    <div className="p-6 md:p-8 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Enter your email"
              className="border-2 focus:bg-red-50 focus:ring-0 text-base"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="max-w-full w-full bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out m-auto cursor-pointer text-white text-xl font-medium text-center py-2 rounded-full"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>

      {/* Render the dialog */}
      <PasswordResetDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
    </div>
  );
};

export default ForgotPassword;
