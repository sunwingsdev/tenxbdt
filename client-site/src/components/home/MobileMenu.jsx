import { useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";
import { PiWallet } from "react-icons/pi";
import { RiIdCardLine } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import AccountDetailsMobile from "./AccountDetailsMobile";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DepositModal from "./deposit-modal/DepositModal";

const MobileMenu = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLanguageModalOpen, setLanguageModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const openModal = (type) => {
    if (type === "login_modal") {
      console.log("Open login modal"); // Replace with actual login modal logic
    } else if (type === "signup_modal") {
      console.log("Open signup modal"); // Replace with actual signup modal logic
    }
  };

  const toggleLanguageModal = () => {
    setLanguageModalOpen(!isLanguageModalOpen);
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isDrawerOpen]);

  const authenticatedRoutes = [
    { icon: IoMdHome, title: "Home", route: "/" },
    { icon: RiIdCardLine, title: "Promotion", route: "" },
    {
      icon: PiWallet,
      title: "Deposit",
      route: "/profile/deposit",
      state: { method: "deposit" },
    },
    {
      icon: LuUser,
      title: "My Account",
      route: "",
      onClick: () => setDrawerOpen(true),
    },
  ];

  return (
    <div
      className={`sticky bottom-0 z-50 flex flex-row items-center justify-center bg-black text-white font-bold md:hidden 
        ${user && token ? "justify-between px-3 py-2" : ""}
      `}
    >
      {!user && !token ? (
        <>
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
          <button
            className="py-1.5 px-1 w-full flex items-center justify-center loginButtonBgColor"
            onClick={() => openModal("login_modal")}
          >
            Login
          </button>
          <button
            className="py-1.5 px-1 w-full flex items-center justify-center signinButtonBgColor"
            onClick={() => openModal("signup_modal")}
          >
            Sign up
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
                  className="flex flex-col items-center justify-center gap-1"
                  onClick={onClick}
                >
                  <Icon className="text-2xl" />
                  <p className="text-sm">{title}</p>
                </Link>
              ) : (
                <div
                  key={title}
                  className="flex flex-col items-center justify-center gap-1"
                  onClick={onClick}
                >
                  <Icon className="text-2xl" />
                  <p className="text-sm">{title}</p>
                </div>
              )
          )}
        </>
      )}

      {/* Full-Height Drawer */}
      {isDrawerOpen && <AccountDetailsMobile setDrawerOpen={setDrawerOpen} />}
      {isDepositModalOpen && (
        <DepositModal closeDepositModal={() => setIsDepositModalOpen(false)} />
      )}
    </div>
  );
};

export default MobileMenu;
