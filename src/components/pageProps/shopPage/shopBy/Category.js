import React, { useState } from "react";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { useSelector } from "react-redux";

const Category = () => {
  const homeDetails = useSelector(state => state.auth.homeDetails);
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const [showBrands, setShowBrands] = useState(false);

  return (
    <div className="w-full">
      <div onClick={() => setShowBrands(!showBrands)} className="cursor-pointer ">
      <NavTitle title="Shop by Category" icons={true} />
      </div>
      {
      showBrands &&(
        <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-primeColor ">
          {homeDetails && homeDetails.categories.map((item) => (
            <li
              key={item.id}
              className="border-b-[1px] select-none border-b-[#F0F0F0] cursor-pointer hover:bg-red-100 px-2 pb-2 flex items-center justify-between"
            >
              {item.name}   
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-700 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
            </li>
          ))}
        </ul>
      </div>
      )
              }
    </div>
  );
};

export default Category;
