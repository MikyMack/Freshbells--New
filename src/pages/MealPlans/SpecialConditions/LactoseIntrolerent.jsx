import React from 'react'
import Lactose from '../../../components/MealPlans/SpecialCOnditions/Lactose'
import Header from '../../../components/home/Header/Header'
import HeaderBottom from '../../../components/home/Header/HeaderBottom'
import Footer from '../../../components/home/Footer/Footer'
import FooterBottom from '../../../components/home/Footer/FooterBottom'
import Navigation from '../../../components/home/Header/Navigation'

export default function LactoseIntrolerent() {
  return (
    <div>
       <Header />
      <HeaderBottom />
      <Lactose />
     <Footer />
     <FooterBottom />
     <div className="block lg:hidden overflow-hidden mt-24">
      <Navigation />
      </div>
    </div>
  )
}
