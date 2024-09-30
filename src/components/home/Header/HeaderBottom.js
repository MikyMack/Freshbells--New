import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdMenuOpen } from "react-icons/md";
import { FaSearch, FaShoppingCart, FaUserCog } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TypeAnimation } from "react-type-animation";
import "./Headerbottom.css";
import { baseURL } from "../../../constants";
import { toast } from "react-toastify";
import { SpecialCateg } from "../../../actions/HomeActions";
import { ShopDetails } from "../../../actions/ShopActions";
import { FetchCart } from "../../../actions/CartActions";
import { getTotals } from "../../../redux/cartSlice";
import { ComboStore } from "../../../actions/ShopActions";

const HeaderBottom = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [fetchedCartItems, setFetchedCartItems] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [speciCateg, setSpeciCateg] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGOUT', payload: true });
    toast.error("Successfully logged out");
  };

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

  useEffect(() => {
    async function fetchSpecialCateg() {
      try {
        const data = await SpecialCateg();
        setSpeciCateg(data.splcategories); 
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }
    fetchSpecialCateg();
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const details = await ComboStore();
        setAllProducts(details.products);
      } catch (error) {
        console.error('Failed to fetch all products', error);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const spans = document.querySelectorAll('.word span');
    spans.forEach((span, idx) => {
      span.addEventListener('click', (e) => {
        e.target.classList.add('active');
      });
      span.addEventListener('animationend', (e) => {
        e.target.classList.remove('active');
      });

      setTimeout(() => {
        span.classList.add('active');
      }, 750 * (idx + 1));
    });
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      const results = allProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category_ids.includes(parseInt(value)) ||
        (product.subcategories && product.subcategories.some(sub => sub.name.toLowerCase().includes(value.toLowerCase()))) ||
        (product.specialCategories && product.specialCategories.some(spl => spl.name.toLowerCase().includes(value.toLowerCase())))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleCategoryClick = async (parentCategory, childCategory) => {
    const requestData = {
      sub: 0,
      cat_name: parentCategory.name,
      cat_id: childCategory.id,
      spl: parentCategory.name === 'Special Categories' ? 1 : 0,
    };
     
    try {
      await dispatch(ShopDetails(requestData));
      navigate('/ShopByCategory',{
        state: {
          parentCategory,
          childCategory
        }
      });
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  return (
    <div className="parent-div w-full p-2 h-full relative bg-[#324c21]">
      <div className="mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 lg:pb-0 h-full">
          {/* Menu Button */}
          <div className="flex h-14 cursor-pointer items-center gap-2 text-lightText focus:bg-transparent">
            <button onClick={() => setShow(!show)} className="bg-white transition-all py-2 px-4 rounded-2xl hover:bg-green-300 hover:rounded-md flex items-center gap-3 group hover:scale-105 duration-300">
              <MdMenuOpen className="w-5 h-5 text-black group-hover:animate-pulse" />
            </button>
            <div className="word text-white font-body3"> 
              {"Shop by Category".split("").map((char, index) => (
                <span key={`char-${index}`} className={`char${index + 1}`}>{char === " " ? "\u00A0" : char}</span>
              ))}
            </div>
            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-20 bg-green-300 text-center z-40 text-gray-700 w-auto h-auto p-4 pb-6"
              >
                {speciCateg && speciCateg.length > 0 ? (
                  speciCateg.map((item) => (
                    <li key={item.id} className="dropdown px-4 py-1 font-body3 font-semibold md:text-xl xs:text-lg  border-b-[1px] border-b-gray-400 hover:border-b-black hover:text-black duration-300 cursor-pointer">
                      {item.name}
                      <div className="dropdown-content text-center bg-gray-300  w-full py-4 ">
                        {item.children && item.children.length > 0 ? (
                          item.children.map((child,index) => (
                            <div key={index} onClick={() => handleCategoryClick(item, child)}>
                              <p className="p-1 font-body2 md:text-lg xs:text-sm hover:text-green-700 hover:bg-white " key={child.id}>{child.name}</p>
                              <hr />
                            </div>
                          ))
                        ) : (
                          <p>No subcategories</p>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-1">No categories available</li>
                )}
              </motion.ul>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-1/3 md:h-[50px] xs:h-[40px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl mt-2 lg:mt-0">
            <input
              className="flex-1 h-full outline-none placeholder-transparent"
              type="text"
              id="text"
              value={searchValue}
              onChange={handleSearchChange}
            />
            {!searchValue && (
              <span className="absolute inset-0 flex items-center px-6 pointer-events-none font-body3 font-medium text-[#464646]">
                <TypeAnimation
                  sequence={[
                    'Search for millets',
                    1000,
                    'Search for Rices',
                    1000,
                    'Search for Special Mix',
                    1000,
                    'Search for Dryfruits & Nuts',
                    1000,
                    'Search for Health Mix',
                    1000,
                    'Search for General Combo',
                    1000,
                    'Search for Diet Plans',
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{ fontSize: '15px', display: 'inline-block' }}
                  repeat={Infinity}
                />
              </span>
            )}
            <FaSearch className="w-5 h-5" />
          </div>
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-1/2 lg:ml-10 transform -translate-x-1/2 w-full lg:w-1/3 bg-white shadow-lg z-50 h-screen overflow-y-auto">
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index} className="flex justify-between p-2 border-b border-gray-200 hover:bg-gray-100">
                    <Link to={`/productDetails`} state={{ productId: result.id }} className="flex items-center justify-between w-full">
                      <img
                        className="w-32 h-32 object-contain cursor-pointer" 
                        src={`${baseURL}${result.image}`} alt="img"
                      />
                      <span className="font-medium">{result.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* User Settings and Cart */}
          <div className="flex gap-4 lg:mt-0 xs:mt-3 items-center pr-6 cursor-pointer relative">
            <button
              onClick={() => setShowUser(!showUser)}
              className="hover:bg-green-300 bg-white transition-all py-[6px] px-4 rounded-2xl hover:rounded-md flex items-center gap-3 group hover:scale-105 duration-300"
            >
              <FaUserCog className="text-xl text-primeColor drop-shadow-sm cursor-pointer" />
            </button>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-20 right-1 z-30 bg-green-300 text-xl text-center font-body2 text-black w-44 h-auto p-4 pb-6"
              >
                {isAuthenticated ? (
                  <>
                    <Link onClick={() => setShowUser(false)} to="/profile">
                      <li className="px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-black duration-300 cursor-pointer">Profile</li>
                    </Link>
                    <Link onClick={() => setShowUser(false)} to="/orders">
                      <li className="px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-black duration-300 cursor-pointer">Orders</li>
                    </Link>
                    <li onClick={handleLogout} className="px-4 py-1 border-b-[1px] text-red-600 border-b-gray-400 hover:border-b-black duration-300 cursor-pointer">Logout</li>
                  </>
                ) : (
                  <>
                    <Link onClick={() => setShowUser(false)} to="/SignIn">
                      <li className="px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-black hover:text-black duration-300 cursor-pointer">Login</li>
                    </Link>
                    <Link onClick={() => setShowUser(false)} to="/signup">
                      <li className="px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-black hover:text-black duration-300 cursor-pointer">Register</li>
                    </Link>
                  </>
                )}
              </motion.ul>
            )}
            <Link to="/cart">
              <div className="relative">
                <button className="hover:bg-green-300 bg-white transition-all py-[7px] px-4 rounded-2xl hover:rounded-md flex items-center gap-3 group hover:scale-105 duration-300">
                  <FaShoppingCart className="text-primeColor" />
                  <span className="absolute font-body1 top-0 -right-2 group-hover:bg-white group-hover:text-primeColor text-xs w-4 h-4 flex items-center text-center justify-center rounded-full font-semibold bg-green-300">
                    {isAuthenticated ? fetchedCartItems.length : cartTotalQuantity}
                  </span>
                </button>
              </div>
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
