import React from "react";
import { Link } from "react-router-dom";
import pic from "../../../assets/images/banner/newbg2.jpg"
import ShopNow from "../../designLayouts/buttons/ShopNow";
import Image from "../../designLayouts/Image";

const YearProduct = () => {
  return (
    <Link to="/shop">
      <div className="w-full lg:container  mb-20 bg-[#ffffff]  relative font-titleFont flex flex-col md:flex-row items-center justify-center">
        <div className="w-full h-80 px-4 md:px-0 flex flex-col items-center gap-6  justify-center">
          <h1 className="text-3xl font-semibold text-primeColor" data-aos="fade-up">
            Best Meal Plans 
          </h1>
          <p className="text-lg font-normal text-center text-primeColor max-w-[600px] mr-4" data-aos="fade-up" data-aos-duration="1000">
          Lose Weight,
           Regain Health & Boost Your Immunity
          with Possible Programs
          </p>
          <ShopNow />
        </div>
        <div className="w-full h-80">
          <Image className="w-full h-full object-contain md:object-cover p-6" imgSrc={pic} />
        </div>
      </div>
    </Link>
  );
};

export default YearProduct;


