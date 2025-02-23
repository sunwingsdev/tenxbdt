import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ReferralRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract the ref parameter from the query string
    const urlParams = new URLSearchParams(location.search);
    const refCode = urlParams.get("ref");

    if (refCode) {
      // Save the refCode to localStorage
      localStorage.setItem("refCode", refCode);

      // Redirect to the homepage
      navigate("/", { replace: true });
    } else {
      // If no referral code, still navigate to homepage
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return null; // This component doesn't render anything
};

export default ReferralRedirect;
