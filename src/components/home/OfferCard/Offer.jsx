import React from 'react'
import bggain from "../../../assets/images/banner/bg-1.jpg"
import { AiOutlineArrowRight } from 'react-icons/ai';
import bush from "../../../assets/bg/millets1.png"
import bush1 from "../../../assets/bg/millets1.png"
import "./Offer.css"

export default function Offer() {
    return (
        <>
            <div className='max-w-full flex lg:flex-row xs:flex-col justify-center items-center h-full gap-10 mx-auto md:p-10 lg:p-10 mb-4 relative overflow-hidden'>
                <div className='absolute lg:top-26 left-5 pointer-events-none hidden lg:block'>
                    <img src={bush1} alt='bush' className='coco1-img lg:w-[150px] xl:w-[200px] md:w-[150px]  transform translate-x-[20%] hover:translate-x-0 transition-transform duration-500' />
                </div>
                <div className='relative lg:w-[1000px] xs:w-full h-auto rounded-lg shadow-sm shadow-primeColor mt-5 flex lg:flex-row xs:flex-col' data-aos="fade-up">
                    <img src={bggain} alt='Best Diet Plans' className='lg:w-1/2 xs:w-full h-full object-cover rounded-lg' />
                    <div className='lg:w-1/2 xs:w-full bg-white flex flex-col justify-center items-center p-4'>
                        <h2 className='text-primeColor lg:text-4xl xl:text-4xl md:text-2xl sm:text-base xs:text-base font-body3 font-medium text-center'>Contact Our Best Nutritionists and Dietitians</h2>
                        <div className='flex items-center gap-2 mt-4'>
                            <a href="mailto:info@dietplans.com" className='bg-primeColor font-body3 text-white py-2 px-4 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors'>
                                Email Us <AiOutlineArrowRight className='ml-2' />
                            </a>
                            <a href="https://wa.me/919495967722" className='bg-primeColor font-body3 text-white py-2 px-4 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors'>
                                WhatsApp <AiOutlineArrowRight className='ml-2' />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='absolute lg:top-26 right-5 pointer-events-none hidden lg:block'>
                    <img src={bush} alt='bush' className='coco-img lg:w-[150px] xl:w-[200px] md:w-[150px] transform translate-x-[20%] hover:translate-x-0 transition-transform duration-500' />
                </div>
            </div>
        </>
    )
}
