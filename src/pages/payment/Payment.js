import React from "react";
import Header from "../../components/home/Header/Header";
import HeaderBottom from "../../components/home/Header/HeaderBottom";
import Footer from "../../components/home/Footer/Footer";
import FooterBottom from "../../components/home/Footer/FooterBottom";
import PaymentDO from "../../components/Payment/Payment";
import Navigation from "../../components/home/Header/Navigation";

const Payment = () => {
  return (
    <div className="max-w-container mx-auto px-4">
       <Header />
       <HeaderBottom />
       <PaymentDO />
       <Footer />
       <FooterBottom />
       <div className="block lg:hidden overflow-hidden mt-24">
        <Navigation />
      </div>
    </div>
  );
};

export default Payment;
