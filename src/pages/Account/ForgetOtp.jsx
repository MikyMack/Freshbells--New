import React, { useState, useEffect } from "react";
import { BsCheckCircleFill, BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../assets/logo/logo.webp"
import { OTP_ACTION_RESET, Resend_Otp_verify } from "../../actions/AuthActions";  

const ForgetOtp = () => {
  const location = useLocation();
  const userId = location.state?.user_id || "";
  const [formData, setFormData] = useState({
    otp: "",
    user_id: userId
  });
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleResendOTP = async () => {
    setTimeLeft(30);
    try {
      const response = await Resend_Otp_verify({ user_id: userId });
      if (response.status === true) {
        toast.info("OTP has been resent.");
      } else {
        toast.error("Failed to resend OTP.");
      }
    } catch (error) {
      console.error('Resend OTP failed:', error);
      toast.error("Failed to resend OTP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.otp) {
      try {
        const response = await OTP_ACTION_RESET(formData);
        if (response.status === true) {
          // dispatch({ type: 'SET_AUTH_STATE' });
          navigate('/new-password',{ state: { user_id: response.userid } });
        } else {
          navigate('/signup');
        }
      } catch (error) {
        console.error('OTP verification failed:', error);
        toast.error("OTP verification failed. Enter valid OTP.");
      }
    } else {
      toast.error("Please enter OTP.");
    }
  };


  return (
    <div className="w-full h-screen flex items-center justify-center">
         <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="w-1/2 hidden lgl:inline-flex h-full text-primeColor">
        <div className="w-[450px] h-full bg-[#bbe6b9] px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logo} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              OTP Page
            </h1>
            <p className="text-base">Enter your otp here...</p>
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
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
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
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
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
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
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
              Enter OTP
            </h1>
            <div className="flex flex-col gap-3">
              {/* OTP Input */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  OTP
                </p>
                <input
                  id="otp"
                  onChange={handleChange}
                  value={formData.otp}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  placeholder="Enter your OTP"
                />
              </div> 
              <button
                type="submit"
                className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
              >
                Verify OTP
              </button>
              <div className="mt-4 text-center">
                <button
                  disabled={timeLeft !== 0}
                  onClick={handleResendOTP}
                  className={`text-sm font-titleFont font-medium ${timeLeft ? 'text-gray-500' : 'text-blue-600 hover:text-blue-800'} duration-300`}
                >
                  {timeLeft ? `Resend OTP in ${timeLeft} seconds` : 'Resend OTP'}
                </button>
              </div>
              <div className="inline text-center mt-2">
                <Link to='/signin'>
                  <button className="text-center text-primeColor hover:text-black font-titleFont font-medium duration-300">
                    <BsArrowLeft className="inline-block " /> Back to Sign In
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

export default ForgetOtp;
