import { Link, useLocation, useNavigate } from "react-router-dom";
import AccoundModal from "../modal/AccoundModal";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { TbCurrencyTaka } from "react-icons/tb";
import { BiMenuAltLeft } from "react-icons/bi";
import { LuHardDriveDownload } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineMessage } from "react-icons/md";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useLazyGetUserByIdQuery } from "../../../redux/features/allApis/usersApi/usersApi";
import { logout, setSingleUser } from "../../../redux/slices/authSlice";
import { useToasts } from "react-toast-notifications";
import { TfiReload } from "react-icons/tfi";
import DepositModal from "../../home/deposit-modal/DepositModal";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLuggageDepositFill } from "react-icons/ri";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import UserMenu from "./UserMenu";
import WithdrawModal from "../../home/withdraw-modal/WithdrawModal";
import { LuUser } from "react-icons/lu";
import { PiWallet } from "react-icons/pi";
import { RiIdCardLine } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import AccountDetailsMobile from "../../home/AccountDetailsMobile";
import MobileLeftSideMenu from "./MobileLeftSideMenu";
import { useGetHomeControlsQuery } from "../../../redux/features/allApis/homeControlApi/homeControlApi";

const Navbar = ({ open, menuItems }) => {
  const { data: homeControls, isLoading } = useGetHomeControlsQuery();
  const [loading, setLoading] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [refCode, setRefCode] = useState(null); // Store the referral code
  const { search } = useLocation();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, token, singleUser } = useSelector((state) => state.auth);
  const [getSingleUser] = useLazyGetUserByIdQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const logo = homeControls?.find(
    (control) => control.category === "logo" && control.isSelected
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!user) return;
    getSingleUser(user?._id).then(({ data }) => {
      dispatch(setSingleUser(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const openModal = (id) => {
    document.getElementById(id).showModal();
  };

  // Automatically open the modal if referral code exists in the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const ref = urlParams.get("ref");

    if (ref) {
      setRefCode(ref); // Set referral code
      openModal("signup_modal"); // Automatically open modal
      navigate("/"); // Redirect to homepage (optional, since you're already on homepage)
    }
  }, [search, navigate]);

  const reloadBalance = () => {
    if (!user) return;

    setLoading(true);

    getSingleUser(user?._id)
      .then(({ data }) => {
        dispatch(setSingleUser(data));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignUpModalClose = () => {
    // Close modal by using document method
    document.getElementById("signup_modal").close();
    setSignupModalOpen(false); // Ensure the state reflects the modal is closed
  };

  // LanguageModal
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const toggleLanguageModal = () => {
    setIsLanguageModalOpen(!isLanguageModalOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    addToast("Logout successful", {
      appearance: "success",
      autoDismiss: true,
    });
    navigate("/");
  };

  const authenticatedRoutes = [
    { icon: IoMdHome, title: "Home", route: "/" },
    { icon: RiIdCardLine, title: "Promotion", route: "/promotion" },
    {
      icon: PiWallet,
      title: "Deposit",
      route: "",
      onClick: () => setIsDepositModalOpen(true),
    },
    {
      icon: LuUser,
      title: "My Account",
      route: "",
      onClick: () => setDrawerOpen(true),
    },
  ];

  return (
    <>
      <div>
        <div
          className={`bg-SidebarBg py-2 md:py-3.5 px-4 fixed left-0 right-0 z-20 duration-300 ${
            !open ? "md:ml-16" : "md:ml-64"
          }`}
        >
          <div className="md:flex items-center justify-between">
            <div className="flex items-center justify-between gap-1 sm:gap-3">
              <button className="md:hidden text-white" onClick={toggleSidebar}>
                <BiMenuAltLeft size={36} />
              </button>
              {!open && (
                <Link to={"/"}>
                  {isLoading ? (
                    <div className="w-32 h-10 bg-gray-300 animate-pulse rounded"></div>
                  ) : (
                    <img
                      className="w-32"
                      src={`${import.meta.env.VITE_BASE_API_URL}${logo?.image}`}
                      alt="Logo"
                    />
                  )}
                </Link>
              )}

              <div className="flex items-center gap-3 text-white md:hidden">
                <div className="flex flex-col items-center cursor-pointer">
                  <LuHardDriveDownload size={26} />
                  <p>app</p>
                </div>
                <div className="flex flex-col items-center cursor-pointer">
                  <MdOutlineMessage size={26} />
                  <p>LiveChat</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex gap-1 sm:gap-2 md:gap-3">
              <div className="flex gap-1 items-center sm:gap-2">
                {!user || !token ? (
                  <>
                    <button
                      className="text-xs sm:text-sm font-medium px-2 sm:px-4 md:px-7 py-1 md:py-2 text-loginButtonTextColor bg-loginButtonBgColor transition-all duration-300 rounded-md"
                      onClick={() => openModal("login_modal")}
                    >
                      Login
                    </button>
                    <button
                      className="text-xs sm:text-sm font-medium px-2 sm:px-3 md:px-6 py-1 md:py-2 text-white bg-signupButtonBgColor transition-all duration-300 rounded-md"
                      onClick={() => openModal("signup_modal")}
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    <Menu as="div" className="flex gap-3 relative">
                      <button
                        onClick={() => setIsDepositModalOpen(true)}
                        className="flex items-center gap-1 py-1.5 px-3 rounded-md text-loginButtonTextColor bg-loginButtonBgColor"
                      >
                        {" "}
                        <RiLuggageDepositFill size={18} />
                        Deposit
                      </button>
                      <button
                        onClick={reloadBalance}
                        className="flex items-center px-4 py-2 bg-mainWalletBtnHover text-white rounded-md hover:bg-mainWalletBtnHover transition duration-300"
                      >
                        <TfiReload
                          className={`mr-2 ${
                            loading ? "animate-spin" : ""
                          } transition duration-300`}
                        />

                        <span className="mr-2">Main Wallet</span>
                        <span className="font-semibold">
                          {singleUser?.balance || 0}
                        </span>
                      </button>
                      <Menu.Button>
                        <FaRegUserCircle
                          size={24}
                          className="text-white hover:text-[#f8f8f8dd] duration-300"
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-2 top-10 bg-[#333] border border-gray-700 rounded-lg shadow-lg focus:outline-none">
                          <UserMenu
                            handleLogout={handleLogout}
                            openDeposit={() => setIsDepositModalOpen(true)}
                            openWithdraw={() => setIsWithdrawModalOpen(true)}
                          />
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                )}
              </div>
              <div className="flex items-center">
                <div
                  className="w-6 md:w-7 cursor-pointer"
                  onClick={toggleLanguageModal}
                >
                  <img
                    src="https://png.pngtree.com/png-vector/20220606/ourmid/pngtree-bangladesh-flag-icon-in-modern-neomorphism-style-png-image_4872074.png"
                    alt="BD flag"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden">
          <MobileLeftSideMenu
            menuItems={menuItems}
            toggleMenu={toggleSidebar}
            isMenuOpen={isSidebarOpen}
            setIsMenuOpen={setIsSidebarOpen}
          />
        </div>

        {/* Mobile Menu login and sign up*/}
        <div
          className={`fixed bottom-0 left-0 ${
            !user && !token ? "" : "px-4 py-2"
          } z-40 w-full text-white flex justify-between md:hidden bg-gradient-to-t from-black to-SidebarBg`}
        >
          {!user && !token ? (
            <>
              {/* Bangladesh Flag Section */}
              <button
                className="py-1.5 px-1 w-full flex justify-center gap-1 languageBgColor"
                onClick={toggleLanguageModal}
              >
                <img
                  className="w-8 h-8"
                  src="https://png.pngtree.com/png-vector/20220606/ourmid/pngtree-bangladesh-flag-icon-in-modern-neomorphism-style-png-image_4872074.png"
                  alt="BD flag"
                />
                <span className="text-sm text-start font-semibold leading-none">
                  BDT <br /> English
                </span>
              </button>
              {/* Sign In Button */}
              <button
                className="py-1.5 px-1 w-full flex items-center justify-center bg-signupButtonBgColor"
                onClick={() => openModal("signup_modal")}
              >
                Sign up
              </button>
              {/* Login Button */}
              <button
                className="py-1.5 px-1 w-full flex items-center justify-center text-black bg-loginButtonBgColor"
                onClick={() => openModal("login_modal")}
              >
                Login
              </button>
            </>
          ) : (
            <>
              {authenticatedRoutes.map(
                ({ icon: Icon, title, route, onClick, state }) =>
                  route ? (
                    <Link
                      state={state}
                      to={route}
                      key={title}
                      className="flex flex-col items-center justify-center"
                    >
                      <Icon className="text-[22px]" />
                      <p className="text-xs">{title}</p>
                    </Link>
                  ) : (
                    <button
                      key={title}
                      className="flex flex-col items-center justify-center"
                      onClick={onClick}
                    >
                      <Icon className="text-[22px]" />
                      <p className="text-xs">{title}</p>
                    </button>
                  )
              )}
            </>
          )}
        </div>
        {/* Login Modal */}
        <AccoundModal id="login_modal" title="Login">
          <LoginForm
            onClose={() => document.getElementById("login_modal").close()}
          />
        </AccoundModal>
        {/* Signup Modal */}
        <AccoundModal id="signup_modal" title="Sign Up">
          <SignupForm
            refCode={refCode} // Pass referral code to the form
            onClose={() => document.getElementById("signup_modal").close()}
          />
        </AccoundModal>
        {/* Language Modal */}
        {isLanguageModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 z-40 backdrop-filter backdrop-blur">
            <div className="relative bg-black rounded-lg ">
              <div className="flex justify-between items-center gap-4 p-4 bg-[#333] rounded-t-lg">
                <p className="text-white text-lg font-bold">
                  Currency and Language
                </p>
                <button
                  className="absolute top-2 right-2 text-white"
                  onClick={toggleLanguageModal}
                >
                  <IoClose size={24} />
                </button>
              </div>
              <div className="py-6 px-4">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center">
                    <img
                      className="w-8 sm:w-10"
                      src="https://png.pngtree.com/png-vector/20220606/ourmid/pngtree-bangladesh-flag-icon-in-modern-neomorphism-style-png-image_4872074.png"
                      alt="BD flag"
                    />
                    <div className="flex items-center text-sm sm:text-base font-semibold text-gray-400">
                      <TbCurrencyTaka /> BDT
                    </div>
                  </div>
                  <button className="text-white p-1.5 w-24 sm:w-32 border border-gray-500">
                    বাংলা
                  </button>
                  <button className="text-SidebarBg p-1.5 w-24 sm:w-32 border border-SidebarBg">
                    English
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isDepositModalOpen && (
        <DepositModal closeDepositModal={() => setIsDepositModalOpen(false)} />
      )}
      {isWithdrawModalOpen && (
        <WithdrawModal
          closeWithdrawModal={() => setIsWithdrawModalOpen(false)}
        />
      )}
      {isDrawerOpen && (
        <AccountDetailsMobile
          setDrawerOpen={setDrawerOpen}
          openDeposit={() => setIsDepositModalOpen(true)}
          openWithdraw={() => setIsWithdrawModalOpen(true)}
        />
      )}
    </>
  );
};

export default Navbar;
