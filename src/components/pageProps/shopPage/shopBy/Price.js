import React, { useState } from "react";
import NavTitle from "./NavTitle";

const Price = () => {
  const [showBrands, setShowBrands] = useState(false);
  const priceList = [
    {
      _id: 950,
      priceOne: 100,
      priceTwo: 500,
    },
    {
      _id: 951,
      priceOne: 500,
      priceTwo: 1000,
    },
    {
      _id: 952,
      priceOne: 1000,
      priceTwo: 3000,
    },
    {
      _id: 953,
      priceOne: 3000,
      priceTwo: 5000,
    },
    {
      _id: 954,
      priceOne: 5000,
      priceTwo: 10000,
    },

  ];
  return (
    <div className="cursor-pointer">
      <div  onClick={() => setShowBrands(!showBrands)}>
        <NavTitle title="Shop by Price" icons={true} />
      </div>
      {showBrands && (
        <div className="font-titleFont">
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {priceList.map((item) => (
              <li
                key={item._id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                {item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default Price;
