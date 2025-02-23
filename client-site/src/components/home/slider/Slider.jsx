import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useGetHomeControlsQuery } from "../../../redux/features/allApis/homeControlApi/homeControlApi";

const Slider = () => {
  const { data: homeControls } = useGetHomeControlsQuery();
  const favorites = homeControls?.filter(
    (control) => control.category === "favorite" && control.isSelected
  );
  return (
    <div>
      <div className="pt-4">
        <p className="text-footerTextColor text-base font-semibold mb-3 pl-2 border-l-4 border-footerTextColor">
          Favourites
        </p>
      </div>
      <Swiper
        breakpoints={{
          // মোবাইল ডিভাইসে ১টি স্লাইড
          0: {
            slidesPerView: 1.2,
          },
          // ট্যাবলেট ডিভাইসে ২টি স্লাইড
          640: {
            slidesPerView: 2,
          },
          // ডেস্কটপ ডিভাইসে ৩টি স্লাইড
          1024: {
            slidesPerView: 3,
          },
          1156: {
            slidesPerView: 4,
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
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {favorites?.map((favorite) => (
          <SwiperSlide key={favorite?._id}>
            <img
              src={`${import.meta.env.VITE_BASE_API_URL}${favorite?.image}`}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
