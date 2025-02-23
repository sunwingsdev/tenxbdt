import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useGetHomeControlsQuery } from "../../../redux/features/allApis/homeControlApi/homeControlApi";

const BannerSlider = () => {
  const { data: homeControls } = useGetHomeControlsQuery();
  // Create refs for navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const sliders = homeControls?.filter(
    (control) => control.category === "slider" && control.isSelected
  );

  return (
    <div className="banner-slider relative md:px-4 md:pt-4 bg-footerBg">
      <Swiper
        slidesPerView="auto"
        centeredSlides={true}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // Assign the refs to Swiper's navigation
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliders?.map((slider) => (
          <SwiperSlide key={slider?._id}>
            <div className="h-auto">
              <img
                className="w-full object-cover h-28 sm:h-44 md:h-52 lg:h-60 xl:h-72 2xl:h-auto"
                src={`${import.meta.env.VITE_BASE_API_URL}${slider?.image}`}
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        ref={nextRef}
        className=" absolute top-1/2 transform -translate-y-1/2 right-2 text-xl sm:text-2xl text-white z-10"
      >
        <AiOutlineRight />
      </div>
      <div
        ref={prevRef}
        className=" absolute top-1/2 transform -translate-y-1/2 left-2 text-xl sm:text-2xl text-white z-10"
      >
        <AiOutlineLeft />
      </div>
    </div>
  );
};

export default BannerSlider;
