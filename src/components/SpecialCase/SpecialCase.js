import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from "../../redux/cartSlice";
import { FetchCart } from "../../actions/CartActions";


const SpecialCase = () => {
  const dispatch=useDispatch()
  const {cartTotalQuantity}=useSelector(state=>state.cart);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [fetchedCartItems, setFetchedCartItems] = useState([]);

  useEffect(() => {
    dispatch(getTotals());
    if (isAuthenticated) {
      FetchCart().then(response => {
        if (!response.status) {
          console.error("Failed to fetch cart:", response);
          return;
        }
        setFetchedCartItems(response.carts);
      }).catch(error => console.error("Failed to fetch cart:", error));
    }
  }, [dispatch, isAuthenticated]);
  return (
    <div className="fixed top-80 right-2 z-50 hidden md:flex flex-col gap-2">
      <Link to="/profile">
        <div className="bg-white lg:w-16 lg:h-[60px] md:w-20 md:h-[50px]  rounded-full flex flex-col gap-1  justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
          <div className="flex justify-center items-center">
            <MdSwitchAccount className="text-primeColor text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <MdSwitchAccount className="text-primeColor text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-titleFont">Profile</p>
        </div>
      </Link>
      <Link to="/cart">
        <div className="bg-white lg:w-16 lg:h-[60px] md:w-20 md:h-[50px]  rounded-full flex flex-col gap-1 justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
          <div className="flex justify-center items-center">
            <RiShoppingCart2Fill className="text-primeColor text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <RiShoppingCart2Fill className="text-primeColor text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-titleFont">Cart</p>

            <p className="absolute top-1 right-3 bg-green-300 text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
            {isAuthenticated ? fetchedCartItems.length : cartTotalQuantity}
            </p>
       
        </div>
      </Link>
    </div>
  );
};

export default SpecialCase;
