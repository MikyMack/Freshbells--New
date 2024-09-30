import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import logo1 from "../../../assets/logo/logo.png";
import Image from "../../designLayouts/Image";
import Flex from "../../designLayouts/Flex";
import "./Header.css"
import butterfly from "../../../assets/animation/butterfly.json"
import Lottie from "lottie-react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { PincodeCheck } from "../../../actions/HomeActions"


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [sidenav, setSidenav] = useState(false);
  const [showHealthyDiets, setShowHealthyDiets] = useState(false);
  const [showDietPlanForAge, setShowDietPlanForAge] = useState(false);
  const [showSpecialCateg, setShowSPecialCateg] = useState(false)
  const [pincodePopup, setPincodePopup] = useState(false);
  const [pincode, setPincode] = useState('');
  const dropdownRef = useRef(null);
  const [serviceable, setServiceable] = useState(null);

  const location = useLocation();

  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
    return () => window.removeEventListener("resize", ResponsiveMenu);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSPecialCateg(false);
        setShowHealthyDiets(false);
        setShowDietPlanForAge(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

const handlePincodeSubmit = async () => {
  try {
    const serviceableResponse = await PincodeCheck(pincode);
    setServiceable(serviceableResponse); 
  } catch (error) {
    console.error("Error checking pincode:", error);
    alert("Failed to check pincode. Please try again.");
  }
};

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-[#324c21] py-1 flex justify-between items-center ">
        <div className="flex-1 md:ml-52">
          <p className=" font-body3 md:text-base sm:text-[10px] xs:text-sm text-center text-white"><span data-aos="zoom-in-right">"Nutritious Millets,</span><span data-aos="zoom-in-left"> Healthy Plans"</span></p>
        </div>
        <div className="lg:px-4 sm:px-2 sml:px-3 flex items-center">
          {/* hidden for mobile devices */}
          <p className="hidden md:block text-white sm:text-[9px] xs:text-[9px] lg:text-base font-body3 cursor-pointer mr-2">English <span className="ml-1 font-serif"> | </span> </p>
          <p className="text-white sm:text-[9px] xs:text-[9px] lg:text-base font-body3 cursor-pointer" onClick={() => setPincodePopup(true)}>{serviceable ? (serviceable.city || "Delivery Unavailable") : "Check Pincode"} <span> 🚚 </span> </p>
        </div>
      </div>

      {pincodePopup && (
        <div className="fixed inset-0 bg-[#F0FDEE] bg-opacity-60 flex justify-center items-center">
          <div className="bg-green-600 p-4 rounded-lg sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="flex justify-between items-center mb-4">
              <input type="text" id={pincode} placeholder="Enter your delivery pin code" value={pincode} onChange={(e) => setPincode(e.target.value)} className="p-2 w-full" />
            </div>
            <button onClick={handlePincodeSubmit} className="bg-white text-primeColor font-semibold p-2 rounded w-full hover:bg-gray-300">Check Servicability</button>
            <button onClick={() => setPincodePopup(false)} className="text-white flex items-center justify-center p-2 font-medium hover:text-primeColor">Back <span>👈🏻</span></button>
            {serviceable && (
              <p className="text-white mt-4 font-medium text-center">
                {serviceable.active ? "Delivery is available in your location." : "No delivery in your area. Coming soon!"}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="w-full h-20 bg-white sticky top-0 z-50  ">
        <nav className="h-full px-4  mx-auto relative">
          <Flex className="flex items-center justify-between h-full pointer-events-auto">
            <Link to="/">
              <div className="flex flex-row items-center justify-center">
                <div className="absolute w-20">
                  <Lottie animationData={butterfly} />
                </div>
                <Image className="w-28 md:ml-10 object-cover" imgSrc={logo1} />
              </div>
            </Link>
            <div>
              <HiMenuAlt2
                onClick={() => setSidenav(!sidenav)}
                className="inline-block md:hidden lg:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
              />

              {showMenu && (
                <ul className="hidden md:flex flex-row lg:gap-4">
                  <li className={`hover:text-green-700 px-3 py-1 rounded-3xl  hover:rounded-none font-body3 mr-3 lg:text-xl md:text-md items-center font-semibold text-primeColor duration-500 hover:translate-y-1 ${location.pathname === "/" || location.pathname === "/home" ? "text-green-600 font-extrabold" : ""}`}>
                    <Link to="/"><p>Home </p>
                    </Link>

                  </li>
                  <li className={`hover:text-green-700 px-3 py-1  rounded-3xl hover:rounded-none font-body3 mr-3 lg:text-xl md:text-md items-center text-primeColor font-semibold  duration-500 hover:translate-y-1 ${location.pathname === "/shop" ? "text-green-700 font-extrabold" : ""}`}>
                    <Link to="/shop">
                      <p>Store </p>
                    </Link>
                  </li>
                  <li className={`hover:text-green-700 px-3 py-1 rounded-3xl hover:rounded-none relative group font-body3 mr-3 lg:text-lg md:text-sm items-center cursor-pointer  duration-500 hover:translate-y-1 ${location.pathname.includes("meal-plans") ? "text-green-700 font-extrabold" : ""}`}>
                    <p className={`flex font-body3 lg:text-xl md:text-md items-center text-primeColor font-semibold duration-500 hover:text-green-700 ${location.pathname.includes("WeightsLoss") || location.pathname.includes("weightsGain") || location.pathname.includes("weaning") || location.pathname.includes("schoolgoing") || location.pathname.includes("adults") || location.pathname.includes("geriatric") || location.pathname.includes("expectantmothers") || location.pathname.includes("lactatingmothers") || location.pathname.includes("pcod") || location.pathname.includes("diabetes-millets-diet") || location.pathname.includes("gluten-free-diet") || location.pathname.includes("lactose-introlerent") ? "text-green-600 font-extrabold" : ""} `} onMouseEnter={() => { setShowHealthyDiets(false); setShowDietPlanForAge(false); setShowSPecialCateg(false); }} >Meal Plans<span className="group-hover:hidden"><IoMdArrowDropdown /></span><span className="hidden group-hover:inline"><IoMdArrowDropup /></span></p>
                    <div ref={dropdownRef} className="absolute z-[9999] hidden group-hover:block w-[300px] -left-16 bg-gray-200 py-2 text-black shadow-md">
                      <div className="relative group">
                        <p className="flex items-center justify-center py-1 cursor-pointer lg:text-xl md:text-md font-semibold hover:text-green-700 text-center hover:bg-white" onMouseEnter={() => { setShowHealthyDiets(true); setShowDietPlanForAge(false); setShowSPecialCateg(false); }}>Healthy Diets</p>
                        {showHealthyDiets && (
                          <div className="absolute z-[9999] block w-full bg-gray-300 py-2 text-black shadow-md right-full top-0 text-center">
                            <NavLink to="/WeightsLoss" className="block py-1 px-5 lg:text-xl md:text-md  hover:text-green-700 font-semibold hover:bg-white">Weight Loss</NavLink>
                            <NavLink to="/weightsGain" className="block py-1 px-5 lg:text-xl md:text-md hover:text-green-700 font-semibold hover:bg-white">Weight Gain</NavLink>
                          </div>
                        )}
                      </div>
                      <div className="relative group">
                        <p className="flex items-center justify-center py-1 cursor-pointer lg:text-xl md:text-md font-semibold  hover:text-green-700 text-center hover:bg-white" onMouseEnter={() => { setShowDietPlanForAge(true); setShowHealthyDiets(false); setShowSPecialCateg(false); }}>Diet Plan For Age</p>
                        {showDietPlanForAge && (
                          <div className="absolute z-[9999] block w-full  bg-gray-300 py-2 text-black shadow-md right-full top-0 text-center">
                            <NavLink to="/weaning" className="block py-1 px-5 lg:text-xl md:text-md hover:text-green-700 hover:bg-white font-semibold">Weaning</NavLink>
                            <NavLink to="/schoolgoing" className="block py-1 px-5 lg:text-xl md:text-md hover:text-green-700 hover:bg-white font-semibold">School going</NavLink>
                            <NavLink to="/adults" className="block py-1 px-5 lg:text-xl md:text-md hover:text-green-700 hover:bg-white font-semibold">Adults</NavLink>
                            <NavLink to="/geriatric" className="block py-1 px-5 lg:text-xl md:text-md hover:text-green-700 hover:bg-white font-semibold">Geriatric</NavLink>
                          </div>
                        )}
                      </div>
                      <div className="relative group"> 
                        <p className="flex items-center lg:text-xl md:text-md justify-center py-1  font-semibold hover:text-green-700 text-center hover:bg-white" onMouseEnter={() => { setShowSPecialCateg(true); setShowDietPlanForAge(false); setShowHealthyDiets(false); }}>Special Conditions</p>
                        {
                          showSpecialCateg && (
                            <div className="absolute z-[9999] block w-[100%] bg-gray-300 py-2 text-black shadow-md right-full top-0 text-center">
                              <NavLink to="/expectantmothers" className="block py-1 px-1 lg:text-xl hover:bg-white md:text-md hover:text-green-700 font-semibold ">Expectant Mothers</NavLink>
                              <NavLink to="/lactatingmothers" className="block py-1  px-1 lg:text-xl md:text-md hover:bg-white hover:text-green-700 font-semibold ">Lactating Mothers</NavLink>
                              <NavLink to="/pcod" className="block py-1 px-1 hover:text-green-700 font-semibold hover:bg-white">PCOD</NavLink>
                              <NavLink to="/diabetes-millets-diet" className="block py-1 px-1 lg:text-xl md:text-md hover:bg-white hover:text-green-700 font-semibold ">Diabetes Mellitus Diet</NavLink>
                              <NavLink to="/gluten-free-diet" className="block py-1 px-1 lg:text-xl md:text-md hover:bg-white hover:text-green-700 font-semibold ">Gluten Free Diet</NavLink>
                              <NavLink to="/lactose-introlerent" className="block py-1 px-1 lg:text-xl md:text-md hover:bg-white hover:text-green-700 font-semibold ">Lactose Introlerent</NavLink>
                            </div>
                          )
                        }
                      </div>

                    </div>
                  </li>
                  <li className={`hover:text-green-700 px-3 py-1 rounded-3xl hover:rounded-none font-body3 mr-3  lg:text-xl md:text-md items-center text-primeColor  font-semibold  duration-500 hover:translate-y-1 ${location.pathname === "/about" ? "text-green-700 font-extrabold" : ""}`}>
                    <NavLink to="/about" state={{ data: location.pathname.split("/")[1] || null }}>
                      <p >About </p>
                    </NavLink>

                  </li>
                  <li className={`hover:text-green-700 px-3 py-1 rounded-3xl hover:rounded-none font-body3 mr-3  lg:text-xl md:text-md items-center text-primeColor  font-semibold  duration-500 hover:translate-y-1 ${location.pathname === "/contact" ? "text-green-700 font-extrabold" : ""}`}>
                    <NavLink to="/contact" state={{ data: location.pathname.split("/")[1] || null }}>
                      <p>Contact </p>
                    </NavLink>

                  </li>
                </ul>
              )}
              {sidenav && (
                <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                  <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-[80%] h-full relative"
                  >
                    <div className="w-full h-full bg-white p-6">
                      <img src={logo1} alt="logo" className="w-32 pb-7" />
                      <ul className="text-gray-200 flex flex-col gap-2">
                        <li className={`hover:text-red-500 px-3 py-1 rounded-3xl  hover:rounded-none font-body3 mr-3 lg:text-xl md:text-md items-center font-semibold text-primeColor duration-500 hover:translate-y-1 ${location.pathname === "/" || location.pathname === "/home" ? "text-red-500 font-extrabold" : ""}`}>
                          <Link to="/"><p>Home </p>
                          </Link>

                        </li>
                        <li className={`hover:text-red-500 px-3 py-1  rounded-3xl hover:rounded-none font-body3 mr-3 lg:text-xl md:text-md items-center text-primeColor font-semibold  duration-500 hover:translate-y-1 ${location.pathname === "/shop" ? "text-red-500 font-extrabold" : ""}`}>
                          <Link to="/shop">
                            <p>Shop </p>
                          </Link>

                        </li>
                  
                        <li className={`hover:text-red-500 px-3 py-1 rounded-3xl hover:rounded-none relative group font-body3 mr-3 lg:text-lg md:text-sm items-center cursor-pointer  duration-500 hover:translate-y-1 ${location.pathname.includes("meal-plans") ? "text-red-500 font-extrabold" : ""}`}>
                          <p className={`flex font-body2 lg:text-xl md:text-md items-center text-primeColor font-semibold duration-500 hover:text-red-500 ${location.pathname.includes("WeightsLoss") || location.pathname.includes("weightGain") || location.pathname.includes("teens") || location.pathname.includes("adults") ? "text-red-500 font-extrabold" : ""} `} onMouseEnter={() => { setShowHealthyDiets(false); setShowDietPlanForAge(false); setShowSPecialCateg(false); }} >Meal Plans<span className="group-hover:hidden"><IoMdArrowDropdown /></span><span className="hidden group-hover:inline"><IoMdArrowDropup /></span></p>
                          <div ref={dropdownRef} className="absolute z-0 hidden group-hover:block w-[150px] rounded-md bg-white py-2 text-black shadow-md">
                            <div className="relative group">
                              <p className="flex items-center justify-center py-1 cursor-pointer lg:text-xl md:text-md font-semibold hover:text-red-500 text-center hover:bg-gray-200" onMouseEnter={() => { setShowHealthyDiets(true); setShowDietPlanForAge(false); setShowSPecialCateg(false); }}>Healthy Diets</p>
                              {showHealthyDiets && (
                                <div className="absolute z-0 block w-[70%] rounded-md bg-white py-2 text-black shadow-md left-full top-0 text-center">
                                  <NavLink to="/WeightsLoss" className="block py-1 px-1 lg:text-xl md:text-md  hover:text-red-500 font-semibold hover:bg-gray-200">Weight Loss</NavLink>
                                  <NavLink to="/weightsGain" className="block py-1 px-1 lg:text-xl md:text-md hover:text-red-500 font-semibold hover:bg-gray-200">Weight Gain</NavLink>
                                </div>
                              )}
                            </div>
                            <div className="relative group">
                              <p className="flex items-center justify-center py-1 cursor-pointer lg:text-xl md:text-md font-semibold  hover:text-red-500 text-center hover:bg-gray-200" onMouseEnter={() => { setShowDietPlanForAge(true); setShowHealthyDiets(false); setShowSPecialCateg(false); }}>Diet Plan For Age</p>
                              {showDietPlanForAge && (
                                <div className="absolute z-0 block w-[70%] rounded-md bg-white py-2 text-black shadow-md left-full top-0 text-center">
                                  <NavLink to="/weaning" className="block py-1 lg:text-xl md:text-md hover:text-red-500 hover:bg-gray-200 font-semibold">Weaning</NavLink>
                                  <NavLink to="/schoolgoing" className="block py-1 lg:text-xl md:text-md hover:text-red-500 hover:bg-gray-200 font-semibold">School going</NavLink>
                                  <NavLink to="/adults" className="block py-1 lg:text-xl md:text-md hover:text-red-500 hover:bg-gray-200 font-semibold">Adults</NavLink>
                                  <NavLink to="/geriatric" className="block py-1 lg:text-xl md:text-md hover:text-red-500 hover:bg-gray-200 font-semibold">Geriatric</NavLink>
                                </div>
                              )}
                            </div>
                            <div className="relative group">
                              <NavLink className="flex items-center lg:text-xl md:text-md justify-center py-1  font-semibold hover:text-red-500 text-center hover:bg-gray-200" onMouseEnter={() => { setShowSPecialCateg(true); setShowDietPlanForAge(false); setShowHealthyDiets(false); }}>Special Conditions</NavLink>
                              {
                                showSpecialCateg && (
                                  <div className="absolute z-0 block w-[100%] rounded-md bg-white py-2 text-black shadow-md left-0 top-10 text-center">
                                    <NavLink to="/expectantmothers" className="block py-1 px-1 lg:text-xl hover:bg-gray-200 md:text-md hover:text-red-500 font-semibold ">Expectant Mothers</NavLink>
                                    <NavLink to="/lactatingmothers" className="block py-1  px-1 lg:text-xl md:text-md hover:bg-gray-200 hover:text-red-500 font-semibold ">Lactating Mothers</NavLink>
                                    <NavLink to="/pcod" className="block py-1 px-1 hover:text-red-500 font-semibold hover:bg-gray-200">PCOD</NavLink>
                                    <NavLink to="/diabetes-millets-diet" className="block py-1 px-1 lg:text-xl md:text-md hover:bg-gray-200 hover:text-red-500 font-semibold ">Diabetes Mellitus Diet</NavLink>
                                    <NavLink to="/gluten-free-diet" className="block py-1 px-1 lg:text-xl md:text-md hover:bg-gray-200 hover:text-red-500 font-semibold ">Gluten Free Diet</NavLink>
                                    <NavLink to="/lactose-introlerent" className="block py-1 px-1 lg:text-xl md:text-md hover:bg-gray-200 hover:text-red-500 font-semibold ">Lactose Introlerent</NavLink>
                                  </div>
                                )
                              }
                            </div>

                          </div>
                        </li>
                        <li className={`hover:text-red-500 px-3 py-1 rounded-3xl hover:rounded-none font-body3 mr-3  lg:text-xl md:text-md items-center text-primeColor  font-semibold  duration-500 hover:translate-y-1 ${location.pathname === "/about" ? "text-red-500 font-extrabold" : ""}`}>
                          <NavLink to="/about" state={{ data: location.pathname.split("/")[1] || null }}>
                            <p >About </p>
                          </NavLink>

                        </li>
                        <li className={`hover:text-red-500 px-3 py-1 rounded-3xl hover:rounded-none font-body3 mr-3  lg:text-xl md:text-md items-center text-primeColor  font-semibold  duration-500 hover:translate-y-1 ${location.pathname === "/contact" ? "text-red-500 font-extrabold" : ""}`}>
                          <NavLink to="/contact" state={{ data: location.pathname.split("/")[1] || null }}>
                            <p>Contact </p>
                          </NavLink>

                        </li>
                      </ul>

                    </div>
                    <span
                      onClick={() => setSidenav(false)}
                      className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                    >
                      <MdClose />
                    </span>
                  </motion.div>
                </div>

              )}
            </div>
          </Flex>
        </nav>
      </div>
    </div>
  );
};

export default Header;


