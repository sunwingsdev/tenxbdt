import { Link } from "react-router-dom";
import BrandAmbassador from "../brandAmbassador/BrandAmbassador";
import Social from "../social/Social";
import { useGetHomeControlsQuery } from "../../../redux/features/allApis/homeControlApi/homeControlApi";

const Footer = () => {
  const { data: homeControls, isLoading } = useGetHomeControlsQuery();

  const logo = homeControls?.find(
    (control) => control.category === "logo" && control.isSelected
  );
  // social
  const socials = [
    {
      urlLink: "https://www.facebook.com/",
      image:
        "https://img.m156b.com/mb/h5/assets/images/footer/socialicons/facebook.svg?v=1727771384153&source=mcdsrc",
    },
    {
      urlLink: "https://www.instagram.com/",
      image:
        "https://img.m156b.com/mb/h5/assets/images/footer/socialicons/instagram.svg?v=1727771384153&source=mcdsrc",
    },
    {
      urlLink: "https://twitter.com/",
      image:
        "https://img.m156b.com/mb/h5/assets/images/footer/socialicons/twitter.svg?v=1727771384153&source=mcdsrc",
    },
    {
      urlLink: "https://web.telegram.org/",
      image:
        "https://img.m156b.com/mb/h5/assets/images/footer/socialicons/telegram-channel.svg?v=1727771384153&source=mcdsrc",
    },
    {
      urlLink: "/",
      image:
        "https://img.m156b.com/mb/h5/assets/images/footer/socialicons/pinterest.svg?v=1727771384153&source=mcdsrc",
    },
  ];
  const accounts = [
    {
      image:
        "https://img.m156b.com/mb/h5/assets/images/footer/white/pay16.png?v=1727771384153&source=mcdsrc",
    },
    {
      image:
        "https://img.m156b.com/mb/h5/assets/images/footer/white/pay22.png?v=1727771384153&source=mcdsrc",
    },
    {
      image:
        "https://img.m156b.com/mb/h5/assets/images/footer/white/pay33.png?v=1727771384153&source=mcdsrc",
      imageSize: true,
    },
    {
      image:
        "https://img.m156b.com/mb/h5/assets/images/footer/white/pay34.png?v=1727771384153&source=mcdsrc",
    },
  ];

  const routes = [
    { value: "about-us", label: "About Us" },
    { value: "contact-us", label: "Contact Us" },
    { value: "terms-conditions", label: "Terms and Conditions" },
    { value: "rules-regulations", label: "Rules and Regulations" },
    { value: "responsible-gaming", label: "Responsible Gaming" },
    { value: "privacy-policy", label: "Privacy Policy" },
  ];

  return (
    <div>
      <div className="text-base bg-footerBg text-footerTextColor p-4 pt-8 space-y-3">
        {/* মুল্য পরিশোধ পদ্ধতি */}
        <p className="text-base">Payment Methods</p>
        <div className="flex gap-6 py-2">
          {accounts.map((account) => (
            <BrandAmbassador
              key={account.image}
              image={account.image}
              item={account}
            />
          ))}
        </div>
        {/* কমিউনিটি ওয়েবসাইট */}
        <p>Community Websites</p>
        <div className="flex gap-3">
          {socials.map((social) => (
            <Social key={social.image} social={social} />
          ))}
          <Social />
        </div>
        {/* অফিসিয়াল পার্টনার */}
        <p className="pt-4">Official Partner</p>
        <div className="flex gap-4">
          <img
            className="w-28"
            src="https://img.m156b.com/mb/h5/assets/images/footer/white/official-partner-heyvip.png?v=1727771384153&source=mcdsrc"
            alt=""
          />
        </div>
        <div className="pt-4 flex flex-wrap gap-2">
          {routes?.map((route) => (
            <Link key={route?.value} to={`/pages/${route?.value}`}>
              <p className="text-xs md:text-base border-r border-r-footerTextColor2 pr-2">
                {route?.label}
              </p>
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-12 md:pb-0 text-footerTextColor2 flex gap-3 items-center bg-SidebarBg">
          <Link to={"/"}>
            {isLoading ? (
              <div className="w-32 h-10 bg-gray-300 animate-pulse rounded"></div>
            ) : (
              <img
                className="w-24 md:w-32 lg:w-40"
                src={`${import.meta.env.VITE_BASE_API_URL}${logo?.image}`}
                alt=""
              />
            )}
          </Link>
          <div className="">
            <h2 className="font-bold">Best Quality Platform</h2>
            <p>© 2025 {import.meta.env.VITE_SITE_NAME} Copyrights.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
