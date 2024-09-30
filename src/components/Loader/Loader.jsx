import React from 'react';
import loader from "../../assets/animation/loader.json";
import Lottie from 'lottie-react';

const Loader = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-[#EFFDEC]'> 
      <p className='text-primeColor font-body3 px-10 text-center text-lg xs:text-sm md:text-xl lg:text-2xl font-medium'>"Nutritious Millets, Healthy Plans" <span className='text-primeColor text-xl xs:text-sm md:text-2xl lg:text-3xl font-semibold'><br /> ~ Fresh Bells</span></p>
      <Lottie animationData={loader} className='w-40 md:w-60 lg:w-80'/>
    </div>
  );
};

export default Loader;
