import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const FooterBottom = () => {
  return (
    <div className="w-full bg-[#254222] group">
      <div className="max-w-container mx-auto border-t-[1px] pt-3 pb-3">
        <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-white duration-200 text-sm gap-2">
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <AiOutlineCopyright/>
          </span>
          Copyright <span><a href="https://www.linkedin.com/in/mr-jijo-94b6521b4/">Mr Jijo</a></span> |Fresh Bells |
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
