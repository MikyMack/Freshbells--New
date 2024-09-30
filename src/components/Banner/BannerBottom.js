import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import mom from "../../assets/images/New folder/b1.jpg"
import gym from "../../assets/images/New folder/b2.jpg"
import dr from "../../assets/images/New folder/b3.jpg"
import Heading from "../home/Products/Heading";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import placehold from "../../assets/images/placeholderimage.jpg"
import { baseURL } from "../../constants";


const features = [{
  id: 1,
  img: mom,
  title: "Millets: Fueling Healthy Pregnancies",
  link: "/home"
},
{
  id: 2,
  img: gym,
  title: "Fitness Journey with Nutrient Millets",
  link: "/signin"
}, {
  id: 3,
  img: dr,
  title: "Nutrition Consultant for your health",
  link: "/contact"
}]


const BannerBottom = () => {
  const homeDetails = useSelector(state => state.auth.homeDetails);


  useEffect(() => {
    const intervalId = setInterval(() => {
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
        <section className="py-5">
          <div className="lg:container px-4 mx-auto">
            <div className="flex flex-wrap -mx-4">
              {features.map((item, inde) => (
                <div key={item.id} className="w-full md:w-1/3 lg:w-1/3 px-4 mb-6">
                  <div className=" relative bg-transparent border-none p-4 h-full">
                    <div className={`relative text-center p-8 bg-white hover:bg-yellow-100 transition-transform z-30 duration-700 h-full flex flex-col justify-between`}>
                      <img className="mx-auto object-cover lg:h-[180px]  xl:h-[250px] md:h-[120px] w-full" src={item.img} alt="bg_picture" />
                      <div className="flex flex-col items-center justify-center transition-transform duration-700 ease-in-out pt-4">
                        <h4 className=" md:text-2xl lg:text-3xl xs:text-lg font-normal font-body3 text-black mb-4 transition-transform duration-700 ease-in-out">{item.title}</h4>
                        <Link to={item.link}>
                          <span className="text-center hover:opacity-50 cursor-pointer"><FaArrowRight /></span>
                        </Link>
                      </div>
                    </div>
                    <div className={`absolute top-8 right-0 left-12 bottom-0 bg-[#9bad9a] z-0`} ></div>
                    <div className={`absolute top-0 bottom-1/3 left-0 w-1/2 z-0 bg-[#bbe6b9] bg-repeat`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="pt-10 xl:container">
          <Heading heading="Top Categories" />
          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 4,
                spaceBetween: 10
              },
              // when window width is >= 480px
              425: { 
                slidesPerView: 5,
                spaceBetween: 10
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 4,
                spaceBetween: 10
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 8, 
                spaceBetween: 10
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 10,
                spaceBetween: 10
              },
              // when window width is >= 1280px
              1280: {
                slidesPerView: 10,
                spaceBetween: 10
              },
              // when window width is >= 1536px
              1536: {
                slidesPerView: 10,
                spaceBetween: 10
              }
            }}
          >
            {homeDetails && homeDetails.categories.length > 0 ? (
              homeDetails.categories.map((cat, index) => (
                <SwiperSlide key={cat.id}>
                  <div
                    className="w-full p-2 h-full group"
                  >
                    <div
                      key={index}
                      data-aos="fade-up"
                      data-aos-delay={`${index * 100}`}
                      className="hover:border bg-transparent text-black relative duration-high group  flex flex-col justify-center items-center"
                    >
                      <img
                        src={`${baseURL}${cat.image}`}
                        alt={`Category ${index + 1}`}
                        className="object-contain w-20 p-2 h-20 rounded-full cursor-pointer transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-3"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `${placehold}`;
                        }}
                      />
                      <p className="text-center mt-1 text-sm font-body3 font-normal text-primeColor lowercase" style={{ color: 'inherit' }}>
                        {cat.name}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p className="text-center">Loading categories...</p>
            )}
          </Swiper>
        </div>
    </>
  );
};

export default BannerBottom;
