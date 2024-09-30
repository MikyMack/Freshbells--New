import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import logo from "../../assets/logo/logo.webp";
import { RESET_PASSWORD_ACTION } from "../../actions/AuthActions";
import { BsCheckCircleFill } from "react-icons/bs";

const ForgotPasswordPage = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone) {
      try {
        const response = await RESET_PASSWORD_ACTION(phone);
        if (response.status === true) {
          toast.success("Otp sented to the given mobile number.");
          navigate('/forgot-otp',{ state: { user_id: response.userid } });
        } else {
          toast.error("Failed to send otp.");
        }
      } catch (error) {
        toast.error("Reset password request failed.");
      }
    } else {
      toast.error("Please enter your registered phonenumber.");
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
             Forgot Password
            </h1>
            <p className="text-base">Change password here...</p>
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
              Forgot Password
            </h1>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Phone Number
                </p>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  value={phone}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="phonenumber"
                  placeholder="Enter your phone number"
                />
              </div>
              <button
                type="submit"
                className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
              >
                Send OTP
              </button>
              <div className="inline text-center mt-2">
                <Link to='/signin'>
                  <button className="text-center text-primeColor hover:text-black font-titleFont font-medium duration-300">
                   🔙 Back to Sign In
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

export default ForgotPasswordPage;
