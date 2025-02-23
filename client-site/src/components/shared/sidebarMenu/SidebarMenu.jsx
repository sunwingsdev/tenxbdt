import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import OppsModal from "../modal/OppsModal";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { useGetHomeControlsQuery } from "../../../redux/features/allApis/homeControlApi/homeControlApi";

const SidebarMenu = ({ open, setOpen, menuItems }) => {
  const { user, token } = useSelector((state) => state.auth);
  const { data: homeControls, isLoading } = useGetHomeControlsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState({
    GamesControl: false,
    GamesApikey: false,
    OracleTechnology: false, // Track submenu state for Games Control
    Bonuses: false, // Track submenu state for Games Control
    gameHistory: false, // Track submenu state for Games Control
    Fontend: false, // Track submenu state for Games Control
    BankingDeposit: false, // Track submenu state for Games Control
    BankingWithdrow: false, // Track submenu state for Games Control
    Settings: false, // Track submenu state for Games Control
  });
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const logo = homeControls?.find(
    (control) => control.category === "logo" && control.isSelected
  );

  const handleMenuClick = (submenu) => {
    if (!user && !token) {
      addToast("Please login to access this page", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    if (submenu?.demo) {
      navigate(submenu.demo);
    } else {
      setIsModalOpen(true);
    }
  };

  // Toggle submenu visibility
  const toggleSubmenu = (menu) => {
    setSubmenuOpen((prevState) => {
      const updatedState = {};
      for (let key in prevState) {
        updatedState[key] = false;
      }
      updatedState[menu] = !prevState[menu];
      return updatedState;
    });
  };

  // Handle toggle sidebar visibility
  const handleToggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  // Open modal
  // const handleModalOpen = () => {
  //   setIsModalOpen(true);
  // };

  // Close modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div
        className={`${
          open ? "w-64" : "w-16"
        } hidden md:block duration-300 h-screen fixed`}
      >
        {/* Start Top collapse */}
        <div className={`bg-SideBarTopBg py-3 h-full ${!open && "py-5"}`}>
          <div className="flex gap-x-3 items-center justify-center">
            <div className={`flex gap-1 ${!open && "hidden"}`}>
              <Link
                to={"/"}
                className="flex items-center gap-1 px-2 rounded-lg"
              >
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
            </div>
            <div>
              <IoIosArrowBack
                className={`m-auto text-center w-10 h-7 p-1 bg-sideBerTopBtnBg text-white rounded-full cursor-pointer ${
                  !open && "rotate-180"
                } `}
                onClick={handleToggleSidebar}
              />
            </div>
          </div>
        </div>
        {/* End Top collapse */}
      </div>

      {/* Start Menu bar */}
      <div
        className={`bg-SidebarBg overflow-y-auto fixed mt-[62px] hidden md:block pb-16 ${
          open ? "w-64" : "w-16"
        } text-sm text-white duration-300 font-semibold h-full scrollbar-hide`}
      >
        {/* Dynamic Menu Rendering */}
        {menuItems?.map((item, index) => (
          <div key={index}>
            <Link
              onClick={!item?.path && !item?.submenu && handleMenuClick}
              to={item?.path}
            >
              <div
                className={`px-4 py-2 flex flex-row items-center gap-2 hover:bg-sideBerTopBtnBg duration-300 ${
                  open ? "justify-between" : "justify-center"
                }
                }`}
                onClick={() => item?.submenu && toggleSubmenu(item?.name)}
              >
                {/* Only show icon for menu items with submenus */}
                <div className="flex flex-row items-center gap-2">
                  <img
                    className="w-8 text-black bg-white rounded-full"
                    src={item?.icon}
                    alt=""
                  />
                  <p className={`${!open && "hidden"}`}>{item?.name}</p>
                </div>
                {/* Show arrow for submenu toggle */}
                {item?.submenu && item?.submenu?.length !== 0 && open && (
                  <FaAngleDown className={`text-white ${!open && "hidden"}`} />
                )}
              </div>
            </Link>

            {/* Only show submenu when "Games Control" is clicked */}
            {item?.submenu && submenuOpen[item?.name] && (
              <div
                className={`text-white text-sm font-semibold ${
                  open
                    ? "bg-menuHoverActiveColor pl-8"
                    : "bg-menuHoverActiveColor hover:bg-sideBerTopBtnBg"
                } duration-300`}
              >
                {item?.submenu?.map((subItem, subIndex) => (
                  <Link
                    onClick={() =>
                      !subItem.path &&
                      !subItem.submenu &&
                      handleMenuClick(subItem)
                    }
                    key={subIndex}
                    to={subItem?.demo ? subItem.demo : subItem?.path}
                    className={`py-2.5 flex gap-2 ${
                      !open && "flex items-center justify-center"
                    }`}
                  >
                    <img className="w-5 h-5" src={subItem?.icon} alt="" />
                    {open && <span>{subItem?.name}</span>}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      <OppsModal
        title="Opps!!"
        isOpen={isModalOpen}
        onOpenChange={handleModalClose}
      >
        <p>Please contact your developer team to connect API!!!</p>
      </OppsModal>
    </div>
  );
};

export default SidebarMenu;
