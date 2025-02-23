import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/affiliates/Header";
import Hero from "../../components/affiliates/Hero";
import Contact from "../../components/affiliates/Contact";
import { useEffect } from "react";
import "aos/dist/aos.css";
import Aos from "aos";

const Affiliates = () => {
  const location = useLocation();
  useEffect(() => {
    Aos.init({
      duration: 1600, // Animation duration in milliseconds
    });
  }, []);

  // Check if the current path is for Login or Sign Up
  const isLoginOrSignUpPage =
    location.pathname === "/login" || location.pathname === "/sign";

  return (
    <div className="flex flex-col min-h-screen bg-green-800 text-white">
      {/* Show Header only if not on Login or Sign Up page */}
      {!isLoginOrSignUpPage && <Header />}

      {/* Main Content */}
      <div className="flex-grow">
        <Hero />
        <Outlet />
        <Contact />
      </div>
    </div>
  );
};

export default Affiliates;
