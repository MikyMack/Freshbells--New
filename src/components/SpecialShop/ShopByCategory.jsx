import React, { useState, useEffect } from 'react'
import Header from '../home/Header/Header'
import HeaderBottom from '../home/Header/HeaderBottom'
import Footer from '../home/Footer/Footer'
import FooterBottom from '../home/Footer/FooterBottom'
import Image from '../designLayouts/Image'
import { baseURL } from '../../constants'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from '../pageProps/Breadcrumbs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart, decreaseCart } from '../../redux/cartSlice'
import ReactPaginate from 'react-paginate'
import { BsPlus, BsDash } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { AddCart } from '../../actions/CartActions'
import Navigation from '../home/Header/Navigation';
import { BsFillCartCheckFill } from "react-icons/bs";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { HiMiniViewColumns } from "react-icons/hi2";
import { useLocation } from 'react-router-dom';

function ShopByCategory() {
  const dispatch = useDispatch()
  const location = useLocation();
  const { parentCategory, childCategory } = location.state || {};
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.auth.products);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const itemsPerPage = 18
  const [currentPage, setCurrentPage] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVariants, setSelectedVariants] = useState({});
  const [priceFilter, setPriceFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const pageCount = products ? Math.ceil(products.length / itemsPerPage) : 0;
  const offset = currentPage * itemsPerPage;

  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      setQuantities({});
      setSearchTerm('');
      setSelectedVariants({});
      setPriceFilter('');
      setSortOrder('asc');
      setViewMode('grid');
    };
  }, []);

  const handleDecrease = (cartItem) => {
    if (isAuthenticated) {
      const newQuantities = {
        ...quantities,
        [cartItem.id]: Math.max(quantities[cartItem.id] - 1, 0)
      };
      setQuantities(newQuantities);
      toast.error("item removed successfully")
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
      toast.success("Item added to cart successfully")
    } else {
      dispatch(addToCart(cartData));
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
      dispatch(addToCart(cartData));
    }
    navigate("/cart");
  };
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const getCartQuantity = (productId) => {
    if (isAuthenticated) {
      return quantities[productId] || 0;
    } else {
      const cartItem = cartItems.find((item) => item.id === productId);
      return cartItem ? cartItem.cartQuantity : 0;
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleVariantChange = (productId, variant) => {
    setSelectedVariants({
      ...selectedVariants,
      [productId]: variant
    });
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const filteredProducts = products ? products
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(product => priceFilter ? product.price <= priceFilter : true)
    .sort((a, b) => sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
    : [];

  return (
    <div>
      <Header />
      <HeaderBottom />
      <ToastContainer />
      <div className='bg-[#EFFDEC]'>
        <div className="lg:container mx-auto pb-8 px-4">
          <Breadcrumbs title={`Category is : ${parentCategory?.name || ''} & Subcategory is : ${childCategory?.name || ''}`} />
          <div className='flex flex-col lg:flex-row items-center justify-end gap-2'>
            <div className='flex gap-2'>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 p-2 border w-full border-gray-300 rounded outline-none"
              />
              <input
                type="number"
                placeholder="Max price..."
                value={priceFilter}
                onChange={handlePriceFilterChange}
                className="mb-4 w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className='flex gap-2'>
              <select
                value={sortOrder}
                onChange={handleSortOrderChange}
                className="mb-4 p-2 border border-gray-300 rounded outline-none"
              >
                <option value="asc">Sort by Name: A-Z</option>
                <option value="desc">Sort by Name: Z-A</option>
              </select>
              <button
                onClick={() => handleViewModeChange('grid')}
                className={`mb-4 p-2 border border-gray-300 rounded outline-none text-2xl ${viewMode === 'grid' ? 'bg-gray-300' : ''}`}
              >
                <HiOutlineViewGridAdd />
              </button>
              <button
                onClick={() => handleViewModeChange('column')}
                className={`mb-4 p-2 border border-gray-300 rounded outline-none text-2xl ${viewMode === 'column' ? 'bg-gray-300' : ''}`}
              >
                <HiMiniViewColumns />
              </button>
            </div>

          </div>

          <div className={`w-full h-full flex items-center justify-center gap-5 ${viewMode === 'grid' ? 'flex-wrap' : 'flex-col'}`}>

            <div className={`grid h-full ${viewMode === 'grid' ? 'xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6' : 'lg:grid-cols-3 xs:grid-cols-1 sm:grid-cols-1'} gap-4`} data-aos="fade-up">
              {filteredProducts.slice(offset, offset + itemsPerPage).map((product, index) => {
                const selectedVariant = selectedVariants[product.id] || product.quantity_variants[0];
                return (
                  <div key={product.id}>
                    <div className="relative overflow-hidden group max-w-full h-full hover:shadow-slate-700 shadow-md">
                      <div className={`flex flex-col items-center justify-center bg-green-200 group-hover:bg-white max-w-full max-h-full`}>
                        <div className="relative">
                          <Image className="md:w-[230px] md:h-[230px] xs:w-[140px] xs:h-[140px] object-contain" imgSrc={`${baseURL}${product.image}`} />
                        </div>
                      </div>
                      <div className="py-1 h-full flex flex-col gap-1 border-[1px] border-t-0 px-4 bg-white">
                        <div className="flex flex-col items-center justify-between font-titleFont ">
                          <h2 className="md:text-xl xl:text-xl lg:text-xl xs:text-[10px] text-center sm:text-[10px] text-primeColor font-medium">
                            {product.name}
                          </h2>
                          <p className="text-primeColor xl:text-[15px] lg:text-[15px]  md:text-[15px] sm:text-[9px] xs:text-[8px]  font-semibold flex items-center pt-1 ">
                            <span className=" xl:text-[10px] lg:text-[10px] md:text-[10px] xs:text-[10px]">
                              <FaRupeeSign />
                            </span>
                            <span className="line-through text-gray-600">{(selectedVariants[product.id]?.price || product.price) + 100}</span>
                            <span className="ml-1">{selectedVariants[product.id]?.price || product.price}</span>
                          </p>
                        </div>
                        <div className="flex items-center justify-center">
                          <button onClick={() => handleDecrease(product)} className="px-1 py-1 text-xs xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg bg-gray-300 hover:bg-red-400 text-black hover:text-white">
                            <BsDash />
                          </button>
                          <span className="px-1 text-xs xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg bg-gray-100">{getCartQuantity(product.id)}</span>
                          <button onClick={() => handleIncrease(product)} className="px-1 py-1 text-xs xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg bg-gray-300 hover:bg-green-400 text-black hover:text-white">
                            <BsPlus />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <button onClick={() => handleBuy(product)} className="order-2 ml-2 py-1 hover:bg-primeColor text-black px-2 font-medium xs:text-[13px] sm:text-[15px] sml:text-[17px] md:text-[20px] lg:text-[20px] xl:text-[20px] hover:text-white rounded-2xl hover:rounded-none  hover:translate-y-1 transition-transform duration-500">
                            <BsFillCartCheckFill />
                          </button>
                          <select
                            className="order-1 mt-1 hover:bg-primeColor font-medium font-body2 text-black hover:text-white xl:text-[20px] lg:text-[15px] md:text-[15px] xs:text-[15px] sm:text-[15px]"
                            onChange={(e) => handleVariantChange(product.id, JSON.parse(e.target.value))}
                          >
                            {product.quantity_variants.map((variant) => (
                              <option key={variant.id} value={JSON.stringify(variant)} className="text-black bg-white font-medium">
                                {variant.volume}{variant.unit}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className={`md:text-lg lg:text-xl sm:text-sm font-normal text-center xs:text-[10px] ${selectedVariant?.in_stock <= 0 ? 'text-red-500' : selectedVariant?.in_stock > 0 && selectedVariant?.in_stock <= 10 ? 'text-yellow-500' : 'text-green-500'}`}>
                          {selectedVariant?.in_stock <= 0 ? "Out of Stock" : selectedVariant?.in_stock > 0 && selectedVariant?.in_stock <= 10 ? `Only ${selectedVariant?.in_stock} items left` : selectedVariant ? `${selectedVariant.in_stock} left in stock` : "Stock information not available"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination flex justify-center gap-1 items-center mt-5"
            activeClassName="bg-black text-white px-2 py-2"
            pageLinkClassName="px-3 py-2 hover:bg-lightGray"
          />
        </div>
      </div>
      <Footer />
      <FooterBottom />
      <div className="block lg:hidden overflow-hidden mt-24">
        <Navigation />
      </div>
    </div>
  )
}

export default ShopByCategory