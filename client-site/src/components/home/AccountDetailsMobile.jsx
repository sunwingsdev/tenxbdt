import { logout, setSingleUser } from "../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { BsClipboardHeart } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { FaEye, FaEyeSlash, FaUsers, FaWhatsapp } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IoMailOpenOutline } from "react-icons/io5";
import { MdDoubleArrow, MdLockOpen, MdOutlineEmail } from "react-icons/md";
import { PiHandWithdraw, PiWallet } from "react-icons/pi";
import { RiBitCoinLine, RiMessengerLine } from "react-icons/ri";
import { VscNotebook } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OppsModal from "../shared/modal/OppsModal";
import { useToasts } from "react-toast-notifications";
import myAccount from "../../assets/myAccount.png";
import { useLazyGetUserByIdQuery } from "../../redux/features/allApis/usersApi/usersApi";
import { TfiReload } from "react-icons/tfi";

const Card = ({ contents, heading, handleModalOpen, closeModal }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white text-SidebarBg font-semibold rounded-md py-2 space-y-2">
      <h2 className="border-s-8 border-SidebarBg px-2 ms-2">{heading}</h2>
      <div className="w-full border-t border-SidebarBg"></div>
      <div
        className={`flex items-center px-2 ${
          contents.length === 4
            ? "justify-between"
            : contents.length === 3
            ? "justify-center gap-12"
            : "justify-center gap-24"
        }`}
      >
        {contents?.map(({ icon: Icon, title, route, state, onClick }) =>
          route ? (
            <Link
              // state={{ method: state }}
              to={route}
              onClick={(e) => {
                e.preventDefault();
                closeModal();
                navigate(route, { state: { method: state } });
              }}
              key={title}
              className="flex flex-col items-center justify-center gap-1.5"
            >
              <div className="rounded-full bg-gray-200 text-black p-1.5">
                <Icon className="text-xl" />
              </div>
              <p className="text-xs sm:text-sm text-center">{title}</p>
            </Link>
          ) : (
            <div
              onClick={onClick || handleModalOpen}
              key={title}
              className="flex flex-col items-center justify-center gap-1.5"
            >
              <div className="rounded-full bg-gray-200 text-black p-1.5">
                {" "}
                <Icon className="text-xl" />
              </div>
              <p className="text-xs sm:text-sm text-center">{title}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const AccountDetailsMobile = ({ setDrawerOpen, openDeposit, openWithdraw }) => {
  const { user, singleUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getSingleUser] = useLazyGetUserByIdQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    setDrawerOpen(false);
    addToast("Logout successful", {
      appearance: "success",
      autoDismiss: true,
    });
    navigate("/");
  };

  useEffect(() => {
    if (!user) return;
    getSingleUser(user?._id).then(({ data }) => {
      dispatch(setSingleUser(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const tohobilContents = [
    {
      icon: PiWallet,
      title: "Deposit",
      onClick: () => {
        openDeposit();
        setDrawerOpen(false);
      },
    },
    {
      icon: PiHandWithdraw,
      title: "Withdraw",
      onClick: () => {
        openWithdraw();
        setDrawerOpen(false);
      },
    },
  ];
  const historyContents = [
    { icon: VscNotebook, title: "Bet Records", route: "" },
    { icon: RiBitCoinLine, title: "Turnover", route: "" },
    { icon: BsClipboardHeart, title: "Transaction records", route: "" },
  ];
  const profileContents = [
    { icon: CiUser, title: "Personal Info", route: "/profile" },
    { icon: MdLockOpen, title: "Reset Password", route: "" },
    { icon: IoMailOpenOutline, title: "Inbox", route: "" },
    { icon: FaUsers, title: "Referrals", route: "" },
  ];
  const contactContents = [
    { icon: FaWhatsapp, title: "Whatsapp", route: "" },
    { icon: MdOutlineEmail, title: "Email", route: "" },
    { icon: RiMessengerLine, title: "Facebook", route: "" },
  ];

  return (
    <>
      <div className="fixed inset-0 flex items-center bg-footerBg justify-center z-50 font-normal overflow-y-auto">
        {/* Drawer Content */}
        <div className="w-full h-full rounded-t-2xl shadow-lg flex flex-col">
          <button
            onClick={() => setDrawerOpen(false)}
            className="self-end text-footerTextColor bg-gray-300 font-bold absolute ps-10 pe-2 pb-8 rounded-bl-full text-2xl z-50"
          >
            ✕
          </button>
          <div className="">
            <img className="-mt-8" src={myAccount} alt="" />
            <div className="px-3 absolute -mt-32 space-y-4 w-full">
              <div className="flex items-center justify-between">
                <div className="w-1/6 m-auto">
                  <img
                    className="w-[70px]"
                    src="https://www.baji.live/images/v1/web/bj/vip/bdt/rank1.png"
                    alt=""
                  />
                </div>
                <div className="w-5/6 space-y-2">
                  <p className="text-xl font-bold text-white">
                    User Id : {user?.username}
                  </p>
                  <div className="bg-white font-semibold text-black flex items-center justify-center gap-2 px-3 py-2 text-[10px] rounded-full w-fit">
                    <p>
                      {" "}
                      VIP Points (VP){" "}
                      <span className="text-[#39d89f] ms-2">0</span>
                    </p>
                    <p className="border-s border-white ps-3 inline-flex items-center gap-1">
                      My Vip <MdDoubleArrow className="text-lg" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-SidebarBg text-white px-3 py-7 rounded-md flex items-center justify-between">
                <p className="inline-flex items-center gap-3 text-sm">
                  Main Wallet{" "}
                  {isWalletOpen ? (
                    <FaEyeSlash
                      onClick={() => setIsWalletOpen(false)}
                      className="text-xl"
                    />
                  ) : (
                    <FaEye
                      onClick={() => setIsWalletOpen(true)}
                      className="text-xl"
                    />
                  )}
                </p>
                <p className="text-xl text-yellow-300">
                  <span
                    onClick={reloadBalance}
                    className="ms-2 inline-flex items-center gap-2"
                  >
                    <TfiReload
                      className={`mr-2 ${
                        loading ? "animate-spin" : ""
                      } transition duration-300`}
                    />
                    ৳ {isWalletOpen ? singleUser?.balance || 0 : "***"}
                  </span>
                </p>
              </div>

              <Card
                handleModalOpen={handleModalOpen}
                contents={tohobilContents}
                heading="Funding"
                closeModal={() => setDrawerOpen(false)}
              />
              <Card
                inMaintainance={true}
                handleModalOpen={handleModalOpen}
                contents={historyContents}
                heading="History"
                closeModal={() => setDrawerOpen(false)}
              />
              <Card
                inMaintainance={true}
                handleModalOpen={handleModalOpen}
                contents={profileContents}
                heading="Profile"
                closeModal={() => setDrawerOpen(false)}
              />
              <Card
                contents={contactContents}
                heading="Contact Us"
                closeModal={() => setDrawerOpen(false)}
              />
              <div
                onClick={handleLogout}
                className="bg-white hover:bg-SidebarBg duration-300 text-black py-3 rounded-md flex items-center justify-center"
              >
                <p className="inline-flex items-center justify-center gap-3 text-sm">
                  <IoIosLogOut className="text-2xl" />
                  Log Out
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OppsModal
        isOpen={isModalOpen}
        onOpenChange={handleModalClose}
        title="Oops!!!"
        // onSave={handleSaveChanges}
      >
        <p className="text-center text-red-600">
          Please contact the API Connect us Oracle Technology developers team...
        </p>
      </OppsModal>
    </>
  );
};

export default AccountDetailsMobile;
