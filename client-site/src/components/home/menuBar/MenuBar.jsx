import { useState } from "react";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import OppsModal from "../../shared/modal/OppsModal";
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState(2);
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const menuItems = [
    // {
    //   id: 1,
    //   name: "HOT GAME",
    //   icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-home.png?v=1737700451320",
    //   subItems: [
    //     {
    //       id: 1,
    //       name: "9WICKETS",
    //       icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-9w.png?v=1735554256445&source=mcdsrc",
    //     },
    //     {
    //       id: 2,
    //       name: "AVIATOR",
    //       icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-aviator.png?v=1735554256445&source=mcdsrc",
    //       demo: "/games/demo/aviator",
    //     },
    //     {
    //       id: 3,
    //       name: "CRAZYTIME",
    //       icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-crazytime.png?v=1735554256445&source=mcdsrc",
    //     },
    //     {
    //       id: 4,
    //       name: "BACCARAT",
    //       icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-sexybacarratclassic.png?v=1735554256445&source=mcdsrc",
    //     },
    //     {
    //       id: 5,
    //       name: "MONEY COMING",
    //       icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-moneycoming.png?v=1735554256445&source=mcdsrc",
    //     },
    //     {
    //       id: 6,
    //       name: "SUPERACE",
    //       icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-superace.png?v=1735554256445&source=mcdsrc",
    //       demo: "/games/demo/super-ace",
    //     },
    //     {
    //       id: 7,
    //       name: "7UP7DOWN",
    //       icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-7up7down2.png?v=1735554256445&source=mcdsrc",
    //     },
    //     {
    //       id: 8,
    //       name: "ANDAR BAHAR",
    //       icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-andarbahar.png?v=1735554256445&source=mcdsrc",
    //     },
    //   ],
    // },
    {
      id: 2,
      name: "SPORTS",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-sport.png?v=1737700451320",
      subItems: [
        {
          id: 1,
          name: "9WICKETS",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-exchange.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 2,
          name: "SBO",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-sbov2.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 3,
          name: "SABA",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-saba.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 4,
          name: "CMD",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-cmd.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 5,
          name: "BTI",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-sbtech.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 6,
          name: "HORSE",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-horsebook.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 7,
          name: "SV388",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-sv388.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 8,
          name: "RWB",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-awcmrwb.png?v=1735554256445&source=mcdsrc",
        },
      ],
    },
    {
      id: 3,
      name: "SLOTS",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-slot.png?v=1737700451320",
      subItems: [
        {
          id: 1,
          name: "JILI",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmjili.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 2,
          name: "PG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-pg.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 3,
          name: "JDB",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-jdb.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 4,
          name: "FASTSPIN",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmfastspin.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 5,
          name: "PLAY8",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmp8.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 6,
          name: "REDTIGER",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmrt.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 7,
          name: "SG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmsg.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 8,
          name: "CQ9",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-cq9.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 9,
          name: "FC",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmfc.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 10,
          name: "KA",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-ka.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 11,
          name: "PP",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmpp.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 12,
          name: "PT",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmpt.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 13,
          name: "NETENT",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-netent.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 14,
          name: "JOKER",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-joker.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 15,
          name: "PNG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-playngo.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 16,
          name: "NEXTSPIN",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-nextspin.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 17,
          name: "RICH88",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-rich88.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 18,
          name: "WORLDMATCH",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-worldmatch.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 19,
          name: "YELLOWBAT",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmyesbingo.png?v=1735554256445&source=mcdsrc",
        },
        { id: 20, name: "", icon: "" },
        { id: 21, name: "", icon: "" },
        { id: 22, name: "", icon: "" },
        { id: 23, name: "", icon: "" },
        { id: 24, name: "", icon: "" },
      ],
    },
    {
      id: 4,
      name: "CRASH",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-crash.png?v=1737700451320",
      subItems: [
        {
          id: 1,
          name: "AVIATOR",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-jdbaspribe.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 2,
          name: "JILI",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmjili.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 3,
          name: "KA",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-ka.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 4,
          name: "PP",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmpp.png?v=1735554256445&source=mcdsrc",
        },
        { id: 5, name: "", icon: "" },
        { id: 6, name: "", icon: "" },
        { id: 7, name: "", icon: "" },
        { id: 8, name: "", icon: "" },
      ],
    },
    {
      id: 5,
      name: "CASINO",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-casino.png?v=1737700451320",
      subItems: [
        {
          id: 1,
          name: "EVO",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-evo.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 2,
          name: "SEXY",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmsexy.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 3,
          name: "PP",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmpp.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 4,
          name: "PT",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmpt.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 5,
          name: "HOTRORD",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmhotroad.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 6,
          name: "DG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmdg.png?v=1735554256445&source=mcdsrc",
        },
        { id: 7, name: "", icon: "" },
        { id: 8, name: "", icon: "" },
      ],
    },
    {
      id: 6,
      name: "TABLE",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-table.png?v=1737700451320",
      subItems: [
        {
          id: 1,
          name: "JILI",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmjili.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 2,
          name: "kM",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmkm.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 3,
          name: "RICH88",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-rich88.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 4,
          name: "SPRIBE",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-jdbaspribe.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 5,
          name: "PG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-pg.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 6,
          name: "WORLDMATCH",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-worldmatch.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 7,
          name: "KA",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-ka.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 8,
          name: "CQ9",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-cq9.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 9,
          name: "PNG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-playngo.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 10,
          name: "MONOPOLY",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-monopoly.png?v=1735554256445&source=mcdsrc",
        },
        { id: 11, name: "", icon: "" },
        { id: 12, name: "", icon: "" },
        { id: 13, name: "", icon: "" },
        { id: 14, name: "", icon: "" },
        { id: 15, name: "", icon: "" },
        { id: 16, name: "", icon: "" },
      ],
    },
    {
      id: 7,
      name: "LOTTERY",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-lottery.png?v=1737700451320",
      subItems: [
        {
          id: 1,
          name: "9WICKETS",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-exchange.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 2,
          name: "SBO",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-sbov2.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 3,
          name: "SABA",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-saba.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 4,
          name: "CMD",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-cmd.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 5,
          name: "BTI",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-sbtech.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 6,
          name: "HORSE",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-horsebook.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 7,
          name: "SV388",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-sv388.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 8,
          name: "RWB",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-awcmrwb.png?v=1735554256445&source=mcdsrc",
        },
      ],
    },
    {
      id: 8,
      name: "FISHING",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-fish.png?v=1737700451320",
      subItems: [
        {
          id: 1,
          name: "9WICKETS",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-9w.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 2,
          name: "AVIATOR",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-aviator.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 3,
          name: "CRAZYTIME",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-crazytime.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 4,
          name: "BACCARAT",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-sexybacarratclassic.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 5,
          name: "MONEY COMING",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-moneycoming.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 6,
          name: "SUPERACE",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-superace.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 7,
          name: "7UP7DOWN",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-7up7down2.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 8,
          name: "ANDAR BAHAR",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-andarbahar.png?v=1735554256445&source=mcdsrc",
        },
      ],
    },
    {
      id: 9,
      name: "ARCADE",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-arcade.png?v=1737700451320",
      subItems: [
        {
          id: 1,
          name: "JILI",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmjili.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 2,
          name: "PG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-pg.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 3,
          name: "JDB",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-jdb.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 4,
          name: "FASTSPIN",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmfastspin.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 5,
          name: "PLAY8",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmp8.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 6,
          name: "REDTIGER",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmrt.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 7,
          name: "SG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmsg.png?v=1735554256445&source=mcdsrc",
        },
        {
          id: 8,
          name: "CQ9",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-cq9.png?v=1735554256445&source=mcdsrc",
        },
      ],
    },
  ];

  const handleMenuClick = (subItem) => {
    if (!user && !token) {
      addToast("Please login to play this game", { appearance: "error" });
    }
    if (subItem.demo) {
      navigate(subItem.demo);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div>
        {/* Menu Bar */}
        <div className="menu-container flex bg-MenuBarBg overflow-x-auto">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-[90px] text-center py-3 px-3 md:px-5 text-xs font-semibold cursor-pointer ${
                activeTab === item.id ? "bg-gameMenuBgActive" : "text-white"
              }`}
            >
              <div className="tab-content">
                {/* <img
                  className={`w-8 m-auto tab-image ${
                    activeTab === item.id ? "filter-white" : "filter-white"
                  }`}
                  src={item.icon}
                  alt={item.name}
                /> */}
                <img
                  className="w-8 m-auto text-black bg-white rounded-full"
                  src={item?.icon}
                  alt=""
                />
                <p className="mt-0.5 text-white whitespace-nowrap">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Section */}
        {menuItems
          .filter((item) => item.id === activeTab)
          .map((item) => (
            <div key={item.id} className="px-4 md:px-0">
              <div className="py-2 text-center text-footerTextColor">
                <p className="text-sm font-semibold text-start border-l-4 border-footerTextColor pl-2">
                  {item.name}
                </p>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-1">
                {item.subItems.map((subItem) => (
                  <div
                    onClick={() => handleMenuClick(subItem)}
                    key={subItem.id}
                    className="text-center py-3 px-1.5 bg-SidebarBg cursor-pointer"
                  >
                    {subItem.icon && (
                      <img
                        className="w-6 lg:w-10 h-6 lg:h-10 mx-auto"
                        src={subItem.icon}
                        alt={subItem.name}
                      />
                    )}
                    <p className="mt-1 text-xs lg:text-sm font-semibold text-white whitespace-nowrap truncate">
                      {subItem.name}
                    </p>
                  </div>
                ))}
                {item.subItems.length === 0 && (
                  <p className="col-span-3 md:col-span-4 text-center text-gray-400">
                    No additional items available.
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Modal */}
      <OppsModal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
        title="Opps!"
      >
        <p>Please contact your developer team to connect API!!!</p>
      </OppsModal>
    </>
  );
};

export default MenuBar;
