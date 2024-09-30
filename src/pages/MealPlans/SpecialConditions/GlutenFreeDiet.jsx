import React from 'react'
import GlutenFree from '../../../components/MealPlans/SpecialCOnditions/GlutenFree'
import Header from '../../../components/home/Header/Header'
import HeaderBottom from '../../../components/home/Header/HeaderBottom'
import Footer from '../../../components/home/Footer/Footer'
import FooterBottom from '../../../components/home/Footer/FooterBottom'
import Navigation from '../../../components/home/Header/Navigation'

export default function GlutenFreeDiet() {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <GlutenFree />
      <Footer />
      <FooterBottom />
      <div className="block lg:hidden overflow-hidden mt-24">
      <Navigation />
      </div>
    </div>
  )
}
