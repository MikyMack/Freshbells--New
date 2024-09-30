import React from "react";
import Category from "./shopBy/Category";
import Price from "./shopBy/Price";

const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category icons={true} />
      <Price icons={true}/>
    </div>
  );
};

export default ShopSideNav;
