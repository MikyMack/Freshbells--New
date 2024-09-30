import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="bg-[#ff652f]  rounded-full sm:w-[49px] xs:w-[41px]  animate-pulse text-white flex justify-center items-center text-[15px] md:text-lg font-semibold duration-300 cursor-pointer">
      {text}
    </div>
  );
};

export default Badge;
