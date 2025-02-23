import { HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useSelector } from "react-redux";
import OppsModal from "../modal/OppsModal";
import { useGetHomeControlsQuery } from "../../../redux/features/allApis/homeControlApi/homeControlApi";

const MobileLeftSideMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  toggleMenu,
  menuItems,
}) => {
  const { data: homeControls, isLoading } = useGetHomeControlsQuery();
  const { user, token } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submenuOpenIndex, setSubmenuOpenIndex] = useState(null);
  const sidebarRef = useRef(null);
  const toggleSubmenu = (index) => {
    setSubmenuOpenIndex(submenuOpenIndex === index ? null : index);
  };
  const { addToast } = useToasts();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Sidebar বন্ধ হবে
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMenuOpen]);

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
      navigate(submenu?.demo);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full w-[70%] sm:w-1/2 z-50 bg-mobileMenuBg pb-6 transform overflow-y-auto ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
    >
      {/* Close Button */}
      <button
        onClick={toggleMenu}
        className="text-white absolute top-3 right-3"
      >
        <HiX size={28} />
      </button>

      <div className="pt-6 pb-3 ps-4">
        {isLoading ? (
          <div className="w-32 h-10 bg-gray-300 animate-pulse rounded"></div>
        ) : (
          <img
            src={`${import.meta.env.VITE_BASE_API_URL}${logo?.image}`}
            className="w-28"
            alt=""
          />
        )}
      </div>

      {/* Menu List */}
      <ul className="font-bold text-white">
        {menuItems?.map((item, index) => (
          <li key={index}>
            <Link
              onClick={!item?.path && !item?.submenu && handleMenuClick}
              to={item?.path}
            >
              <div
                className={`px-4 py-3 flex items-center gap-2 border-b border-gray-700 duration-300 hover:border-l-4 hover:border-l-slate-400 ${
                  !open && "justify-center"
                }`}
                onClick={() => item.submenu && toggleSubmenu(index)}
              >
                {/* Icon */}
                <img
                  src={item.icon}
                  alt={`${item.name} icon`}
                  className="w-7 h-7"
                />

                {/* Label */}
                <div className="flex items-center justify-between w-full">
                  <p className="">{item.name}</p>
                  {item?.submenu && item?.submenu?.length !== 0 && open && (
                    <FaAngleDown
                      className={`text-white duration-300 transform ${
                        submenuOpenIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Submenu toggle arrow */}
              </div>
            </Link>

            {/* Render Submenu */}
            {item.submenu && submenuOpenIndex === index && open && (
              <ul className="pl-4 flex flex-col bg-mobileSubMenuBg">
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      onClick={() =>
                        !subItem?.path &&
                        !subItem?.submenu &&
                        handleMenuClick(subItem)
                      }
                      to={subItem?.demo ? subItem?.demo : subItem?.path}
                      className="px-4 py-3 flex gap-4 text-sm items-center text-white"
                    >
                      {/* Icon */}
                      <img
                        src={subItem.icon}
                        alt={`${subItem.name} icon`}
                        className="w-5 h-5"
                      />
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {/* Modal */}
      <OppsModal
        title="Opps!!"
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
      >
        <p>Please contact your developer team to connect API!!!</p>
      </OppsModal>
    </div>
  );
};

export default MobileLeftSideMenu;
