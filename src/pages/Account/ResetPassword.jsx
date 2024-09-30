import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import logo from "../../assets/logo/logo.webp";
import { NEW_PASSWORD } from "../../actions/AuthActions";
import { BsCheckCircleFill } from "react-icons/bs";

const ResetPasswordPage = () => {
    const location = useLocation();
    const userId = location.state?.user_id || "";
  const [formData, setFormData] = useState({
    password: "",
    user_id:userId,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && confirmPassword) {
      if (formData.password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      try {
        const response = await NEW_PASSWORD(formData);
        console.log(response);
        if (response.status === true) {
          toast.success("Password reset successfully.");
          navigate('/signin');
        } else {
          toast.error("Failed to reset password.");
        }
      } catch (error) {
        toast.error("Reset password request failed.");
      }
    } else {
      toast.error("Please fill in both fields.");
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
             Reset Password
            </h1>
            <p className="text-base">Enter your new password here...</p>
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
              Reset Password
            </h1>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  New Password
                </p>
                <input
                  onChange={handleChange}
                  id="password"
                  name="password"
                  value={formData.password}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="password"
                  placeholder="Enter your new password"
                />
              </div>
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Confirm Password
                </p>
                <input
                  onChange={handleConfirmPasswordChange}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="password"
                  placeholder="Confirm your new password"
                />
              </div>
              <button
                type="submit"
                className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
              >
                Reset Password
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

export default ResetPasswordPage;
