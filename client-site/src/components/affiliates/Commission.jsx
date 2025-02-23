import slogo from "../../assets/Affiliates/commision_plan_banner.png";
import dlogo from "../../assets/Affiliates/dollar.png";
import clogo from "../../assets/Affiliates/cost.png";
import blogo from "../../assets/Affiliates/bonus.png";
import flogo from "../../assets/Affiliates/fee.png";
import tlogo from "../../assets/Affiliates/affilate_total.png";
<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />;

const Introduction = () => {
  // Table data
  const rows = [
    ["5", "1000", "30%"],
    ["15", "1000", "35%"],
    ["25", "1000", "40%"],
    ["30", "1000", "45%"],
  ];

  return (
    <div className="bg-backgroundImageRed p-10 w-full">
      <div className="text-center">
        <div className="max-w-full">
          {/* Title */}
          <h2 className="text-4xl text-customYellowHeading mb-10">
            COMISSION PLAN
          </h2>

          {/* Card Section */}
          <div
            data-aos="fade-up"
            className=" flex justify-center items-center flex-col gap-4  lg:flex-row pl-0 md:pl-52 lg:pl-20"
          >
            <div className="relative">
              <img
                className="skew-x-[10deg] w-56 " // Skew effect applied
                src={slogo}
                alt="Commission Plan Banner"
              />
              <img
                className="absolute top-12 left-20 w-14 h-12" // Positioning for the second image
                src={dlogo}
                alt="Dollar Icon"
              />
              <div
                className="absolute top-24 left-16 pl-0 text-customGreenPrimary font-bold text-sm" // Positioning for the text
              >
                Player Win/Loss
              </div>
            </div>
            <div className="relative">
              <img
                className="skew-x-[10deg] w-56 " // Skew effect applied
                src={slogo}
                alt="Commission Plan Banner"
              />
              <img
                className="absolute top-12 left-20 w-14 h-12" // Positioning for the second image
                src={clogo}
                alt="Dollar Icon"
              />
              <div
                className="absolute top-24 left-16 pl-0 text-customGreenPrimary font-bold text-sm" // Positioning for the text
              >
                18% Operation Cost
              </div>
            </div>
            <div className="relative">
              <img
                className="skew-x-[10deg] w-56 " // Skew effect applied
                src={slogo}
                alt="Commission Plan Banner"
              />
              <img
                className="absolute top-12 left-20 w-14 h-12" // Positioning for the second image
                src={blogo}
                alt="Dollar Icon"
              />
              <div
                className="absolute top-24 left-16 pl-0 text-customGreenPrimary font-bold text-sm" // Positioning for the text
              >
                Bonus/Promotions
              </div>
            </div>
            <div className="relative">
              <img
                className="skew-x-[10deg] w-56 " // Skew effect applied
                src={slogo}
                alt="Commission Plan Banner"
              />
              <img
                className="absolute top-12 left-20 w-14 h-12" // Positioning for the second image
                src={flogo}
                alt="Dollar Icon"
              />
              <div
                className="absolute top-24 left-16 pl-0 text-customGreenPrimary font-bold text-sm" // Positioning for the text
              >
                2% Payment Fee
              </div>
            </div>
            <div className="relative">
              <img
                className="skew-x-[10deg] w-56 " // Skew effect applied
                src={slogo}
                alt="Commission Plan Banner"
              />
              <img
                className="absolute top-12 left-20 w-14 h-12" // Positioning for the second image
                src={tlogo}
                alt="Dollar Icon"
              />
              <div
                className="absolute top-24 left-10 pl-0 text-customGreenPrimary font-bold text-sm" // Positioning for the text
              >
                Affiliate Earns Upto <br /> 45% of Net Profit
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="mt-10 flex justify-center items-center">
            <table className="border-collapse border border-customGreenPrimary w-full  h-[285px] max-w-4xl  text-center bg-white shadow-lg">
              <thead>
                <tr className="bg-customGreenSecondary h-[60px] ">
                  <th className=" text-customYellowHeading font-semibold  px-4 py-2">
                    Active Players
                  </th>
                  <th className=" text-customYellowHeading font-semibold px-4 py-2">
                    Net Profit
                  </th>
                  <th className=" text-customYellowHeading font-semibold px-4 py-2">
                    Commission %
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => {
                  // Define unique background colors for each row
                  const rowColors = [
                    "bg-green-400",
                    "bg-customGreenPrimary",
                    "bg-green-400",
                    "bg-customGreenSecondary",
                  ];
                  const bgColor = rowColors[rowIndex] || "bg-gray-100"; // Default color if index exceeds

                  return (
                    <tr
                      key={rowIndex}
                      className={`${
                        rowIndex === rows.length - 1
                          ? bgColor // Last row with no hover effect
                          : `${bgColor} hover:bg-green-800` // Other rows with hover effect
                      }`}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`px-4 py-2 ${
                            rowIndex === rows.length - 1
                              ? "text-customYellowHeading font-semibold" // Last row text color
                              : "text-black hover:text-white font-semibold" // Other rows text color on hover
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
