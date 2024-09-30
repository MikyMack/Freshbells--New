import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Header from "../../components/home/Header/Header";
import HeaderBottom from "../../components/home/Header/HeaderBottom";
import Footer from "../../components/home/Footer/Footer";
import FooterBottom from "../../components/home/Footer/FooterBottom";
import { FaRupeeSign } from "react-icons/fa";
import { addToCart, decreaseCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPlus, BsDash } from "react-icons/bs";
import { baseURL } from "../../constants";
import { ProductDetails as fetchProductDetails } from "../../actions/ShopActions";
import ReactPaginate from "react-paginate";
import Image from "../../components/designLayouts/Image";
import Heading from "../../components/home/Products/Heading";
import Loader from "../../components/Loader/Loader";
import { AddCart } from "../../actions/CartActions";
import { BsFillCartCheckFill } from "react-icons/bs";
import Navigation from "../../components/home/Header/Navigation";

const ProductDetails = () => {
  const location = useLocation();
  const { productId } = location.state || {};
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0)
  const [products, setProducts] = useState([]);
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const [data, setData] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [extraImages, setExtraImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [selectedVariants, setSelectedVariants] = useState({});
  const [activeSection, setActiveSection] = useState('about');

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      fetchProductDetails(productId).then((response) => {
        setData(response);
        setProducts(response.related_products)
        setMainImage(response.product?.image);
        setExtraImages(response.product?.extra_images || []);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
    }
  }, [productId]);

  const handleImageClick = (selectedImage) => {
    setExtraImages((prevImages) => [
      { image: mainImage },
      ...prevImages.filter((img) => img.image !== selectedImage),
    ]);
    setMainImage(selectedImage);
  };
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
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

    const cartData = {
      product_id: cartItem.id,
      volume: cartItem.volume,
      unit: cartItem.unit,
      quantity: newQuantities[cartItem.id],
      price: cartItem.price
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

    const cartData = {
      product_id: product.id,
      volume: product.volume,
      unit: product.unit,
      quantity: newQuantities[product.id],
      price: product.price
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
    setSelectedVariants((prevVariants) => ({
      ...prevVariants,
      [productId]: variant,
    }));
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  if (isLoading) return <div><Loader /></div>;

  return (
    <>
      <Header />
      <HeaderBottom />
      <ToastContainer />
      <div className="bg-[#EFFDEC] font-body3">
        <div className="w-full mx-auto overflow-h">
          <div className="xl:container mx-auto px-4 py-7">
            <div className="xl:-mt-10 mb-4 -mt-7">
              <Breadcrumbs title="Product Details" />
            </div>
            <div className="max-w-full mx-auto my-10 ">
              <div className="bg-white rounded-lg shadow-lg">
                <button className="icofont-close absolute top-2 right-2 text-gray-500 hover:text-gray-700" data-bs-dismiss="modal"></button>
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row items-center justify-center">
                    {/* Product Images */}
                    <div className="w-full lg:w-1/2">
                      <div className="relative">
                        <div>
                          <div>
                            <img className="md:w-[400px] md:h-[400px] lg:w-[400px] lg:h-[400px] xs:w-[230px] xs:h-[230px] lg:ml-[40px] xl:ml-[140px] md:ml-[145px] xs:ml-7 sm:ml-14 object-contain rounded-full" src={`${baseURL}${mainImage}`} alt="product" />
                          </div>
                        </div>
                        <ul className="flex items-center justify-center mt-4 space-x-2">
                          {extraImages.map((extraImage, index) => (
                            <li key={index}>
                              <img className="w-28 h-28  object-contain cursor-pointer" src={`${baseURL}${extraImage.image}`} alt="product thumbnail" onClick={() => handleImageClick(extraImage.image)} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Product Details */}
                    <div className="w-full lg:w-1/2 lg:pl-6 mt-6 lg:mt-0 bg-yellow-50  p-5 font-body2">
                      <div className="flex flex-col items-start ">
                        <h3 className=" text-2xl font-bold mb-2">{data.product?.name}</h3>
                        <h3 className=" text-2xl font-bold mb-2 flex flex-row">
                          <del className="text-gray-500 flex items-center"><span className="text-lg"><FaRupeeSign /></span>{data.product?.price + 100}</del>
                          <span className="text-red-500 ml-2 flex items-center">{data.product?.price} <small className="text-sm text-gray-500"> /per {data.product?.unit}</small></span>
                        </h3>
                        <p className=" text-gray-700 mb-4 text-xl">{data.product?.description}</p>
                        <div className=" mb-4">
                          <label className=" font-bold flex items-center gap-2">Category :<span className="text-blue-500 hover:underline">{data.product?.category?.join(", ")}</span></label>
                        </div>
                        <div className={`md:text-lg mb-4 lg:text-xl sm:text-sm font-normal text-center xs:text-sm ${data.product.stock === 0 || (data.product.in_stock >= 0 && data.product.in_stock < 10) ? 'text-red-500' : 'text-green-500'}`}>
                          {data.product.in_stock === 0 ? "Out of Stock" : data.product.in_stock < 10 ? `Only ${data.product.in_stock} ${data.product.unit} items left` : `${data.product.in_stock}${data.product.unit} items in stock`}
                        </div>
                        <div className=" flex items-center gap-2 mb-4">
                          <div className="flex items-center">
                            <button onClick={() => handleDecrease(data.product)} className="px-3 py-3 text-lg bg-gray-300 hover:bg-red-400 text-black hover:text-white">
                              <BsDash />
                            </button>
                            <span className="px-3 py-1 text-lg  bg-gray-100">{getCartQuantity(data.product?.id)}</span>
                            <button onClick={() => handleIncrease(data.product)} className="px-3 py-3 text-lg bg-gray-300 hover:bg-green-400 text-black hover:text-white">
                              <BsPlus />
                            </button>
                          </div>
                        </div>
                        <button onClick={() => handleBuy(data.product)} className="bg-primeColor w-full justify-center font-medium text-white px-4 py-2 rounded flex items-center hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500" title="Add to Cart">
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white font-body2 shadow-xl p-8 text-xl">
              <div className="flex flex-col md:flex-row justify-around mb-4">
                <button onClick={() => handleSectionClick('about')} className={`text-xl font-bold w-full md:w-auto bg-yellow-50 text-black text-center p-2 mb-2 border ${activeSection === 'about' ? 'bg-yellow-200 border-b-4 border-yellow-500' : ''}`}>About</button>
                <button onClick={() => handleSectionClick('advantages')} className={`text-xl font-bold w-full md:w-auto bg-yellow-50 text-black text-center p-2 mb-2 border ${activeSection === 'advantages' ? 'bg-yellow-200 border-b-4 border-yellow-500' : ''}`}>Advantages</button>
                <button onClick={() => handleSectionClick('health_benefits')} className={`text-xl font-bold w-full md:w-auto bg-yellow-50 text-black text-center p-2 mb-2 border ${activeSection === 'health_benefits' ? 'bg-yellow-200 border-b-4 border-yellow-500' : ''}`}>Health Benefits</button>
                <button onClick={() => handleSectionClick('nutrition_contents')} className={`text-xl font-bold w-full md:w-auto bg-yellow-50 text-black text-center p-2 mb-2 border ${activeSection === 'nutrition_contents' ? 'bg-yellow-200 border-b-4 border-yellow-500' : ''}`}>Nutrition Contents</button>
                <button onClick={() => handleSectionClick('usage')} className={`text-xl font-bold w-full md:w-auto bg-yellow-50 text-black text-center p-2 mb-2 border ${activeSection === 'usage' ? 'bg-yellow-200 border-b-4 border-yellow-500' : ''}`}>Usage</button>
              </div>

              {activeSection === 'about' && data.product.attributes?.about && (
                <div className="mb-4">
                  <ul className="pl-5 text-gray-700">
                    {data.product.attributes.about.split('\r\n').filter(item => item.trim() !== '').map((item, index) => (
                      <li key={index} className="mb-2">{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeSection === 'advantages' && data.product.attributes?.advantages && (
                <div className="mb-4">
                  <ul className="pl-5 text-gray-700">
                    {data.product.attributes.advantages.split('\r\n').filter(item => item.trim() !== '').map((item, index) => {
                      const cleanedItem = item.trim().replace(/^v/, '');
                      return <li key={index} className="mb-2">{cleanedItem}</li>;
                    })}
                  </ul>
                </div>
              )}

              {activeSection === 'health_benefits' && data.product.attributes?.health_benefits && (
                <div className="mb-4">
                  <ul className="pl-5 text-gray-700">
                    {data.product.attributes.health_benefits.split('\r\n').filter(item => item.trim() !== '')?.map((item, index) => (
                      <li key={index} className="mb-2">{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeSection === 'nutrition_contents' && data.product.attributes?.nutrition_contents && (
                <div className="mb-4">
                  <ul className="pl-5 text-gray-700">
                    {data.product.attributes.nutrition_contents.split('\r\n').filter(item => item.trim() !== '')?.map((item, index) => (
                      <li key={index} className="mb-2">{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeSection === 'usage' && data.product.attributes?.usage && (
                <div className="mb-4">
                  <ul className="pl-5 text-gray-700">
                    {data.product.attributes.usage.split('\r\n').filter(item => item.trim() !== '')?.map((item, index) => (
                      <li key={index} className="mb-2">{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="xl:container px-4  pb-20 pt-10 font-body2">
              <Heading heading="Related Products" />
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-2 h-full" data-aos="fade-up">
                {products.slice(offset, offset + itemsPerPage).map((product, index) => {
                  const selectedVariant = selectedVariants[product.id] || product.quantity_variants[0];
                  return (
                    <div key={product.id} className="p-2">
                      <div className="relative overflow-hidden w-full h-full hover:shadow-slate-700 shadow-md">
                        <div className={`flex flex-col items-center justify-center bg-gray-100 group-hover:bg-white max-w-full max-h-full`}>
                          <div className="relative w-full h-full" onClick={() => handleView(product.id)}>
                            <Image className="md:w-[230px] md:h-[230px] cursor-pointer xs:w-[140px] xs:h-[140px] object-contain" imgSrc={`${baseURL}${product.image}`} />
                          </div>
                        </div>
                        <div className="py-1 flex flex-col h-auto w-full items-center justify-between gap-1 border-[1px] border-t-0 px-2 bg-white">
                          <div className="flex flex-col items-center justify-between font-titleFont ">
                            <h2 className="md:text-xl xl:text-xl lg:text-xl xs:text-[10px] text-center sm:text-[10px] text-primeColor font-medium">
                              {product.name}
                            </h2>
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                <button onClick={() => handleDecrease(product)} className="px-1 py-1 text-xs xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg bg-gray-300 hover:bg-red-400 text-black hover:text-white">
                                  <BsDash />
                                </button>
                                <span className="px-1 text-xs xs:text-xs sm:text-sm md:text-base lg:text-sm xl:text-sm bg-gray-100">{getCartQuantity(product.id)}</span>
                                <button onClick={() => handleIncrease(product)} className="px-1 py-1 text-xs xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg bg-gray-300 hover:bg-green-400 text-black hover:text-white">
                                  <BsPlus />
                                </button>
                              </div>
                              <div className="text-primeColor font-semibold flex items-center">
                                <span className="text-sm">
                                  <FaRupeeSign />
                                </span>
                                <span className="line-through text-gray-600">{(selectedVariant?.price || product.price) + 100}</span>
                                <span className="ml-1">{selectedVariant?.price || product.price}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between w-full">
                            <button onClick={() => handleBuy(product)} className="order-2 ml-2 py-1 hover:bg-primeColor text-black px-2 font-medium xs:text-[13px] sm:text-[15px] sml:text-[17px] md:text-[20px] lg:text-[20px] xl:text-[20px] hover:text-white rounded-2xl hover:rounded-none  hover:translate-y-1 transition-transform duration-500">
                              <BsFillCartCheckFill />
                            </button>
                            <select className="order-1 mt-1 hover:bg-primeColor font-medium font-body2 text-black hover:text-white xl:text-[15px] lg:text-[15px] md:text-[15px] xs:text-[15px] sm:text-[15px]" onChange={(e) => handleVariantChange(product.id, JSON.parse(e.target.value))}>
                              {product.quantity_variants.map((variant, idx) => (
                                <option key={idx} value={JSON.stringify(variant)} className="text-black bg-white font-medium">{variant.volume}{variant.unit}</option>
                              ))}
                            </select>
                          </div>
                          <div className={`md:text-lg lg:text-xl sm:text-sm font-normal text-center xs:text-[10px] ${selectedVariant?.in_stock === 0 || (selectedVariant?.in_stock >= 0 && selectedVariant?.in_stock < 10) ? 'text-red-500' : 'text-green-500'}`}>
                            {selectedVariant?.in_stock === 0 ? "Out of Stock" : selectedVariant?.in_stock < 10 ? `Only ${selectedVariant?.in_stock} ${selectedVariant?.unit} items left` : selectedVariant ? `${selectedVariant.in_stock} ${selectedVariant.unit} left in stock` : "Stock information not available"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <ReactPaginate
                breakLabel="..."
                nextLabel=" >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< "
                renderOnZeroPageCount={null}
                containerClassName="pagination flex justify-center gap-1 items-center mt-5"
                activeClassName="bg-black text-white px-2 py-2 rounded-full"
                pageLinkClassName="px-3 py-2 hover:bg-lightGray rounded"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterBottom />
      <div className="block lg:hidden overflow-hidden mt-24">
        <Navigation />
      </div>
    </>
  );
};

export default ProductDetails;



