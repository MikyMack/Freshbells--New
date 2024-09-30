import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart ,FaRupeeSign } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { FaCodeCompare } from "react-icons/fa6";
import spfOne from "../../../assets/images/products/specialOffer/millets.webp"
import spfTwo from "../../../assets/images/products/specialOffer/fotor.webp"

const data=[{
  _id: 1001,
  img: spfOne,
  productName: "Millets",
  price: "350.00",
  offerPrice:"300.00",
  stock:10,
  badge: true,
  des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
},
{
  _id: 1002,
  img: spfTwo,
  productName: "Millets",
  price: "180.00",
  offerPrice:"130.00",
  stock:0,
  badge: true,
  des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
},
{
  _id: 1003,
  img: spfTwo,
  productName: "Millets",
  price: "250.00",
  offerPrice:"200.00",
  stock:0,
  badge: true,
  des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
},
{
  _id: 1004,
  img: spfTwo,
  productName: "Millets",
  price: "520.00",
  offerPrice:"300.00",
  stock:5,
  badge: true,
  des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
},
{
  _id: 1005,
  img:spfOne,
  productName: "Millets",
  price: "435.00",
  stock:30,
  offerPrice:"300.00",
  badge: false,
  des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
},
{
  _id: 1006,
  img: spfOne,
  productName: "Millets",
  price: "180.00",
  stock:50,
  offerPrice:"300.00",
  badge: false,
  des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
},]

const Product = () => {
  return (
    <div className="w-full relative group overflow-hidden">
      {data.map((product) => (
        <div key={product._id} data-aos="fade-up">
          <div className="max-w-80 max-h-80 relative overflow-y-hidden">
            <div className="flex items-center justify-center">
              <Image className="md:w-[250px] md:h-[250px] xs:w-[200px] xs:h-[200px] object-cover rounded-full" imgSrc={product.img} />
            </div>
            <div className="absolute top-6 left-8">
              {product.badge && <Badge text="New" />}
            </div>
            <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
              <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
                <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                  Compare
                  <span>
                    <FaCodeCompare className="text-primeColor"/>
                  </span>
                </li>
                <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                  Add to Cart
                  <span>
                    <FaShoppingCart className="text-blue-600"/>
                  </span>
                </li>
                <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                  View Details
                  <span className="text-lg">
                    <MdOutlineLabelImportant className="text-yellow-500"/>
                  </span>
                </li>
                <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                  Add to Wish List
                  <span>
                    <BsSuitHeartFill className="text-red-600"/>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4 bg-white">
            <div className="flex items-center justify-between font-titleFont">
              <h2 className="text-lg text-primeColor font-bold">
                {product.productName}
              </h2>
              <p className="text-primeColor text-[19px] font-semibold flex pt-1">
                <span className="pt-[6px] text-[15px]"><FaRupeeSign /></span>{product.price}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <button className="order-2 ml-2 bg-[#e67e22] px-2 font-medium text-white rounded-2xl transition-transform duration-300 hover:scale-110">Buy Now</button>
                <select className="order-1 mt-1 bg-[#e67e22] font-medium text-white pl-3 rounded-xl w-1/3">
                  <option value="250g" className="text-white bg-lightText font-medium">250g</option>
                  <option value="500g" className="text-white bg-lightText font-medium">500g</option>
                  <option value="1kg" className="text-white bg-lightText font-medium">1kg</option>
                  <option value="5kg" className="text-white bg-lightText font-medium">5kg</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;




