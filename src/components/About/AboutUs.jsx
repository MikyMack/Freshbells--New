import React from 'react';
import { IoNutrition } from "react-icons/io5";
import { GiPoisonBottle } from "react-icons/gi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { RiSecurePaymentLine } from "react-icons/ri";
import bgi from "../../assets/animation/butterfly.json";
import Lottie from 'lottie-react';

export default function AboutUs() {
    return (
        <div className="font-body3">
            <div className=" mx-auto py-8">
                <div className="text-center mb-8 bg-white p-3 shadow-md">
                    <h1 className="text-4xl font-semibold text-primeColor mb-4">Why Us?</h1>
                    <p className="text-lg text-gray-700 bg-[#bbe6b9] p-2 shadow-md">
                        We provide you with natural and organically grown products cultivated under our surveillance and supervision. From farming to packaging, we perform every function with utmost care and as per our principles of authenticity and purity. We also develop need-based processed natural food. We help you achieve your goal of consuming healthy and natural products with fresh and poison-free qualities at a competitive cost and zero hassle of delivering at consumer doorsteps.
                        You may verify the quality of produces available with us on both of our website and outlet. Customers have the option to order from our website as per their requirements or buy directly from outlet.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center bg-blue-100 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300">
                        <IoNutrition className="text-6xl text-black mb-4" />
                        <h2 className="text-xl font-bold text-gray-700 mb-2">High Nutritional Value</h2>
                        <p className="text-gray-600 text-center">Highly nutritious and healthier produce at an affordable price.</p>
                    </div>
                    <div className="flex flex-col items-center bg-yellow-200 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300">
                        <GiPoisonBottle className="text-6xl text-black mb-4" />
                        <h2 className="text-xl font-bold text-gray-700 mb-2">No Chemicals & Pesticides</h2>
                        <p className="text-gray-600 text-center">Pesticide/Chemical free produce: 100% Natural/Organic.</p>
                    </div>
                    <div className="flex flex-col items-center bg-pink-200 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300">
                        <AiFillSafetyCertificate className="text-6xl text-black mb-4" />
                        <h2 className="text-xl font-bold text-gray-700 mb-2">Certified Organic Sources</h2>
                        <p className="text-gray-600 text-center">Sourced from certified farms and known sources.</p>
                    </div>
                    <div className="flex flex-col items-center bg-red-200 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300">
                        <RiSecurePaymentLine className="text-6xl text-black mb-4" />
                        <h2 className="text-xl font-bold text-gray-700 mb-2">Secure and Hygienic</h2>
                        <p className="text-gray-600 text-center">Secure and hygienic delivery at your doorstep.</p>
                    </div>
                </div>
            </div>
            <section className="w-full py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-semibold text-primeColor">Our Process</h1>
                </div>
                <div>
                    <div className="relative bg-white  shadow-lg overflow-hidden">
                        <Lottie animationData={bgi} className="absolute inset-0 w-full h-full object-contain" />
                        <div className="relative z-10 p-6 space-y-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="md:w-1/3">
                                    <p className="font-bold text-2xl text-center bg-[#bbe6b9] text-primeColor p-4">Identifying Genuine Sources</p>
                                </div>
                                <div className="md:w-2/3 bg-[#bbe6b9] text-primeColor p-4">
                                    <p>We identify farmer groups who are closely following organic or natural farm practice. We make sure to visit and verify their produces carefully.</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="md:w-1/3">
                                    <p className="font-bold text-2xl text-center bg-[#bbe6b9] text-primeColor  p-4">Procuring And Handpicking Produces</p>
                                </div>
                                <div className="md:w-2/3 bg-[#bbe6b9] text-primeColor p-4">
                                    <p>We carefully handpick the best of farmers produce in a completely hygienic environment.</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="md:w-1/3">
                                    <p className="font-bold text-2xl text-center bg-[#bbe6b9] text-primeColor  p-4">Addressing Customer Pain Points</p>
                                </div>
                                <div className="md:w-2/3 bg-[#bbe6b9] text-primeColor  p-4">
                                    <p>As customers shop with their different kinds of health-oriented food requirements, we make shopping easy for you by providing a unique shopping experience based on your Diet Menu, Life Style Diseases, Wellness & Weight Loss Requirements.</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="md:w-1/3">
                                    <p className="font-bold text-2xl text-center bg-[#bbe6b9] text-primeColor p-4">Receiving Online Customer Orders</p>
                                </div>
                                <div className="md:w-2/3 bg-[#bbe6b9] text-primeColor p-4">
                                    <p>We display the produces available with us on our website with all of their Health Benefits, Description and How to Use details. Customers can conveniently order as per their requirements at the comfort of your home.</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="md:w-1/3">
                                    <p className="font-bold text-2xl text-center bg-[#bbe6b9] text-primeColor p-4">Packing And Delivery</p>
                                </div>
                                <div className="md:w-2/3 bg-[#bbe6b9] text-primeColor p-4">
                                    <p>We pack your order with most care in food grade or eco-friendly package and make sure to deliver to your doorstep on time, for your convenience.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
