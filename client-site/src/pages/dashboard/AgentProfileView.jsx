import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAgentByIdQuery,
  useLazyGetAuthenticatedUserQuery,
  useLoginAsAgentMutation,
} from "../../redux/features/allApis/usersApi/usersApi";
import { useGetKycByIdQuery } from "../../redux/features/allApis/kycApi/kycApi";
import { ClipLoader } from "react-spinners";
import noImage from "../../assets/noImageAvailable.png";
import { PhotoView } from "react-photo-view";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import { useToasts } from "react-toast-notifications";

const AgentProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("userInfo");
  // const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const { data: singleAgent, isLoading: agentLoading } =
    useGetAgentByIdQuery(id);
  const { data: singleKyc } = useGetKycByIdQuery(id);

  const [loginAsAgent, { isLoading: loginLoading }] = useLoginAsAgentMutation();
  const [getUser] = useLazyGetAuthenticatedUserQuery();

  const balances = [
    { label: "Main Balance", value: "500 BDT" },
    { label: "Deposit Balance", value: "800 BDT" },
    { label: "Withdraw Balance", value: "1000 BDT" },
    { label: "Support Pin", value: "123456" },
  ];

  const handleLoginAsAgent = async () => {
    setLoading(true);

    try {
      const { data: loginAgentData } = await loginAsAgent(
        singleAgent?.username
      );
      console.log("loginA", loginAgentData);

      if (loginAgentData?.token) {
        // Use the role from the response (No need to fetch user separately)
        dispatch(
          setCredentials({
            token: loginAgentData.token,
            user: { role: loginAgentData.role },
          })
        );

        addToast("Login successful", {
          appearance: "success",
          autoDismiss: true,
        });

        // Delay before navigation for smooth transition
        setTimeout(() => {
          navigate("/cashagent"); // Always redirect to agent page
          setLoading(false);
        }, 2000);
      } else {
        addToast("Login failed! Invalid credentials.", {
          appearance: "error",
          autoDismiss: true,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      addToast("Something went wrong! Please try again.", {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-2">
      <h1 className="text-center bg-gradient-to-r from-gray-300 to-gray-500 text-lg lg:text-xl font-bold text-white p-4 rounded-md shadow-md mb-6">
        View Agent Profile
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 ">
        {/* Left Section */}
        <div className="bg-white w-full lg:w-2/3 rounded-lg shadow-lg p-2 text-nowrap text-center">
          <div className="mb-6">
            <h1 className="text-gray-800 font-bold text-lg md:text-xl mb-2">
              Agent Name:{" "}
              <span className="capitalize">{singleAgent?.fullName}</span>
            </h1>
            <p className="text-gray-500">User Name: {singleAgent?.username}</p>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32">
              {/* Image Preview */}
              {!singleAgent?.profileImage && agentLoading ? (
                <div className="flex justify-center items-center w-full h-full border-4 border-gray-500 rounded-full">
                  <ClipLoader size={40} color="#4b5563" />
                </div>
              ) : (
                <img
                  className="rounded-full w-full h-full object-cover border-4 border-gray-500"
                  src={
                    singleAgent?.profileImage
                      ? `${import.meta.env.VITE_BASE_API_URL}${
                          singleAgent.profileImage
                        }`
                      : noImage
                  }
                  alt="User Avatar"
                />
              )}
            </div>
            <button
              onClick={handleLoginAsAgent} // Add onClick handler for the button
              className="bg-[#6b7699f1] text-white rounded-md px-4 py-2 hover:bg-gray-400 mt-4"
              disabled={loginLoading} // Disable the button while the login is in progress
            >
              {loading ? "Logging in..." : "Login as Agent"}
            </button>
            {/* {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )} */}
          </div>

          {/* Balance Section */}
          <div className="space-y-4">
            {balances.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
              >
                <p className="text-gray-600 font-semibold">{item.label}</p>
                <p className="text-green-600 font-bold ml-2">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white w-full lg:w-2/3 rounded-lg shadow-lg p-6">
          <h2 className="text-center text-xl text-gray-800 font-semibold mb-6">
            Edit Agent Profile
          </h2>

          <div className="flex sm:flex-row flex-col justify-center gap-2 mb-6 text-nowrap">
            <button
              onClick={() => setSelectedSection("userInfo")}
              className={`p-2 rounded-md transition-all ${
                selectedSection === "userInfo"
                  ? "bg-[#6b7699f1] text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              User Info
            </button>
            <button
              onClick={() => setSelectedSection("transactionHistory")}
              className={`p-2 rounded-md transition-all ${
                selectedSection === "transactionHistory"
                  ? "bg-[#6b7699f1] text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Transaction History
            </button>
            <button
              onClick={() => setSelectedSection("kycUpdate")}
              className={`p-2 rounded-md transition-all ${
                selectedSection === "kycUpdate"
                  ? "bg-[#6b7699f1] text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              KYC Update
            </button>
          </div>

          {selectedSection === "userInfo" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      className="w-full border border-gray-300 rounded-md p-2 outline-none"
                      defaultValue={singleAgent?.fullName}
                      readOnly
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="w-full border border-gray-300 rounded-md p-2 outline-none"
                      defaultValue={singleAgent?.email}
                      readOnly
                    />
                  </div>

                  <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <div className="flex items-center ps-1 pe-7">
                      <img
                        src="https://flagcdn.com/w40/bd.png"
                        alt="Bangladesh Flag"
                        className="w-6 h-4"
                      />
                      <span className="ml-2">+880</span>
                    </div>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      className="w-full outline-none"
                      defaultValue={singleAgent?.phone}
                      readOnly
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="w-full border border-gray-300 rounded-md p-2 outline-none"
                      defaultValue={singleAgent?.username}
                      readOnly
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="New Password"
                      className="w-full border border-gray-300 rounded-md p-2 outline-none"
                      readOnly
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="w-full border border-gray-300 rounded-md p-2 outline-none"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === "transactionHistory" && (
            <div className="text-center text-gray-600">
              No transactions available.
            </div>
          )}

          {selectedSection === "kycUpdate" && (
            <div>
              <div className="flex flex-col items-center justify-center bg-white pt-5">
                <div>
                  <h2 className="text-lg font-semibold text-center mb-4 capitalize">
                    Agent NID for KYC Verification
                  </h2>

                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">
                        Front Side
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                        {singleKyc?.frontImage ? (
                          <PhotoView
                            src={`${import.meta.env.VITE_BASE_API_URL}${
                              singleKyc?.frontImage
                            }`}
                          >
                            <img
                              src={`${import.meta.env.VITE_BASE_API_URL}${
                                singleKyc?.frontImage
                              }`}
                              alt="nid front image"
                              className="w-full h-40 object-cover rounded-lg cursor-pointer"
                            />
                          </PhotoView>
                        ) : (
                          <span className="text-gray-500">
                            No image uploaded
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">
                        Back Side
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                        {singleKyc?.backImage ? (
                          <PhotoView
                            src={`${import.meta.env.VITE_BASE_API_URL}${
                              singleKyc?.backImage
                            }`}
                          >
                            <img
                              src={`${import.meta.env.VITE_BASE_API_URL}${
                                singleKyc?.backImage
                              }`}
                              alt="nid front image"
                              className="w-full h-40 object-cover rounded-lg cursor-pointer"
                            />
                          </PhotoView>
                        ) : (
                          <span className="text-gray-500">
                            No image uploaded
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="p-4 border rounded-md shadow-sm bg-gray-50">
                      <h3 className="font-semibold text-gray-700 text-lg mb-2 flex items-center space-x-2">
                        <span>Status Info:</span>
                      </h3>

                      <div
                        className={`flex items-start p-3 border-l-4 rounded-md ${
                          singleKyc?.status === "approve"
                            ? "border-green-500 bg-green-50"
                            : singleKyc?.status === "reject"
                            ? "border-red-500 bg-red-50"
                            : "border-yellow-500 bg-yellow-50"
                        }`}
                      >
                        <div className="mr-3 mt-1">
                          {singleKyc?.status === "approve" && (
                            <FaCheck className="text-2xl text-green-600" />
                          )}
                          {singleKyc?.status === "reject" && (
                            <IoMdClose className="text-2xl text-red-600" />
                          )}
                          {singleKyc?.status === "pending" && (
                            <RiErrorWarningLine className="text-2xl text-yellow-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-lg">
                            {singleKyc?.status === "approve" && "Approved"}
                            {singleKyc?.status === "reject" && "Rejected"}
                            {singleKyc?.status === "pending" &&
                              "Pending Review"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentProfileView;
