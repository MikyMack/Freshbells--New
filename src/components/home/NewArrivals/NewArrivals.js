import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCart } from "../../../redux/cartSlice";
import { GiShoppingCart } from "react-icons/gi";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { baseURL } from "../../../constants/index";
import { AddCart } from "../../../actions/CartActions";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Heading = lazy(() => import("../Products/Heading"));
const SampleNextArrow = lazy(() => import("./SampleNextArrow"));
const SamplePrevArrow = lazy(() => import("./SamplePrevArrow"));

const NewArrivals = () => {
  const dispatch = useDispatch();
  const homeDetails = useSelector((state) => state.auth.homeDetails);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [selectedVariants, setSelectedVariants] = useState({});
 console.log(homeDetails,"homeDetails");
  useEffect(() => {
    if (isAuthenticated && homeDetails) {
      const initialQuantities = homeDetails.products.reduce((acc, product) => {
        acc[product.id] = 0; 
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [isAuthenticated, homeDetails]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const handleDecrease = (cartItem) => {
    if (isAuthenticated) {
      if (quantities[cartItem.id] > 0) {
        const newQuantities = {
          ...quantities,
          [cartItem.id]: Math.max(quantities[cartItem.id] - 1, 0)
        };
        setQuantities(newQuantities);
        toast.error("item removed successfully")
        dispatch(decreaseCart(cartItem));
      }
    } else {
      const cartItemQuantity = cartItems.find((item) => item.id === cartItem.id)?.cartQuantity || 0;
      if (cartItemQuantity > 0) {
        dispatch(decreaseCart(cartItem));
      }
    }
  };

  const handleIncrease = (cartItem) => {
    const newQuantities = {
      ...quantities,
      [cartItem.id]: (quantities[cartItem.id] || 0) + 1
    };
    setQuantities(newQuantities);

    const selectedVariant = selectedVariants[cartItem.id] || cartItem.quantity_variants[0];

    const cartData = {
      product_id: cartItem.id,
      volume: selectedVariant.volume,
      unit: selectedVariant.unit,
      quantity: newQuantities[cartItem.id],
      price: selectedVariant.price
    };
    if (isAuthenticated) {
      AddCart(cartData);
      toast.success("Item added to cart successfully")
    } else {
      dispatch(addToCart(cartItem));
      toast.success("Item added to cart successfully")
    }
  };

  const handleBuy = (product) => {
    const newQuantities = {
      ...quantities,
      [product.id]: (quantities[product.id] || 0) + 1
    };
    setQuantities(newQuantities);

    const selectedVariant = selectedVariants[product.id] || product.quantity_variants[0];

    const cartData = {
      product_id: product.id,
      volume: selectedVariant.volume,
      unit: selectedVariant.unit,
      quantity: newQuantities[product.id],
      price: selectedVariant.price
    };
    if (isAuthenticated) {
      AddCart(cartData);
    } else {
      dispatch(addToCart(product));
    }
    navigate("/cart");
  };

  const getCartQuantity = (productId) => {
    if (isAuthenticated) {
      return quantities[productId] || 0;
    } else {
      const cartItem = cartItems.find((item) => item.id === productId);
      return cartItem ? cartItem.cartQuantity : 0;
    }
  };

  const handleView = (id) => {
    navigate(`/productDetails`, { state: { productId: id } });
  };

  const handleVariantChange = (productId, variant) => {
    setSelectedVariants({
      ...selectedVariants,
      [productId]: variant
    });
  };

  return (
    <div className="lg:container mx-auto pb-16 "> 
    <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Heading key="super-foods-heading" heading="Super Foods" />
        <Slider {...settings}>
          {homeDetails && homeDetails.products ? homeDetails.products.map((product, index) => {
            const selectedVariant = selectedVariants[product.id] || product.quantity_variants[0];
            return (
              <div key={product.id} className="p-2" data-aos="fade-up">
                <div className="relative overflow-hidden group h-full hover:shadow-slate-500 shadow-xl">
                  <div className='flex flex-col items-center max-w-full max-h-full bg-[#ffffff] group-hover:bg-[#bbe6b9]'>
                    <div className="relative " onClick={() => handleView(product.id)}>
                      <img
                        className="w-[250px] h-[250px] object-contain cursor-pointer"
                        src={`${baseURL}${product.image}`}   alt="img"
                      />
                    </div>
                  </div>
                  <div className="py-1 flex flex-col gap-1 h-full border-[1px] border-t-0 px-4 bg-[#f5f3f3] group-hover:bg-[#ffffff]">
                    <div className="flex flex-col items-center justify-between font-titleFont ">
                      <h2 className="md:text-xl xl:text-2xl lg:text-xl xs:text-[15px] sm:text-[15px] font-body2 text-gray-800 font-normal">
                        {product.name}
                      </h2>
                      <p className="xl:text-[18px] lg:text-[15px]  md:text-[15px] xs:text-[15px] sm:text-[18px] sml:text-[20px]  font-normal flex items-center">
                        <span className=" xl:text-[12px] lg:text-[10px] md:text-[12px] xs:text-[12px] sml:text-[15px] sm:text-[13px]">
                          <FaRupeeSign />
                        </span>
                        <span className="line-through text-gray-600">{selectedVariant ? selectedVariant.price + 100 : 'N/A'}</span>
                        <span className="ml-2">{selectedVariant ? selectedVariant.price : 'N/A'}</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <select
                        key={index}
                        name="quantity"
                        className="order-1 mt-1 hover:bg-primeColor bg-transparent font-normal font-body2 text-black hover:text-white xl:text-[20px] lg:text-[17px] md:text-[20px] xs:text-[18px] sm:text-[18px] sml:text-[18px]"
                        onChange={(e) => handleVariantChange(product.id, product.quantity_variants.find(variant => variant.volume === parseInt(e.target.value)))}
                      >
                        {product.quantity_variants?.map((ite) => (
                          <option
                            key={ite.id}
                            value={ite.volume}
                            className="text-black bg-white font-normal" 
                          >
                            {ite.volume}{ite.unit}
                          </option>
                        ))}
                      </select>

                      <div className="flex items-center order-2">
                        <button onClick={() => handleDecrease(product)} className="px-2 py-2 text-lg bg-gray-500 hover:bg-red-400 text-white"><FaMinus /></button>
                        <span className="px-4 text-lg bg-gray-300">{getCartQuantity(product.id)}</span>
                        <button onClick={() => handleIncrease(product)} className="px-2 py-2 text-lg bg-gray-500 hover:bg-green-400 text-white"><FaPlus /></button>
                      </div>
                      <button onClick={() => handleBuy(product)} className="flex items-center order-3 ml-2 font-body2 hover:bg-primeColor px-2 font-medium xs:text-[25px] sm:text-[25px] sml:text-[30px] md:text-[30px] lg:text-[25px] xl:text-[25px] text-black hover:text-white rounded-2xl hover:rounded-none hover:translate-y-1 transition-transform duration-500">
                       <span className="pl-1"><GiShoppingCart /></span>
                      </button>
                    </div>
                    <div className={`md:text-lg lg:text-xl sm:text-sm font-normal text-center xs:text-[10px] ${selectedVariant?.in_stock <= 0 ? 'text-red-500' : selectedVariant?.in_stock > 0 && selectedVariant?.in_stock <= 10 ? 'text-yellow-500' : 'text-green-500'}`}>
                    {selectedVariant?.in_stock <= 0 ? "Out of Stock" : selectedVariant?.in_stock > 0 && selectedVariant?.in_stock <= 10 ? `Only ${selectedVariant?.in_stock} items left` : selectedVariant ? `${selectedVariant.in_stock} left in stock` : "Stock information not available"}
                  </div>
                  </div>
                </div>
              </div>
            );
          }) : (
            <h1 className="text-center">Loading Products</h1>
          )}
        </Slider>
      </Suspense>
    </div>
  );
};

export default NewArrivals;