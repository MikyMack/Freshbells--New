import React from 'react';
import Lottie from "lottie-react";
import order from "../../assets/animation/orderplaced.json"
import { Link } from 'react-router-dom';

export default function OrderPlaced() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#EFFDEC] p-4">
      <Lottie animationData={order} className="w-1/2 h-1/2" />
      <h2 className="text-2xl font-bold text-primeColor mt-4">Order Placed Successfully!</h2>
      <p className="text-lg text-gray-700 mt-2">Congratulations! You have unlocked a new dietitian for 10 days.</p>
      <div className="mt-6 flex space-x-4">
        <Link to='/orders'> <button className="bg-primeColor text-white px-4 py-2 rounded hover:bg-green-700">Order History</button>
        </Link>
        <Link to='/'><button className="bg-primeColor text-white px-4 py-2 rounded hover:bg-green-700" >Home Page</button>
        </Link>
        
      </div>
    </div>
  )
}
