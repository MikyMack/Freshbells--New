import React, { useState, useEffect } from 'react'
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import profile from "../../assets/profile/profile.avif"
import Header from '../../components/home/Header/Header';
import HeaderBottom from '../../components/home/Header/HeaderBottom';
import Footer from '../../components/home/Footer/Footer';
import FooterBottom from '../../components/home/Footer/FooterBottom';
import Navigation from '../../components/home/Header/Navigation';

export default function Profile() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userDetails'));
    if (userData) {
      setUserName(userData.name);
      setEmail(userData.email);
      setPhoneNumber(userData.phone);
    }
    console.log(userData);
  }, []);

  return (
    <>
      <Header />
      <HeaderBottom />
      <div className='bg-[#EFFDEC]'>
        <div className='px-5 overflow-hidden'>
          <div className='md:ml-20'>
            <Breadcrumbs title="Profile" className="ml-10" />
          </div>
          <section className="profile-part py-4">
            <div className="container mx-auto">
              <div className="flex flex-col items-center justify-center">
                {/* Profile Card */}
                <div className=" bg-green-300 shadow-lg rounded-lg p-6 mb-8">
                  <div className="flex justify-center items-center mb-4">
                    <h4 className="text-4xl font-bold  font-body2">My Profile</h4>
                  </div>
                  <div className="flex flex-col md:w-full xs:w-full md:flex-row items-center justify-center">
                    <div className="xs:w-[150px] xs:h-[150px] md:w-[300px] md:h-[300px] mb-4 md:mb-0">
                      <img className="rounded-full w-full h-full" src={profile} alt="user" />
                    </div>
                    <div className="md:flex-row md:ml-6">
                      <div className="grid grid-cols-1 gap-4 font-body2 text-xl">
                        <div>
                          <label className="font-medium ">Name</label>
                          <input id="userName" className="font-semibold border rounded p-2 w-full outline-none" type="text" value={userName} readOnly />
                        </div>
                        <div>
                          <label className="font-medium">Email</label>
                          <input id="email" className="font-semibold border rounded p-2 w-full outline-none" type="email" value={email} readOnly />
                        </div>
                        <div>
                          <label className="font-medium">Phone Number</label>
                          <input id="phoneNumber" className="font-semibold border rounded p-2 w-full outline-none" type="text" value={phoneNumber} readOnly />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
      <FooterBottom />
      <div className="block lg:hidden overflow-hidden mt-24">
        <Navigation />
      </div>
    </>
  );
}
