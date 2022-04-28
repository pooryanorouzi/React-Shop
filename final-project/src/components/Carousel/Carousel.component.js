import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./_Carousel.scss";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

function Slider({ slides }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((sliders) => (
          <SwiperSlide>
            <img src={sliders} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export { Slider };
