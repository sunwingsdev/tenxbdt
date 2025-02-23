import FeaturedGames from "../../components/home/FeaturedGames/FeaturedGames";
import MarqueeSlider from "../../components/home/marqueeSlider/MarqueeSlider";
import MenuBar from "../../components/home/menuBar/MenuBar";
import Slider from "../../components/home/slider/Slider";
import BannerSlider from "../../components/shared/bannerSlider/BannerSlider";

const Home = () => {
  return (
    <div>
      <BannerSlider />
      <div className="md:px-4 bg-SiteBg">
        <MarqueeSlider />
        <MenuBar />
        <div className="px-4 md:px-0">
          <Slider />
          <FeaturedGames />
        </div>
      </div>
    </div>
  );
};

export default Home;
