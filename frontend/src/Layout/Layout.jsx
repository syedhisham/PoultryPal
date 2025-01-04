// import './Layout.css';
// import Header from "../compenents/Header/Header";
import { useNavigate } from "react-router-dom";
import { ComplexNavbar } from "../components/ComplexNavbar";
import useAuth from "../components/hooks/useAuth";
import { useEffect } from "react";
import { Spinner } from "@material-tailwind/react";
import Footer from "../components/Footer";
const Layout = ({ children })=>{
  const { token, isLoading, refreshAuthToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !isLoading) {
      // navigate('/home');
    }

    // If the token is valid but potentially expired, try refreshing it
    if (token) {
      refreshAuthToken();
    }
  }, [token, isLoading, refreshAuthToken, navigate]);

  // Display a loading state while checking the token
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F6F1EE] font-poppins">
                <Spinner color='white' className="h-12 w-12 text-black" />
      </div>
      );
  }
  return (
    <div className="dashboard-1-scrollbar overflow-y-auto">
      <header>
        <ComplexNavbar />
      </header>
      <main style={{ maxHeight: '300px', overflowY: 'auto' }} className="pt-16 bg-slate-100 min-h-[calc(100vh)] dashboard-1-scrollbar">
        {children}
      </main>
    </div>
  );
}

export default Layout;
