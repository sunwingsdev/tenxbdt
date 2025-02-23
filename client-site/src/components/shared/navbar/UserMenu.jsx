import { Menu } from "@headlessui/react";
import { BsBoxArrowInDown } from "react-icons/bs";
import { RiLuggageDepositFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GoProjectSymlink } from "react-icons/go";
import {
  MdLockReset,
  MdOutlineForwardToInbox,
  MdOutlinePersonalInjury,
  MdOutlineRoomPreferences,
} from "react-icons/md";
import { TbClipboardPlus } from "react-icons/tb";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";

const menuItems = [
  {
    icon: <RiLuggageDepositFill size={18} />,
    label: "Deposit",
    action: "openDeposit",
  },
  {
    icon: <BsBoxArrowInDown size={18} />,
    label: "Withdrawal",
    action: "openWithdraw",
  },
  { icon: <GoProjectSymlink size={18} />, label: "My Promotion" },
  { icon: <GoProjectSymlink size={18} />, label: "Betting Records" },
  { icon: <AiOutlineDollarCircle size={18} />, label: "Turnover" },
  { icon: <TbClipboardPlus size={18} />, label: "Transaction Records" },
  { icon: <MdOutlinePersonalInjury size={18} />, label: "Personal Info" },
  { icon: <MdLockReset size={18} />, label: "Reset Password" },
  { icon: <MdOutlineForwardToInbox size={18} />, label: "Inbox" },
  { icon: <MdOutlineRoomPreferences size={18} />, label: "Refer Bonus" },
];

const UserMenu = ({ handleLogout, openDeposit, openWithdraw }) => {
  const { user, singleUser } = useSelector((state) => state.auth);

  const handleClick = (action) => {
    if (action === "openDeposit") openDeposit();
    if (action === "openWithdraw") openWithdraw();
  };

  return (
    <div className="space-y-1 pb-2 w-56 rounded-lg bg-SidebarBg max-h-[510px] overflow-y-auto scrollbar-hide">
      <div className="p-4 text-gray-100 bg-SidebarBg rounded-t-lg">
        <h2 className="text-sm font-bold">{singleUser?.username}</h2>
        <p className="text-sm mt-2">VIP Points</p>
        <span className="text-yellow-300 font-bold">0</span>
        <p className="text-sm mt-0.5">Bonus Wallet</p>
        <span className="text-yellow-300 font-bold">
          ৳ {singleUser?.balance || 0}
        </span>
      </div>

      {user && singleUser?.role === "admin" && (
        <Menu.Item>
          <Link
            to="/dashboard"
            className="flex items-center font-medium gap-2 py-1.5 px-4 w-full text-base text-white"
          >
            <div className="bg-white p-1 text-black rounded-full">
              <MdOutlineRoomPreferences size={18} />
            </div>
            Dashboard
          </Link>
        </Menu.Item>
      )}

      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action ? () => handleClick(item.action) : undefined}
            className="flex items-center gap-2 py-1.5 px-4 w-full text-base text-white whitespace-nowrap"
          >
            <div className="bg-white p-1 text-black rounded-full">
              {item.icon}
            </div>
            {item.label}
          </button>
        ))}
      </div>

      <Menu.Item>
        {({ active }) => (
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 rounded-b-lg py-1.5 px-4 w-full text-base ${
              active ? "text-gray-100" : "text-white"
            }`}
          >
            <div className="bg-white p-1 text-black rounded-full">
              <IoIosLogOut size={18} />
            </div>
            Logout
          </button>
        )}
      </Menu.Item>
    </div>
  );
};

export default UserMenu;
