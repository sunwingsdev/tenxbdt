import { Pagination, Navigation } from "swiper/modules";
import GameCard from "../../shared/gameCard/GameCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css/scrollbar";
import { useGetHomeControlsQuery } from "../../../redux/features/allApis/homeControlApi/homeControlApi";

const FeaturedGames = () => {
  const { data: homeControls } = useGetHomeControlsQuery();
  const featuredHomeControls = homeControls?.filter(
    (control) => control.category === "featured-game"
  );
  return (
    <div>
      <div className="pt-4">
        <p className="text-footerTextColor text-base font-semibold mb-3 pl-2 border-l-4 border-l-footerTextColor">
          Featured Games
        </p>
      </div>
      <Swiper
        breakpoints={{
          // মোবাইল ডিভাইসে ১টি স্লাইড
          0: {
            slidesPerView: 2,
          },
          // ট্যাবলেট ডিভাইসে ২টি স্লাইড
          640: {
            slidesPerView: 3,
          },
          // ডেস্কটপ ডিভাইসে ৩টি স্লাইড
          1024: {
            slidesPerView: 4,
          },
          1156: {
            slidesPerView: 5,
          },
        }}
        spaceBetween={10}
        autoplay={{
          delay: 2900,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation, Scrollbar]}
        scrollbar={{
          hide: true,
        }}
        className="mySwiper"
      >
        {featuredHomeControls?.map((featured) => (
          <SwiperSlide key={featured?._id}>
            <GameCard
              imageUrl={`${import.meta.env.VITE_BASE_API_URL}${
                featured?.image
              }`}
              title={featured?.title}
              link={featured?.link}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedGames;
