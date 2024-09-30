import React from "react";
import leaf from "../../assets/animation/leaf.json";
import badge from "../../assets/animation/badge.json";
import chemical from "../../assets/animation/chemical.json";
import secure from "../../assets/animation/secure.json";
import trees from "../../assets/bg/bg1.jpg"; 
import Lottie from "lottie-react";

const ServicesData = [
  {
    id: 1,
    img: leaf,
    name: "Retained Vitamins and Minerals",
    description:
      "Lorem ipsum dolor sit amet ipsum dolor sit ametipsum dolor sit amet ipsum dolor sit amet.",
    aosDelay: "100",
    hoverColor:"#a5f4d9"
  },
  {
    id: 2,
    img: badge,   
    name: "Natural and Healthy",  
    description:
      "Lorem ipsum dolor sit amet ipsum dolor sit ametipsum dolor sit amet ipsum dolor sit amet",
    aosDelay: "300",
    hoverColor:"#ccb6f3"
  },
  {
    id: 3,
    img: chemical,
    name: "No Chemicals and Added Preservatives",
    description:
      "Lorem ipsum dolor sit amet ipsum dolor sit ametipsum dolor sit amet ipsum dolor sit amet",
    aosDelay: "500",
    hoverColor:"#7bb9f2"
  },
  {
    id: 4,
    img: secure,
    name: "Secure and Hygienic",
    description:
      "Lorem ipsum dolor sit amet ipsum dolor sit ametipsum dolor sit amet ipsum dolor sit amet",
    aosDelay: "500",
    hoverColor:"#7bb9f2"
  },
];

const Services = () => {
  return (
    <>
      <div
        className="md:py-20 h-full bg-cover bg-center md:mt-5 md:mb-20 relative"
        style={{ backgroundImage: `url(${trees})`, opacity: 0.8 }}
      >
        <div className="absolute inset-0 bg-cover bg-center"></div>
        <div className="relative py-10">
          {/* Services Card section  */}
          <div className="lg:container px-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 md:gap-5 gap-2 place-items-center">
            {ServicesData.map((service) => (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={service.aosDelay}
                className={`rounded-2xl mb-4 mt-2 bg-white relative shadow-xl group w-full h-full hover:bg-[${service.hoverColor || '#f3f4f6'}]`}
              >
               
                <div className="flex justify-center mt-8 h-40 w-full items-center text-primeColor mx-auto transform group-hover:scale-105 group-hover:rotate-6 duration-300">
                  <Lottie animationData={service.img} className="w-1/2" />
                </div>
                <div className="text-center mt-2">
                  <h1 className="text-2xl z-30 font-body3 px-4 font-medium text-black transform group-hover:translate-z-10 duration-300">{service.name}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;

