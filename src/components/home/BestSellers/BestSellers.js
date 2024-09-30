import React, { useState } from "react";
import Heading from "../Products/Heading";
import { BsPlus, BsDash } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import Image from "../../designLayouts/Image";
import SampleNextArrow from "../NewArrivals/SampleNextArrow";
import SamplePrevArrow from "../NewArrivals/SamplePrevArrow";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCart } from "../../../redux/cartSlice";
import { GiShoppingCart } from "react-icons/gi";
import { baseURL } from "../../../constants/index";
import { AddCart } from "../../../actions/CartActions";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BestSellers = () => {
  const dispatch = useDispatch();
  const homeDetails = useSelector(state => state.auth.homeDetails);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [quantities, setQuantities] = useState({});
  const [selectedVariants, setSelectedVariants] = useState({});
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1441,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const navigate = useNavigate();
  const handleDecrease = (cartItem) => {
    if (isAuthenticated) {
      const newQuantities = {
        ...quantities,
        [cartItem.id]: Math.max(quantities[cartItem.id] - 1, 0)
      };
      setQuantities(newQuantities);
      toast.error("item removed successfully");
      dispatch(decreaseCart(cartItem));
    } else {
      dispatch(decreaseCart(cartItem));
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
      toast.success("Item added to cart successfully");
    } else {
      dispatch(addToCart(cartItem));
      toast.success("Item added to cart successfully");
    }
  };
  const handleBuy = (product) => {
    const selectedVariant = selectedVariants[product.id] || product.quantity_variants[0];

    const cartData = {
      product_id: product.id,
      volume: selectedVariant.volume,
      unit: selectedVariant.unit,
      quantity: product.cartQuantity,
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
    <div className="w-full mt-6 pb-20 lg:container">
      <ToastContainer />
      <Heading heading="Premium Products" />
      <Slider {...settings}>
        {homeDetails ? homeDetails.Super.map((product, index) => {
          const selectedVariant = selectedVariants[product.id] || product.quantity_variants[0];
          return (
            <div key={product.id} className="p-2" data-aos="fade-up">
              <div className="relative overflow-hidden group max-w-full h-full font-body3 hover:shadow-slate-700 shadow-md">
                <div className="flex flex-col items-center justify-center max-w-full max-h-full bg-white ">
                  <div className="relative" onClick={() => handleView(product.id)}>
                    <Image className="w-[250px] h-[250px] object-contain cursor-pointer" imgSrc={`${baseURL}${product.image}`} />
                  </div>
                </div>
                <div className="py-1 flex flex-col gap-1 border-[1px] border-t-0 px-2 bg-white h-full group-hover:bg-yellow-100">
                  <div className="flex flex-col items-center justify-between font-titleFont ">
                    <h2 className="md:text-lg xl:text-xl lg:text-xl xs:text-[15px] sm:text-[15px] font-body3 text-primeColor font-semibold">
                      {product.name}
                    </h2>
                    <p className="text-primeColor xl:text-[18px] lg:text-[15px]  md:text-[15px] xs:text-[15px] sm:text-[18px] sml:text-[20px]  font-normal flex items-center pt-1 ">
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
                      className="order-1 mt-1 hover:bg-primeColor font-body3 text-black hover:text-white xl:text-[18px] lg:text-[15px] md:text-[10px] xs:text-[10px] sm:text-[10px]"
                      onChange={(e) => handleVariantChange(product.id, product.quantity_variants.find(variant => variant.volume === parseInt(e.target.value)))}
                    >
                      {product.quantity_variants.map((ite, variantIndex) => (
                        <option
                          key={`${product.id}_${variantIndex}`}
                          value={ite.volume}
                          className="text-black bg-white font-medium"
                        >
                          {ite.volume}{ite.unit}
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center order-2">
                      <button onClick={() => handleDecrease(product)} className="px-2 py-2 text-lg bg-gray-300 hover:bg-red-400 text-black hover:text-white">
                        <BsDash />
                      </button>
                      <span className="px-3 text-lg  bg-gray-100">{getCartQuantity(product.id)}</span>
                      <button onClick={() => handleIncrease(product)} className="px-2 py-2 text-lg bg-gray-300 hover:bg-green-400 text-black hover:text-white">
                        <BsPlus />
                      </button>
                    </div>
                    <button onClick={() => handleBuy(product)} className="flex items-center order-3 font-body2 hover:bg-primeColor px-2 font-medium xs:text-[20px] sm:text-[20px] sml:text-[20px] md:text-[20px] lg:text-[20px] xl:text-[20px] text-black hover:text-white bg-white  hover:translate-y-1 transition-transform duration-500">
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
          <h1 className="text-center">Loading products...</h1>
        )}
      </Slider>
    </div>
  );
};

export default BestSellers;
