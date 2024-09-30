import React from "react";
import Slider from "react-slick";
import Image1 from "../../assets/images/banner/newbg1.jpg";
import Image2 from "../../assets/images/banner/dr.jpg";
import Image3 from "../../assets/images/banner/mother.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Millet Marvels: Unlocking the Nutritional Power of Ancient Grains",
    description: "Get a healthy life eat fresh and healthy food",
    link:"/shop"
  },
  {
    id: 2,
    img: Image2,
    title: "Nourishing Wellness: Elevate Health with Expert Nutrition Guidance!",
    description: "Get a healthy life eat fresh and healthy food",
    link:"/contact"
  },
  {
    id: 3,
    img: Image3,
    title: "Best Combo Plans For Lactating Mothers",
    description: "Get a healthy life eat fresh and healthy food",
    link:"/lactatingmothers"
  },
];

const Banner = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1500,
    slidesToScroll: 1,
    autoplay: true,  
    autoplaySpeed: 6000,
    cssEase: "linear",
    pauseOnHover: false,
    pauseOnFocus: true,
    fade: true,
  };
  
 
  return (
    <div className="relative overflow-hidden">
      <div className="container-fluid px-0 mt-2">
        <Slider {...settings}> 
          {ImageList.map((data, index) => (
            <div key={index}>
              <div
                className="relative w-full h-[450px] sm:h-[300px] xs:h-[300px] md:h-[400px] bg-gray-300 lg:h-[500px] xl:h-[500px] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${data.img})` }}
              >
                <div className="lg:container text-center flex flex-col justify-center items-center w-full h-full">
                  <h1 className="text-[40px] sm:text-[30px] xs:text-[25px] md:text-[35px] lg:text-[45px] xl:text-[50px] text-white font-semibold font-body3 mb-4 px-5">
                    {data.title}
                  </h1>
                  <p className="text-[18px] sm:text-[16px] xs:text-[14px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-medium font-body3 text-white mx-auto mb-4 px-2">
                    {data.description}
                  </p>       
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
