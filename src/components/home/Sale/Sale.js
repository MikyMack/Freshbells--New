import React from "react";
import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";
import Bgimg from "../../../assets/images/banner/03.jpg"

const Sale = () => {
  return (
    <>
    <div className="relative">
      <img src={Bgimg} alt="Background" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative h-full flex justify-center items-center py-12 px-5">
        <div className="container mx-auto flex flex-col lg:flex-row">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 lg:w-1/2">
            {/* Image section */}
            <div data-aos="zoom-in">
            </div>
            {/* text content section */}
            <div className="flex flex-col justify-center gap-6 sm:pt-0 lg:pl-12">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-semibold font-body3 text-primeColor"
              >
                FRESH BELLS
              </h1>
              <p
                data-aos="fade-up"
                className="text-lg font-body3 text-gray-600 tracking-wide leading-5"
              >
                Our new, premier brand Fresh Bells focus on developing and promoting a natural, organic and highly nutritious foods as a solution for life style diseases and wellness care. We believe in promoting health in our communities through sustainable products; acting sustainably and ethically as a business.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div data-aos="fade-up" className="flex items-center gap-3">
                    <GrSecure className="text-2xl h-12 w-12 shadow-sm p-3 rounded-full bg-red-100 " />
                    <span className="text-primeColor font-semibold font-body3">High Nutritional Value</span>
                  </div>
                  <div
                    data-aos="fade-up"
                    data-aos-delay="300"
                    className="flex items-center gap-3"
                  >
                    <IoFastFood className="text-2xl h-12 w-12 shadow-sm p-3 rounded-full bg-orange-100 " />
                    <span className="text-primeColor font-semibold font-body3">No Chemicals & Pesticides</span>
                  </div>
                  <div
                    data-aos="fade-up"
                    data-aos-delay="500"
                    className="flex items-center gap-3"
                  >
                    <GiFoodTruck className="text-4xl h-12 w-12 shadow-sm p-3 rounded-full bg-yellow-100" />
                    <span className="text-black font-semibold font-body3">Certified Organic Sources</span>
                  </div>
                </div>
                <div
                  data-aos="slide-left"
                  className="border-l-4 border-primary/50 pl-6 space-y-2"
                >
                  <h1 className="text-2xl font-body3 font-medium font-cursive text-primeColor">
                    Secure and Hygenic
                  </h1>
                  <p className="text-sm text-gray-800 font-normal font-body3">
                    We started this as a solution for the people like you who are looking for ways to reduce chemical content in the food we eat and wish to maintain a healthy life style. As a result, we are also acting as a solution provider for most common life style diseases as well.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Sale;

