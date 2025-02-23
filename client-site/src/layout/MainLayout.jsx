import { Outlet } from "react-router-dom";
import Footer from "../components/shared/footer/footer";
import Navbar from "../components/shared/navbar/Navbar";
import SidebarMenu from "../components/shared/sidebarMenu/SidebarMenu";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import sticker from "../assets/sticker.gif";

// import MobileMenu from "../components/home/MobileMenu";

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const [isStickerOpen, setIsStickerOpen] = useState(true);

  const menuItems = [
    {
      name: "হোম",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-home.png?v=1737700451320",
      path: "/",
      submenu: [],
    },
    {
      name: "হট গেমস",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-hotgame.png?v=1737700451320",
      submenu: [
        {
          name: "9WICKETS",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-9w.png?v=1735560346274",
        },
        {
          name: "CRAZYTIME",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-crazytime.png?v=1735560346274",
        },
        {
          name: "AVIATOR",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-aviator.png?v=1735560346274",
          demo: "/games/demo/aviator",
        },
        {
          name: "SUPERACE",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-superace.png?v=1735560346274",
          demo: "/games/demo/super-ace",
        },
        {
          name: "MONEY COMING",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-moneycoming.png?v=1735560346274",
        },
        {
          name: "ANDAR BAHAR",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-andarbahar.png?v=1735560346274",
        },
        {
          name: "SEXY BACCARAT",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-sexybacarratclassic.png?v=1735560346274",
        },
        {
          name: "7UP7DOWN",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-7up7down2.png?v=1735560346274",
        },
      ],
    },
    {
      name: "স্পোর্টস",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-sport.png?v=1737700451320",
      submenu: [
        {
          name: "9WICKETS",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-exchange.png?v=1735560346274",
        },
        {
          name: "SBO",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-sbov2.png?v=1735560346274",
        },
        {
          name: "SABA",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-saba.png?v=1735560346274",
        },
        {
          name: "CMD",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-cmd.png?v=1735560346274",
        },
        {
          name: "BTI",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-sbtech.png?v=1735560346274",
        },
        {
          name: "HORSE",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-horsebook.png?v=1735560346274",
        },
        {
          name: "SV388",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-awcmrwb.png?v=1735560346274",
        },
        {
          name: "RWB",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-nst.png?v=1735560346274",
        },
        {
          name: "PINNACLE",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/sports-icon/icon-awcmpinnacle.png?v=1735560346274",
        },
      ],
    },
    {
      name: "স্লট",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-slot.png?v=1737700451320",
      submenu: [
        {
          name: "JILI",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmjili.png?v=1735560346274",
        },
        {
          name: "PG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-pg.png?v=1735560346274",
        },
        {
          name: "JDB",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-jdb.png?v=1735560346274",
        },
        {
          name: "FASTSPIN",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmfastspin.png?v=1735560346274",
        },
        {
          name: "PLAY8",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmp8.png?v=1735560346274",
        },
        {
          name: "REDTIGER",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmrt.png?v=1735560346274",
        },
        {
          name: "SG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmsg.png?v=1735560346274",
        },
        {
          name: "CQ9",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-cq9.png?v=1735560346274",
        },
        {
          name: "FC",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmfc.png?v=1735560346274",
        },
        {
          name: "KA",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-ka.png?v=1735560346274",
        },
        {
          name: "PP",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmpp.png?v=1735560346274",
        },
        {
          name: "PT",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmpt.png?v=1735560346274",
        },
        {
          name: "NETENT",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-netent.png?v=1735560346274",
        },
        {
          name: "JOKER",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-joker.png?v=1735560346274",
        },
        {
          name: "PNG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-playngo.png?v=1735560346274",
        },
        {
          name: "NEXTSPIN",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-nextspin.png?v=1735560346274",
        },
        {
          name: "RICH88",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-rich88.png?v=1735560346274",
        },
        {
          name: "WORLDMATCH",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-worldmatch.png?v=1735560346274",
        },
        {
          name: "YELLOWBAT",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmyesbingo.png?v=1735560346274",
        },
      ],
    },
    {
      name: "ক্রাশ",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-crash.png?v=1737700451320",
      submenu: [
        {
          name: "AVIATOR",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-jdbaspribe.png?v=1735560346274",
        },
        {
          name: "JILI",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmjili.png?v=1735560346274",
        },
        {
          name: "KM",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmkm.png?v=1735560346274",
        },
        {
          name: "PP",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmpp.png?v=1735560346274",
        },
      ],
    },
    {
      name: "ক্যাসিনো",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-casino.png?v=1737700451320",
      submenu: [
        {
          name: "EVO",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-evo.png?v=1735560346274",
        },
        {
          name: "SEXY",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmsexy.png?v=1735560346274",
        },
        {
          name: "PP",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmpp.png?v=1735560346274",
        },
        {
          name: "PT",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmpt.png?v=1735560346274",
        },
        {
          name: "HOTROAD",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmhotroad.png?v=1735560346274",
        },
        {
          name: "DG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmdg.png?v=1735560346274",
        },
      ],
    },
    {
      name: "টেবিল",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-table.png?v=1737700451320",
      submenu: [
        {
          name: "JILI",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmjili.png?v=1735560346274",
        },
        {
          name: "KM",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmkm.png?v=1735560346274",
        },
        {
          name: "RICH88",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-rich88.png?v=1735560346274",
        },
        {
          name: "SPRIBE",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-jdbaspribe.png?v=1735560346274",
        },
        {
          name: "PG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-pg.png?v=1735560346274",
        },
        {
          name: "WORLDMATCH",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-worldmatch.png?v=1735560346274",
        },
        {
          name: "KA",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-ka.png?v=1735560346274",
        },
        {
          name: "CQ9",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-cq9.png?v=1735560346274",
        },
        {
          name: "PNG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-cq9.png?v=1735560346274",
        },
        {
          name: "BPOKER",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-bpoker.png?v=1735560346274",
        },
        {
          name: "MONOPOLY",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-monopoly.png?v=1735560346274",
        },
      ],
    },
    {
      name: "লটারি",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-lottery.png?v=1737700451320",
      submenu: [
        {
          name: "AVIATOR",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-jdbaspribe.png?v=1735560346274",
        },
        {
          name: "JILI",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmjili.png?v=1735560346274",
        },
        {
          name: "KM",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmkm.png?v=1735560346274",
        },
        {
          name: "PP",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmpp.png?v=1735560346274",
        },
      ],
    },
    {
      name: "ফিসিং",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-fish.png?v=1737700451320",
      submenu: [
        {
          name: "EVO",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-evo.png?v=1735560346274",
        },
        {
          name: "SEXY",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmsexy.png?v=1735560346274",
        },
        {
          name: "PP",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmpp.png?v=1735560346274",
        },
        {
          name: "PT",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmpt.png?v=1735560346274",
        },
        {
          name: "HOTROAD",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmhotroad.png?v=1735560346274",
        },
        {
          name: "DG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmdg.png?v=1735560346274",
        },
      ],
    },
    {
      name: "আর্কেড",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-arcade.png?v=1737700451320",
      submenu: [
        {
          name: "JILI",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmjili.png?v=1735560346274",
        },
        {
          name: "KM",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-awcmkm.png?v=1735560346274",
        },
        {
          name: "RICH88",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-rich88.png?v=1735560346274",
        },
        {
          name: "SPRIBE",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-jdbaspribe.png?v=1735560346274",
        },
        {
          name: "PG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-pg.png?v=1735560346274",
        },
        {
          name: "WORLDMATCH",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-worldmatch.png?v=1735560346274",
        },
        {
          name: "KA",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-ka.png?v=1735560346274",
        },
        {
          name: "CQ9",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-cq9.png?v=1735560346274",
        },
        {
          name: "PNG",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-cq9.png?v=1735560346274",
        },
        {
          name: "BPOKER",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-bpoker.png?v=1735560346274",
        },
        {
          name: "MONOPOLY",
          icon: "https://img.d4040p.com/dp/h5/assets/images/brand/white/provider-monopoly.png?v=1735560346274",
        },
      ],
    },
    {
      name: "প্রোমোশনস",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-promotion.png?v=1737700451320",
      path: "/promotion",
    },
    {
      name: "রেফার বোনাস",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-referral.png?v=1737700451320",
    },
    {
      name: "ডাউনলোড",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-download.png?v=1737700451320",
    },
    {
      name: "যোগাযোগ",
      icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-talk.png?v=1737700451320",
      submenu: [
        {
          name: "Telegram Support",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-telegram.png?v=1735560346274",
        },
        {
          name: "Live Chat",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-customer.png?v=1735560346274",
        },
        {
          name: "Messenger",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-facebook-messenger.png?v=1735560346274",
        },
        {
          name: "Email",
          icon: "https://img.d4040p.com/dp/h5/assets/images/icon-set/theme-icon/icon-email.png?v=1735560346274",
        },
      ],
    },
  ];

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <SidebarMenu open={open} setOpen={setOpen} menuItems={menuItems} />

      {/* Content Area */}
      <div
        className={`flex-1 h-screen overflow-y-auto duration-300 ${
          !open ? "md:pl-16" : "md:pl-64"
        }`}
      >
        <Navbar open={open} setOpen={setOpen} menuItems={menuItems} />
        <div className="mt-[62px] md:mt-16 md:px-40 bg-SiteBg">
          <Outlet />
          <Footer />
        </div>

        {/* {!hideCommonComponents && <MobileMenu />} */}
      </div>

      {/* sticker */}
      {isStickerOpen && (
        <div className="absolute bottom-11 md:bottom-3 left-2 md:left-8 z-50">
          <div className="flex justify-end">
            <button
              onClick={() => setIsStickerOpen(false)}
              className="text-white text-xl md:text-2xl"
            >
              <IoIosCloseCircle />
            </button>
          </div>
          <img className="w-24 md:w-40" src={sticker} alt="" />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
