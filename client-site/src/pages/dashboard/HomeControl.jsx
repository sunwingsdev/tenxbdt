import FavoriteSelectionSection from "../../components/dashboard/FavoriteSelectionSection";
import FavoriteUploadSection from "../../components/dashboard/FavoriteUploadSection";
import FeaturedSelectionSection from "../../components/dashboard/FeaturedSelectionSection";
import FeaturedUploadSection from "../../components/dashboard/FeaturedUploadSection";
import LogoSelection from "../../components/dashboard/LogoSelection";
import LogoUpload from "../../components/dashboard/LogoUpload";
import NoticeSelectionSection from "../../components/dashboard/NoticeSelectionSection";
import NoticeUploadSection from "../../components/dashboard/NoticeUploadSection";
import SliderSelectionSection from "../../components/dashboard/SliderSelectionSection";
import SliderUploadSection from "../../components/dashboard/SliderUploadSection";

const HomeControl = () => {
  return (
    <div className="">
      <LogoUpload />
      <LogoSelection />
      <SliderUploadSection />
      <SliderSelectionSection />
      <FavoriteUploadSection />
      <FavoriteSelectionSection />
      <FeaturedUploadSection />
      <FeaturedSelectionSection />
      <NoticeUploadSection />
      <NoticeSelectionSection />
    </div>
  );
};

export default HomeControl;
