import { Link } from "react-router-dom";
import mobileImage from "../../assets/Affiliates/mobile.png";

const Join = () => {
  return (
    <div className="hero bg-backgroundImageRed  w-full ">
      <div className="hero-content text-center">
        <div className="max-w-full">
          <h2 className="text-4xl  text-customYellowHeading  mb-10">
            Join Our Affiliate Program at HEYBAJI Now!
          </h2>

          <div className="box-border   lg:gap-12 p-4 border-none h-screen flex items-center justify-center">
            <div>
              <img
                src={mobileImage}
                alt=""
                className="w-full h-auto sm:w-64 md:w-64 lg:w-80"
              />
            </div>
            <div className="flex flex-col pl-4 lg:pl-0 items-center gap-8 Poppins, sans-serif">
              {/* Login Button */}
              <Link to="/sign">
                <button className="w-32 h-14 bg-customYellow hover:bg-customYellow text-black sm:text-sm lg:text-base font-medium font-poppins rounded-sm lg:block">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="w-32 h-14 bg-customGreen hover:bg-customYellow hover:text-black sm:text-sm lg:text-base text-customWhit rounded-sm border-none font-medium py-1 px-4 poppins sans-serif">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
