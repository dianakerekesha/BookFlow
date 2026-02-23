import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/swiper-bundle.css';
import 'swiper/css';

import bannerSm from './banner-mob.png';

const BANNERS = [
  { id: 1, img: bannerSm, alt: 'Independence Day' },
  { id: 2, img: bannerSm, alt: 'New books' },
  { id: 3, img: bannerSm, alt: 'Recommendations' },
];

export const MainSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="cursor-pointer flex flex-col items-center w-full lg:max-w-[1136px] lg:mx-auto md:mt-[40px] lg:mt-[80px]">
      <div className="flex items-center w-full h-[320px] md:h-[368px] lg:h-[432px]">
        <button
          ref={prevRef}
          className="banner-prev hidden md:flex items-center justify-center w-8 shrink-0 hover:scale-125 transition-all text-[24px]"
        >
          ←
        </button>

        <div className="flex-grow h-full mx-0 md:mx-4 overflow-hidden">
          <Swiper
            modules={[Autoplay, Navigation, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            slidesPerView={1}
            speed={800}
            loop={false}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: '.banner-prev',
              nextEl: '.banner-next',
            }}
            className="w-full h-full"
          >
            {BANNERS.map((banner) => (
              <SwiperSlide key={banner.id}>
                <img
                  src={banner.img}
                  alt={banner.alt}
                  className="object-cover w-full h-full min-[640px]:rounded-[24px]"
                />
                <div className="absolute inset-0 bg-black/50 min-[640px]:rounded-[24px]"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          ref={nextRef}
          className="banner-next hidden md:flex items-center justify-center w-8 shrink-0 hover:scale-125 transition-all text-[24px]"
        >
          →
        </button>
      </div>

      <div className="flex gap-[8px] mt-[12px]">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperInstance?.slideToLoop(index)}
            className={`w-[40px] h-[2px] relative z-50 pointer-events-auto before:content-[''] before:absolute before:-inset-y-4 before:inset-x-0 transition-all duration-300  ${
              index === activeIndex ? 'bg-foreground' : 'bg-border'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
