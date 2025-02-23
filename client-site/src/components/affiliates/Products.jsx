import casinoImage from "../../assets/Affiliates/Casino.png";
import slotImage from "../../assets/Affiliates/slot.png";
import sportsImage from "../../assets/Affiliates/sports.png";
// import tableImage from "../../assets/Affiliates/table.png";
import crashImage from "../../assets/Affiliates/crash.png";
import fishingImage from "../../assets/Affiliates/fishing.png";
import lotteryImage from "../../assets/Affiliates/lotary.png";
import arcadeImage from "../../assets/Affiliates/Arcade.png";

const Products = () => {
  return (
    <div className="hero bg-backgroundImageRed  w-full">
      <div className="hero-content text-center">
        <div className="max-w-max">
          <h2 className="text-4xl text-customYellowHeading mb-10">PRODUCTS</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* First Row */}
            <div className=" bg-black shadow-customBoxGreenShadow w-36 md:w-40 lg:w-64 h-auto md:80 lg:80 rounded-[20px] ">
              <div className="p-2 pt-9">
                <img
                  className="max-w-full h-auto mx-auto mb-2"
                  src={casinoImage}
                  alt="Casino"
                />
                <h3 className=" w-[78%] p-1 text-center mx-auto text-base font-semibold poppins sans-serif text-[18px] tracking-[1px] border-2 border-customGreenHeading border-solid rounded-[20px] bg-backgroundImageRed shadow-customHeadingShadow text-white">
                  CASINO
                </h3>
              </div>
            </div>

            <div className=" bg-black shadow-customBoxGreenShadow w-36 md:w-40 lg:w-64 h-auto md:80 lg:80 rounded-[20px] ">
              <div className="p-2">
                <img
                  className="max-w-full p-4 h-auto"
                  src={slotImage}
                  alt="Slot"
                />
                <h3 className=" w-[78%] p-1 text-center mx-auto text-base font-semibold poppins sans-serif text-[18px] tracking-[1px] border-2 border-customGreenHeading border-solid rounded-[20px] bg-backgroundImageRed shadow-customHeadingShadow text-white">
                  SLOTS
                </h3>
              </div>
            </div>

            <div className=" bg-black shadow-customBoxGreenShadow w-36 md:w-40 lg:w-64 h-auto md:80 lg:80 rounded-[20px] ">
              <div className="p-2">
                <img
                  className="max-w-full p-4 h-auto"
                  src={sportsImage}
                  alt="Sports"
                />
                <h3 className=" w-[78%] p-1 text-center mx-auto text-base font-semibold poppins sans-serif text-[18px] tracking-[1px] border-2 border-customGreenHeading border-solid rounded-[20px] bg-backgroundImageRed shadow-customHeadingShadow text-white">
                  SPORTS
                </h3>
              </div>
            </div>

            <div className=" bg-black  shadow-customBoxGreenShadow w-36 md:w-40 lg:w-64 h-auto md:80 lg:80 rounded-[20px] ">
              <div className="p-2">
                <img
                  className="max-w-full p-4 h-auto"
                  src={lotteryImage}
                  alt="Table"
                />
                <h3 className=" w-[78%] p-1 text-center mx-auto text-base font-semibold poppins sans-serif text-[18px] tracking-[1px] border-2 border-customGreenHeading border-solid rounded-[20px] bg-backgroundImageRed shadow-customHeadingShadow text-white">
                  TABLE
                </h3>
              </div>
            </div>

            <div className=" bg-black shadow-customBoxGreenShadow w-36 md:w-40 lg:w-64 h-auto md:80 lg:80 rounded-[20px] ">
              <div className="p-2">
                <img
                  className="max-w-full p-4 h-auto"
                  src={crashImage}
                  alt="crash"
                />
                <h3 className=" w-[78%] p-1 text-center mx-auto text-base font-semibold poppins sans-serif text-[18px] tracking-[1px] border-2 border-customGreenHeading border-solid rounded-[20px] bg-backgroundImageRed shadow-customHeadingShadow text-white">
                  CRASH
                </h3>
              </div>
            </div>

            <div className=" bg-black shadow-customBoxGreenShadow w-36 md:w-40 lg:w-64 h-auto md:80 lg:80 rounded-[20px] ">
              <div className="p-2">
                <img
                  className="max-w-full p-4 h-auto"
                  src={fishingImage}
                  alt="fishing"
                />
                <h3 className=" w-[78%] p-1 text-center mx-auto text-base font-semibold poppins sans-serif text-[18px] tracking-[1px] border-2 border-customGreenHeading border-solid rounded-[20px] bg-backgroundImageRed shadow-customHeadingShadow text-white">
                  FISHING
                </h3>
              </div>
            </div>

            <div className=" bg-black shadow-customBoxGreenShadow w-36 md:w-40 lg:w-64 h-auto md:80 lg:80 rounded-[20px] ">
              <div className="p-2">
                <img
                  className="max-w-full p-4 h-auto"
                  src={lotteryImage}
                  alt="lottery"
                />
                <h3 className=" w-[78%] p-1 text-center mx-auto text-base font-semibold poppins sans-serif text-[18px] tracking-[1px] border-2 border-customGreenHeading border-solid rounded-[20px] bg-backgroundImageRed shadow-customHeadingShadow text-white">
                  LOTTERY
                </h3>
              </div>
            </div>

            <div className=" bg-black shadow-customBoxGreenShadow w-36 md:w-40 lg:w-64 h-auto md:80 lg:80 rounded-[20px] ">
              <div className="p-2">
                <img
                  className="max-w-full p-4 h-auto"
                  src={arcadeImage}
                  alt="arcade"
                />
                <h3 className=" w-[78%] p-1 text-center mx-auto text-base font-semibold poppins sans-serif text-[18px] tracking-[1px] border-2 border-customGreenHeading border-solid rounded-[20px] bg-backgroundImageRed shadow-customHeadingShadow text-white">
                  ARCADE
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
