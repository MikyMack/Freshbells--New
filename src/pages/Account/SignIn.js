import React, { useState } from "react";
import { BsCheckCircleFill, BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../assets/logo/logo.webp"
import { LOGIN_ACTION } from "../../actions/AuthActions";
import { AddCart } from "../../actions/CartActions";

const SignIn = () => {
  const isLoading = useSelector(state => state.auth.isLoading);
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', payload: true });
    if (formData.email && formData.password) {
      try {
  
        const response = await LOGIN_ACTION(formData);
        if (response.status === true) {
          dispatch({ type: 'SET_AUTH_STATE' });
          if (cartItems.length > 0) {
            for (const cartItem of cartItems) {
              const cartData = {
                product_id: cartItem.id,
                volume: cartItem.volume,
                unit: cartItem.unit,
                quantity: cartItem.cartQuantity,
                price: cartItem.price
              };
              await AddCart(cartData);
            }
          }
          navigate('/home');
        } else {
          navigate('/signin');
        }
      } catch (error) {
        console.error('Login failed:', error);
        toast.error("Login failed. Enter valid details.");
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      toast.error("Please enter both username and password.");
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };


  return (
    <div className="w-full h-screen flex items-center justify-center font-body3">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="w-1/2 hidden lgl:inline-flex h-full text-primeColor">
        <div className="w-[450px] h-full bg-[#bbe6b9] px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img loading="lazy" src={logo} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Login Here
            </h1>
            <p className="text-base">Enter your credentials</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-primeColor">
              <span className="text-primeColor font-semibold font-titleFont">
                Get started fast with FRESH BELLS
              </span>
              <br />
              Discover a wide variety of organic millets and healthy products to kickstart your wellness journey.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-primeColor">
              <span className="text-primeColor font-semibold font-titleFont">
                Access all FRESH BELLS services
              </span>
              <br />
              Enjoy exclusive deals, personalized recommendations, and seamless shopping experience with FRESH BELLS.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-primeColor">
              <span className="text-primeColor font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Join thousands of satisfied customers who trust FRESH BELLS for their organic and healthy food needs.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-titleFont font-semibold text-primeColor hover:text-white cursor-pointer duration-300">
              © FRESH BELLS
            </p>
            <p className="text-sm font-titleFont font-semibold text-primeColor hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-primeColor hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-primeColor hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-1/2 h-full">
        <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center" onSubmit={handleSubmit}>
          <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">

            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
              Sign in
            </h1>
            <div className="flex flex-col gap-3">
              {/* Username */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Email or Phone
                </p>
                <input
                  id="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  placeholder="john@gmail.com or 1234567890"
                />

              </div>

              {/* Password */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Password
                </p>
                <input
                  id="password"
                  onChange={handleChange}
                  value={formData.password}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="password"
                  placeholder="enter password"
                />

              </div>

              <button
                type="submit"
                className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
              >
                {isLoading ? 'Loading...' : 'Sign In'}
              </button>
              <Link to="/forgot-password" className="text-sm text-center font-titleFont font-medium hover:text-blue-600 duration-300">
                Forgot Password?
              </Link>
              <p className="text-sm text-center font-titleFont font-medium">
                Don't have an Account?{" "}
                <Link to="/signup">
                  <span className="hover:text-blue-600 duration-300">
                    Sign up
                  </span>
                </Link>
              </p>
              <div className="inline text-center">
                <Link to='/home'>
                  <button className="text-center text-primeColor hover:text-black font-titleFont font-medium duration-300">
                    <BsArrowLeft className="inline-block " /> Back
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
