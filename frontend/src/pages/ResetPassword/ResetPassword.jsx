import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { AxiosRequest } from "../../AxiosRequest/AxiosRequest";
import { BiShow, BiHide } from "react-icons/bi"; // Import icons


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromURL = queryParams.get("token");

    if (tokenFromURL) {
      setToken(tokenFromURL);
    } else {
      toast.error("Invalid or missing reset token.");
      navigate("/forgot-password");
    }
  }, [location, navigate]);

  // Handle password reset form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await AxiosRequest.post("/api/user/resetPassword", {
        token,
        newPassword,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/login"); // Redirect to login after successful reset
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="p-6 md:p-8 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"} // Toggle between text and password
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              label="New Password"
              className="border-2 focus:bg-red-50 focus:ring-0 text-base"
              required
            />
            <span
              className="absolute right-2 top-2 cursor-pointer"
              onClick={handleShowNewPassword}
            >
              {showNewPassword ? <BiShow className="text-xl" /> : <BiHide className="text-xl" />}
            </span>
          </div>

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              className="border-2 focus:bg-red-50 focus:ring-0 text-base"
              required
            />
            <span
              className="absolute right-2 top-2 cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow className="text-xl" /> : <BiHide className="text-xl" />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="max-w-full w-full bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out m-auto cursor-pointer text-white text-xl font-medium text-center py-2 rounded-full"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
