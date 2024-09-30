import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../pageProps/Breadcrumbs'
import southIndianDiet from "../../../assets/images/healthyDiet/weightgain_s.jpg"
import northIndianDiet from "../../../assets/images/healthyDiet/weightgain_n.jpg"
import gain from "../../../assets/images/healthyDiet/gain.png"
import { FaCloudDownloadAlt } from "react-icons/fa";
import ReactPaginate from 'react-paginate'
import { FaRupeeSign } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Heading from '../../home/Products/Heading'
import Image from '../../designLayouts/Image'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart, decreaseCart } from '../../../redux/cartSlice'
import { HealthyDietsWeightGain } from '../../../actions/MealPlansActions'
import { baseURL } from '../../../constants'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddCart } from '../../../actions/CartActions';
import { BsFillCartCheckFill } from "react-icons/bs";
import Loader from '../../Loader/Loader'

export default function WeightGa() {
    const itemsPerPage = 12
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.cartItems);
    const isLoading = useSelector(state => state.auth.isLoading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [quantities, setQuantities] = useState({});
    const [dietType, setDietType] = useState('southIndian');
    const [currentPage, setCurrentPage] = useState(0)
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [selectedDiet, setSelectedDiet] = useState(null);
    const [selectedDisease, setSelectedDisease] = useState(null);
    const [selectedSpecialCategory, setSelectedSpecialCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedVariants, setSelectedVariants] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [products, setProducts] = useState([]);
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;

    const navigate = useNavigate()
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
            volume: selectedVariants[cartItem.id]?.volume || cartItem.volume,
            unit: selectedVariants[cartItem.id]?.unit || cartItem.unit,
            quantity: newQuantities[cartItem.id],
            price: selectedVariants[cartItem.id]?.price || cartItem.price
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

        const cartData = {
            product_id: product.id,
            volume: selectedVariants[product.id]?.volume || product.volume,
            unit: selectedVariants[product.id]?.unit || product.unit,
            quantity: newQuantities[product.id],
            price: selectedVariants[product.id]?.price || product.price
        };
        if (isAuthenticated) {
            AddCart(cartData);
        } else {
            dispatch(addToCart(cartData));
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

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const data = await HealthyDietsWeightGain();
                setProducts(data.products || []);
                setFilteredProducts(data.products || []);
                dispatch({ type: 'SET_LOADING', payload: false });
            } catch (error) {
                console.error("Error fetching products", error);
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };
        fetchProducts();
    }, []);

    const handleDownload = () => {
        const image = dietType === 'southIndian' ? southIndianDiet : northIndianDiet;
        const link = document.createElement('a');
        link.href = image;
        link.download = `${dietType}-diet.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };
    const handlePriceRangeChange = (event) => {
        setSelectedPriceRange(event.target.value);
    };

    const handleDietChange = (event) => {
        setSelectedDiet(event.target.value);
    };

    const handleDiseaseChange = (event) => {
        setSelectedDisease(event.target.value);
    };

    const handleSpecialCategoryChange = (event) => {
        setSelectedSpecialCategory(event.target.value);
    };

    const handleVariantChange = (productId, variant) => {
        setSelectedVariants({
            ...selectedVariants,
            [productId]: variant
        });
    };

    useEffect(() => {
        let filtered = products;
        if (selectedDiet) {
            filtered = filtered.filter(product => product.special_category_children.includes(selectedDiet));
        }
        if (selectedDisease) {
            filtered = filtered.filter(product => product.special_category_children.includes(selectedDisease));
        }
        if (selectedSpecialCategory) {
            filtered = filtered.filter(product => product.special_category_children.includes(selectedSpecialCategory));
        }
        if (selectedPriceRange) {
            const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
            filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
        }
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category_ids.includes(parseInt(searchTerm)) ||
                product.price.toString().includes(searchTerm)
            );
        }
        setFilteredProducts(filtered);
    }, [selectedDiet, selectedDisease, selectedSpecialCategory, selectedPriceRange, searchTerm, products]);
    if (isLoading) return <Loader />
    return (
        <div className='bg-[#EFFDEC] font-body3'>
            <div className="xl:container px-4 mx-auto  pb-12">
                <Breadcrumbs title="Weight Gain Diet" />
                <ToastContainer />
                <section>
                    <div className="xl:container mx-auto px-4">
                        <div className="flex flex-wrap mt-10">
                            <div className="w-full lg:w-full px-4 mb-6 lg:mb-0">
                                <h3 className="text-2xl font-semibold font-body2 mb-4"> DIET PLAN FOR WEIGHT GAIN</h3>
                                <p className='font-body2 text-xl'>Gaining weight is not a difficult task but gaining muscle mass is just as difficult as losing weight. However, simply adding certain foods to your diet can make weight gain more healthy and effective .Whether a person is slim, if you are underweight, then they want to gain a balanced amount of muscle mass and subcutaneous fat,not the unhealthy belly fat/visceral fat.</p>
                            </div>
                        </div>
                        <div className="border-b my-10"></div>
                        <div className="flex flex-wrap items-center">
                            <div className="w-full xl:w-1/2 px-4 mb-6 xl:mb-0">
                                <img loading='lazy' className="w-full h-auto object-cover" src={gain} alt="single-img-10" />
                            </div>
                            <div className="w-full xl:w-1/2 px-4 bg-white py-5">
                                <h3 className="text-2xl font-semibold font-body2 mb-4">Things to remember</h3>
                                <ul className="list-disc pl-5 space-y-2 text-lg font-body2">
                                    <li>Drink plenty of water</li>
                                    <li>Having protein smoothies/shakes</li>
                                    <li>Eat plenty of fruits and vegetables</li>
                                    <li>Introduce variety in your diet</li>
                                    <li>Having milk and milk products will provide good quality fat and protein</li>
                                    <li>Avoid excess sugar and excess salt</li>
                                    <li>Enjoy each meal by adding flavours of Fenugreek Powder cumin powder Himalayan pink salt garlic powder</li>
                                    <li>If you are craving in between meals you can have seasonal fruits</li>
                                    <li>Don't skip breakfast</li>
                                    <li>Eat regular meals</li>
                                    <li>Get more active</li>
                                    <li>Chew your food well</li>
                                    <li>Maintain a 2hr gap between each meal and don't exceed 3hrs</li>
                                    <li>Have your last meal 4 hours before going to bed</li>
                                    <li>Quality sleep</li>
                                </ul>
                            </div>
                            <p className='text-red-400 font-body2 xs:text-sm md:text-xl mt-5'>Remember and Please note:This is a sample menu for PCOS.Individual needs will vary based on age, sex, height, weight, activity level, and any chronic health conditions or diseases. Consult your physician or health care provider before starting any diet plan.</p>
                        </div>
                        <div className="border-b my-10"></div>
                    </div>
                </section>
                <div className="xl:container mx-auto pb-20 font-body3">
                    <Heading heading="Products For Weight Gain" />

                    <div className="flex flex-col items-start lg:flex-row">
                        <div className="w-full h-full lg:w-1/4 mb-4 lg:mb-0 bg-white p-5">
                            <button className="lg:hidden p-2 bg-primeColor text-white rounded w-full" onClick={() => setShowFilters(!showFilters)}>{showFilters ? "Close Filters" : "Filters"}</button>
                            <div className={`lg:block font-titleFont bg-white p-5 ${showFilters ? 'block' : 'hidden'}`}>
                                <h1 className="text-center font-medium underline">Filter by :</h1>
                                <div className='my-4'>
                                    <h3 className="font-bold text-gray-600">DIET</h3>
                                    <select onChange={handleDietChange} className="p-2 outline-none bg-yellow-50 font-medium rounded w-full">
                                        <option className="font-medium bg-primeColor text-white" value="">All Diets</option>
                                        <option className="font-medium bg-primeColor text-white" value="Keto Diet">Keto Diet</option>
                                        <option className="font-medium bg-primeColor text-white" value="Paleo Diet">Paleo Diet</option>
                                        <option className="font-medium bg-primeColor text-white" value="Gluten Free Diet">Gluten Free Diet</option>
                                        <option className="font-medium bg-primeColor text-white" value="High Fiber Diet">High Fiber Diet</option>
                                        <option className="font-medium bg-primeColor text-white" value="High Potassium Diet">High Potassium Diet</option>
                                        <option className="font-medium bg-primeColor text-white" value="Weight Loss Diet">Weight Loss Diet</option>
                                        <option className="font-medium bg-primeColor text-white" value="Weight Gain Diet">Weight Gain Diet</option>
                                        <option className="font-medium bg-primeColor text-white" value="High Calcium Diet">High Calcium Diet</option>
                                        <option className="font-medium bg-primeColor text-white" value="Low Carb Diet">Low Carb Diet</option>
                                        <option className="font-medium bg-primeColor text-white" value="High Protein High Fiber Diet">High Protein High Fiber Diet</option>
                                        <option className="font-medium bg-primeColor text-white" value="PCOD Diet">PCOD Diet</option>
                                        <option className="font-medium bg-primeColor text-white" value="Weight Management Diet">Weight Management Diet</option>
                                    </select>
                                    <hr />
                                </div>
                                <div className='my-4'>
                                    <h3 className="font-bold text-gray-600">DISEASE</h3>
                                    <select onChange={handleDiseaseChange} className="p-2 outline-none bg-yellow-50 font-medium rounded w-full">
                                        <option className="font-medium bg-primeColor text-white" value="">All Diseases</option>
                                        <option className="font-medium bg-primeColor text-white" value="Diabetes Mellitus">Diabetes Mellitus</option>
                                        <option className="font-medium bg-primeColor text-white" value="Post Operative">Post Operative</option>
                                        <option className="font-medium bg-primeColor text-white" value="Cancer">Cancer</option>
                                        <option className="font-medium bg-primeColor text-white" value="Liver Disease">Liver Disease</option>
                                        <option className="font-medium bg-primeColor text-white" value="Kidney Disease">Kidney Disease</option>
                                        <option className="font-medium bg-primeColor text-white" value="Cardio Vascular">Cardio Vascular</option>
                                        <option className="font-medium bg-primeColor text-white" value="Thyroid">Thyroid</option>
                                        <option className="font-medium bg-primeColor text-white" value="Infertility">Infertility</option>
                                        <option className="font-medium bg-primeColor text-white" value="Fatty Liver">Fatty Liver</option>
                                        <option className="font-medium bg-primeColor text-white" value="Hypertension">Hypertension</option>
                                        <option className="font-medium bg-primeColor text-white" value="Cholestrol">Cholestrol</option>
                                    </select>
                                    <hr />
                                </div>
                                <div className='my-4'>
                                    <h3 className="font-bold text-gray-600">SPECIAL CATEGORIES</h3>
                                    <select onChange={handleSpecialCategoryChange} className="p-2 outline-none bg-yellow-50 font-medium rounded w-full">
                                        <option className="font-medium bg-primeColor text-white" value="">All Special Categories</option>
                                        <option className="font-medium bg-primeColor text-white" value="Super Foods">Super Foods</option>
                                        <option className="font-medium bg-primeColor text-white" value="Premium Products">Premium Products</option>
                                        <option className="font-medium bg-primeColor text-white" value="Healthy Delights">Healthy Delights</option>
                                    </select>
                                    <hr />
                                </div>
                                <div className='my-4'>
                                    <h3 className="font-bold text-gray-600">PRICE RANGE</h3>
                                    <select onChange={handlePriceRangeChange} className="p-2 outline-none bg-yellow-50 font-medium rounded w-full">
                                        <option className="font-medium bg-primeColor text-white" value="">All Prices</option>
                                        <option className="font-medium bg-primeColor text-white" value="0-100">0-100</option>
                                        <option className="font-medium bg-primeColor text-white" value="100-300">100-300</option>
                                        <option className="font-medium bg-primeColor text-white" value="300-600">300-600</option>
                                        <option className="font-medium bg-primeColor text-white" value="600-1000">600-1000</option>
                                        <option className="font-medium bg-primeColor text-white" value="1000-10000">1000-10000</option>
                                    </select>
                                    <hr />
                                </div>
                                <div className='my-4'>
                                    <h3 className="font-bold text-gray-600">SEARCH PRODUCTS BY</h3>
                                    <input
                                        type="text"
                                        placeholder="Name,Id,Categories,Price..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="p-2 outline-none bg-yellow-50 font-semibold rounded w-full mb-2"
                                    />
                                    <hr />
                                </div>
                                <div>
                                    <button onClick={() => setCurrentPage(0)} className="p-2 bg-primeColor text-white font-medium hover:bg-green-900 rounded w-full">Search</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-3/4  py-2">
                            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-aos="fade-up">
                                {filteredProducts.slice(offset, offset + itemsPerPage).map((product) => {
                                    const selectedVariant = selectedVariants[product.id] || product.quantity_variants[0];
                                    return (
                                        <div key={product.id} className="p-2 ">
                                            <div className="relative overflow-hidden group max-w-full h-full hover:shadow-slate-700 shadow-xl">
                                                <div className='flex flex-col items-center justify-center max-w-full max-h-full bg-gray-100'>
                                                    <div className="relative">
                                                        <Image className="md:w-[230px] md:h-[230px] xs:w-[140px] xs:h-[140px] object-contain" imgSrc={`${baseURL}${product.image}`} />
                                                    </div>
                                                </div>
                                                <div className="py-1 flex flex-col border-[1px] border-t-0 px-2 h-full bg-white">
                                                    <div className="flex flex-col items-center justify-between font-titleFont ">
                                                        <h2 className="md:text-xl xl:text-xl lg:text-xl font-body2 xs:text-[10px] sm:text-[10px] text-primeColor font-normal">
                                                            {product.name}
                                                        </h2>
                                                        <p className="text-primeColor xl:text-[15px] lg:text-[15px]  md:text-[15px] sm:text-[9px] xs:text-[8px]  font-semibold flex items-center pt-1 ">
                                                            <span className=" xl:text-[10px] lg:text-[10px] md:text-[15px] xs:text-[10px]">
                                                                <FaRupeeSign />
                                                            </span>
                                                            <span className="line-through text-gray-600">{(selectedVariants[product.id]?.price || product.price) + 100}</span>
                                                            <span className="ml-1">{selectedVariants[product.id]?.price || product.price}</span>
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <button className="md:text-xl xs:text-sm px-3 py-1   bg-gray-200 rounded-full hover:bg-gray-400" onClick={() => handleDecrease(product)}><FaMinus /></button>
                                                        <span className="mx-3 md:text-[20px] xs:text-[15px]">{getCartQuantity(product.id)}</span>
                                                        <button className="md:text-xl xs:text-sm px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-400" onClick={() => handleIncrease(product)}><FaPlus /></button>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <button onClick={() => handleBuy(product)} className="order-2 ml-2 hover:bg-primeColor text-primeColor px-3 py-2 font-medium xs:text-[13px] sm:text-[15px] sml:text-[17px] md:text-[20px] lg:text-[20px] xl:text-[20px] hover:text-white  hover:translate-y-1 transition-transform duration-500">
                                                            <BsFillCartCheckFill />
                                                        </button>
                                                        {product.quantity_variants.length > 0 ? (
                                                            <select className="order-1 mt-1 hover:bg-primeColor font-normal text-black hover:text-white rounded-xl xl:text-[15px] lg:text-[15px] md:text-[15px] xs:text-[10px] sm:text-[10px]" onChange={(e) => handleVariantChange(product.id, JSON.parse(e.target.value))}>
                                                                {product.quantity_variants?.map((variant) => (
                                                                    <option key={variant.id} value={JSON.stringify(variant)} className="text-black bg-white font-medium">
                                                                        {variant.volume} {variant.unit}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        ) : (
                                                            <p className='text-sm font-body2'>no variants</p>
                                                        )}
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
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                pageCount={pageCount}
                                previousLabel="<"
                                renderOnZeroPageCount={null}
                                containerClassName="pagination flex justify-center gap-1 items-center mt-5"
                                activeClassName="bg-black text-white px-1 py-1"
                                pageLinkClassName="px-3 py-2 hover:bg-lightGray rounded"
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full mb-8'>
                    <div className='flex justify-center space-x-4 mb-4'>
                        <button className={`py-2 px-4 rounded-lg ${dietType === 'southIndian' ? 'bg-primeColor hover:bg-black text-white font-semibold' : 'bg-gray-200'}`} onClick={() => setDietType('southIndian')}>South Indian Diet</button>
                        <button className={`py-2 px-4 rounded-lg ${dietType === 'northIndian' ? 'bg-primeColor hover:bg-black text-white font-semibold' : 'bg-gray-200'}`} onClick={() => setDietType('northIndian')}>North Indian Diet</button>
                    </div>
                    <div className="relative">
                        <img className='object-contain' src={dietType === 'southIndian' ? southIndianDiet : northIndianDiet} alt={`${dietType} diet`} />
                        <button className="flex items-center py-2 px-4 bg-blue-500 hover:bg-blue-400 font-medium text-white rounded-lg  mt-4" onClick={handleDownload}><span className='mr-2'><FaCloudDownloadAlt /></span> Download Diet Image</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
